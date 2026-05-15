---
title: Model-View-Presenter (MVP)
description: Separates presentation logic from views with testable presenters
icon: Users
---

import { Callout } from "fumadocs-ui/components/callout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "fumadocs-ui/components/tabs";

## Overview

The **Model-View-Presenter (MVP)** pattern is an architectural pattern that evolved from MVC to improve testability by separating presentation logic from the view. It divides an application into:

- **Model**: Contains data and business logic
- **View**: Passive display component with no logic
- **Presenter**: Contains presentation logic and orchestrates user interactions

The key difference from MVC is that the Presenter, rather than the View, handles all user interactions.

## Purpose

The MVP pattern aims to:

- Remove presentation logic from views to make them testable
- Provide a clear separation between business and presentation logic
- Make testing easier by decoupling views from presentation logic
- Enable passive views that are easier to maintain
- Improve code reusability and flexibility

## Problem

Traditional MVC can suffer from:

- Views containing presentation logic that's hard to test
- Direct model-view binding causing tight coupling
- Difficulty testing view-related logic
- Views becoming God objects with too many responsibilities
- Hard to change presentation without affecting tests

```
❌ MVC with Logic-Heavy Views
┌──────────────┐
│     View     │
├──────────────┤
│ • Rendering  │
│ • Logic      │  ← Hard to test
│ • Binding    │
│ • Validation │
└──────────────┘
```

## Solution

MVP separates presentation logic into a Presenter that orchestrates the View and Model:

```
✅ MVP Architecture
┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│    Model     │      │    View      │      │  Presenter   │
├──────────────┤      ├──────────────┤      ├──────────────┤
│ • Data       │◄─────│ • Rendering  │◄─────│ • Logic      │
│ • Business   │      │ • Events     │      │ • Validation │
│   Logic      │      │ (Passive)    │      │ • Binding    │
│ • Events     │      │              │      │ • Commands   │
└──────────────┘      └──────────────┘      └──────────────┘
      ▲                      ▲                      │
      │                      │                      │
      └──────────────────────┴──────────────────────┘
          Presenter coordinates interactions
```

**Flow:**

1. User interacts with View
2. View notifies Presenter of interaction
3. Presenter updates Model or retrieves data
4. Presenter tells View what to display
5. View renders the data (no logic)

## Implementation

::: code-group
<TabsList>
<TabsTrigger value="typescript">TypeScript</TabsTrigger>
<TabsTrigger value="python">Python</TabsTrigger>
</TabsList>


```typescript [typescript]
// Model - Contains data and business logic
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

class UserModel {
  private users: Map<number, User> = new Map();
  private nextId: number = 1;

  addUser(name: string, email: string, age: number): User {
    if (!name || !email || age < 0) {
      throw new Error("Invalid user data");
    }

    const user: User = {
      id: this.nextId++,
      name,
      email,
      age,
    };
    this.users.set(user.id, user);
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
    return updated;
  }

  deleteUser(id: number): boolean {
    return this.users.delete(id);
  }
}

// View - Passive view with no logic
interface IUserView {
  displayUsers(users: User[]): void;
  displayError(message: string): void;
  displaySuccess(message: string): void;
  displayUserForm(user?: User): void;
  onAddUserClick(callback: (name: string, email: string, age: number) => void): void;
  onUpdateUserClick(callback: (id: number, name: string, email: string, age: number) => void): void;
  onDeleteUserClick(callback: (id: number) => void): void;
  onViewUsersClick(callback: () => void): void;
}

class UserView implements IUserView {
  displayUsers(users: User[]): void {
    console.log("=== User List ===");
    users.forEach((user) => {
      console.log(`ID: ${user.id} | Name: ${user.name} | Email: ${user.email} | Age: ${user.age}`);
    });
  }

  displayError(message: string): void {
    console.error(`❌ Error: ${message}`);
  }

  displaySuccess(message: string): void {
    console.log(`✅ ${message}`);
  }

  displayUserForm(user?: User): void {
    if (user) {
      console.log(`Editing user: ${user.name}`);
    } else {
      console.log("Creating new user");
    }
  }

  onAddUserClick(callback: (name: string, email: string, age: number) => void): void {
    // In a real application, this would be connected to a button click event
    callback("New User", "newuser@example.com", 25);
  }

  onUpdateUserClick(
    callback: (id: number, name: string, email: string, age: number) => void,
  ): void {
    callback(1, "Updated User", "updated@example.com", 26);
  }

  onDeleteUserClick(callback: (id: number) => void): void {
    callback(1);
  }

  onViewUsersClick(callback: () => void): void {
    callback();
  }
}

// Presenter - Contains presentation logic
class UserPresenter {
  constructor(
    private model: UserModel,
    private view: IUserView,
  ) {
    this.setupViewCallbacks();
  }

  private setupViewCallbacks(): void {
    this.view.onAddUserClick((name, email, age) => this.handleAddUser(name, email, age));
    this.view.onUpdateUserClick((id, name, email, age) =>
      this.handleUpdateUser(id, name, email, age),
    );
    this.view.onDeleteUserClick((id) => this.handleDeleteUser(id));
    this.view.onViewUsersClick(() => this.handleViewUsers());
  }

  private handleAddUser(name: string, email: string, age: number): void {
    try {
      const user = this.model.addUser(name, email, age);
      this.view.displaySuccess(`User added with ID: ${user.id}`);
      this.handleViewUsers();
    } catch (error) {
      this.view.displayError((error as Error).message);
    }
  }

  private handleUpdateUser(id: number, name: string, email: string, age: number): void {
    try {
      const user = this.model.updateUser(id, { name, email, age });
      if (user) {
        this.view.displaySuccess(`User ${id} updated`);
        this.handleViewUsers();
      } else {
        this.view.displayError(`User ${id} not found`);
      }
    } catch (error) {
      this.view.displayError((error as Error).message);
    }
  }

  private handleDeleteUser(id: number): void {
    const deleted = this.model.deleteUser(id);
    if (deleted) {
      this.view.displaySuccess(`User ${id} deleted`);
      this.handleViewUsers();
    } else {
      this.view.displayError(`User ${id} not found`);
    }
  }

  private handleViewUsers(): void {
    const users = this.model.getAllUsers();
    this.view.displayUsers(users);
  }

  public start(): void {
    this.handleViewUsers();
  }
}

// Usage
const model = new UserModel();
const view = new UserView();
const presenter = new UserPresenter(model, view);

presenter.start();
view.onAddUserClick((name, email, age) => {
  const user = model.addUser(name, email, age);
  view.displaySuccess(`User ${user.id} added`);
  view.displayUsers(model.getAllUsers());
});
```



