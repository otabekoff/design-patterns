---
title: Iterator
description: Sequentially access elements of a collection without exposing its underlying representation. Decouple traversal from collection structure.
icon: BookOpen
---

# Iterator

<CoverImage src="/covers/behavioral/iterator.png" alt="Cover">
  <h1>Iterator</h1>
  <p>A playful conveyor belt where a scanner arm inspects a box of assorted donuts (round, square, sprinkled) one by one in order, without caring about how they are baked.</p>
</CoverImage>

## Overview

The **Iterator** pattern is a behavioral design pattern that provides a way to sequentially access elements of a collection without exposing its underlying representation. It allows different traversal strategies and decouples the client from the collection's internal structure.

## Purpose

The Iterator pattern aims to:

- Provide a uniform interface to traverse collections of different types
- Decouple collection traversal from collection structure
- Support multiple simultaneous traversals of a collection
- Define different traversal algorithms (forward, backward, filtered, etc.)
- Abstract the underlying collection implementation

## Problem

Consider having different data structures (arrays, trees, linked lists) and needing to iterate through them:

```typescript
// Without Iterator pattern - different access methods
class Array {
  access(index: number): any {}
}

class Tree {
  getRoot(): Node {}
  getChildren(node: Node): Node[] {}
}

class LinkedList {
  getFirst(): Node {}
  getNext(node: Node): Node {}
}

// Client code becomes messy
function processArray(arr: Array) {}
function processTree(tree: Tree) {}
function processLinkedList(list: LinkedList) {}
```

Issues with this approach:

- Client code must know about each collection type
- Different iteration methods for each collection
- Difficult to write generic algorithms
- No clear way to support multiple simultaneous traversals
- Hard to add new traversal strategies

## Solution

The Iterator pattern solves this by defining a uniform interface for iterating any collection:

```typescript
// Iterator interface
interface Iterator<T> {
  hasNext(): boolean;
  next(): T;
  reset(): void;
}

// Collection interface
interface Collection<T> {
  getIterator(): Iterator<T>;
}

// Usage
function processCollection<T>(collection: Collection<T>) {
  const iterator = collection.getIterator();
  while (iterator.hasNext()) {
    const item = iterator.next();
    // Process item
  }
}
```

## Implementation

::: code-group

```typescript [typescript]
// Iterator interface
    interface Iterator<T> {
      hasNext(): boolean;
      next(): T;
      reset(): void;
    }

    // Collection interface
    interface Collection<T> {
      createIterator(): Iterator<T>;
      createReverseIterator(): Iterator<T>;
    }

    // Concrete Iterator for Array
    class ArrayIterator<T> implements Iterator<T> {
      private index: number = 0;

      constructor(
        private items: T[],
        private reverse: boolean = false
      ) {}

      hasNext(): boolean {
        if (this.reverse) {
          return this.index < this.items.length;
        }
        return this.index < this.items.length;
      }

      next(): T {
        if (!this.hasNext()) {
          throw new Error('No more elements');
        }

        if (this.reverse) {
          return this.items[this.items.length - 1 - this.index++];
        }
        return this.items[this.index++];
      }

      reset(): void {
        this.index = 0;
      }
    }

    // Concrete Collection
    class ArrayList<T> implements Collection<T> {
      private items: T[] = [];

      add(item: T): void {
        this.items.push(item);
      }

      remove(item: T): boolean {
        const index = this.items.indexOf(item);
        if (index > -1) {
          this.items.splice(index, 1);
          return true;
        }
        return false;
      }

      size(): number {
        return this.items.length;
      }

      createIterator(): Iterator<T> {
        return new ArrayIterator(this.items, false);
      }

      createReverseIterator(): Iterator<T> {
        return new ArrayIterator(this.items, true);
      }
    }

    // Iterator for specific conditions
    class FilteredIterator<T> implements Iterator<T> {
      private items: T[];
      private index: number = 0;

      constructor(
        items: T[],
        private predicate: (item: T) => boolean
      ) {
        this.items = items.filter(this.predicate);
      }

      hasNext(): boolean {
        return this.index < this.items.length;
      }

      next(): T {
        if (!this.hasNext()) {
          throw new Error('No more elements');
        }
        return this.items[this.index++];
      }

      reset(): void {
        this.index = 0;
      }
    }

    // Usage
    const list = new ArrayList<number>();
    list.add(1);
    list.add(2);
    list.add(3);
    list.add(4);
    list.add(5);

    // Forward iteration
    const iterator = list.createIterator();
    while (iterator.hasNext()) {
      console.log(iterator.next());
    }

    // Reverse iteration
    const reverseIterator = list.createReverseIterator();
    while (reverseIterator.hasNext()) {
      console.log(reverseIterator.next());
    }

    // Filtered iteration
    const filteredIterator = new FilteredIterator(
      [1, 2, 3, 4, 5],
      (n) => n % 2 === 0 // Even numbers
    );
    while (filteredIterator.hasNext()) {
      console.log(filteredIterator.next());
    }
```

  
```python [python]
from abc import ABC, abstractmethod
    from typing import Generic, TypeVar, List

    T = TypeVar('T')

    class Iterator(ABC, Generic[T]):
        @abstractmethod
        def has_next(self) -> bool:
            pass

        @abstractmethod
        def next(self) -> T:
            pass

        @abstractmethod
        def reset(self) -> None:
            pass

    class Collection(ABC, Generic[T]):
        @abstractmethod
        def create_iterator(self) -> Iterator[T]:
            pass

        @abstractmethod
        def create_reverse_iterator(self) -> Iterator[T]:
            pass

    class ArrayIterator(Iterator[T]):
        def __init__(self, items: List[T], reverse: bool = False):
            self.items = items
            self.reverse = reverse
            self.index = 0

        def has_next(self) -> bool:
            return self.index < len(self.items)

        def next(self) -> T:
            if not self.has_next():
                raise StopIteration("No more elements")

            if self.reverse:
                result = self.items[len(self.items) - 1 - self.index]
                self.index += 1
                return result
            else:
                result = self.items[self.index]
                self.index += 1
                return result

        def reset(self) -> None:
            self.index = 0

    class ArrayList(Collection[T]):
        def __init__(self):
            self.items: List[T] = []

        def add(self, item: T) -> None:
            self.items.append(item)

        def remove(self, item: T) -> bool:
            try:
                self.items.remove(item)
                return True
            except ValueError:
                return False

        def size(self) -> int:
            return len(self.items)

        def create_iterator(self) -> Iterator[T]:
            return ArrayIterator(self.items, False)

        def create_reverse_iterator(self) -> Iterator[T]:
            return ArrayIterator(self.items, True)

    class FilteredIterator(Iterator[T]):
        def __init__(self, items: List[T], predicate):
            self.items = [item for item in items if predicate(item)]
            self.index = 0

        def has_next(self) -> bool:
            return self.index < len(self.items)

        def next(self) -> T:
            if not self.has_next():
                raise StopIteration("No more elements")
            result = self.items[self.index]
            self.index += 1
            return result

        def reset(self) -> None:
            self.index = 0

    # Usage
    list_collection = ArrayList()
    list_collection.add(1)
    list_collection.add(2)
    list_collection.add(3)
    list_collection.add(4)
    list_collection.add(5)

    # Forward iteration
    iterator = list_collection.create_iterator()
    while iterator.has_next():
        print(iterator.next())

    # Reverse iteration
    reverse_iterator = list_collection.create_reverse_iterator()
    while reverse_iterator.has_next():
        print(reverse_iterator.next())

    # Filtered iteration
    filtered_iterator = FilteredIterator(
        [1, 2, 3, 4, 5],
        lambda n: n % 2 == 0  # Even numbers
    )
    while filtered_iterator.has_next():
        print(filtered_iterator.next())
```

