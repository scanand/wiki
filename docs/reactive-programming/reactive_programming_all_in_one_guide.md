is new request
# 🚀 Reactive Programming in Java (Project Reactor) — All-in-One Guide

This guide includes:
- ✅ Cheat Sheet of Common Transformations
- 🔁 Step-by-Step Stream Flow Diagram
- 🧪 Practice Problems with Hints

---

## ✅ 1. Cheat Sheet: Common Reactive Transformations

| Problem                                           | Operator(s) to Use                  | Resulting Type             |
|--------------------------------------------------|-------------------------------------|----------------------------|
| List\<T\> → Flux\<T\>                                | `Flux.fromIterable(list)`           | `Flux<T>`                  |
| Flux\<T\> → List\<T\>                                | `collectList()`                     | `Mono<List<T>>`            |
| Flux\<T\>  → Map\<K, T\>                             | `collectMap(keyFn, valFn)`          | `Mono<Map<K, T>>`          |
| Flux\<T\>  → Map\<K, List\<T\> \>                | `collectMultimap(keyFn)`            | `Mono<Map<K, List<T>>>`    |
| Transform each item                              | `map()`                             | `Flux<R>`                  |
| Transform and flatten (async calls)              | `flatMap()`                          | `Flux<R>`                  |
| Async calls in order                             | `concatMap()`                        | `Flux<R>`                  |
| Group by key                                      | `groupBy()`                          | `GroupedFlux<K, T>`        |
| Fallback value                                    | `switchIfEmpty(Mono.just(...))`     | `Flux<T>` or `Mono<T>`     |
| Combine two Flux\<T\>                                | `zipWith(otherFlux)`                 | `Flux<Tuple2<T1, T2>>`     |
| Run after completion                              | `doOnTerminate()`                    | Same as input stream       |
| Parallel processing                               | `parallel().runOn(Schedulers.parallel())` | `ParallelFlux<T>`     |

---

## 🔁 2. Stream Flow Diagram (Example: Group + Transform + Return)

### Problem:
You have a `Flux<MyObject>`, and you want to:

- Group by `documentType`
- For each group, process to get a `DocStatusModel`
- Collect all into a `List<DocStatusModel>`

### Flow Diagram:

```
[Flux<MyObject>] 
    │
    ├─> collectMultimap(MyObject::getDocumentType)
    │       → Mono<Map<DocumentType, List<MyObject>>>
    │
    ├─> flatMapMany(map -> Flux.fromIterable(map.entrySet()))
    │       → Flux<Map.Entry<DocumentType, List<MyObject>>>
    │
    ├─> map(entry -> process(entry.getKey(), entry.getValue()))
    │       → Flux<DocStatusModel>
    │
    └─> collectList()
            → Mono<List<DocStatusModel>>
```

Each transformation stage is composable, testable, and reactive.

---

## 🧪 3. Practice Problems with Hints

### 🔹 Problem 1: Group Books by Genre

**Input**: `Flux<Book>`, where `Book` has a `getGenre()` method  
**Goal**: `Mono<Map<String, List<Book>>>` grouped by genre

**Hint**:  
Use `collectMultimap(Book::getGenre)`

---

### 🔹 Problem 2: Convert Orders to EnrichedOrders (with async call)

**Input**: `Flux<Order>`  
**Goal**: `Flux<EnrichedOrder>`  
**Hint**:  
```java
.flatMap(order -> enrichOrderAsync(order))
```

---

### 🔹 Problem 3: Provide Default When Empty

**Input**: `Flux<Item>`  
**Goal**: Emit default items if source is empty

**Hint**:  
```java
.switchIfEmpty(Flux.just(defaultItem1, defaultItem2))
```

---

### 🔹 Problem 4: Retry on Error

**Input**: `Flux<Data>` with flaky source  
**Goal**: Retry 3 times before failing

**Hint**:  
```java
.retry(3)
```

---

### 🔹 Problem 5: Combine Two Streams

**Input**: `Flux<User>`, `Flux<Account>`  
**Goal**: `Flux<UserAccountSummary>`

**Hint**:  
```java
userFlux.zipWith(accountFlux, (user, account) -> new UserAccountSummary(user, account))
```

---

## 💬 Tip for Mastery

- Practice in a sandbox using `main()` or unit tests
- Break problems into: **Input → Transform → Output**
- Think in **data shapes** (e.g. Flux\<T\> , Mono\<List\<T\> \>, Map\<K, V\>)

---

Happy streaming! 💡
