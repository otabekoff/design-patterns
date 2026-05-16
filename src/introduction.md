---
title: Introduction
description: A complete guide to design patterns used in software development.
icon: Palette
---

# Introduction to Design Patterns

Design patterns are typical solutions to commonly occurring problems in software design. They are like pre-made blueprints that you can customize to solve a recurring design problem in your code.

Design patterns are generally divided into three main categories based on their intent:

## 🏗️ Creational Patterns

These patterns provide various object creation mechanisms, which increase flexibility and reuse of existing code.

<Cards>
  <Card
    title="Singleton"
    description="Ensures a class has only one instance"
    href="/creational/singleton"
  />
  <Card
    title="Factory Method"
    description="Creates objects without specifying the exact class"
    href="/creational/factory-method"
  />
  <Card
    title="Abstract Factory"
    description="Creates families of related objects"
    href="/creational/abstract-factory"
  />
  <Card
    title="Builder"
    description="Constructs complex objects step by step"
    href="/creational/builder"
  />
  <Card
    title="Prototype"
    description="Clones existing objects"
    href="/creational/prototype"
  />
  <Card
    title="Object Pool"
    description="Reuses expensive objects"
    href="/creational/object-pool"
  />
</Cards>

## 🧩 Structural Patterns

These patterns explain how to assemble objects and classes into larger structures while keeping these structures flexible and efficient.

<Cards>
  <Card
    title="Adapter"
    description="Converts incompatible interfaces"
    href="/structural/adapter"
  />
  <Card
    title="Bridge"
    description="Decouples an abstraction from its implementation"
    href="/structural/bridge"
  />
  <Card
    title="Composite"
    description="Composes objects into tree structures"
    href="/structural/composite"
  />
  <Card
    title="Decorator"
    description="Adds responsibilities to objects dynamically"
    href="/structural/decorator"
  />
  <Card
    title="Facade"
    description="Provides a simplified interface to a library"
    href="/structural/facade"
  />
  <Card
    title="Flyweight"
    description="Minimizes memory usage by sharing data"
    href="/structural/flyweight"
  />
  <Card
    title="Proxy"
    description="Provides a placeholder for another object"
    href="/structural/proxy"
  />
</Cards>

## 📡 Behavioral Patterns

These patterns take care of effective communication and the assignment of responsibilities between objects.

<Cards>
  <Card
    title="Chain of Responsibility"
    description="Passes requests along a chain of handlers"
    href="/behavioral/chain-of-responsibility"
  />
  <Card
    title="Command"
    description="Turns a request into a stand-alone object"
    href="/behavioral/command"
  />
  <Card
    title="Iterator"
    description="Traverses elements of a collection"
    href="/behavioral/iterator"
  />
  <Card
    title="Mediator"
    description="Reduces chaotic dependencies between objects"
    href="/behavioral/mediator"
  />
  <Card
    title="Memento"
    description="Captures and restores an object's internal state"
    href="/behavioral/memento"
  />
  <Card
    title="Observer"
    description="Lets objects notify others about changes"
    href="/behavioral/observer"
  />
  <Card
    title="State"
    description="Alters an object's behavior when its state changes"
    href="/behavioral/state"
  />
  <Card
    title="Strategy"
    description="Defines a family of algorithms"
    href="/behavioral/strategy"
  />
  <Card
    title="Template Method"
    description="Defines the skeleton of an algorithm"
    href="/behavioral/template-method"
  />
  <Card
    title="Visitor"
    description="Separates algorithms from the objects on which they operate"
    href="/behavioral/visitor"
  />
</Cards>

## 🏢 Architectural Patterns

High-level strategies that concern large-scale components, the global properties, and mechanisms of a system.

- [**MVC**](/architectural/mvc): Model-View-Controller
- [**MVP**](/architectural/mvp): Model-View-Presenter
- [**MVVM**](/architectural/mvvm): Model-View-ViewModel
- [**CQRS**](/architectural/cqrs): Command Query Responsibility Segregation
- [**Repository**](/architectural/repository): Mediates between domain and data mapping layers

