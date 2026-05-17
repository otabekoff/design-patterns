---
title: Bridge Pattern
description: Decouples an abstraction from its implementation so the two can vary independently.
icon: Layers
---

![Bridge Concept](/images/patterns/bridge-mini.png)

# Bridge Pattern

## Overview

The **Bridge** pattern is a structural design pattern that separates an abstraction from its implementation so both can evolve independently. Instead of baking every implementation choice into the class hierarchy, Bridge keeps the abstraction stable and delegates work to an implementation object.

**Key advantage**: It prevents class explosion when you have two or more dimensions of variation.

**Modern perspective**: Bridge remains useful whenever a system has an interface that should stay stable while the execution backend, rendering engine, storage layer, or platform-specific behavior can change independently.

The difference from Adapter is subtle but important: Adapter fixes an existing incompatibility, while Bridge is designed into the system from the start.

## Real-World Analogy

Think of a **remote control and a television**. The remote is the abstraction. The TV is the implementation. You can replace the TV with a different brand or type without redesigning the remote, as long as the bridge contract stays the same.

The remote does not care whether the device is a TV, speaker, or projector. It only knows how to talk to a device interface.

## The Problem

Imagine a graphics library that needs to support many shapes and many rendering engines:

- Shapes: Circle, Rectangle, Triangle, Polygon
- Renderers: SVG, Canvas, WebGL, PDF

Without Bridge, you end up with classes like:

- SvgCircle, CanvasCircle, WebGlCircle, PdfCircle
- SvgRectangle, CanvasRectangle, WebGlRectangle, PdfRectangle

That creates a multiplication problem. If you add one shape, you must add one version for every renderer. If you add one renderer, you must add one version for every shape.

### Problem Example

```typescript
// ❌ Bad: hierarchy explosion
class SvgCircle {}
class CanvasCircle {}
class WebGlCircle {}
class PdfCircle {}

class SvgRectangle {}
class CanvasRectangle {}
class WebGlRectangle {}
class PdfRectangle {}
```

This structure is hard to extend and difficult to maintain.

## The Solution

Bridge solves this by splitting the problem into two hierarchies:

1. **Abstraction**: the shape, UI component, or business concept that clients use
2. **Implementation**: the renderer, persistence layer, driver, or platform-specific executor

The abstraction stores a reference to an implementation and delegates the work.

```typescript
// Abstraction
abstract class Shape {
  constructor(protected renderer: Renderer) {}
  abstract draw(): void;
}

// Implementation
interface Renderer {
  renderCircle(radius: number): void;
  renderRectangle(width: number, height: number): void;
}
```

## Implementation

::: code-group

```typescript [typescript]
interface Renderer {
  renderCircle(radius: number): void;
  renderRectangle(width: number, height: number): void;
}

class SvgRenderer implements Renderer {
  renderCircle(radius: number): void {
    console.log(`SVG circle with radius ${radius}`);
  }

  renderRectangle(width: number, height: number): void {
    console.log(`SVG rectangle ${width}x${height}`);
  }
}

class CanvasRenderer implements Renderer {
  renderCircle(radius: number): void {
    console.log(`Canvas circle with radius ${radius}`);
  }

  renderRectangle(width: number, height: number): void {
    console.log(`Canvas rectangle ${width}x${height}`);
  }
}

abstract class Shape {
  constructor(protected readonly renderer: Renderer) {}
  abstract draw(): void;
}

class Circle extends Shape {
  constructor(
    private readonly radius: number,
    renderer: Renderer,
  ) {
    super(renderer);
  }

  draw(): void {
    this.renderer.renderCircle(this.radius);
  }
}

class Rectangle extends Shape {
  constructor(
    private readonly width: number,
    private readonly height: number,
    renderer: Renderer,
  ) {
    super(renderer);
  }

  draw(): void {
    this.renderer.renderRectangle(this.width, this.height);
  }
}

const circle = new Circle(10, new SvgRenderer());
const rectangle = new Rectangle(20, 12, new CanvasRenderer());

circle.draw();
rectangle.draw();
```

