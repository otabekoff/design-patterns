---
title: Prototype Pattern
description: Creates new objects by cloning an existing object prototype rather than creating from scratch.
icon: Copy
---

![Prototype Concept](/images/patterns/prototype-mini-2x.png)

# Prototype Pattern

## Overview

The **Prototype** pattern is a creational design pattern that lets you create new objects by copying an existing object (prototype) rather than creating from scratch. The key is distinguishing between **shallow copy** (copies references) and **deep copy** (copies nested objects).

**Key advantage**: Faster object creation when initialization is expensive, and simplifies object creation by eliminating complex constructor logic.

**Modern perspective**: Often replaced by:

- Object cloning built into frameworks
- Immutable data structures with copy-on-write
- Serialization/deserialization libraries
- Factory patterns with pre-configured instances

However, Prototype remains valuable for performance-critical scenarios with expensive object initialization.

## Real-World Analogy

Consider **photocopying a document**:

- Original document: The prototype
- Copy machine: The cloning mechanism
- Photocopy: The new object with same structure

If the original has a paper clip, a shallow copy machine copies the reference (both documents share one clip). A deep copy machine creates a separate clip for the copy.

## The Problem

Some objects are expensive to create from scratch:

### Scenario: Expensive Object Initialization

```typescript
// ❌ Problem: Creating objects is expensive
class Document {
  private content: string;
  private metadata: Map<string, any>;
  private styles: StyleSheet;

  constructor(path: string) {
    // Expensive operations:
    // - Parse XML file (100ms)
    // - Load all linked stylesheets (200ms)
    // - Build object graph (150ms)
    // - Total: ~450ms per document

    this.parseXML(path); // Slow
    this.loadStylesheets(); // Slow
    this.buildObjectGraph(); // Slow
  }
}

// Creating 1000 similar documents = 450,000ms = 7.5 minutes!
const documents = Array(1000)
  .fill(null)
  .map(() => new Document("template.xml"));
```

### Scenario: Complex Object State

```typescript
// ❌ Problem: Replicating complex state is error-prone
class GameCharacter {
  public health: number = 100;
  public mana: number = 50;
  public inventory: Item[] = [];
  public equipment: Equipment = new Equipment();
  public stats: Stats = new Stats();
  public buffs: Buff[] = [];

  constructor() {
    // Manual initialization is tedious and error-prone
  }
}

// Creating variations means manually copying all state
```

## The Solution

The Prototype pattern solves this by:

1. **Marking objects as cloneable** (implement Clone/Copy interface)
2. **Providing a clone() method** that creates a copy
3. **Handling deep vs. shallow copying** appropriately for each field
4. **Registering prototypes** for quick access

```typescript
// ✅ Solution: Clone instead of recreate
interface Prototype<T> {
  clone(): T;
}

class Document implements Prototype<Document> {
  private content: string;
  private metadata: Map<string, any>;
  private styles: StyleSheet;

  clone(): Document {
    // Copy is fast - references existing data
    const copy = new Document();
    copy.content = this.content;
    copy.metadata = new Map(this.metadata); // Deep copy
    copy.styles = this.styles; // Shared reference
    return copy;
  }
}

// Creating 1000 documents from template = ~5ms!
const template = new Document("template.xml"); // One-time expensive init
const documents = Array(1000)
  .fill(null)
  .map(() => template.clone()); // Fast!
```

## Implementation

::: code-group

```typescript [typescript]
// Prototype interface
interface Prototype<T> {
  clone(): T;
}

// Concrete prototype
class GameCharacter implements Prototype<GameCharacter> {
  public name: string;
  public health: number;
  public mana: number;
  public inventory: string[];
  public skills: Map<string, number>;

  constructor(
    name: string,
    health: number,
    mana: number,
    inventory: string[],
    skills: Map<string, number>,
  ) {
    this.name = name;
    this.health = health;
    this.mana = mana;
    this.inventory = inventory;
    this.skills = skills;
  }

  // Shallow copy - references shared
  clone(): GameCharacter {
    return new GameCharacter(
      this.name,
      this.health,
      this.mana,
      this.inventory,
      this.skills,
    );
  }

  // Deep copy - nested objects copied
  deepClone(): GameCharacter {
    return new GameCharacter(
      this.name,
      this.health,
      this.mana,
      [...this.inventory], // Copy array
      new Map(this.skills), // Copy map
    );
  }

  takeDamage(amount: number): void {
    this.health = Math.max(0, this.health - amount);
  }
}

// Prototype registry
class CharacterFactory {
  private prototypes: Map<string, GameCharacter> = new Map();

  registerPrototype(name: string, prototype: GameCharacter): void {
    this.prototypes.set(name, prototype);
  }

  createCharacter(prototypeName: string): GameCharacter {
    const prototype = this.prototypes.get(prototypeName);
    if (!prototype) throw new Error(`Unknown prototype: ${prototypeName}`);
    return prototype.deepClone();
  }
}

// Usage
const warrior = new GameCharacter(
  "Warrior",
  150,
  20,
  ["sword"],
  new Map([
    ["strength", 18],
    ["constitution", 16],
  ]),
);

const factory = new CharacterFactory();
factory.registerPrototype("warrior", warrior);

const player1 = factory.createCharacter("warrior");
const player2 = factory.createCharacter("warrior");

player1.takeDamage(30);
console.log(`Player 1 health: ${player1.health}`); // 120
console.log(`Player 2 health: ${player2.health}`); // 150 - unaffected!
```

