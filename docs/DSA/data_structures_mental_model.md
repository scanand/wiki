TreeMap and TreeSet both are part of the Java Collections Framework, and both rely on red–black trees (a self-balancing binary search tree).

⸻

🌳 TreeMap
	•	A Map where keys are stored in sorted order (based on natural ordering or a custom Comparator).
	•	Internally backed by a red–black tree → guarantees O(log n) for insert, search, delete.

Mental model

Think of a dictionary (like in a book):
	•	Words (keys) are alphabetically sorted.
	•	Each word points to its definition (value).

``` .java
TreeMap<String, Integer> treeMap = new TreeMap<>();
treeMap.put("dog", 1);
treeMap.put("cat", 2);
treeMap.put("apple", 3);

System.out.println(treeMap);
```

```
Output (keys sorted):

{apple=3, cat=2, dog=1}
```

⸻

🌳 TreeSet
	•	A Set implementation backed by a TreeMap.
	•	Stores unique elements, in sorted order.
	•	Guarantees O(log n) for add, remove, contains.

Mental model

Think of a sorted shelf of unique books:
	•	You can quickly see if a book exists (binary search in tree).
	•	Books are kept in sorted order automatically.

``` .java
TreeSet<String> treeSet = new TreeSet<>();
treeSet.add("dog");
treeSet.add("cat");
treeSet.add("apple");

System.out.println(treeSet);

Output (sorted, no duplicates):

[apple, cat, dog]
```

⸻

🧠 Key Intuition (Mental Model)
	•	Imagine every time you insert a key/value (TreeMap) or element (TreeSet), it gets placed into a balanced binary search tree.
	•	The tree automatically rearranges (rotates) itself to remain balanced.
	•	Because it’s balanced, the height is ~log n, so searches, inserts, deletes are efficient.

⸻

⚖️ Comparison vs Other Maps/Sets

Feature	HashMap / HashSet	LinkedHashMap	TreeMap / TreeSet
Ordering	None (random)	Insertion order	Sorted (natural or comparator)
Complexity	O(1) avg.	O(1) avg.	O(log n)
Use Case	Fast lookup	Preserve order	Always keep sorted


⸻

🏗️ Mental Pictures
	•	TreeMap = 📖 Dictionary → words sorted, each with a definition.
	•	TreeSet = 📚 Sorted bookshelf → unique books in order.

⸻
