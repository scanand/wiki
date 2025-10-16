# Reactive LDAP in Spring: Two Approaches (with Mongo side-by-side)

> **TL;DR**  
> There is **no native Spring LDAP reactive client** today. You have two production-ready options:
> 1) **Reactive façade over blocking LDAP** (Spring LDAP / Apache Directory) + Reactor `boundedElastic` (most common).  
> 2) **Ldaptive** (Netty-based async with a *reactive API*) and thin adapters to `Mono`/`Flux` (more native async).

---

## 0) Where LDAP and Mongo get updated (quick recap)

| Use Case | LDAP (source of truth for security) | Mongo (operational/profile data) |
|---|---|---|
| Create user | Create DN + security attrs; then emit `UserCreated` | Create profile doc on event |
| Password change | Update password in LDAP only | Audit event only |
| Enable/disable/lock | Update LDAP attrs; emit `AccountStatusChanged` | Mirror `status` for UI/search |
| Group/role change | Update LDAP groups | Optionally denormalize `rolesCache` |
| Profile-only fields | — | Update Mongo directly |

---

## 1) Approach A — Reactive façade over blocking Spring LDAP

### When to choose
- You already use **Spring LDAP** / **Apache Directory LDAP API**.
- You want to stay within Spring ecosystem and you’re OK isolating blocking I/O.

### Key pattern
Wrap blocking calls with Reactor and push them onto `Schedulers.boundedElastic()` (or a dedicated `Scheduler`). Serialize dependent writes with `concatMap()`.

```java
// build.gradle
// implementation("org.springframework.ldap:spring-ldap-core")
// implementation("org.springframework.boot:spring-boot-starter-webflux")

@Component
public class ReactiveLdapOps {
  private final LdapTemplate ldap;

  public ReactiveLdapOps(LdapTemplate ldap) { this.ldap = ldap; }

  public Mono<DirContextOperations> lookup(String dn) {
    return Mono.fromCallable(() -> ldap.lookupContext(dn))
               .subscribeOn(Schedulers.boundedElastic());
  }

  public Mono<Void> bind(String dn, Attributes attrs) {
    return Mono.fromRunnable(() -> ldap.bind(dn, null, attrs))
               .subscribeOn(Schedulers.boundedElastic())
               .then();
  }

  public Mono<Void> modify(String dn, List<ModificationItem> mods) {
    return Mono.fromRunnable(() -> ldap.modifyAttributes(dn, mods.toArray(ModificationItem[]::new)))
               .subscribeOn(Schedulers.boundedElastic())
               .then();
  }

  public Flux<Name> search(String base, String filter) {
    return Mono.fromCallable(() -> ldap.search(base, filter, (AttributesMapper<Name>) attrs ->
            (Name) attrs.get("distinguishedName").get()))
        .subscribeOn(Schedulers.boundedElastic())
        .flatMapMany(Flux::fromIterable);
  }
}
```

**Creating a user and then adding to groups (ordered):**
```java
public Mono<Void> createUserAndGroups(UserCmd cmd) {
  String userDn = "uid=%s,ou=users,%s".formatted(cmd.uid(), cmd.baseDn());

  return ldapOps.bind(userDn, cmd.toAttributes())           // 1) create user
      .thenMany(Flux.fromIterable(cmd.groups()))
      .concatMap(g -> ldapOps.modify(
          "cn=%s,ou=groups,%s".formatted(g, cmd.baseDn()),
          List.of(new ModificationItem(DirContext.ADD_ATTRIBUTE,
                 new BasicAttribute("member", userDn)))))   // 2) add to each group, sequential
      .then();
}
```

**Pros**
- Stable, well-known Spring LDAP API.
- Simple to integrate in Spring WebFlux.
- Good enough for most enterprise loads when sized correctly.

**Cons**
- LDAP calls are still **blocking** → requires careful sizing of elastic thread-pool.
- Latency stacks under load if pool is saturated.

---

## 2) Approach B — Ldaptive (Netty-based, async) with Reactor adapters

