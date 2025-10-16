---
id: start-here
title: Start Here
sidebar_label: Start Here
---

Build reactive stream transformation solutions on your own by embracing new mental models and deliberate practice.

---

## 1. Shift From Imperative to Declarative Thinking

To solve problems in reactive programming, focus on describing what you want, not how to loop toward it.

- Stop thinking in terms of loops and conditionals.
- Start thinking in terms of transformations and pipelines.

```java
// Imperative
for (Object obj : list) {
  if ("PP".equals(obj.getType())) {
    map.get("PP").add(obj);
  }
}
```

```java
// Reactive (declarative)
flux.collectMultimap(MyObject::getType);
```

> Mental model: “What stream transformation will get me this result?”

---

## 2. Learn Reactor’s Building Blocks

Be fluent with these core operators:

| Operator | Use Case |
| --- | --- |
| `map()` | Transform item → item |
| `flatMap()` | Item → async inner stream |
| `collectList()` | Convert `Flux` → `Mono<List>` |
| `collectMap()` | Group items by key |
| `collectMultimap()` | Group items by key into `List` |
| `groupBy()` | Group into `GroupedFlux` |
| `reduce()` | Fold items into one |
| `zipWith()` | Combine two streams |
| `filter()` | Keep items matching a predicate |

Exercise: pick any Flux transformation and explain it in plain English (“Group the objects by type, then convert each group into something else.”).

---

## 3. Solve Small Real Problems in Pure Reactor

Don’t always reach for WebFlux. Write standalone Flux pipelines in tests or a `main()` method to build muscle memory.

```java
Flux.just(obj1, obj2, obj3)
    .collectMultimap(MyObject::getType)
    .flatMapMany(map -> Flux.fromIterable(map.entrySet()))
    .map(entry -> process(entry.getKey(), entry.getValue()))
    .collectList();
```

---

## 4. Practice Converting Use Cases into Pipelines

Ask yourself:

- What is the input `Flux`?
- What transformations do I need?
- Where do I group, map, or filter?
- What’s the final output—`Mono` or `Flux`?

Example goal: “I have a `Flux<MyObject>` and want a `Mono<Map<Type, List<OtherObject>>>`.”

That tells you to:

1. Use `collectMultimap()` or `groupBy()`.
2. Apply `mapValues()` or `flatMap()`.
3. Collect again.

---

## 5. Write Pseudocode Before Code

Outline the pipeline first:

```
Input: Flux<MyObject>
Step 1: Group by getType()
Step 2: Transform each (type, list)
Step 3: Return List<DocStatusModel>
```

Then translate the steps into Reactor operators.

---

## 6. Explore Advanced Operators Gradually

Eventually learn:

- `groupBy()` for advanced grouping with async processing.
- `flatMapSequential()`.
- `switchIfEmpty()`, `concatMap()`, `buffer()`.
- Parallelism helpers: `publishOn`, `subscribeOn`, `parallel()`.

Master the transform → group → collect pattern before moving on.

---

## 7. Recommended Learning Resources

| Resource | Why It Helps |
| --- | --- |
| Reactor Reference Guide | Official explanations with depth |
| Baeldung WebFlux Tutorials | Hands-on use cases |
| Tech Primers (YouTube) | Visual demos of streams |
| Reactor Playground | Interactive stream editor |

---

## Self-Solution Checklist

Before asking for help, confirm:

- What type of stream do I have (`Flux<T>` or `Mono<T>`)?
- What transformations am I missing?
- Did I try the pipeline in isolation?
- Do I have tests covering the edge case?

If you can answer those confidently, you’re already most of the way to the solution.
