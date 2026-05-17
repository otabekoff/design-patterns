---
title: Visitor
description: Represent an operation to be performed on elements of a structure. Visitor lets you define new operations without changing the classes.
icon: GitBranch
---

# Visitor

<CoverImage src="/covers/behavioral/visitor.png" alt="Cover">
  <h1>Visitor</h1>
  <p>A humorous museum gallery where a cute tourist robot ("Visitor") walks around and interacts with different geometric statues (Circle, Square), adding new behaviors to them without modifying their structures.</p>
</CoverImage>

## Overview

The **Visitor** pattern is a behavioral design pattern that represents an operation to be performed on elements of an object structure. It lets you define new operations without changing the classes of the elements being operated on. This pattern separates an algorithm from the object structure it operates on.

## Purpose

The Visitor pattern aims to:

- Separate operations from the object structure
- Define new operations without modifying object classes
- Add behavior to complex object hierarchies
- Simplify algorithms that operate on complex structures
- Collect information across related objects
- Avoid type casting and instanceof checks

## Problem

Consider an abstract syntax tree (AST) representing a program. You need multiple operations (print, compile, optimize) on different node types:

```typescript
// Without Visitor - scattered logic
interface ASTNode {
  print(): void;
  compile(): void;
  optimize(): void;
}

class BinaryOp implements ASTNode {
  print(): void {}
  compile(): void {}
  optimize(): void {}
}

class Literal implements ASTNode {
  print(): void {}
  compile(): void {}
  optimize(): void {}
}
```

Issues with this approach:

- Each new operation requires modifying all node classes
- Operations logic is scattered across multiple classes
- Adding operations violates open/closed principle
- Node classes become bloated with unrelated behavior
- Hard to maintain and test operations

## Solution

The Visitor pattern encapsulates operations in visitor classes:

```typescript
// Visitor interface
interface Visitor {
  visitBinaryOp(node: BinaryOp): void;
  visitLiteral(node: Literal): void;
}

// Elements define accept method
interface ASTNode {
  accept(visitor: Visitor): void;
}

// Concrete visitors
class PrintVisitor implements Visitor {
  visitBinaryOp(node: BinaryOp): void {}
  visitLiteral(node: Literal): void {}
}

class CompileVisitor implements Visitor {
  visitBinaryOp(node: BinaryOp): void {}
  visitLiteral(node: Literal): void {}
}
```

## Implementation

::: code-group