```python [python]
from typing import Dict, List, Optional, Callable
from dataclasses import dataclass

# Model - Contains data and business logic
@dataclass
class User:
    id: int
    name: str
    email: str
    age: int

class UserModel:
    def __init__(self):
        self.users: Dict[int, User] = {}
        self.next_id: int = 1

    def add_user(self, name: str, email: str, age: int) -> User:
        if not name or not email or age < 0:
            raise ValueError("Invalid user data")

        user = User(
            id=self.next_id,
            name=name,
            email=email,
            age=age
        )
        self.next_id += 1
        self.users[user.id] = user
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

        return user

    def delete_user(self, user_id: int) -> bool:
        if user_id in self.users:
            del self.users[user_id]
            return True
        return False

# View - Passive view with no logic
class UserView:
    def __init__(self):
        self.add_user_callbacks: List[Callable] = []
        self.update_user_callbacks: List[Callable] = []
        self.delete_user_callbacks: List[Callable] = []
        self.view_users_callbacks: List[Callable] = []

    def display_users(self, users: List[User]) -> None:
        print("=== User List ===")
        for user in users:
            print(f"ID: {user.id} | Name: {user.name} | Email: {user.email} | Age: {user.age}")

    def display_error(self, message: str) -> None:
        print(f"❌ Error: {message}")

    def display_success(self, message: str) -> None:
        print(f"✅ {message}")

    def display_user_form(self, user: Optional[User] = None) -> None:
        if user:
            print(f"Editing user: {user.name}")
        else:
            print("Creating new user")

    def on_add_user_click(self, callback: Callable[[str, str, int], None]) -> None:
        self.add_user_callbacks.append(callback)

    def on_update_user_click(self, callback: Callable[[int, str, str, int], None]) -> None:
        self.update_user_callbacks.append(callback)

    def on_delete_user_click(self, callback: Callable[[int], None]) -> None:
        self.delete_user_callbacks.append(callback)

    def on_view_users_click(self, callback: Callable[[], None]) -> None:
        self.view_users_callbacks.append(callback)

    def trigger_add_user(self, name: str, email: str, age: int) -> None:
        for callback in self.add_user_callbacks:
            callback(name, email, age)

    def trigger_update_user(self, user_id: int, name: str, email: str, age: int) -> None:
        for callback in self.update_user_callbacks:
            callback(user_id, name, email, age)

    def trigger_delete_user(self, user_id: int) -> None:
        for callback in self.delete_user_callbacks:
            callback(user_id)

    def trigger_view_users(self) -> None:
        for callback in self.view_users_callbacks:
            callback()

# Presenter - Contains presentation logic
class UserPresenter:
    def __init__(self, model: UserModel, view: UserView):
        self.model = model
        self.view = view
        self.setup_view_callbacks()

    def setup_view_callbacks(self) -> None:
        self.view.on_add_user_click(self.handle_add_user)
        self.view.on_update_user_click(self.handle_update_user)
        self.view.on_delete_user_click(self.handle_delete_user)
        self.view.on_view_users_click(self.handle_view_users)

    def handle_add_user(self, name: str, email: str, age: int) -> None:
        try:
            user = self.model.add_user(name, email, age)
            self.view.display_success(f"User added with ID: {user.id}")
            self.handle_view_users()
        except ValueError as e:
            self.view.display_error(str(e))

    def handle_update_user(self, user_id: int, name: str, email: str, age: int) -> None:
        try:
            user = self.model.update_user(user_id, name=name, email=email, age=age)
            if user:
                self.view.display_success(f"User {user_id} updated")
                self.handle_view_users()
            else:
                self.view.display_error(f"User {user_id} not found")
        except ValueError as e:
            self.view.display_error(str(e))

    def handle_delete_user(self, user_id: int) -> None:
        if self.model.delete_user(user_id):
            self.view.display_success(f"User {user_id} deleted")
            self.handle_view_users()
        else:
            self.view.display_error(f"User {user_id} not found")

    def handle_view_users(self) -> None:
        users = self.model.get_all_users()
        self.view.display_users(users)

    def start(self) -> None:
        self.handle_view_users()

# Usage
model = UserModel()
view = UserView()
presenter = UserPresenter(model, view)

presenter.start()
view.trigger_add_user("John Doe", "john@example.com", 30)
view.trigger_view_users()
```

