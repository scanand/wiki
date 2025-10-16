# Testing Spring Controllers --- Classic & Reactive, Old vs Latest, CI/CD Guidelines

This document enumerates testing approaches for Spring MVC and WebFlux
controllers, how practices have shifted across Spring/Spring Boot
versions, and which tests are safe to run in CI/CD pipelines.

------------------------------------------------------------------------

## 1. Historical Evolution & Version Impact

### Spring / Spring Boot "Old Versions" (2.x era and before WebFlux)

-   Spring MVC was the dominant model; WebFlux and reactive style came
    later (Spring 5+ / Spring Boot 2.x).
-   Common test tools:
    -   `MockMvc` for MVC controller tests.
    -   `@WebMvcTest` to slice web layer.
    -   `@SpringBootTest` for full-context integration.
    -   Use of `RestTemplate`, `TestRestTemplate` in integration tests.
-   Testing style relied heavily on synchronous execution and blocking
    I/O.
-   Mocking was straightforward because service dependencies were
    synchronous.

### Spring 5+ / Spring Boot 2.x → 3.x and beyond

-   Introduction of **Spring WebFlux** (reactive controllers returning
    `Mono` / `Flux`).
-   `WebTestClient` becomes the tool to test reactive endpoints, even in
    non-reactive apps if you opt for it.
-   More focus on non-blocking, back-pressure, and verifying reactive
    sequences (`StepVerifier`).
-   Need to handle Reactor's threading, scheduler control, and
    publishers in tests.
-   Testing support improved: many reactive test utilities, better
    isolation.

### What Changed Recently (Boot 3.x, Spring 6, Java 17+)

-   Stronger module boundaries, use of `@WebFluxTest` in reactive apps
    by default.
-   Incremental improvements in testing support, but core patterns
    remain similar.
-   More emphasis on **slice tests** (limiting context startup time) and
    **test container isolation**.
-   Increased adoption of **Testcontainers** for DB/infra even in CI
    pipelines.

Conclusion: The core approaches haven't changed dramatically --- only
the addition of reactive tooling and better isolation. But writing tests
for WebFlux introduces subtleties around non-blocking and asynchronous
verification.

------------------------------------------------------------------------

## 2. Ways to Test Spring Controllers (Classic & WebFlux)

Here is a unified list covering both MVC and WebFlux controllers:

  ---------------------------------------------------------------------------------------------------
  Approach         Target / Scope        Tools / Annotations          Pros            Cons
  ---------------- --------------------- ---------------------------- --------------- ---------------
  **Unit Test      Test controller       JUnit, Mockito               Fastest         Doesn't test
  (Pure Java, no   methods directly                                   execution, no   HTTP mapping,
  Spring                                                              Spring overhead validation,
  context)**                                                                          serialization

  **Slice / Web    Controller + Spring   `@WebMvcTest` /              Tests routing,  Doesn't load
  Layer Test**     Web MVC/WebFlux infra `@WebFluxTest` + `MockMvc`   validation,     full context
                                         or `WebTestClient`           serialization   (services
                                                                                      mocked)

  **Full-context   Controller +          `@SpringBootTest` with       Verifies        Slower, more
  Integration      service +             `MockMvc` or `WebTestClient` wiring, real    dependencies
  Test**           repository + beans                                 beans           

  **End-to-End /   Run app on random     `TestRestTemplate`,          Maximum realism Slowest, heavy
  HTTP Test**      port, external HTTP   `WebTestClient` pointing to                  setup
                   client                real server                                  

  **Contract / API Verify                Spring Cloud Contract,       Validates API   Doesn't
  Tests**          request/response      OpenAPI validators, REST     compatibility   exercise
                   schema, API contract  Docs                                         internal logic
                                                                                      deeply

  **Behavioral /   Full user flows       Cucumber, Karate,            Tests real      Heavier,
  Acceptance / BDD across endpoints      RestAssured, Testcontainers  scenarios,      slower, tougher
  Tests**                                                             reduced         maintenance
                                                                      regressions     

  **Reactive       Specifically for      `StepVerifier`, `Flux` /     Accurate        Adds
  Sequence / Flow  WebFlux endpoints     `Mono` assertions            reactive        complexity,
  Validation**                                                        behavior checks must manage
                                                                                      back-pressure /
                                                                                      schedulers
  ---------------------------------------------------------------------------------------------------

------------------------------------------------------------------------