```python [python]
from abc import ABC, abstractmethod
from typing import Dict, List
import copy

class Prototype(ABC):
    @abstractmethod
    def clone(self) -> "Prototype":
        pass

class GameCharacter(Prototype):
    def __init__(
        self,
        name: str,
        health: int,
        mana: int,
        inventory: List[str],
        skills: Dict[str, int]
    ):
        self.name = name
        self.health = health
        self.mana = mana
        self.inventory = inventory
        self.skills = skills

    def clone(self) -> "GameCharacter":
        """Shallow copy"""
        return GameCharacter(
            self.name,
            self.health,
            self.mana,
            self.inventory,
            self.skills
        )

    def deep_clone(self) -> "GameCharacter":
        """Deep copy using copy module"""
        return copy.deepcopy(self)

    def take_damage(self, amount: int) -> None:
        self.health = max(0, self.health - amount)

    def __repr__(self) -> str:
        return (f"GameCharacter(name={self.name}, "
                f"health={self.health}, mana={self.mana})")


class CharacterFactory:
    def __init__(self):
        self._prototypes: Dict[str, GameCharacter] = {}

    def register_prototype(self, name: str, prototype: GameCharacter) -> None:
        self._prototypes[name] = prototype

    def create_character(self, prototype_name: str) -> GameCharacter:
        prototype = self._prototypes.get(prototype_name)
        if not prototype:
            raise ValueError(f"Unknown prototype: {prototype_name}")
        return prototype.deep_clone()


# Usage
warrior = GameCharacter(
    "Warrior",
    health=150,
    mana=20,
    inventory=["sword", "shield"],
    skills={"strength": 18, "constitution": 16}
)

factory = CharacterFactory()
factory.register_prototype("warrior", warrior)

player1 = factory.create_character("warrior")
player2 = factory.create_character("warrior")

player1.take_damage(30)
print(f"Player 1: {player1}")  # health=120
print(f"Player 2: {player2}")  # health=150
```

```java [java]
import java.util.*;

interface Prototype extends Cloneable {
    Prototype clone();
}

class GameCharacter implements Prototype {
    private String name;
    private int health;
    private int mana;
    private List<String> inventory;
    private Map<String, Integer> skills;

    public GameCharacter(String name, int health, int mana,
                        List<String> inventory, Map<String, Integer> skills) {
        this.name = name;
        this.health = health;
        this.mana = mana;
        this.inventory = inventory;
        this.skills = skills;
    }

    @Override
    public GameCharacter clone() {
        try {
            GameCharacter cloned = (GameCharacter) super.clone();
            // Deep copy mutable fields
            cloned.inventory = new ArrayList<>(this.inventory);
            cloned.skills = new HashMap<>(this.skills);
            return cloned;
        } catch (CloneNotSupportedException e) {
            throw new RuntimeException(e);
        }
    }

    public void takeDamage(int amount) {
        this.health = Math.max(0, this.health - amount);
    }

    @Override
    public String toString() {
        return String.format("GameCharacter{name='%s', health=%d, mana=%d}",
            name, health, mana);
    }
}

class CharacterFactory {
    private Map<String, GameCharacter> prototypes = new HashMap<>();

    public void registerPrototype(String name, GameCharacter prototype) {
        this.prototypes.put(name, prototype);
    }

    public GameCharacter createCharacter(String prototypeName) {
        GameCharacter prototype = prototypes.get(prototypeName);
        if (prototype == null) {
            throw new IllegalArgumentException(
                "Unknown prototype: " + prototypeName
            );
        }
        return prototype.clone();
    }
}

// Usage
public class PrototypeExample {
    public static void main(String[] args) {
        GameCharacter warrior = new GameCharacter(
            "Warrior", 150, 20,
            new ArrayList<>(Arrays.asList("sword", "shield")),
            new HashMap<>(Map.of("strength", 18, "constitution", 16))
        );

        CharacterFactory factory = new CharacterFactory();
        factory.registerPrototype("warrior", warrior);

        GameCharacter player1 = factory.createCharacter("warrior");
        GameCharacter player2 = factory.createCharacter("warrior");

        player1.takeDamage(30);
        System.out.println(player1); // health=120
        System.out.println(player2); // health=150
    }
}
```

