---
title: Introduction
description: A complete guide to design patterns used in software development.
icon: Palette
---

# Introduction to Design Patterns

<CoverImage src="/covers/getting-started/introduction.png" alt="Cover">
  <h1>Introduction</h1>
  <p>A charming, tiny white robot holding a giant glowing "Hello World" handbook, standing excitedly at the grand stone entrance of a beautiful, shimmering maze of futuristic geometric architecture.</p>
</CoverImage>

Design patterns are proven answers to recurring design problems in software. They are not libraries you import or templates you paste — they are ideas you apply with judgment. A pattern gives you a shared name for a solution, a clear structure for a problem, and the vocabulary to discuss tradeoffs with your team.

This guide covers 41 patterns across four categories: Creational, Structural, Behavioral, and Architectural. Each pattern page follows a consistent structure — problem, solution, implementation in TypeScript and Python, real-world example, and honest tradeoffs.

## How To Use This Guide

If you are **new to patterns**, start with the [Quick Reference](/quick-reference) to survey the landscape, then pick two or three patterns from the Creational and Behavioral sections and implement them in a small project. Learning by doing matters more than reading in sequence.

If you are **experienced**, use this as a decision aid. The Quick Reference contains a decision tree and pattern combinations that help you reason about tradeoffs quickly.

If you are **teaching or mentoring**, each pattern page is self-contained and links to related patterns, making it easy to share specific pages and trace connections.

::: tip Not sure where to start?
Four patterns cover the majority of real-world scenarios: **Singleton**, **Factory Method**, **Strategy**, and **Observer**. Master those first.
:::

## Pattern Categories

### Creational Patterns

Control how objects are created. Use these to improve flexibility, support testing, and manage object lifecycles without coupling your code to specific classes.

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

### Structural Patterns

Describe how to compose objects and classes into larger structures while keeping those structures flexible and maintainable. Use these when you need to connect incompatible interfaces, wrap objects with new behavior, or simplify complex subsystems.

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

### Behavioral Patterns

Define how objects collaborate and divide responsibility. Use these to decouple senders from receivers, manage state transitions, or express complex workflows without tangled conditionals.

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
    description="Defines a grammar and an interpreter to evaluate it"
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
    description="Provides a default no-op behavior to avoid null checks"
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
    description="Defines a family of interchangeable algorithms"
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

### Architectural Patterns

Address system-level concerns: data flow, service boundaries, concurrency, and persistence. Unlike the patterns above, architectural patterns shape the entire structure of an application rather than a single component.

<Cards>
  <Card
    title="Active Record"
    description="Wraps a database table row in an object, combining data and behavior"
    href="/architectural/active-record"
    image="/cards/active-record.png"
  />
  <Card
    title="CQRS"
    description="Separates read and write operations to optimize performance"
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
    description="Passes dependent objects in rather than hardcoding them"
    href="/architectural/dependency-injection"
    image="/cards/dependency-injection.png"
  />
  <Card
    title="Event Sourcing"
    description="Saves application state as a sequence of events"
    href="/architectural/event-sourcing"
    image="/cards/event-sourcing.png"
  />
  <Card
    title="Identity Map"
    description="Ensures each database record is loaded only once per transaction"
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
    description="Presenter handles UI logic and coordinates View updates"
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
    description="Binds the user interface to a reactive View Model"
    href="/architectural/mvvm"
    image="/cards/mvvm.png"
  />
  <Card
    title="Producer-Consumer"
    description="Decouples work-producing threads from work-consuming threads"
    href="/architectural/producer-consumer"
    image="/cards/producer-consumer.png"
  />
  <Card
    title="Read-Write Lock"
    description="Allows concurrent reads while ensuring exclusive write access"
    href="/architectural/read-write-lock"
    image="/cards/read-write-lock.png"
  />
  <Card
    title="Repository"
    description="Mediates between domain and data layers using a collection-like interface"
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
    description="Resolves dependencies from a central registry"
    href="/architectural/service-locator"
    image="/cards/service-locator.png"
  />
  <Card
    title="Unit of Work"
    description="Tracks business objects changed during a transaction and coordinates writes"
    href="/architectural/unit-of-work"
    image="/cards/unit-of-work.png"
  />
</Cards>

## A Word of Caution

Patterns are tools, not goals. Using a pattern because it feels elegant — rather than because it solves a real problem in your codebase — is one of the most common mistakes developers make after first encountering them. If a pattern adds indirection without reducing friction, the simpler code is almost always better.