```typescript [typescript]
// Element interface
    interface Shape {
      accept(visitor: ShapeVisitor): void;
    }

    // Concrete elements
    class Circle implements Shape {
      constructor(public radius: number) {}

      accept(visitor: ShapeVisitor): void {
        visitor.visitCircle(this);
      }
    }

    class Rectangle implements Shape {
      constructor(
        public width: number,
        public height: number
      ) {}

      accept(visitor: ShapeVisitor): void {
        visitor.visitRectangle(this);
      }
    }

    class Triangle implements Shape {
      constructor(
        public side1: number,
        public side2: number,
        public side3: number
      ) {}

      accept(visitor: ShapeVisitor): void {
        visitor.visitTriangle(this);
      }
    }

    // Visitor interface
    interface ShapeVisitor {
      visitCircle(circle: Circle): void;
      visitRectangle(rectangle: Rectangle): void;
      visitTriangle(triangle: Triangle): void;
    }

    // Concrete visitor 1 - Area calculator
    class AreaCalculator implements ShapeVisitor {
      private totalArea: number = 0;

      visitCircle(circle: Circle): void {
        const area = Math.PI * circle.radius ** 2;
        this.totalArea += area;
        console.log(`Circle area: ${area.toFixed(2)}`);
      }

      visitRectangle(rectangle: Rectangle): void {
        const area = rectangle.width * rectangle.height;
        this.totalArea += area;
        console.log(`Rectangle area: ${area}`);
      }

      visitTriangle(triangle: Triangle): void {
        const s = (triangle.side1 + triangle.side2 + triangle.side3) / 2;
        const area = Math.sqrt(s * (s - triangle.side1) * (s - triangle.side2) * (s - triangle.side3));
        this.totalArea += area;
        console.log(`Triangle area: ${area.toFixed(2)}`);
      }

      getTotalArea(): number {
        return this.totalArea;
      }
    }

    // Concrete visitor 2 - Perimeter calculator
    class PerimeterCalculator implements ShapeVisitor {
      private totalPerimeter: number = 0;

      visitCircle(circle: Circle): void {
        const perimeter = 2 * Math.PI * circle.radius;
        this.totalPerimeter += perimeter;
        console.log(`Circle perimeter: ${perimeter.toFixed(2)}`);
      }

      visitRectangle(rectangle: Rectangle): void {
        const perimeter = 2 * (rectangle.width + rectangle.height);
        this.totalPerimeter += perimeter;
        console.log(`Rectangle perimeter: ${perimeter}`);
      }

      visitTriangle(triangle: Triangle): void {
        const perimeter = triangle.side1 + triangle.side2 + triangle.side3;
        this.totalPerimeter += perimeter;
        console.log(`Triangle perimeter: ${perimeter}`);
      }

      getTotalPerimeter(): number {
        return this.totalPerimeter;
      }
    }

    // Usage
    const shapes: Shape[] = [
      new Circle(5),
      new Rectangle(4, 6),
      new Triangle(3, 4, 5)
    ];

    const areaCalculator = new AreaCalculator();
    shapes.forEach(shape => shape.accept(areaCalculator));
    console.log(`Total area: ${areaCalculator.getTotalArea().toFixed(2)}\n`);

    const perimeterCalculator = new PerimeterCalculator();
    shapes.forEach(shape => shape.accept(perimeterCalculator));
    console.log(`Total perimeter: ${perimeterCalculator.getTotalPerimeter().toFixed(2)}`);
```

  
```python [python]
from abc import ABC, abstractmethod
    import math

    class Shape(ABC):
        @abstractmethod
        def accept(self, visitor: 'ShapeVisitor') -> None:
            pass

    class Circle(Shape):
        def __init__(self, radius: float):
            self.radius = radius

        def accept(self, visitor: 'ShapeVisitor') -> None:
            visitor.visit_circle(self)

    class Rectangle(Shape):
        def __init__(self, width: float, height: float):
            self.width = width
            self.height = height

        def accept(self, visitor: 'ShapeVisitor') -> None:
            visitor.visit_rectangle(self)

    class Triangle(Shape):
        def __init__(self, side1: float, side2: float, side3: float):
            self.side1 = side1
            self.side2 = side2
            self.side3 = side3

        def accept(self, visitor: 'ShapeVisitor') -> None:
            visitor.visit_triangle(self)

    class ShapeVisitor(ABC):
        @abstractmethod
        def visit_circle(self, circle: Circle) -> None:
            pass

        @abstractmethod
        def visit_rectangle(self, rectangle: Rectangle) -> None:
            pass

        @abstractmethod
        def visit_triangle(self, triangle: Triangle) -> None:
            pass

    class AreaCalculator(ShapeVisitor):
        def __init__(self):
            self.total_area = 0

        def visit_circle(self, circle: Circle) -> None:
            area = math.pi * circle.radius ** 2
            self.total_area += area
            print(f"Circle area: {area:.2f}")

        def visit_rectangle(self, rectangle: Rectangle) -> None:
            area = rectangle.width * rectangle.height
            self.total_area += area
            print(f"Rectangle area: {area}")

        def visit_triangle(self, triangle: Triangle) -> None:
            s = (triangle.side1 + triangle.side2 + triangle.side3) / 2
            area = math.sqrt(s * (s - triangle.side1) * (s - triangle.side2) * (s - triangle.side3))
            self.total_area += area
            print(f"Triangle area: {area:.2f}")

        def get_total_area(self) -> float:
            return self.total_area

    class PerimeterCalculator(ShapeVisitor):
        def __init__(self):
            self.total_perimeter = 0

        def visit_circle(self, circle: Circle) -> None:
            perimeter = 2 * math.pi * circle.radius
            self.total_perimeter += perimeter
            print(f"Circle perimeter: {perimeter:.2f}")

        def visit_rectangle(self, rectangle: Rectangle) -> None:
            perimeter = 2 * (rectangle.width + rectangle.height)
            self.total_perimeter += perimeter
            print(f"Rectangle perimeter: {perimeter}")

        def visit_triangle(self, triangle: Triangle) -> None:
            perimeter = triangle.side1 + triangle.side2 + triangle.side3
            self.total_perimeter += perimeter
            print(f"Triangle perimeter: {perimeter}")

        def get_total_perimeter(self) -> float:
            return self.total_perimeter

    # Usage
    shapes = [Circle(5), Rectangle(4, 6), Triangle(3, 4, 5)]

    area_calculator = AreaCalculator()
    for shape in shapes:
        shape.accept(area_calculator)
    print(f"Total area: {area_calculator.get_total_area():.2f}\n")

    perimeter_calculator = PerimeterCalculator()
    for shape in shapes:
        shape.accept(perimeter_calculator)
    print(f"Total perimeter: {perimeter_calculator.get_total_perimeter():.2f}")
```

