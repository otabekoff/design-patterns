---
title: Flyweight Pattern
description: Uses sharing to efficiently support large numbers of similar objects with minimal memory overhead
icon: Minimize2
---

# Flyweight Pattern

![Cover](/covers/structural/flyweight.png)

## Overview

The Flyweight Pattern is a structural design pattern that uses object sharing to support large numbers of similar objects efficiently. It externalizes the intrinsic (unchanging) state while keeping the extrinsic (changing) state separate, drastically reducing memory consumption.

## Purpose

- **Reduce memory consumption** when dealing with large numbers of similar objects
- **Share common state** between objects to minimize duplication
- **Improve performance** through efficient object reuse
- **Support large-scale applications** that would otherwise use excessive memory
- **Decouple object state** into intrinsic and extrinsic components

## Problem

Consider a text editor displaying a document with 100,000 characters. Each character might have properties like:

- Font type
- Font size
- Font color
- Font style (bold, italic)

Creating individual character objects, each holding all these properties, would consume massive amounts of memory. In a typical scenario:

- 1 character object = ~100 bytes
- 100,000 characters = 10 MB just for objects!

Most importantly, characters often share identical formatting. The letter 'a' in Arial 12pt might appear 5,000 times in the document, but they all have identical intrinsic state.

## Solution

The Flyweight Pattern provides a solution by:

1. **Identifying Intrinsic State**: Properties that don't change (font, size, color)
2. **Identifying Extrinsic State**: Properties that do change (position, content)
3. **Creating Flyweight Objects**: Immutable objects containing only intrinsic state
4. **Using a Flyweight Factory**: Reuses existing flyweights instead of creating new ones
5. **Managing Extrinsic State**: Storing separately or passing as context

## Implementation

::: code-group