```python [python]
from abc import ABC, abstractmethod


class Renderer(ABC):
    @abstractmethod
    def render_circle(self, radius: float) -> None:
        pass

    @abstractmethod
    def render_rectangle(self, width: float, height: float) -> None:
        pass


class SvgRenderer(Renderer):
    def render_circle(self, radius: float) -> None:
        print(f"SVG circle with radius {radius}")

    def render_rectangle(self, width: float, height: float) -> None:
        print(f"SVG rectangle {width}x{height}")


class CanvasRenderer(Renderer):
    def render_circle(self, radius: float) -> None:
        print(f"Canvas circle with radius {radius}")

    def render_rectangle(self, width: float, height: float) -> None:
        print(f"Canvas rectangle {width}x{height}")


class Shape(ABC):
    def __init__(self, renderer: Renderer):
        self._renderer = renderer

    @abstractmethod
    def draw(self) -> None:
        pass


class Circle(Shape):
    def __init__(self, radius: float, renderer: Renderer):
        super().__init__(renderer)
        self._radius = radius

    def draw(self) -> None:
        self._renderer.render_circle(self._radius)


class Rectangle(Shape):
    def __init__(self, width: float, height: float, renderer: Renderer):
        super().__init__(renderer)
        self._width = width
        self._height = height

    def draw(self) -> None:
        self._renderer.render_rectangle(self._width, self._height)


circle = Circle(10, SvgRenderer())
rectangle = Rectangle(20, 12, CanvasRenderer())

circle.draw()
rectangle.draw()
```

```java [java]
interface Renderer {
    void renderCircle(double radius);
    void renderRectangle(double width, double height);
}

class SvgRenderer implements Renderer {
    @Override
    public void renderCircle(double radius) {
        System.out.println("SVG circle with radius " + radius);
    }

    @Override
    public void renderRectangle(double width, double height) {
        System.out.println("SVG rectangle " + width + "x" + height);
    }
}

class CanvasRenderer implements Renderer {
    @Override
    public void renderCircle(double radius) {
        System.out.println("Canvas circle with radius " + radius);
    }

    @Override
    public void renderRectangle(double width, double height) {
        System.out.println("Canvas rectangle " + width + "x" + height);
    }
}

abstract class Shape {
    protected final Renderer renderer;

    protected Shape(Renderer renderer) {
        this.renderer = renderer;
    }

    public abstract void draw();
}

class Circle extends Shape {
    private final double radius;

    public Circle(double radius, Renderer renderer) {
        super(renderer);
        this.radius = radius;
    }

    @Override
    public void draw() {
        renderer.renderCircle(radius);
    }
}

class Rectangle extends Shape {
    private final double width;
    private final double height;

    public Rectangle(double width, double height, Renderer renderer) {
        super(renderer);
        this.width = width;
        this.height = height;
    }

    @Override
    public void draw() {
        renderer.renderRectangle(width, height);
    }
}
```

```go [go]
package main

import "fmt"

type Renderer interface {
	RenderCircle(radius float64)
	RenderRectangle(width, height float64)
}

type SvgRenderer struct{}

func (r *SvgRenderer) RenderCircle(radius float64) {
	fmt.Printf("SVG circle with radius %.1f\n", radius)
}

func (r *SvgRenderer) RenderRectangle(width, height float64) {
	fmt.Printf("SVG rectangle %.1fx%.1f\n", width, height)
}

type CanvasRenderer struct{}

func (r *CanvasRenderer) RenderCircle(radius float64) {
	fmt.Printf("Canvas circle with radius %.1f\n", radius)
}

func (r *CanvasRenderer) RenderRectangle(width, height float64) {
	fmt.Printf("Canvas rectangle %.1fx%.1f\n", width, height)
}

type Shape interface {
	Draw()
}

type Circle struct {
	renderer Renderer
	radius   float64
}

func NewCircle(radius float64, renderer Renderer) *Circle {
	return &Circle{radius: radius, renderer: renderer}
}

func (c *Circle) Draw() {
	c.renderer.RenderCircle(c.radius)
}

type Rectangle struct {
	renderer Renderer
	width     float64
	height    float64
}

func NewRectangle(width, height float64, renderer Renderer) *Rectangle {
	return &Rectangle{width: width, height: height, renderer: renderer}
}

func (r *Rectangle) Draw() {
	r.renderer.RenderRectangle(r.width, r.height)
}
```

```rust [rust]
trait Renderer {
    fn render_circle(&self, radius: f64);
    fn render_rectangle(&self, width: f64, height: f64);
}

struct SvgRenderer;

impl Renderer for SvgRenderer {
    fn render_circle(&self, radius: f64) {
        println!("SVG circle with radius {}", radius);
    }

    fn render_rectangle(&self, width: f64, height: f64) {
        println!("SVG rectangle {}x{}", width, height);
    }
}

struct CanvasRenderer;

impl Renderer for CanvasRenderer {
    fn render_circle(&self, radius: f64) {
        println!("Canvas circle with radius {}", radius);
    }

    fn render_rectangle(&self, width: f64, height: f64) {
        println!("Canvas rectangle {}x{}", width, height);
    }
}

trait Shape {
    fn draw(&self);
}

struct Circle<'a> {
    renderer: &'a dyn Renderer,
    radius: f64,
}

impl<'a> Circle<'a> {
    fn new(radius: f64, renderer: &'a dyn Renderer) -> Self {
        Self { renderer, radius }
    }
}

impl<'a> Shape for Circle<'a> {
    fn draw(&self) {
        self.renderer.render_circle(self.radius);
    }
}

struct Rectangle<'a> {
    renderer: &'a dyn Renderer,
    width: f64,
    height: f64,
}

impl<'a> Rectangle<'a> {
    fn new(width: f64, height: f64, renderer: &'a dyn Renderer) -> Self {
        Self { renderer, width, height }
    }
}

impl<'a> Shape for Rectangle<'a> {
    fn draw(&self) {
        self.renderer.render_rectangle(self.width, self.height);
    }
}
```