[Ldaptive](https://www.ldaptive.org/) is an LDAP library with **Netty-based asynchronous networking** and a **reactive API**. You can adapt its async types to Reactor (`Mono`/`Flux`).

> Add dependency (example):
```groovy
implementation("org.ldaptive:ldaptive-core:2.3.5") // check latest
```
> Configure a pooled, TLS-enabled connection factory; prefer StartTLS/LDAPS.

**Search (adapt to Mono/Flux):**
```java
import org.ldaptive.*;
import reactor.core.publisher.Mono;
import reactor.core.publisher.Flux;

public class LdaptiveReactiveAdapter {

  private final SearchOperation search;

  public LdaptiveReactiveAdapter(ConnectionFactory cf, String baseDn) {
    this.search = new SearchOperation(cf, baseDn);
  }

  public Flux<LdapEntry> searchFlux(String filter, String... attrs) {
    return Mono.fromCallable(() -> search.execute(filter, attrs))
               .flatMapMany(resp -> Flux.fromIterable(resp.getEntries()));
  }
}
```

**Create / modify (async):**
```java
public Mono<Void> addEntry(ConnectionFactory cf, LdapEntry entry) {
  AddOperation add = new AddOperation(cf);
  return Mono.fromCallable(() -> add.execute(new AddRequest(entry)))
             .then();
}

public Mono<Void> modifyAttrs(ConnectionFactory cf, String dn, AttributeModification... mods) {
  ModifyOperation op = new ModifyOperation(cf);
  return Mono.fromCallable(() -> op.execute(new ModifyRequest(dn, mods)))
             .then();
}
```

**Password change (RFC 3062, example sketch):**
```java
public Mono<Void> changePassword(ConnectionFactory cf, String userDn, char[] newPass) {
  PasswordModifyOperation op = new PasswordModifyOperation(cf);
  return Mono.fromCallable(() -> op.execute(new PasswordModifyRequest(userDn, null, newPass)))
             .then();
}
```

**Pros**
- Event loop I/O (Netty) and non-blocking under the hood.
- Lower thread usage vs. wrapping blocking SDKs.
- Advanced controls (paged results, persistent search, password policy).

**Cons**
- Not “Spring LDAP” API; you’ll write a thin adapter layer.
- Smaller community vs Spring LDAP.

---

## 3) Multi-tenant (multi-baseDN) routing

```java
@Component
public class TenantLdapRouter {
  private final Map<String, TenantConfig> tenants; // {tenantId -> {baseDn, cf}}

  public Mono<ConnectionFactory> factory(String tenant) {
    return Mono.justOrEmpty(tenants.get(tenant)).map(TenantConfig::connectionFactory);
  }
  public Mono<String> baseDn(String tenant) {
    return Mono.justOrEmpty(tenants.get(tenant)).map(TenantConfig::baseDn);
  }
}
```

**Using it in a pipeline (order-sensitive):**
```java
public Mono<Void> createAndAssign(String tenant, UserCmd cmd) {
  return Mono.zip(router.factory(tenant), router.baseDn(tenant))
      .flatMap(tuple -> {
        var cf = tuple.getT1();
        var base = tuple.getT2();
        var dn = "uid=%s,ou=users,%s".formatted(cmd.uid(), base);
        var entry = toEntry(dn, cmd);

        return addEntry(cf, entry)
            .thenMany(Flux.fromIterable(cmd.groups()))
            .concatMap(g -> modifyAttrs(cf,
              "cn=%s,ou=groups,%s".formatted(g, base),
              new AttributeModification(AttributeModificationType.ADD, new LdapAttribute("member", dn))))
            .then();
      });
}
```

---

## 4) Glue with Mongo (reactive)

```java
@Service
public class UserSagaService {
  private final ProfileRepository repo; // reactive Mongo
  private final EventBus events;        // Kafka/Rabbit/Redis Streams

  public Mono<Void> handleUserCreated(UserCreated evt) {
    return repo.save(Profile.from(evt)).then();
  }

  public Mono<Void> mirrorAccountStatus(AccountStatusChanged evt) {
    return repo.findByTenantAndUid(evt.tenant(), evt.uid())
               .switchIfEmpty(Mono.just(new Profile(evt.tenant(), evt.uid())))
               .flatMap(p -> { p.setStatus(evt.status()); return repo.save(p); })
               .then();
  }
}
```

---

## 5) Performance & resilience checklist

- **Serialize** dependent LDAP writes with `concatMap` (user → groups).
- **Bulk reads**: use paged results; stream to client with back-pressure.
- **Timeouts & retries**: wrap with `timeout`, `retryWhen(backoff)`, and circuit breakers.
- **Threading (Approach A)**: size `boundedElastic` per expected LDAP QPS × P95 latency.
- **Connection pools**: configure for both LDAP and Mongo; prefer LDAPS/StartTLS.
- **DLQ** for failed events; provide admin replay endpoint.

---

## 6) Security & testing

- **Security**: OIDC at gateway; service-to-service mTLS optional. Store bind DNs in Vault.
- **Testing**: Testcontainers for Mongo; In-memory LDAP (UnboundID) or an ephemeral ApacheDS for integration.
- **Contract tests**: between Directory (LDAP) and Profile (Mongo) services.

---

## 7) Picking the approach

| Criterion | Reactive façade (Spring LDAP) | Ldaptive (async) |
|---|---|---|
| Spring alignment | ★★★★☆ | ★★★☆☆ |
| Operational simplicity | ★★★★☆ | ★★★☆☆ |
| Latency under load | ★★★☆☆ | ★★★★☆ |
| Control over LDAP controls | ★★★☆☆ | ★★★★☆ |

**Rule of thumb**: Start with **Approach A** unless you have a clear throughput/latency requirement that warrants Ldaptive.

---

## 8) Example: End-to-end Create User (WebFlux handler)

```java
@PostMapping("/tenants/{t}/users")
public Mono<Void> create(@PathVariable String t, @RequestBody Mono<CreateUserRequest> body) {
  return body
      .flatMap(cmd -> directoryService.createUserAndGroups(t, cmd))
      .then(eventBus.emit(UserCreated.of(t, cmd.getUid())))
      .then();
}
```

---

## References
- Spring Data LDAP reference (blocking repositories).  
- Spring Security (reactive) docs for WebFlux integration.  
- Ldaptive (Netty-based LDAP client with reactive/async API).

