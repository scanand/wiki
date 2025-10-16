# Ways to Test a Spring Controller

Spring Controllers can be tested at multiple levels of isolation
vs. realism. Here are the main approaches:

------------------------------------------------------------------------

## 1. Unit Tests

-   **Scope**: Only the controller class itself.
-   **Dependencies**: Services are mocked manually (using Mockito).
-   **Tools**: JUnit + Mockito, no Spring context.
-   **Pros**: Fastest, simplest, no Spring overhead.
-   **Cons**: Doesn't verify request mappings, validation, or
    serialization.

------------------------------------------------------------------------

## 2. Slice Tests (`@WebMvcTest` / `@WebFluxTest`)

-   **Scope**: Controller + Spring MVC/WebFlux infrastructure.
-   **Dependencies**: Services injected as `@MockBean`.
-   **Tools**: MockMvc (MVC) or WebTestClient (WebFlux).
-   **Pros**: Tests request mappings, validation, serialization.
-   **Cons**: Doesn't load the full context, persistence layers
    excluded.

------------------------------------------------------------------------

## 3. Integration Tests with Full Context (`@SpringBootTest`)

-   **Scope**: Controller + service + repository + all Spring beans.
-   **Dependencies**: Real or mocked beans (you choose).
-   **Tools**: MockMvc or WebTestClient with full Spring context.
-   **Pros**: Realistic, catches wiring/config issues.
-   **Cons**: Slower than slice or unit tests.

------------------------------------------------------------------------

## 4. End-to-End (E2E) / System Tests

-   **Scope**: Run the app on a random port, test over HTTP like a real
    client.
-   **Dependencies**: Real services, real or containerized database.
-   **Tools**: WebTestClient or TestRestTemplate hitting live endpoints.
-   **Pros**: Maximum realism, verifies full request/response path.
-   **Cons**: Slowest, setup heavier.

------------------------------------------------------------------------

## 5. Contract / API Tests

-   **Scope**: Verify controller API contract (request & response
    schema).
-   **Tools**: Spring Cloud Contract, Spring REST Docs, OpenAPI
    validators.
-   **Pros**: Ensures API compatibility across services.
-   **Cons**: Doesn't cover actual business logic.

------------------------------------------------------------------------

## 6. Behavioral / Acceptance Tests (BDD)

-   **Scope**: User flows across multiple endpoints.
-   **Tools**: Cucumber, Karate, or RestAssured with Spring Boot +
    Testcontainers.
-   **Pros**: Tests real user scenarios, regression safety.
-   **Cons**: Heaviest, requires more setup and maintenance.

------------------------------------------------------------------------

# ✅ Summary Table

  ----------------------------------------------------------------------------------
  Approach              Scope            Pros                  Cons
  --------------------- ---------------- --------------------- ---------------------
  Unit Tests            Controller only  Fast, simple          No
                                                               mappings/validation

  Slice Tests           Controller + web Test                  No
  (`@WebMvcTest`)       infra            mappings/validation   persistence/service
                                                               impl

  Integration Tests     Full Spring      Realistic wiring,     Slower
  (`@SpringBootTest`)   context          config tested         

  End-to-End Tests      Full app over    Most realistic        Slowest, infra needed
                        HTTP                                   

  Contract/API Tests    HTTP contract    API compatibility     Not business logic

  Behavioral / BDD      Full user flows  Regression &          Heavy setup, slower
  Tests                                  acceptance safety     
  ----------------------------------------------------------------------------------