```go [go]
package main

type Prototype interface {
    Clone() Prototype
}

type GameCharacter struct {
    Name      string
    Health    int
    Mana      int
    Inventory []string
    Skills    map[string]int
}

func (g *GameCharacter) Clone() Prototype {
    // Shallow copy
    clone := *g
    return &clone
}

func (g *GameCharacter) DeepClone() *GameCharacter {
    // Deep copy
    clone := &GameCharacter{
        Name:   g.Name,
        Health: g.Health,
        Mana:   g.Mana,
        Skills: make(map[string]int),
    }

    // Copy inventory
    clone.Inventory = make([]string, len(g.Inventory))
    copy(clone.Inventory, g.Inventory)

    // Copy skills
    for k, v := range g.Skills {
        clone.Skills[k] = v
    }

    return clone
}

func (g *GameCharacter) TakeDamage(amount int) {
    g.Health -= amount
    if g.Health < 0 {
        g.Health = 0
    }
}

type CharacterFactory struct {
    prototypes map[string]*GameCharacter
}

func NewCharacterFactory() *CharacterFactory {
    return &CharacterFactory{
        prototypes: make(map[string]*GameCharacter),
    }
}

func (cf *CharacterFactory) RegisterPrototype(name string,
                                             prototype *GameCharacter) {
    cf.prototypes[name] = prototype
}

func (cf *CharacterFactory) CreateCharacter(name string) *GameCharacter {
    prototype, exists := cf.prototypes[name]
    if !exists {
        panic("Unknown prototype: " + name)
    }
    return prototype.DeepClone()
}
```

```rust [rust]
use std::collections::HashMap;

trait Prototype {
    fn clone_prototype(&self) -> Box<dyn Prototype>;
}

#[derive(Clone, Debug)]
pub struct GameCharacter {
    pub name: String,
    pub health: i32,
    pub mana: i32,
    pub inventory: Vec<String>,
    pub skills: HashMap<String, i32>,
}

impl Prototype for GameCharacter {
    fn clone_prototype(&self) -> Box<dyn Prototype> {
        Box::new(self.clone())
    }
}

impl GameCharacter {
    pub fn new(
        name: String,
        health: i32,
        mana: i32,
        inventory: Vec<String>,
        skills: HashMap<String, i32>,
    ) -> Self {
        GameCharacter {
            name,
            health,
            mana,
            inventory,
            skills,
        }
    }

    pub fn take_damage(&mut self, amount: i32) {
        self.health = (self.health - amount).max(0);
    }
}

pub struct CharacterFactory {
    prototypes: HashMap<String, GameCharacter>,
}

impl CharacterFactory {
    pub fn new() -> Self {
        CharacterFactory {
            prototypes: HashMap::new(),
        }
    }

    pub fn register_prototype(&mut self, name: String, prototype: GameCharacter) {
        self.prototypes.insert(name, prototype);
    }

    pub fn create_character(&self, prototype_name: &str) -> GameCharacter {
        self.prototypes
            .get(prototype_name)
            .cloned()
            .expect(&format!("Unknown prototype: {}", prototype_name))
    }
}

fn main() {
    let mut skills = HashMap::new();
    skills.insert("strength".to_string(), 18);
    skills.insert("constitution".to_string(), 16);

    let warrior = GameCharacter::new(
        "Warrior".to_string(),
        150,
        20,
        vec!["sword".to_string(), "shield".to_string()],
        skills,
    );

    let mut factory = CharacterFactory::new();
    factory.register_prototype("warrior".to_string(), warrior);

    let mut player1 = factory.create_character("warrior");
    let player2 = factory.create_character("warrior");

    player1.take_damage(30);
    println!("Player 1: {:?}", player1); // health=120
    println!("Player 2: {:?}", player2); // health=150
}
```

