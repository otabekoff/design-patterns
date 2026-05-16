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

- [**Singleton**](/creational/singleton): Ensures a class has only one instance
- [**Factory Method**](/creational/factory-method): Creates objects without specifying the exact class
- [**Abstract Factory**](/creational/abstract-factory): Creates families of related objects
- [**Builder**](/creational/builder): Constructs complex objects step by step
- [**Prototype**](/creational/prototype): Clones existing objects
- [**Object Pool**](/creational/object-pool): Reuses expensive objects

## 🧩 Structural Patterns

These patterns explain how to assemble objects and classes into larger structures while keeping these structures flexible and efficient.

- [**Adapter**](/structural/adapter): Converts incompatible interfaces
- [**Bridge**](/structural/bridge): Decouples an abstraction from its implementation
- [**Composite**](/structural/composite): Composes objects into tree structures
- [**Decorator**](/structural/decorator): Adds responsibilities to objects dynamically
- [**Facade**](/structural/facade): Provides a simplified interface to a library
- [**Flyweight**](/structural/flyweight): Minimizes memory usage by sharing data
- [**Proxy**](/structural/proxy): Provides a placeholder for another object

## 📡 Behavioral Patterns

These patterns take care of effective communication and the assignment of responsibilities between objects.

- [**Chain of Responsibility**](/behavioral/chain-of-responsibility): Passes requests along a chain of handlers
- [**Command**](/behavioral/command): Turns a request into a stand-alone object
- [**Iterator**](/behavioral/iterator): Traverses elements of a collection
- [**Mediator**](/behavioral/mediator): Reduces chaotic dependencies between objects
- [**Memento**](/behavioral/memento): Captures and restores an object's internal state
- [**Observer**](/behavioral/observer): Lets objects notify others about changes
- [**State**](/behavioral/state): Alters an object's behavior when its state changes
- [**Strategy**](/behavioral/strategy): Defines a family of algorithms
- [**Template Method**](/behavioral/template-method): Defines the skeleton of an algorithm
- [**Visitor**](/behavioral/visitor): Separates algorithms from the objects on which they operate

## 🏢 Architectural Patterns

High-level strategies that concern large-scale components, the global properties, and mechanisms of a system.

- [**MVC**](/architectural/mvc): Model-View-Controller
- [**MVP**](/architectural/mvp): Model-View-Presenter
- [**MVVM**](/architectural/mvvm): Model-View-ViewModel
- [**CQRS**](/architectural/cqrs): Command Query Responsibility Segregation
- [**Repository**](/architectural/repository): Mediates between domain and data mapping layers
