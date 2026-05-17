---
title: Flyweight Pattern
description: Uses sharing to efficiently support large numbers of similar objects with minimal memory overhead.
icon: Minimize2
---

![Flyweight Concept](/images/patterns/flyweight-mini.png)

# Flyweight Pattern

## Overview

The **Flyweight** pattern is a structural design pattern that reduces memory usage by sharing common object state across many instances. Instead of storing everything in each object, Flyweight splits state into:

- **Intrinsic state**: shared, stable, reusable data
- **Extrinsic state**: context-specific data passed in when needed

**Key advantage**: It makes massive collections of similar objects practical by sharing the expensive, repeated part.

**Modern perspective**: Flyweight is still important in graphics engines, text rendering, games, and high-volume UI systems. Any workload that creates many similar objects benefits from shared immutable state.

Flyweight is not about controlling access. It is about sharing data efficiently.

## Real-World Analogy

Think of a **font glyph library**. The shape of the letter `A` in a given font and size is shared. Every place that uses that glyph does not need a brand-new copy of the shape. Only its position, color, and line context change.

That is Flyweight in practice: one shared shape, many placements.

## The Problem

Imagine a game that renders 100,000 particles, or a document editor that renders hundreds of thousands of styled characters. If each object stores all of its formatting or mesh data independently, memory usage balloons quickly.

### Problem Example

```typescript
// ❌ Bad: every particle stores identical texture metadata
class Particle {
  constructor(
    public texture: string,
    public width: number,
    public height: number,
    public color: string,
    public x: number,
    public y: number,
  ) {}
}
```

If thousands of particles share the same texture and dimensions, that repeated data should not be duplicated in every object.

## The Solution

Flyweight solves this by:

1. Identifying the shared part of the object state
2. Storing that shared state in immutable flyweight objects
3. Keeping changing context outside the flyweight
4. Reusing flyweights through a factory or cache
5. Passing extrinsic state when rendering or processing

## Implementation

::: code-group

```typescript [typescript]
interface SpriteFlyweight {
  render(x: number, y: number, color: string): void;
}

class Sprite implements SpriteFlyweight {
  constructor(
    private readonly texture: string,
    private readonly width: number,
    private readonly height: number,
  ) {}

  render(x: number, y: number, color: string): void {
    console.log(
      `Rendering ${this.texture} at (${x}, ${y}) with ${this.width}x${this.height} and color ${color}`,
    );
  }
}

class SpriteFactory {
  private readonly sprites = new Map<string, Sprite>();

  getSprite(texture: string, width: number, height: number): Sprite {
    const key = `${texture}:${width}:${height}`;
    const existing = this.sprites.get(key);
    if (existing) {
      return existing;
    }

    const sprite = new Sprite(texture, width, height);
    this.sprites.set(key, sprite);
    return sprite;
  }

  count(): number {
    return this.sprites.size;
  }
}

interface ParticleContext {
  x: number;
  y: number;
  color: string;
  velocityX: number;
  velocityY: number;
}

class Particle {
  constructor(
    private readonly sprite: SpriteFlyweight,
    private readonly context: ParticleContext,
  ) {}

  draw(): void {
    this.sprite.render(this.context.x, this.context.y, this.context.color);
  }
}

class ParticleSystem {
  private readonly particles: Particle[] = [];

  constructor(private readonly factory: SpriteFactory) {}

  emit(
    texture: string,
    width: number,
    height: number,
    context: ParticleContext,
  ): void {
    const sprite = this.factory.getSprite(texture, width, height);
    this.particles.push(new Particle(sprite, context));
  }

  renderAll(): void {
    for (const particle of this.particles) {
      particle.draw();
    }
  }
}

const factory = new SpriteFactory();
const system = new ParticleSystem(factory);

for (let i = 0; i < 3; i++) {
  system.emit("spark.png", 32, 32, {
    x: 100 + i * 5,
    y: 200 + i * 3,
    color: "orange",
    velocityX: 1.5,
    velocityY: -0.2,
  });
}

system.emit("smoke.png", 64, 64, {
  x: 140,
  y: 240,
  color: "gray",
  velocityX: 0.2,
  velocityY: 0.8,
});

system.renderAll();
console.log(`Unique flyweights: ${factory.count()}`);
```

