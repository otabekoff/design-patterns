---
title: Introduction
description: A complete guide to design patterns used in software development.
icon: Palette
---

# Introduction to Design Patterns

![Cover](/covers/getting-started/introduction.png)

Design patterns are proven design approaches to recurring problems in software systems. They are not copy-and-paste solutions. Instead, they are reusable ideas that help you communicate design intent, structure code clearly, and make tradeoffs explicit.

This guide focuses on how patterns are used in modern software teams: when they help, when they hurt, and how to implement them in a realistic way across different ecosystems.

## What Patterns Are (and Are Not)

Patterns are:

- Shared vocabulary for design discussions
- Solutions to recurring design problems
- Tools to manage complexity over time

Patterns are not:

- Mandatory rules
- Framework-specific templates
- Substitutes for system design

## Why Patterns Exist

Patterns exist because software teams repeatedly face the same design pressures:

- Change in requirements over time
- The need to scale teams and codebases
- Integration with external systems
- Balancing flexibility with performance

Patterns codify these lessons so you do not have to learn them the hard way on every project.

## How To Use This Documentation

Each pattern page follows a consistent structure so you can scan quickly and then dive deeper:

- Overview and intent
- Problem and solution
- Structure and flow
- Step-by-step implementation
- Real-world use cases
- Pros, cons, and tradeoffs
- When to use and when not to use
- Common mistakes and alternatives

If you are choosing a pattern for a real project, start with the Quick Reference, then read the full pattern page and the related patterns section.

## Pattern Categories

Patterns are grouped by intent. Each category solves a different type of design problem.

## Creational Patterns

These patterns control object creation to improve flexibility, testing, and lifecycle management.

<Cards>
  <Card
    title="Singleton"
    description="Ensures a class has only one instance"
    href="/creational/singleton"
    image="/cards/singleton.png"
  />
  <Card
    title="Factory Method"
    description="Creates objects without specifying the exact class"
    href="/creational/factory-method"
    image="/cards/factory-method.png"
  />
  <Card
    title="Abstract Factory"
    description="Creates families of related objects"
    href="/creational/abstract-factory"
    image="/cards/abstract-factory.png"
  />
  <Card
    title="Builder"
    description="Constructs complex objects step by step"
    href="/creational/builder"
    image="/cards/builder.png"
  />
  <Card
    title="Prototype"
    description="Clones existing objects"
    href="/creational/prototype"
    image="/cards/prototype.png"
  />
  <Card
    title="Object Pool"
    description="Reuses expensive objects"
    href="/creational/object-pool"
    image="/cards/object-pool.png"
  />
</Cards>

## Structural Patterns

These patterns help you compose objects and modules into flexible, maintainable structures.

<Cards>
  <Card
    title="Adapter"
    description="Converts incompatible interfaces"
    href="/structural/adapter"
    image="/cards/adapter.png"
  />
  <Card
    title="Bridge"
    description="Decouples an abstraction from its implementation"
    href="/structural/bridge"
    image="/cards/bridge.png"
  />
  <Card
    title="Composite"
    description="Composes objects into tree structures"
    href="/structural/composite"
    image="/cards/composite.png"
  />
  <Card
    title="Decorator"
    description="Adds responsibilities to objects dynamically"
    href="/structural/decorator"
    image="/cards/decorator.png"
  />
  <Card
    title="Facade"
    description="Provides a simplified interface to a library"
    href="/structural/facade"
    image="/cards/facade.png"
  />
  <Card
    title="Flyweight"
    description="Minimizes memory usage by sharing data"
    href="/structural/flyweight"
    image="/cards/flyweight.png"
  />
  <Card
    title="Proxy"
    description="Provides a placeholder for another object"
    href="/structural/proxy"
    image="/cards/proxy.png"
  />
</Cards>

## Behavioral Patterns

These patterns focus on collaboration, communication, and responsibility distribution.

<Cards>
  <Card
    title="Chain of Responsibility"
    description="Passes requests along a chain of handlers"
    href="/behavioral/chain-of-responsibility"
    image="/cards/chain-of-responsibility.png"
  />
  <Card
    title="Command"
    description="Turns a request into a stand-alone object"
    href="/behavioral/command"
    image="/cards/command.png"
  />
  <Card
    title="Interpreter"
    description="Defines a grammatical representation for a language and an interpreter to evaluate it"
    href="/behavioral/interpreter"
    image="/cards/interpreter.png"
  />
  <Card
    title="Iterator"
    description="Traverses elements of a collection"
    href="/behavioral/iterator"
    image="/cards/iterator.png"
  />
  <Card
    title="Mediator"
    description="Reduces chaotic dependencies between objects"
    href="/behavioral/mediator"
    image="/cards/mediator.png"
  />
  <Card
    title="Memento"
    description="Captures and restores an object's internal state"
    href="/behavioral/memento"
    image="/cards/memento.png"
  />
  <Card
    title="Null Object"
    description="Provides a default no-op behavior to avoid null reference checks"
    href="/behavioral/null-object"
    image="/cards/null-object.png"
  />
  <Card
    title="Observer"
    description="Lets objects notify others about changes"
    href="/behavioral/observer"
    image="/cards/observer.png"
  />
  <Card
    title="State"
    description="Alters an object's behavior when its state changes"
    href="/behavioral/state"
    image="/cards/state.png"
  />
  <Card
    title="Strategy"
    description="Defines a family of algorithms"
    href="/behavioral/strategy"
    image="/cards/strategy.png"
  />
  <Card
    title="Template Method"
    description="Defines the skeleton of an algorithm"
    href="/behavioral/template-method"
    image="/cards/template-method.png"
  />
  <Card
    title="Visitor"
    description="Separates algorithms from the objects on which they operate"
    href="/behavioral/visitor"
    image="/cards/visitor.png"
  />
