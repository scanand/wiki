# Reactive Microservices with LDAP + MongoDB Solution Design

## Overview
This architecture integrates **LDAP for identity and authentication data** with **MongoDB for transactional and profile data**, wrapped in a **reactive Spring Boot microservices ecosystem**.

---

## Core Services

### 1. Directory Service (LDAP façade)
- Manages **identities, credentials, and auth attributes** across multiple tenant baseDNs.
- CRUD operations directly map to LDAP entries.
- Exposes a reactive API but internally calls blocking LDAP SDKs wrapped in `Schedulers.boundedElastic()`.

### 2. User Profile Service (MongoDB)
- Stores **application-specific and profile attributes** (preferences, settings, metadata).
- Uses **Spring Data Reactive MongoDB**.
- Syncs with LDAP for identity keys, but does not own them.

### 3. Audit & Events Service
- Immutable store in MongoDB for audit logs and events.
- Captures **all CRUD operations** (success/failure).
- Supports debugging, compliance, and replay for compensation.

---

## Data Ownership and Flows

- **User Creation**:  
  1. Create user in LDAP.  
  2. Emit event → User Profile Service writes profile in Mongo.  
  3. If Mongo write fails → compensating action removes LDAP entry.

- **Password Management**:  
  - Stored in LDAP only.  
  - Updates never touch Mongo.

- **Profile Updates**:  
  - Go directly to Mongo.  
  - If relevant, events can propagate to LDAP caches.

- **Deactivation / Status changes**:  
  - Update LDAP first, emit event, update Mongo.  

---

## Multi-Tenant Support
- **Tenant routing** ensures CRUD hits the correct `baseDN`.  
- BaseDNs and LDAP connection properties managed externally (config service / secrets).  
- Services are tenant-aware and reject unauthorized cross-tenant operations.

---

## Reactive Integration Notes
- Most LDAP SDKs are blocking. Wrap with `Mono.fromCallable(...).subscribeOn(Schedulers.boundedElastic())`.
- MongoDB integration is fully non-blocking via Spring Data Reactive Mongo.

---

## Consistency & Transactions
- Use **Sagas** and **event-driven choreography**.  
- Apply **Outbox pattern** for atomic writes + event emission.  
- Use retries and DLQs for resilience.

---

## Security
- API Gateway issues OAuth2 / OIDC tokens.  
- Directory Service uses LDAPS with tenant-specific credentials.  
- Audit logs are immutable and write-only.

---

## Testing
- **Integration tests** with Testcontainers: Embedded LDAP + MongoDB.  
- Contract testing for microservice APIs.  

---

## Deployment
- Kubernetes with Helm Charts.  
- Secrets mounted for LDAP credentials.  
- KEDA for autoscaling based on message/event backlog.

---

## Observability
- Metrics: Success/failure counts for LDAP + Mongo ops.  
- Tracing: Distributed traces across Directory + Profile + Audit services.  
- Centralized logging with correlation IDs.

---

## Example Code Snippets

### Reactive Wrapper for LDAP
```java
Mono<User> createUser(User user) {
    return Mono.fromCallable(() -> ldapClient.create(user))
               .subscribeOn(Schedulers.boundedElastic())
               .doOnSuccess(u -> eventPublisher.publish(new UserCreatedEvent(u)));
}
```

### Reactive Mongo Repository
```java
public interface UserProfileRepository extends ReactiveMongoRepository<UserProfile, String> {}
```

### Saga for Create User
```java
createUserInLdap(user)
  .flatMap(saved -> userProfileRepository.save(mapToProfile(saved)))
  .doOnError(err -> ldapClient.delete(user.getId()));
```

---

## Key Takeaways
- LDAP = **source of truth for identity**.  
- MongoDB = **source of truth for profiles & transactions**.  
- Services communicate asynchronously with **event-driven sagas**.  
- **Resilience, observability, and multi-tenant routing** are crucial for production readiness.