:::

## Real-World Example

### Document Export System

```typescript
interface Document {
  accept(visitor: DocumentVisitor): void;
}

class Paragraph implements Document {
  constructor(public text: string) {}
  accept(visitor: DocumentVisitor): void {
    visitor.visitParagraph(this);
  }
}

class Image implements Document {
  constructor(public url: string) {}
  accept(visitor: DocumentVisitor): void {
    visitor.visitImage(this);
  }
}

interface DocumentVisitor {
  visitParagraph(para: Paragraph): void;
  visitImage(img: Image): void;
}

class HTMLExporter implements DocumentVisitor {
  visitParagraph(para: Paragraph): void {
    console.log(`<p>${para.text}</p>`);
  }

  visitImage(img: Image): void {
    console.log(`<img src="${img.url}" />`);
  }
}

class MarkdownExporter implements DocumentVisitor {
  visitParagraph(para: Paragraph): void {
    console.log(para.text);
  }

  visitImage(img: Image): void {
    console.log(`![Image](${img.url})`);
  }
}

// Usage
const doc: Document[] = [new Paragraph("Hello World"), new Image("example.png")];

const htmlExporter = new HTMLExporter();
doc.forEach((d) => d.accept(htmlExporter));
```

## Advantages

✅ **Easy to Add Operations** - New operations without changing element classes
✅ **Separation of Concerns** - Operations separated from object structure
✅ **Open/Closed Principle** - Open for extension, closed for modification
✅ **Collects Data** - Visitors can gather information across structures
✅ **Handles Complex Structures** - Works well with composite patterns
✅ **Testability** - Operations can be tested independently
✅ **Avoids Type Casting** - No need for instanceof checks

## Disadvantages

❌ **Adding Elements Difficult** - New element types require modifying all visitors
❌ **Complexity** - Adds extra layer of abstraction
❌ **Encapsulation Violation** - Visitors need access to element internals
❌ **Double Dispatch Complexity** - Can be hard to understand
❌ **Performance Overhead** - Extra method calls and object creation
❌ **Not Suitable for Simple Cases** - Overkill if few operations needed

## When to Use

- You need many different operations on object structure
- Object structure is stable but operations change frequently
- You want to avoid modifying element classes for new operations
- You need to collect information across related objects
- You have complex hierarchies with multiple element types
- Operations are unrelated to element responsibilities
- You want to follow open/closed principle

## When NOT to Use

- Object structure changes frequently
- Only a few operations are needed
- Element classes need modification anyway
- Operations are intrinsic to elements
- Simpler patterns (Strategy, Template Method) would suffice
- Performance is critical
- Encapsulation is paramount

## Related Patterns

- **Composite** - Often used with Visitor to traverse tree structures
- **Iterator** - Alternative for traversing structures
- **Double Dispatch** - Core mechanism of Visitor
- **Interpreter** - Similar structure for expression evaluation