:::

## Real-World Example: Document Template Cloning

A document template system where creating documents from scratch is expensive, but cloning existing templates is fast:

```typescript
class DocumentTemplate {
  private templateId: string;
  private content: string;
  private styles: CSSStyleSheet;
  private metadata: DocumentMetadata;
  private assets: Map<string, ArrayBuffer>; // Images, fonts, etc.

  constructor(templateId: string) {
    this.templateId = templateId;
    // Expensive initialization: Load files, parse CSS, cache assets (~500ms)
    this.loadFromDisk(templateId);
  }

  // Deep clone - complete independent copy
  clone(): DocumentTemplate {
    const cloned = Object.create(Object.getPrototypeOf(this));
    cloned.templateId = this.templateId;
    cloned.content = this.content; // String is immutable
    cloned.styles = this.styles.cloneNode(true); // Deep copy CSS
    cloned.metadata = { ...this.metadata }; // Copy metadata
    cloned.assets = new Map(this.assets); // Copy asset references
    return cloned;
  }

  public setContent(newContent: string): void {
    this.content = newContent;
  }

  private loadFromDisk(id: string): void {
    // Simulate expensive I/O
  }
}

// Usage
const templateLoader = {
  _templates: new Map<string, DocumentTemplate>(),

  loadTemplate(id: string): DocumentTemplate {
    if (!this._templates.has(id)) {
      // First load is expensive (~500ms)
      this._templates.set(id, new DocumentTemplate(id));
    }
    return this._templates.get(id)!;
  },

  createDocumentFromTemplate(templateId: string): DocumentTemplate {
    const template = this.loadTemplate(templateId);
    // Clone is fast (~1ms)
    return template.clone();
  },
};

// Create 100 documents from template
const startTime = Date.now();
const documents = Array(100)
  .fill(null)
  .map(() => templateLoader.createDocumentFromTemplate("invoice"));
console.log(`Created 100 documents in ${Date.now() - startTime}ms`); // ~100ms
// Without cloning: 100 * 500ms = 50,000ms!
```

## Shallow vs. Deep Copy

Understanding when to use each is critical:

| Aspect               | Shallow Copy          | Deep Copy                 |
| -------------------- | --------------------- | ------------------------- |
| **Primitive values** | Copied                | Copied                    |
| **References**       | Shared pointer        | New copy of object        |
| **Nested objects**   | Same instance         | Independent instances     |
| **Performance**      | Very fast             | Slower                    |
| **Memory**           | Less memory           | More memory               |
| **Use case**         | Immutable fields only | Complex nested structures |

```typescript
// Example: Shallow vs. Deep
class Person {
  constructor(
    public name: string,
    public address: Address,
  ) {}

  shallowClone(): Person {
    return new Person(this.name, this.address); // address is shared!
  }

  deepClone(): Person {
    return new Person(
      this.name,
      new Address(this.address.street, this.address.city),
    );
  }
}

const alice = new Person("Alice", new Address("123 Main St", "NYC"));
const aliceShallow = alice.shallowClone();
const aliceDeep = alice.deepClone();

// Modify address
alice.address.city = "Boston";

console.log(aliceShallow.address.city); // "Boston" - affected!
console.log(aliceDeep.address.city); // "NYC" - independent
```

## Advantages and Disadvantages

### ✅ Advantages

- **Performance**: Cloning is much faster than complex initialization
- **Flexibility**: Create variations from templates efficiently
- **Reduced initialization**: Expensive setup happens once, not per-object
- **Encapsulation**: Clone logic is contained in the prototype
- **Alternative to inheritance**: Use composition to share behavior
- **Reduced coupling**: Objects don't need complex constructors

### ❌ Disadvantages

- **Complexity**: Must properly handle shallow vs. deep copy
- **Memory usage**: Deep cloning duplicates data (more memory)
- **Shallow copy bugs**: Easy to accidentally share mutable state
- **Circular references**: Can cause infinite loops in deep cloning
- **Performance overhead**: Deep cloning can be slow for large graphs
- **Platform dependencies**: Clone semantics vary by language

## Variations

### 1. Serialization-Based Cloning

```typescript
// Clone via serialization (handles complex graphs)
function deepCloneViaSerialization<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

const cloned = deepCloneViaSerialization(character);
```

### 2. Prototype Registry

Pre-configured prototypes available by name (as shown in examples).

## When to Use

- Complex objects expensive to initialize
- Creating many similar objects
- Need variations of a base object
- Performance-critical object creation
- Want to avoid constructor complexity