:::

## Real-World Example

A practical bridge appears in UI toolkits. The abstraction is a component such as a button, modal, or chart. The implementation is the rendering backend: DOM, Canvas, native mobile controls, or PDF output.

The same button abstraction can be used in a browser app, a desktop app, or a report generator by swapping the implementation layer. That keeps the higher-level API stable while letting the renderer vary.

```typescript
interface ThemeRenderer {
  drawButton(label: string, primary: boolean): void;
  drawInput(placeholder: string): void;
}

abstract class UIComponent {
  constructor(protected renderer: ThemeRenderer) {}
}

class Button extends UIComponent {
  constructor(
    private label: string,
    private primary: boolean,
    renderer: ThemeRenderer,
  ) {
    super(renderer);
  }

  render(): void {
    this.renderer.drawButton(this.label, this.primary);
  }
}
```

This is useful because the component API does not need to know whether it is rendered in a browser, on iOS, in a PDF, or in a terminal UI.

## Advantages

- Avoids class hierarchy explosion
- Lets abstraction and implementation evolve independently
- Keeps platform-specific details isolated
- Makes the abstraction easier to test
- Supports multiple backends without duplicating the abstraction
- Encourages composition over inheritance

## Disadvantages

- Adds another layer of indirection
- Can be overkill for very small hierarchies
- Requires careful interface design up front
- May be harder to understand than a simple inheritance tree
- Can introduce more objects and delegation paths

## When to Use

- You have two independent axes of variation
- You expect implementations to change frequently
- You want to avoid N×M class growth
- You are designing a stable abstraction over multiple backends
- You need to support platform-specific behavior cleanly

## When NOT to Use

- There is only one implementation and no realistic alternative
- The abstraction is trivial and unlikely to grow
- A simple strategy or factory is enough
- The extra indirection does not buy you much flexibility
- The domain model is already difficult to follow

## Common Mistakes

### Mistake 1: Confusing Bridge with Adapter

```typescript
// ❌ Bad: treating an existing mismatched API as if it were designed as a bridge
// Adapter solves incompatibility after the fact.

// ✅ Good: use Bridge when you design two independent hierarchies intentionally.
```

### Mistake 2: Making the abstraction know implementation details

```typescript
// ❌ Bad: abstraction branches on concrete renderer types
if (renderer instanceof CanvasRenderer) {
  // special case
}

// ✅ Good: keep abstraction ignorant of concrete implementations
renderer.renderCircle(radius);
```

### Mistake 3: Letting the implementation leak into client code

```typescript
// ❌ Bad: clients depend on SvgRenderer directly
const circle = new Circle(10, new SvgRenderer());

// ✅ Good: clients depend on the Renderer abstraction where possible
```

### Mistake 4: Using Bridge when a simple strategy is enough

```typescript
// ❌ Bad: overengineering a one-off backend switch

// ✅ Good: Bridge is for stable abstractions with multiple long-lived implementations
```

## Related Patterns

- **Adapter**: Fixes an existing incompatibility
- **Strategy**: Also delegates behavior, but Bridge is about design-time separation of abstraction and implementation
- **Abstract Factory**: Can create compatible implementation families for a Bridge
- **Decorator**: Adds responsibilities without splitting abstraction and implementation

## Modern Alternatives

- Plugin architectures with interface contracts
- Dependency injection with backend services
- Configuration-driven rendering pipelines
- Service abstractions in frontend frameworks
- Language support for traits, protocols, or interfaces with composition

## Interview Insights

**Q1: What is the core purpose of Bridge?**

A: To separate abstraction from implementation so both can vary independently. That is what prevents class explosion.

**Q2: How is Bridge different from Adapter?**

A: Adapter reconciles incompatible interfaces. Bridge is built into the design so the abstraction never becomes tightly coupled to one implementation.

**Q3: Why not just use inheritance?**

A: Inheritance combines variation axes into one hierarchy. Bridge keeps them separate and avoids the N×M class problem.

**Q4: Can Bridge be used with dependency injection?**

A: Yes. DI is often used to inject the implementation into the abstraction.

**Q5: When is Bridge a bad choice?**

A: When there is no meaningful second axis of variation or when the abstraction is too small to justify the extra indirection.
