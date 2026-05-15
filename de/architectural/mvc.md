---
title: Model-View-Controller (MVC)
description: Separates application logic into three interconnected components
icon: Layers
---

import { Callout } from "fumadocs-ui/components/callout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "fumadocs-ui/components/tabs";

## Overview

The **Model-View-Controller (MVC)** pattern is a fundamental architectural pattern that divides an application into three interconnected components:

- **Model**: Manages the application data and business logic
- **View**: Presents the data to the user
- **Controller**: Handles user input and updates the model

This separation of concerns allows for better code organization, maintainability, and testability.

## Purpose

The MVC pattern aims to:

- Separate business logic from presentation
- Enable independent development of components
- Facilitate code reusability
- Improve application testability
- Allow multiple views for the same model

## Problem

Without proper separation, applications often become monolithic with mixed concerns:

- Business logic tangled with UI code
- Difficult to test individual components
- Hard to maintain and extend
- Changes in one area affect unrelated parts
- Multiple views for the same data require code duplication

```
❌ Monolithic Application
┌─────────────────────────────────────┐
│   Business Logic + UI + Logic Mix   │
│   - Hard to test                    │
│   - Difficult to maintain           │
│   - Code duplication                │
└─────────────────────────────────────┘
```

## Solution

The MVC pattern provides a clear separation by dividing the application into three layers:

```
✅ MVC Architecture
┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│    Model     │      │    View      │      │  Controller  │
├──────────────┤      ├──────────────┤      ├──────────────┤
│ • Data       │◄─────│ • Templates  │◄─────│ • Routes     │
│ • Business   │      │ • Display    │      │ • Handlers   │
│   Logic      │      │ • User       │      │ • Requests   │
│ • Database   │      │   Interaction│      │              │
└──────────────┘      └──────────────┘      └──────────────┘
      ▲                      ▲                      │
      └──────────────────────┴──────────────────────┘
          Updates & Notifications
```

**Flow:**

1. User interacts with the View
2. Controller receives the request
3. Controller updates the Model
4. Model notifies the View of changes
5. View renders updated data

## Implementation

::: code-group
<TabsList>
<TabsTrigger value="typescript">TypeScript</TabsTrigger>
<TabsTrigger value="python">Python</TabsTrigger>
</TabsList>


```typescript [typescript]
// Model - Manages application data and business logic
class UserModel {
  private users: Map<number, User> = new Map();
  private nextId: number = 1;
  private observers: ModelObserver[] = [];

  interface User {
    id: number;
    name: string;
    email: string;
    age: number;
  }

  interface ModelObserver {
    update(model: UserModel): void;
  }

  addObserver(observer: ModelObserver): void {
    this.observers.push(observer);
  }

  notifyObservers(): void {
    this.observers.forEach(observer => observer.update(this));
  }

  addUser(name: string, email: string, age: number): User {
    const user: User = {
      id: this.nextId++,
      name,
      email,
      age
    };
    this.users.set(user.id, user);
    this.notifyObservers();
    return user;
  }

  getUser(id: number): User | undefined {
    return this.users.get(id);
  }

  getAllUsers(): User[] {
    return Array.from(this.users.values());
  }

  updateUser(id: number, updates: Partial<User>): User | null {
    const user = this.users.get(id);
    if (!user) return null;

    const updated = { ...user, ...updates };
    this.users.set(id, updated);
    this.notifyObservers();
    return updated;
  }

  deleteUser(id: number): boolean {
    const deleted = this.users.delete(id);
    if (deleted) {
      this.notifyObservers();
    }
    return deleted;
  }
}

// View - Displays data to the user
class UserView {
  render(users: UserModel.User[]): void {
    console.log('=== User List ===');
    users.forEach(user => {
      console.log(`ID: ${user.id}`);
      console.log(`Name: ${user.name}`);
      console.log(`Email: ${user.email}`);
      console.log(`Age: ${user.age}`);
      console.log('---');
    });
  }

  renderForm(): void {
    console.log('Please enter user details:');
    console.log('- Name (string)');
    console.log('- Email (string)');
    console.log('- Age (number)');
  }

  displayError(message: string): void {
    console.error(`❌ Error: ${message}`);
  }

  displaySuccess(message: string): void {
    console.log(`✅ ${message}`);
  }
}

// Controller - Handles user input and coordinates Model and View
class UserController {
  constructor(
    private model: UserModel,
    private view: UserView
  ) {
    // Model notifies controller when data changes
    this.model.addObserver(this);
  }

  update(model: UserModel): void {
    this.view.render(model.getAllUsers());
  }

  handleAddUser(name: string, email: string, age: number): void {
    if (!name || !email || age < 0) {
      this.view.displayError('Invalid input data');
      return;
    }

    const user = this.model.addUser(name, email, age);
    this.view.displaySuccess(`User added with ID: ${user.id}`);
  }

  handleUpdateUser(id: number, name: string, email: string, age: number): void {
    const updated = this.model.updateUser(id, { name, email, age });
    if (updated) {
      this.view.displaySuccess(`User ${id} updated`);
    } else {
      this.view.displayError(`User ${id} not found`);
    }
  }

  handleDeleteUser(id: number): void {
    const deleted = this.model.deleteUser(id);
    if (deleted) {
      this.view.displaySuccess(`User ${id} deleted`);
    } else {
      this.view.displayError(`User ${id} not found`);
    }
  }

  handleViewUsers(): void {
    this.view.render(this.model.getAllUsers());
  }

  handleShowForm(): void {
    this.view.renderForm();
  }
}

// Usage
const model = new UserModel();
const view = new UserView();
const controller = new UserController(model, view);

controller.handleAddUser('John Doe', 'john@example.com', 30);
controller.handleAddUser('Jane Smith', 'jane@example.com', 28);
controller.handleViewUsers();

controller.handleUpdateUser(1, 'John Updated', 'john.updated@example.com', 31);
controller.handleDeleteUser(2);
controller.handleViewUsers();
```