## When NOT to Use

- Simple objects with inexpensive construction
- Only creating few objects
- Shallow copy semantics are unclear
- Circular references in object graph
- Immutable data structure better fits

## Common Mistakes

### ❌ Mistake 1: Shallow Copy of Mutable Fields

```typescript
// ❌ Bad: Shared mutable state
class Team {
  constructor(public members: string[]) {}

  clone(): Team {
    return new Team(this.members); // Shares array!
  }
}

const team1 = new Team(["Alice", "Bob"]);
const team2 = team1.clone();
team2.members.push("Charlie");
console.log(team1.members); // ["Alice", "Bob", "Charlie"] - affected!

// ✅ Good: Deep copy mutable fields
class Team {
  clone(): Team {
    return new Team([...this.members]); // New array
  }
}
```

### ❌ Mistake 2: Forgetting Circular References

```typescript
// ❌ Bad: Infinite loop on circular references
function deepClone(obj: any): any {
  if (typeof obj !== "object") return obj;
  const copy = {};
  for (const key in obj) {
    copy[key] = deepClone(obj[key]); // Infinite if circular!
  }
  return copy;
}

// ✅ Good: Track visited objects
function deepClone(obj: any, visited = new WeakSet()): any {
  if (typeof obj !== "object" || visited.has(obj)) return obj;
  visited.add(obj);
  const copy = Array.isArray(obj) ? [] : {};
  for (const key in obj) {
    copy[key] = deepClone(obj[key], visited);
  }
  return copy;
}
```

### ❌ Mistake 3: Clone Without Proper Type Handling

```typescript
// ❌ Bad: Lost type information
const cloned = JSON.parse(JSON.stringify(obj));
// Methods are lost, Date becomes string, etc.

// ✅ Good: Preserve types
class Item {
  constructor(
    public id: string,
    public created: Date,
  ) {}

  clone(): Item {
    return new Item(
      this.id,
      new Date(this.created), // Preserve Date type
    );
  }
}
```

### ❌ Mistake 4: Cloning Expensive During Runtime

```typescript
// ❌ Bad: Cloning in tight loop
for (let i = 0; i < 10000; i++) {
  const copy = template.deepClone(); // Expensive!
}

// ✅ Good: Clone once, reuse
const baseConfig = template.deepClone();
for (let i = 0; i < 10000; i++) {
  process(baseConfig);
}
```

## Related Patterns

- **Factory Method**: Often used with Prototype registry for object creation
- **Builder**: Alternative for complex object construction
- **Abstract Factory**: Prototype can be used to provide prototype objects
- **Singleton**: Prototype can contain a Singleton instance

## Modern Alternatives

### Language Features

- **JavaScript/TypeScript**: `structuredClone()` API (deep copy without serialization)
- **Python**: `copy.deepcopy()` module
- **Java**: `clone()` interface, or use constructors
- **Rust**: `Clone` trait and `derive(Clone)`
- **Go**: Manual copy functions

### Frameworks

- **Serialization libraries**: Protocol Buffers, MessagePack
- **ORM frameworks**: Entity cloning built-in
- **Immutable data structures**: Automatically efficient copies
- **Copy-on-write**: Defer deep copy until modification

## Interview Insights

**Q1: What's the difference between shallow and deep copy?**

A: Shallow copy copies the object and primitive values, but references to nested objects remain shared. Deep copy recursively copies everything, including nested objects. Shallow is fast but dangerous with mutable fields; deep is safe but slower.

**Q2: When would you use Prototype over Factory?**

A: Prototype is best when object initialization is expensive. You pay the cost once creating the prototype, then clone cheaply. Factory is better for creating objects with simple construction.

**Q3: How do you handle circular references in cloning?**

A: Track visited objects using a Set/Map. When you encounter an already-visited object, return the reference instead of recursing. This prevents infinite loops.

**Q4: Is Prototype pattern still relevant in modern languages?**

A: Less so with modern features (named parameters, immutable structures, serialization libraries). But still valuable for performance-critical scenarios where initialization is expensive.

**Q5: How does Prototype relate to Object.create()?**

A: `Object.create()` in JavaScript creates an object with a specified prototype object. It's a language-level implementation of the Prototype pattern concept.

**Q6: What's the difference between Prototype and copy constructor?**

A: Both create copies, but Prototype is language-agnostic and can be polymorphic. Copy constructor is language-specific (C++, Java) and directly calls a special constructor.