```python [python]
from abc import ABC, abstractmethod


class SpriteFlyweight(ABC):
    @abstractmethod
    def render(self, x: int, y: int, color: str) -> None:
        pass


class Sprite(SpriteFlyweight):
    def __init__(self, texture: str, width: int, height: int):
        self._texture = texture
        self._width = width
        self._height = height

    def render(self, x: int, y: int, color: str) -> None:
        print(
            f"Rendering {self._texture} at ({x}, {y}) with {self._width}x{self._height} and color {color}"
        )


class SpriteFactory:
    def __init__(self):
        self._sprites = {}

    def get_sprite(self, texture: str, width: int, height: int) -> Sprite:
        key = f"{texture}:{width}:{height}"
        if key not in self._sprites:
            self._sprites[key] = Sprite(texture, width, height)
        return self._sprites[key]

    def count(self) -> int:
        return len(self._sprites)


class Particle:
    def __init__(self, sprite: SpriteFlyweight, context):
        self._sprite = sprite
        self._context = context

    def draw(self) -> None:
        self._sprite.render(self._context["x"], self._context["y"], self._context["color"])


class ParticleSystem:
    def __init__(self, factory: SpriteFactory):
        self._factory = factory
        self._particles = []

    def emit(self, texture: str, width: int, height: int, context: dict) -> None:
        sprite = self._factory.get_sprite(texture, width, height)
        self._particles.append(Particle(sprite, context))

    def render_all(self) -> None:
        for particle in self._particles:
            particle.draw()


factory = SpriteFactory()
system = ParticleSystem(factory)

for i in range(3):
    system.emit(
        "spark.png",
        32,
        32,
        {"x": 100 + i * 5, "y": 200 + i * 3, "color": "orange", "velocity_x": 1.5, "velocity_y": -0.2},
    )

system.emit(
    "smoke.png",
    64,
    64,
    {"x": 140, "y": 240, "color": "gray", "velocity_x": 0.2, "velocity_y": 0.8},
)

system.render_all()
print(f"Unique flyweights: {factory.count()}")
```

```java [java]
interface SpriteFlyweight {
    void render(int x, int y, String color);
}

class Sprite implements SpriteFlyweight {
    private final String texture;
    private final int width;
    private final int height;

    Sprite(String texture, int width, int height) {
        this.texture = texture;
        this.width = width;
        this.height = height;
    }

    @Override
    public void render(int x, int y, String color) {
        System.out.println(
            "Rendering " + texture + " at (" + x + ", " + y + ") with " + width + "x" + height + " and color " + color
        );
    }
}

class SpriteFactory {
    private final java.util.Map<String, Sprite> sprites = new java.util.HashMap<>();

    Sprite getSprite(String texture, int width, int height) {
        String key = texture + ":" + width + ":" + height;
        return sprites.computeIfAbsent(key, ignored -> new Sprite(texture, width, height));
    }

    int count() {
        return sprites.size();
    }
}

class Particle {
    private final SpriteFlyweight sprite;
    private final int x;
    private final int y;
    private final String color;

    Particle(SpriteFlyweight sprite, int x, int y, String color) {
        this.sprite = sprite;
        this.x = x;
        this.y = y;
        this.color = color;
    }

    void draw() {
        sprite.render(x, y, color);
    }
}

class ParticleSystem {
    private final java.util.List<Particle> particles = new java.util.ArrayList<>();
    private final SpriteFactory factory;

    ParticleSystem(SpriteFactory factory) {
        this.factory = factory;
    }

    void emit(String texture, int width, int height, int x, int y, String color) {
        particles.add(new Particle(factory.getSprite(texture, width, height), x, y, color));
    }

    void renderAll() {
        for (Particle particle : particles) {
            particle.draw();
        }
    }
}
```