```typescript [typescript]
// ========== Flyweight (Intrinsic State) ==========

interface CharacterFlyweight {
getFont(): string;
getSize(): number;
getColor(): string;
render(extrinsicState: CharacterContext): string;
}

class Character implements CharacterFlyweight {
constructor(
private font: string,
private size: number,
private color: string
) {}

getFont(): string {
return this.font;
}

getSize(): number {
return this.size;
}

getColor(): string {
return this.color;
}

render(extrinsicState: CharacterContext): string {
return `<span style="font: ${this.size}px ${this.font}; color: ${this.color}; position: ${extrinsicState.position};">${extrinsicState.character}</span>`;
}
}

// ========== Context (Extrinsic State) ==========

interface CharacterContext {
character: string;
position: number;
row: number;
column: number;
}

// ========== Flyweight Factory ==========

class CharacterFactory {
private flyweights: Map<string, Character> = new Map();

getCharacter(font: string, size: number, color: string): Character {
const key = `${font}_${size}_${color}`;

    // Return existing flyweight or create a new one
    if (!this.flyweights.has(key)) {
      console.log(`Creating new character flyweight: ${key}`);
      this.flyweights.set(key, new Character(font, size, color));
    } else {
      console.log(`Reusing character flyweight: ${key}`);
    }

    return this.flyweights.get(key)!;

}

getFlyweightCount(): number {
return this.flyweights.size;
}

displayFlyweights(): void {
console.log(`\nTotal unique flyweights: ${this.flyweights.size}`);
for (const [key] of this.flyweights) {
console.log(`  - ${key}`);
}
}
}

// ========== Document / Client ==========

class Document {
private characters: Array<{ flyweight: Character; context: CharacterContext }> =
[];
private factory: CharacterFactory;

constructor(factory: CharacterFactory) {
this.factory = factory;
}

addCharacter(char: string, font: string, size: number, color: string, row: number, col: number): void {
const flyweight = this.factory.getCharacter(font, size, color);
const context: CharacterContext = {
character: char,
position: row \* 100 + col,
row,
column: col,
};

    this.characters.push({ flyweight, context });

}

render(): string {
let html = '<div>';
for (const { flyweight, context } of this.characters) {
html += flyweight.render(context);
}
html += '</div>';
return html;
}

getCharacterCount(): number {
return this.characters.length;
}

displayMemoryOptimization(): void {
const totalObjects = this.characters.length;
const uniqueFlyweights = this.factory.getFlyweightCount();
const savings = totalObjects - uniqueFlyweights;
const savingsPercent = ((savings / totalObjects) \* 100).toFixed(2);

    console.log(`\n=== Memory Optimization ===`);
    console.log(`Total characters: ${totalObjects}`);
    console.log(`Unique flyweights: ${uniqueFlyweights}`);
    console.log(`Shared instances: ${savings} (${savingsPercent}% reduction)`);

}
}

// ========== Usage ==========

const factory = new CharacterFactory();
const document = new Document(factory);

// Add characters with various formatting
document.addCharacter('H', 'Arial', 12, 'black', 0, 0);
document.addCharacter('e', 'Arial', 12, 'black', 0, 1);
document.addCharacter('l', 'Arial', 12, 'black', 0, 2);
document.addCharacter('l', 'Arial', 12, 'black', 0, 3);
document.addCharacter('o', 'Arial', 12, 'black', 0, 4);

// Space with different formatting
document.addCharacter(' ', 'Arial', 12, 'black', 0, 5);

// Different formatting
document.addCharacter('W', 'Times', 14, 'blue', 0, 6);
document.addCharacter('o', 'Times', 14, 'blue', 0, 7);
document.addCharacter('r', 'Times', 14, 'blue', 0, 8);
document.addCharacter('l', 'Times', 14, 'blue', 0, 9);
document.addCharacter('d', 'Times', 14, 'blue', 0, 10);

// Add more Arial 12 black (reuses existing flyweight)
document.addCharacter('!', 'Arial', 12, 'black', 0, 11);

factory.displayFlyweights();
document.displayMemoryOptimization();

// ========== Real-world example: Game Particles ==========

interface ParticleFlyweight {
getTexture(): string;
getMass(): number;
render(context: ParticleContext): void;
}

class Particle implements ParticleFlyweight {
constructor(
private texture: string,
private mass: number
) {}

getTexture(): string {
return this.texture;
}

getMass(): number {
return this.mass;
}

render(context: ParticleContext): void {
const acceleration = 9.8 / this.mass;
console.log(
`Rendering particle: texture=${this.texture}, x=${context.x}, y=${context.y}, vx=${context.velocityX}, vy=${context.velocityY}`
);
}
}

interface ParticleContext {
x: number;
y: number;
velocityX: number;
velocityY: number;
lifetime: number;
}

class ParticleFactory {
private particles: Map<string, Particle> = new Map();

getParticle(texture: string, mass: number): Particle {
const key = `${texture}_${mass}`;

    if (!this.particles.has(key)) {
      console.log(`Creating particle flyweight: ${key}`);
      this.particles.set(key, new Particle(texture, mass));
    }

    return this.particles.get(key)!;

}

getPoolSize(): number {
return this.particles.size;
}
}

class ParticleSystem {
private particles: Array<{ flyweight: Particle; context: ParticleContext }> = [];
private factory: ParticleFactory;

constructor(factory: ParticleFactory) {
this.factory = factory;
}

emitExplosion(x: number, y: number, count: number): void {
console.log(`\nEmitting ${count} particles at (${x}, ${y})`);

    for (let i = 0; i < count; i++) {
      const texture = i % 3 === 0 ? 'spark.png' : 'smoke.png';
      const mass = i % 2 === 0 ? 1 : 0.5;

      const flyweight = this.factory.getParticle(texture, mass);
      const context: ParticleContext = {
        x: x + Math.random() * 10,
        y: y + Math.random() * 10,
        velocityX: (Math.random() - 0.5) * 5,
        velocityY: (Math.random() - 0.5) * 5,
        lifetime: 2,
      };

      this.particles.push({ flyweight, context });
    }

}

render(): void {
console.log(`\nRendering ${this.particles.length} particles`);
for (const { flyweight, context } of this.particles) {
flyweight.render(context);
}
}

getStatistics(): void {
console.log(`\n=== Particle System Statistics ===`);
console.log(`Total active particles: ${this.particles.length}`);
console.log(`Unique particle types: ${this.factory.getPoolSize()}`);
}
}

// ========== Game Usage ==========

const particleFactory = new ParticleFactory();
const particleSystem = new ParticleSystem(particleFactory);

// Create explosions
particleSystem.emitExplosion(100, 100, 1000);
particleSystem.emitExplosion(200, 200, 1000);

particleSystem.render();
particleSystem.getStatistics();
```

  
```python [python]
from abc import ABC, abstractmethod
from typing import Dict, Optional

# ========== Flyweight (Intrinsic State) ==========

class CharacterFlyweight(ABC):
    @abstractmethod
    def get_font(self) -> str:
        pass

    @abstractmethod
    def get_size(self) -> int:
        pass

    @abstractmethod
    def get_color(self) -> str:
        pass

    @abstractmethod
    def render(self, extrinsic_state: 'CharacterContext') -> str:
        pass

class Character(CharacterFlyweight):
    def __init__(self, font: str, size: int, color: str):
        self._font = font
        self._size = size
        self._color = color

    def get_font(self) -> str:
        return self._font

    def get_size(self) -> int:
        return self._size

    def get_color(self) -> str:
        return self._color

    def render(self, extrinsic_state: 'CharacterContext') -> str:
        return f'<span style="font: {self._size}px {self._font}; color: {self._color}; position: {extrinsic_state.position};">{extrinsic_state.character}</span>'

# ========== Context (Extrinsic State) ==========

class CharacterContext:
    def __init__(self, character: str, position: int, row: int, column: int):
        self.character = character
        self.position = position
        self.row = row
        self.column = column

# ========== Flyweight Factory ==========

class CharacterFactory:
    def __init__(self):
        self._flyweights: Dict[str, Character] = {}

    def get_character(self, font: str, size: int, color: str) -> Character:
        key = f"{font}_{size}_{color}"

        if key not in self._flyweights:
            print(f"Creating new character flyweight: {key}")
            self._flyweights[key] = Character(font, size, color)
        else:
            print(f"Reusing character flyweight: {key}")

        return self._flyweights[key]

    def get_flyweight_count(self) -> int:
        return len(self._flyweights)

    def display_flyweights(self) -> None:
        print(f"\nTotal unique flyweights: {len(self._flyweights)}")
        for key in self._flyweights:
            print(f"  - {key}")

# ========== Document / Client ==========

class Document:
    def __init__(self, factory: CharacterFactory):
        self._characters = []
        self._factory = factory

    def add_character(self, char: str, font: str, size: int, color: str, row: int, col: int) -> None:
        flyweight = self._factory.get_character(font, size, color)
        context = CharacterContext(
            character=char,
            position=row * 100 + col,
            row=row,
            column=col
        )
        self._characters.append({'flyweight': flyweight, 'context': context})

    def render(self) -> str:
        html = '<div>'
        for item in self._characters:
            html += item['flyweight'].render(item['context'])
        html += '</div>'
        return html

    def get_character_count(self) -> int:
        return len(self._characters)

    def display_memory_optimization(self) -> None:
        total_objects = len(self._characters)
        unique_flyweights = self._factory.get_flyweight_count()
        savings = total_objects - unique_flyweights
        savings_percent = (savings / total_objects * 100) if total_objects > 0 else 0

        print(f"\n=== Memory Optimization ===")
        print(f"Total characters: {total_objects}")
        print(f"Unique flyweights: {unique_flyweights}")
        print(f"Shared instances: {savings} ({savings_percent:.2f}% reduction)")

# ========== Usage ==========

factory = CharacterFactory()
document = Document(factory)

# Add characters with various formatting
document.add_character('H', 'Arial', 12, 'black', 0, 0)
document.add_character('e', 'Arial', 12, 'black', 0, 1)
document.add_character('l', 'Arial', 12, 'black', 0, 2)
document.add_character('l', 'Arial', 12, 'black', 0, 3)
document.add_character('o', 'Arial', 12, 'black', 0, 4)

# Space with different formatting
document.add_character(' ', 'Arial', 12, 'black', 0, 5)

# Different formatting
document.add_character('W', 'Times', 14, 'blue', 0, 6)
document.add_character('o', 'Times', 14, 'blue', 0, 7)
document.add_character('r', 'Times', 14, 'blue', 0, 8)
document.add_character('l', 'Times', 14, 'blue', 0, 9)
document.add_character('d', 'Times', 14, 'blue', 0, 10)

# Add more Arial 12 black (reuses existing flyweight)
document.add_character('!', 'Arial', 12, 'black', 0, 11)

factory.display_flyweights()
document.display_memory_optimization()

# ========== Real-world example: Game Particles ==========

class ParticleFlyweight(ABC):
    @abstractmethod
    def get_texture(self) -> str:
        pass

    @abstractmethod
    def get_mass(self) -> float:
        pass

    @abstractmethod
    def render(self, context: 'ParticleContext') -> None:
        pass

class Particle(ParticleFlyweight):
    def __init__(self, texture: str, mass: float):
        self._texture = texture
        self._mass = mass

    def get_texture(self) -> str:
        return self._texture

    def get_mass(self) -> float:
        return self._mass

    def render(self, context: 'ParticleContext') -> None:
        acceleration = 9.8 / self._mass
        print(
            f"Rendering particle: texture={self._texture}, x={context.x}, y={context.y}, "
            f"vx={context.velocity_x}, vy={context.velocity_y}"
        )

class ParticleContext:
    def __init__(self, x: float, y: float, velocity_x: float, velocity_y: float, lifetime: float):
        self.x = x
        self.y = y
        self.velocity_x = velocity_x
        self.velocity_y = velocity_y
        self.lifetime = lifetime

class ParticleFactory:
    def __init__(self):
        self._particles: Dict[str, Particle] = {}

    def get_particle(self, texture: str, mass: float) -> Particle:
        key = f"{texture}_{mass}"

        if key not in self._particles:
            print(f"Creating particle flyweight: {key}")
            self._particles[key] = Particle(texture, mass)

        return self._particles[key]

    def get_pool_size(self) -> int:
        return len(self._particles)

class ParticleSystem:
    def __init__(self, factory: ParticleFactory):
        self._particles = []
        self._factory = factory

    def emit_explosion(self, x: float, y: float, count: int) -> None:
        print(f"\nEmitting {count} particles at ({x}, {y})")

        for i in range(count):
            texture = 'spark.png' if i % 3 == 0 else 'smoke.png'
            mass = 1 if i % 2 == 0 else 0.5

            flyweight = self._factory.get_particle(texture, mass)
            import random
            context = ParticleContext(
                x=x + random.random() * 10,
                y=y + random.random() * 10,
                velocity_x=(random.random() - 0.5) * 5,
                velocity_y=(random.random() - 0.5) * 5,
                lifetime=2
            )

            self._particles.append({'flyweight': flyweight, 'context': context})

    def render(self) -> None:
        print(f"\nRendering {len(self._particles)} particles")
        for item in self._particles[:5]:  # Show first 5 for brevity
            item['flyweight'].render(item['context'])
        if len(self._particles) > 5:
            print(f"... and {len(self._particles) - 5} more particles")

    def get_statistics(self) -> None:
        print(f"\n=== Particle System Statistics ===")
        print(f"Total active particles: {len(self._particles)}")
        print(f"Unique particle types: {self._factory.get_pool_size()}")

# ========== Game Usage ==========

particle_factory = ParticleFactory()
particle_system = ParticleSystem(particle_factory)

# Create explosions
particle_system.emit_explosion(100, 100, 1000)
particle_system.emit_explosion(200, 200, 1000)

particle_system.render()
particle_system.get_statistics()
```