```python [python]
from typing import Dict, List, Optional
from abc import ABC, abstractmethod
from dataclasses import dataclass

# Model - Manages application data and business logic
@dataclass
class User:
    id: int
    name: str
    email: str
    age: int

class ModelObserver(ABC):
    @abstractmethod
    def update(self, model: 'UserModel') -> None:
        pass

class UserModel:
    def __init__(self):
        self.users: Dict[int, User] = {}
        self.next_id: int = 1
        self.observers: List[ModelObserver] = []

    def add_observer(self, observer: ModelObserver) -> None:
        self.observers.append(observer)

    def notify_observers(self) -> None:
        for observer in self.observers:
            observer.update(self)

    def add_user(self, name: str, email: str, age: int) -> User:
        user = User(
            id=self.next_id,
            name=name,
            email=email,
            age=age
        )
        self.next_id += 1
        self.users[user.id] = user
        self.notify_observers()
        return user

    def get_user(self, user_id: int) -> Optional[User]:
        return self.users.get(user_id)

    def get_all_users(self) -> List[User]:
        return list(self.users.values())

    def update_user(self, user_id: int, **updates) -> Optional[User]:
        user = self.users.get(user_id)
        if not user:
            return None

        for key, value in updates.items():
            if hasattr(user, key):
                setattr(user, key, value)

        self.notify_observers()
        return user

    def delete_user(self, user_id: int) -> bool:
        if user_id in self.users:
            del self.users[user_id]
            self.notify_observers()
            return True
        return False

# View - Displays data to the user
class UserView:
    def render(self, users: List[User]) -> None:
        print("=== User List ===")
        for user in users:
            print(f"ID: {user.id}")
            print(f"Name: {user.name}")
            print(f"Email: {user.email}")
            print(f"Age: {user.age}")
            print("---")

    def render_form(self) -> None:
        print("Please enter user details:")
        print("- Name (string)")
        print("- Email (string)")
        print("- Age (number)")

    def display_error(self, message: str) -> None:
        print(f"❌ Error: {message}")

    def display_success(self, message: str) -> None:
        print(f"✅ {message}")

# Controller - Handles user input and coordinates Model and View
class UserController(ModelObserver):
    def __init__(self, model: UserModel, view: UserView):
        self.model = model
        self.view = view
        self.model.add_observer(self)

    def update(self, model: UserModel) -> None:
        self.view.render(model.get_all_users())

    def handle_add_user(self, name: str, email: str, age: int) -> None:
        if not name or not email or age < 0:
            self.view.display_error("Invalid input data")
            return

        user = self.model.add_user(name, email, age)
        self.view.display_success(f"User added with ID: {user.id}")

    def handle_update_user(self, user_id: int, name: str, email: str, age: int) -> None:
        updated = self.model.update_user(user_id, name=name, email=email, age=age)
        if updated:
            self.view.display_success(f"User {user_id} updated")
        else:
            self.view.display_error(f"User {user_id} not found")

    def handle_delete_user(self, user_id: int) -> None:
        if self.model.delete_user(user_id):
            self.view.display_success(f"User {user_id} deleted")
        else:
            self.view.display_error(f"User {user_id} not found")

    def handle_view_users(self) -> None:
        self.view.render(self.model.get_all_users())

    def handle_show_form(self) -> None:
        self.view.render_form()

# Usage
model = UserModel()
view = UserView()
controller = UserController(model, view)

controller.handle_add_user("John Doe", "john@example.com", 30)
controller.handle_add_user("Jane Smith", "jane@example.com", 28)
controller.handle_view_users()

controller.handle_update_user(1, "John Updated", "john.updated@example.com", 31)
controller.handle_delete_user(2)
controller.handle_view_users()
```