```go [go]
package main

import "fmt"

type SpriteFlyweight interface {
	Render(x, y int, color string)
}

type Sprite struct {
	texture string
	width   int
	height  int
}

func (s *Sprite) Render(x, y int, color string) {
	fmt.Printf("Rendering %s at (%d, %d) with %dx%d and color %s\n", s.texture, x, y, s.width, s.height, color)
}

type SpriteFactory struct {
	sprites map[string]*Sprite
}

func NewSpriteFactory() *SpriteFactory {
	return &SpriteFactory{sprites: make(map[string]*Sprite)}
}

func (f *SpriteFactory) GetSprite(texture string, width, height int) *Sprite {
	key := fmt.Sprintf("%s:%d:%d", texture, width, height)
	if sprite, ok := f.sprites[key]; ok {
		return sprite
	}
	created := &Sprite{texture: texture, width: width, height: height}
	f.sprites[key] = created
	return created
}

type Particle struct {
	sprite SpriteFlyweight
	x      int
	y      int
	color  string
}

func (p *Particle) Draw() {
	p.sprite.Render(p.x, p.y, p.color)
}

type ParticleSystem struct {
	factory   *SpriteFactory
	particles []*Particle
}

func NewParticleSystem(factory *SpriteFactory) *ParticleSystem {
	return &ParticleSystem{factory: factory}
}

func (s *ParticleSystem) Emit(texture string, width, height, x, y int, color string) {
	sprite := s.factory.GetSprite(texture, width, height)
	s.particles = append(s.particles, &Particle{sprite: sprite, x: x, y: y, color: color})
}

func (s *ParticleSystem) RenderAll() {
	for _, particle := range s.particles {
		particle.Draw()
	}
}
```

```rust [rust]
use std::collections::HashMap;
use std::sync::Arc;

trait SpriteFlyweight {
  fn render(&self, x: i32, y: i32, color: &str);
}

struct Sprite {
  texture: String,
  width: i32,
  height: i32,
}

impl SpriteFlyweight for Sprite {
  fn render(&self, x: i32, y: i32, color: &str) {
    println!(
      "Rendering {} at ({}, {}) with {}x{} and color {}",
      self.texture, x, y, self.width, self.height, color
    );
  }
}

struct SpriteFactory {
  sprites: HashMap<String, Arc<Sprite>>,
}

impl SpriteFactory {
  fn new() -> Self {
    Self {
      sprites: HashMap::new(),
    }
  }

  fn get_sprite(&mut self, texture: &str, width: i32, height: i32) -> Arc<Sprite> {
    let key = format!("{}:{}:{}", texture, width, height);
    self.sprites
      .entry(key)
      .or_insert_with(|| {
        Arc::new(Sprite {
          texture: texture.to_string(),
          width,
          height,
        })
      })
      .clone()
  }

  fn count(&self) -> usize {
    self.sprites.len()
  }
}

struct Particle {
  sprite: Arc<Sprite>,
  x: i32,
  y: i32,
  color: String,
}

impl Particle {
  fn draw(&self) {
    self.sprite.render(self.x, self.y, &self.color);
  }
}

struct ParticleSystem {
  particles: Vec<Particle>,
}

impl ParticleSystem {
  fn new() -> Self {
    Self { particles: Vec::new() }
  }

  fn emit(&mut self, sprite: Arc<Sprite>, x: i32, y: i32, color: String) {
    self.particles.push(Particle { sprite, x, y, color });
  }

  fn render_all(&self) {
    for particle in &self.particles {
      particle.draw();
    }
  }
}

fn main() {
  let mut factory = SpriteFactory::new();
  let mut system = ParticleSystem::new();

  let spark = factory.get_sprite("spark.png", 32, 32);
  let smoke = factory.get_sprite("smoke.png", 64, 64);

  system.emit(spark.clone(), 100, 200, "orange".to_string());
  system.emit(spark.clone(), 110, 210, "orange".to_string());
  system.emit(smoke.clone(), 140, 240, "gray".to_string());

  system.render_all();
  println!("Unique flyweights: {}", factory.count());
}
```