:::

## Real-World Example

**Game Development - Tree Forest**: Imagine a game rendering a forest with 100,000 trees. Each tree has:

**Intrinsic State** (shared):

- Model geometry
- Texture
- Shader program
- Animation data

**Extrinsic State** (unique):

- Position (x, y, z)
- Scale
- Rotation
- Animation frame

Using Flyweight Pattern, you might have:

- 5 different tree models
- 100,000 instances with different positions

Instead of storing 100,000 complete tree objects (potentially 500+ MB), you store 5 models and 100,000 position/rotation sets (much smaller).

## Advantages

::: tip
✅ **Dramatically Reduces Memory**: Share identical intrinsic state across objects

✅ **Improves Performance**: Fewer objects to allocate, track, and garbage collect

✅ **Scales to Large Numbers**: Handle millions of objects that would be impractical otherwise

✅ **Transparent to Clients**: Works without changing client code

✅ **Separates Concerns**: Clear distinction between intrinsic and extrinsic state

✅ **Promotes Reusability**: Flyweights are naturally reusable

✅ **Factory Pattern Integration**: Works well with factory for object management
:::

## Disadvantages

::: warning
❌ **Increased Complexity**: Complex state management and separation

❌ **Thread Safety Issues**: Shared flyweights must be thread-safe