</Cards>

## Architectural Patterns

Architectural patterns deal with system structure, data flow, and interaction boundaries.

<Cards>
  <Card
    title="Active Record"
    description="Wraps a database table row in an object, combining data and behavior"
    href="/architectural/active-record"
    image="/cards/active-record.png"
  />
  <Card
    title="CQRS"
    description="Separates read (query) and write (command) operations to optimize performance"
    href="/architectural/cqrs"
    image="/cards/cqrs.png"
  />
  <Card
    title="Data Mapper"
    description="Decouples in-memory domain objects from the database schema"
    href="/architectural/data-mapper"
    image="/cards/data-mapper.png"
  />
  <Card
    title="Dependency Injection"
    description="Passes dependent objects automatically instead of hardcoding them"
    href="/architectural/dependency-injection"
    image="/cards/dependency-injection.png"
  />
  <Card
    title="Event Sourcing"
    description="Saves application state changes as a sequence of events"
    href="/architectural/event-sourcing"
    image="/cards/event-sourcing.png"
  />
  <Card
    title="Identity Map"
    description="Ensures each database record is loaded only once per business transaction"
    href="/architectural/identity-map"
    image="/cards/identity-map.png"
  />
  <Card
    title="MVC"
    description="Separates application logic into Model, View, and Controller"
    href="/architectural/mvc"
    image="/cards/mvc.png"
  />
  <Card
    title="MVP"
    description="Presenter handles user interface logic and coordinates View updates"
    href="/architectural/mvp"
    image="/cards/mvp.png"
  />
  <Card
    title="MVT"
    description="Separates application into Model, View, and Template layers"
    href="/architectural/mvt"
    image="/cards/mvt.png"
  />
  <Card
    title="MVVM"
    description="Binds user interface to a reactive View Model"
    href="/architectural/mvvm"
    image="/cards/mvvm.png"
  />
  <Card
    title="Producer-Consumer"
    description="Decouples work producing threads from work consuming threads"
    href="/architectural/producer-consumer"
    image="/cards/producer-consumer.png"
  />
  <Card
    title="Read-Write Lock"
    description="Allows concurrent read access while ensuring exclusive write locks"
    href="/architectural/read-write-lock"
    image="/cards/read-write-lock.png"
  />
  <Card
    title="Repository"
    description="Mediates between domain and data mapping layers using a collection-like interface"
    href="/architectural/repository"
    image="/cards/repository.png"
  />
  <Card
    title="Scheduler"
    description="Controls execution scheduling of thread tasks"
    href="/architectural/scheduler"
    image="/cards/scheduler.png"
  />
  <Card
    title="Service Locator"
    description="Locates and resolves dependencies from a central registry"
    href="/architectural/service-locator"
    image="/cards/service-locator.png"
  />
  <Card
    title="Unit of Work"
    description="Maintains a list of business objects affected by a business transaction"
    href="/architectural/unit-of-work"
    image="/cards/unit-of-work.png"
  />
</Cards>

## Modern Perspective

Modern systems require more than just classic object-oriented patterns. This guide includes patterns that support:

- Service-oriented and event-driven architectures
- Frontend and full-stack applications
- Cloud-native and distributed systems
- Concurrency and performance-sensitive systems

Patterns are presented with modern tradeoffs, not just textbook definitions.

## Common Misconceptions

- A pattern is not a goal. It is a tool.
- Many problems are better solved with simpler code.
- Overusing patterns leads to accidental complexity.

If a pattern does not reduce friction or increase clarity, it probably is not the right fit.

## Where To Start

If you are new to patterns:

1. Read the [Quick Reference](/quick-reference) to see the landscape.
2. Start with a few foundational patterns: Singleton, Factory Method, Strategy, Observer.
3. Apply one pattern in a real project and learn from the tradeoffs.
4. Return to the guide when your architecture grows in complexity.

If you are experienced, use the guide as a decision aid and a reference when teaching or mentoring.