:::

## Real-World Example

### Tree Iterator

```typescript
interface TreeNode<T> {
  value: T;
  children: TreeNode<T>[];
}

class TreeIterator<T> implements Iterator<T> {
  private stack: TreeNode<T>[] = [];
  private traversalType: "dfs" | "bfs";

  constructor(root: TreeNode<T>, traversalType: "dfs" | "bfs" = "dfs") {
    this.traversalType = traversalType;
    if (traversalType === "dfs") {
      this.stack.push(root);
    } else {
      this.stack.push(root); // Use as queue
    }
  }

  hasNext(): boolean {
    return this.stack.length > 0;
  }

  next(): T {
    if (!this.hasNext()) {
      throw new Error("No more elements");
    }

    if (this.traversalType === "dfs") {
      const node = this.stack.pop()!;
      this.stack.push(...node.children);
      return node.value;
    } else {
      const node = this.stack.shift()!;
      this.stack.push(...node.children);
      return node.value;
    }
  }

  reset(): void {
    // Would need root stored to reset
  }
}
```

## Advantages

✅ **Uniform Interface** - Provides consistent way to iterate any collection
✅ **Decoupling** - Client doesn't need to know collection structure
✅ **Multiple Traversals** - Support different iteration strategies
✅ **Flexibility** - Easy to add new iteration algorithms
✅ **Simplifies Code** - Cleaner client code with single iteration interface
✅ **Encapsulation** - Collection internals remain hidden
✅ **Single Responsibility** - Iteration logic is separated from collection

## Disadvantages

❌ **Overhead** - Extra objects for each iterator adds memory overhead
❌ **Complexity** - Adds complexity to simple collections
❌ **Performance** - Can be slower than direct array access
❌ **Mutation Issues** - Modifying collection during iteration can cause issues
❌ **State Management** - Iterator state must be carefully managed
❌ **Thread Safety** - Iterators are typically not thread-safe

## When to Use

- You need to access elements of a collection uniformly
- You want to support multiple simultaneous traversals
- You need to decouple collection from traversal algorithms
- You want to provide multiple ways to traverse a collection
- You're building a framework that works with various collection types
- You need to support lazy evaluation or filtered iteration

## When NOT to Use

- Working with simple arrays where direct indexing is fine
- Performance is critical and overhead is unacceptable
- Collections are rarely iterated
- Direct access to elements is always required
- Using languages with built-in iteration support (for...of, for...in)
- Thread safety is critical requirement

## Related Patterns

- **Composite** - Often used together to traverse tree structures
- **Factory** - Can be used to create appropriate iterator
- **Strategy** - Similar to different traversal strategies
- **Visitor** - Can be used instead for some operations
- **Memento** - Can store iterator state for later resumption