❌ **Performance Tradeoff**: Lookup overhead might offset memory savings for small numbers

❌ **Not Always Applicable**: Requires identifying shareable vs. contextual state

❌ **Difficult Debugging**: Shared state can make debugging complex

❌ **Mutability Issues**: Flyweights should be immutable; mutable shared objects are dangerous

❌ **Learning Curve**: Developers must understand intrinsic vs. extrinsic state concepts
:::

## When to Use

- You have many similar objects consuming significant memory
- Memory optimization is critical for your application
- Most of the object state can be shared (intrinsic)
- You need to support large-scale simulations or games
- Objects are immutable or rarely change
- Extrinsic state can be computed or stored separately
- You have clearly identifiable patterns in object similarities

## When NOT to Use

- You have only a few objects (memory optimization unnecessary)
- Objects are frequently mutable
- Extrinsic state is complex and cumbersome to manage
- Thread safety concerns around shared objects
- Performance profiling shows this isn't actually the bottleneck
- The pattern makes code significantly more complex without clear benefit
- Objects have mostly unique state with little to share

## Related Patterns

- **Factory Pattern**: Flyweight Factory creates and manages flyweight instances
- **Object Pool Pattern**: Similar goal of reusing objects, but Flyweight focuses on memory optimization
- **Composite Pattern**: Can use Flyweights for leaf nodes to save memory
- **Iterator Pattern**: Used to traverse collections of flyweights
- **Strategy Pattern**: Can use Flyweights to store strategy instances
- **Template Method Pattern**: Flyweight can implement template methods for shared behavior