## 3. Differences in Testing MVC vs WebFlux Controllers

  -----------------------------------------------------------------------------------
  Concern         MVC Controllers         WebFlux (Reactive) Controllers
  --------------- ----------------------- -------------------------------------------
  Client used in  `MockMvc`               `WebTestClient`
  tests                                   

  Return types    `ResponseEntity<T>`,    `Mono<T>`, `Flux<T>`
                  plain POJOs             

  Blocking vs     Synchronous execution   Asynchronous pipelines
  non-blocking                            

  Verifying       Direct method returns   Use `StepVerifier` or `expectNext` /
  sequences                               `expectComplete` in WebTestClient

  Scheduler       Less common             May need `VirtualTimeScheduler`,
  control & time                          `StepVerifier.withVirtualTime`,
  travel                                  `.delayElement()`, `.thenAwait()` etc.

  Back-pressure   Usually irrelevant      Must test cancellation, flux limits, error
  and cancelation                         propagation
  semantics                               
  -----------------------------------------------------------------------------------

------------------------------------------------------------------------

## 4. Tests to Run in CI/CD vs Tests to Isolate

In CI/CD pipelines, you want tests that are **fast, reliable, and
reasonably isolated**. You typically group tests as follows:

**Run in CI/CD:** - Unit tests - Slice / web-layer tests (`@WebMvcTest`
/ `@WebFluxTest`) - *Fast integration tests* with in-memory or
containerized DB/infra (using Testcontainers) - Contract / API schema
tests - Some targeted end-to-end smoke tests (if cheap enough)

**Avoid (or limit) in CI/CD:** - Long-running, full-scale E2E tests -
Heavy infrastructure setups (e.g. real external APIs) - Flaky acceptance
tests that depend on environment stability

Goal: Have **most tests run in \< 1--2 minutes**. Reserve full E2E /
integration pipelines for nightly builds or gating environments.

------------------------------------------------------------------------

## 5. Version-Specific Notes & Recommendations

-   In older Spring Boot (2.x), WebFlux was optional; many apps never
    used it. Testing was mostly MVC style.
-   In newer versions (Boot 3.x+), developers use reactive more often,
    so `@WebFluxTest`, `WebTestClient`, and reactive testing idioms are
    standard.
-   The pattern of slice tests + full integration + E2E remains the same
    across versions.
-   Improvements over time:
    -   Better test utilities for Reactor and WebFlux
    -   Official support for `WebTestClient` for both MVC & WebFlux
    -   More community tooling around Testcontainers and contract tests

------------------------------------------------------------------------

## 6. Sample Test Setup by Layer (Skeleton Examples)

### Unit Test (no Spring context)

``` java
class MyControllerUnitTest {
  private MyHandler handler = mock(MyHandler.class);
  private MyController controller = new MyController(handler);

  @Test
  void testFoo() {
    RequestDto req = new RequestDto(...);
    when(handler.handle(req)).thenReturn("ok");

    String resp = controller.foo(req);

    assertEquals("ok", resp);
  }
}
```

### Slice (WebFlux)

``` java
@WebFluxTest(MyController.class)
class MyControllerSliceTest {
  @Autowired WebTestClient webTestClient;
  @MockBean MyHandler handler;

  @Test
  void testFooEndpoint() {
    when(handler.handle(any())).thenReturn(Mono.just("ok"));

    webTestClient.get().uri("/foo")
        .exchange()
        .expectStatus().isOk()
        .expectBody(String.class).isEqualTo("ok");
  }
}
```

### Full Integration

``` java
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureWebTestClient
class MyControllerIntegrationTest {
  @Autowired WebTestClient webTestClient;
  @MockBean MyService service;

  @Test
  void testFooWithServiceMocked() {
    when(service.doWork(any())).thenReturn(Mono.just("ok"));

    webTestClient.get().uri("/foo")
        .exchange()
        .expectStatus().isOk()
        .expectBody(String.class).isEqualTo("ok");
  }
}
```

### End-to-End

``` java
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class MyControllerE2ETest {
  @Autowired private WebTestClient webTestClient;

  @Test
  void testFooEndToEnd() {
    webTestClient.get().uri("/foo")
        .exchange()
        .expectStatus().isOk()
        .expectBody()
        .jsonPath("$.result").isEqualTo("some-real-value");
  }
}
```

------------------------------------------------------------------------

## ✅ Summary & Best Practice Recommendations

1.  Use **unit tests** and **slice/web-layer tests** for your daily CI
    feedback loop (fast, isolated).\
2.  Include selective **integration tests** with real beans or
    lightweight dependencies.\
3.  Reserve **heavy E2E and acceptance tests** for gating or nightly
    pipelines.\
4.  In reactive controllers, ensure you test **asynchronous flows, error
    propagation, cancellation**, and use `WebTestClient` +
    `StepVerifier` idioms.\
5.  Across Spring Boot versions, the core test strategies hold; only the
    tooling around WebFlux and reactive support has evolved.