:::

## Real-World Examples

### Web Framework (Express.js)

```javascript
// Model
const userDatabase = new Map();

// View (HTML template)
app.get("/users", (req, res) => {
  const users = userDatabase.values();
  res.render("users.html", { users });
});

// Controller
app.post("/users", (req, res) => {
  const newUser = { id: Date.now(), ...req.body };
  userDatabase.set(newUser.id, newUser);
  res.redirect("/users");
});
```

### Ruby on Rails

Rails follows MVC convention:

- **Models**: `app/models/user.rb`
- **Views**: `app/views/users/`
- **Controllers**: `app/controllers/users_controller.rb`

### Django

Django implements MVC as MTV (Model-Template-View):

- **Models**: Database schema
- **Templates**: HTML rendering
- **Views**: Request handlers

## Advantages ✅

- **Separation of Concerns**: Each component has a single responsibility
- **Reusability**: Models and controllers can be reused with different views
- **Testability**: Easy to unit test each component independently
- **Scalability**: Clear structure makes it easier to add new features
- **Multiple Views**: Same model can be displayed through different views
- **Parallel Development**: Teams can work on different components simultaneously
- **Code Organization**: Clear folder structure and file organization
- **Framework Support**: Many frameworks provide built-in MVC support

## Disadvantages ❌

- **Complexity**: Adding an abstraction layer for small applications
- **Learning Curve**: Developers need to understand the pattern
- **Performance Overhead**: Additional abstraction can add latency
- **Two-Way Binding Issues**: Model-View synchronization can be complex
- **View Logic**: Views sometimes contain too much logic
- **File Organization**: Can lead to many small files to manage
- **Testing Complexity**: Testing view updates can be challenging
- **Over-Engineering**: May be overkill for simple applications

## When to Use ✅

- **Web Applications**: Especially dynamic web applications
- **Desktop Applications**: GUI applications with complex logic
- **Mobile Applications**: To separate business logic from UI
- **Large Teams**: When multiple developers work on the same project
- **Long-Term Maintenance**: Projects that will be maintained for years
- **Complex Business Logic**: Applications with intricate rules and workflows
- **Multiple Presentation Layers**: When you need different ways to present data
- **Framework-Based Projects**: When using MVC frameworks (Rails, Django, etc.)

## When NOT to Use ❌

- **Simple Scripts**: Command-line utilities or small scripts
- **Real-Time Systems**: Systems with strict latency requirements
- **Microservices**: Where each service is already isolated
- **Static Content**: Websites with primarily static content
- **Performance-Critical**: Applications where overhead matters
- **Single-Page Applications**: Consider MVVM instead
- **Event-Driven Systems**: Where MVC's controller pattern doesn't fit
- **Prototypes**: Quick throwaway prototypes

## Related Patterns

- **Model-View-Presenter (MVP)**: Evolved from MVC with improved testability
- **Model-View-ViewModel (MVVM)**: Better for data binding and reactive systems
- **Model-View-Whatever (MVW)**: Generalization of MV\* patterns
- **Repository Pattern**: Often used to abstract data access in models
- **Observer Pattern**: Used for model-view communication
- **Strategy Pattern**: Used to vary view rendering strategies
- **Command Pattern**: Often used in controllers to handle requests