:::

## Real-World Examples

### Android Application

Android MVP is commonly used for mobile development:

- **Model**: Database and API calls
- **View**: Activity or Fragment (receives commands from Presenter)
- **Presenter**: Contains UI logic (testable)

### Desktop Application (WinForms/WPF)

Windows Forms often use MVP:

- Views are forms or user controls
- Presenters handle all business logic
- Models provide data

## Advantages ✅

- **Improved Testability**: Presenter logic can be tested without UI
- **Passive Views**: Views contain minimal code, mostly just rendering
- **Clear Separation**: Strong separation between presentation and business logic
- **Easier Maintenance**: Changes to business logic don't require UI changes
- **Reusable Presenters**: Same presenter can work with different views
- **Better Documentation**: Clear responsibility of each component
- **Reduced Coupling**: Views don't need to know about models
- **Flexible View Implementation**: Views can be easily replaced

## Disadvantages ❌

- **Boilerplate Code**: More code to write for simple applications
- **Learning Curve**: Developers need to understand the pattern
- **Complexity**: Additional abstraction layer
- **Callback Management**: Managing callbacks between View and Presenter can be complex
- **Performance**: Extra layer can add slight overhead
- **Two-Way Binding**: Synchronizing view and model state can be tricky
- **View-Presenter Communication**: Requires careful interface design
- **Testing View**: Views are still hard to test (by design)

## When to Use ✅

- **Testable UI Applications**: When unit testing presentation logic is important
- **Large Desktop Applications**: WinForms, WPF, or Java Swing applications
- **Mobile Applications**: Android, iOS native development
- **Applications with Complex UI Logic**: When presentation logic is substantial
- **Multiple Views per Model**: When different views need the same logic
- **Long-Term Projects**: Where maintainability is critical
- **Team Development**: When multiple developers work on UI
- **Legacy System Modernization**: When improving existing applications

## When NOT to Use ❌

- **Simple Web Pages**: Static content or simple templates
- **Real-Time Applications**: Where synchronization overhead matters
- **Rapid Prototyping**: Quick proof-of-concepts
- **Performance-Critical Systems**: Where every millisecond counts
- **Simple Scripts**: Command-line utilities
- **SPA Frameworks**: React, Vue, Angular have their own patterns (MVVM)
- **Micro-Applications**: Very small applications with minimal logic
- **Event-Driven Systems**: Where event patterns are already established

## Related Patterns

- **Model-View-Controller (MVC)**: The predecessor pattern
- **Model-View-ViewModel (MVVM)**: Alternative with data binding
- **Observer Pattern**: Used for view-presenter communication
- **Command Pattern**: Used to encapsulate presenter actions
- **Strategy Pattern**: For different presentation strategies
- **Factory Pattern**: For creating views and presenters