:::

## Real-World Example

A sprite system is a good fit for Flyweight because many instances share the same texture metadata while differing in position, tint, or velocity. The shared sprite data stays in the factory, and the particle or entity keeps only the context.

That makes large scenes much more memory efficient.

```typescript
const factory = new SpriteFactory();
const system = new ParticleSystem(factory);

system.emit("spark.png", 32, 32, {
  x: 100,
  y: 200,
  color: "orange",
  velocityX: 1.5,
  velocityY: -0.2,
});
system.emit("spark.png", 32, 32, {
  x: 110,
  y: 210,
  color: "orange",
  velocityX: 1.2,
  velocityY: -0.1,
});
```

## Advantages

- Reduces memory usage for large object sets
- Centralizes shared immutable state
- Improves cache locality for repeated data
- Makes large collections more practical
- Encourages separation of shared and contextual data
- Works well for rendering and simulation workloads

## Disadvantages

- Adds complexity by splitting state into two parts
- Makes APIs less convenient if overused
- Requires a factory or cache layer
- Can be awkward when extrinsic state is large
- Debugging shared state can take extra care

## When to Use

- You have huge numbers of similar objects
- Most state can be shared safely
- The varying part can be passed in as context
- Memory usage is a real concern
- You are building graphics, text rendering, or simulation systems

## When NOT to Use

- Objects are few and cheap to create
- Most state is unique per object
- The context is more complex than the shared state
- Simplicity matters more than memory savings
- The sharing logic would be harder to maintain than the savings justify

## Common Mistakes

### Mistake 1: Putting extrinsic state into the flyweight

```typescript
// ❌ Bad: every sprite stores x and y
class BadSprite {
  constructor(
    public x: number,
    public y: number,
  ) {}
}

// ✅ Good: position belongs in context, not the shared object
```

### Mistake 2: Failing to reuse flyweights

```typescript
// ❌ Bad: always create a new sprite
const sprite = new Sprite("spark.png", 32, 32);

// ✅ Good: ask the factory for shared instances
```

### Mistake 3: Making flyweights mutable

```typescript
// ❌ Bad: shared state can be corrupted
class BadFlyweight {
  setTexture(texture: string) {}
}

// ✅ Good: keep flyweights immutable
```

### Mistake 4: Using Flyweight when objects are not repetitive

```typescript
// ❌ Bad: apply sharing when every object is unique
// ✅ Good: reserve it for high-volume repeated shapes
```

## Related Patterns

- **Factory Method**: Often used to create or retrieve flyweights
- **Singleton**: Flyweight factories are sometimes singletons
- **Composite**: Can hold flyweights in tree-like structures
- **Proxy**: Similar wrapper shape, but different intent

## Modern Alternatives

- Immutable value objects with structural sharing
- Engine-level resource caches
- GPU instancing in graphics systems
- Deduplicated text/glyph buffers
- Arena allocators or object pools in performance-sensitive systems

## Interview Insights

**Q1: What is the core idea of Flyweight?**

A: Share intrinsic state across many similar objects and keep extrinsic state outside the object.

**Q2: What is the difference between intrinsic and extrinsic state?**

A: Intrinsic state is shared and stable. Extrinsic state changes per use and is passed in as context.

**Q3: When is Flyweight worth the complexity?**

A: When you have many repeated objects and memory pressure is significant.

**Q4: Why should flyweights be immutable?**

A: Because they are shared. If one caller mutates them, every other caller sees the change.

**Q5: How is Flyweight different from Object Pool?**

A: Object Pool reuses whole objects for lifecycle and performance reasons. Flyweight shares the stable part of the state across many logical objects.
