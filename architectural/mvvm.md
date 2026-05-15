---
title: Model-View-ViewModel (MVVM)
description: Separates UI from business logic with data binding
icon: Box
---

import { Callout } from "fumadocs-ui/components/callout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "fumadocs-ui/components/tabs";

## Overview

The **Model-View-ViewModel (MVVM)** pattern is an architectural pattern designed for applications with complex UI requirements. It divides an application into:

- **Model**: Contains data and business logic
- **View**: The UI layer (markup and minimal code-behind)
- **ViewModel**: Exposes data and commands for the view via data binding

MVVM is ideal for frameworks that support declarative UI and data binding like WPF, Angular, and Vue.js.

## Purpose

The MVVM pattern aims to:

- Enable clear separation between UI and business logic
- Support two-way data binding
- Make the view completely testable through the ViewModel
- Allow designers and developers to work independently
- Reduce code-behind complexity
- Enable reactive UI updates

## Problem

Traditional UI development often suffers from:

- Code-behind containing business logic mixed with UI updates
- Hard to test UI interactions
- Tight coupling between view and logic
- UI updates scattered throughout the codebase
- Designers cannot work independently from developers
- Difficult to reuse UI logic

```
❌ Traditional UI Code-Behind
┌──────────────────────┐
│   View + Code-Behind │
├──────────────────────┤
│ • UI Markup          │
│ • Event Handlers     │
│ • Business Logic ❌  │
│ • Data Binding       │
│ • Validation         │
└──────────────────────┘
```

## Solution

MVVM separates concerns and enables data binding:

```
✅ MVVM Architecture
┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│    Model     │      │    View      │      │  ViewModel   │
├──────────────┤      ├──────────────┤      ├──────────────┤
│ • Data       │◄─────│ • Markup     │◄────→│ • Properties │
│ • Business   │      │ • Minimal    │  ◄───│ • Commands   │
│   Logic      │      │   Code       │  Data│ • Logic      │
│ • Events     │      │              │ Bind │ • Validation │
└──────────────┘      └──────────────┘      └──────────────┘
      ▲                                              ▲
      └──────────────────────────────────────────────┘
        Two-way Data Binding & Notifications
```

**Flow:**

1. User interacts with View
2. View triggers ViewModel command
3. ViewModel updates Model or notifies View
4. Data binding automatically updates View
5. ViewModel notifies View of changes

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

    Object.assign(user, updates);
    return user;
  }

  deleteUser(id: number): boolean {
    return this.users.delete(id);
  }
}

// ViewModel - Exposes model data and commands with Observable pattern
interface ObserverCallback {
  (): void;
}

class Observable<T> {
  private value: T;
  private observers: ObserverCallback[] = [];

  constructor(initialValue: T) {
    this.value = initialValue;
  }

  get(): T {
    return this.value;
  }

  set(newValue: T): void {
    this.value = newValue;
    this.notifyObservers();
  }

  subscribe(callback: ObserverCallback): () => void {
    this.observers.push(callback);
    return () => {
      this.observers = this.observers.filter((obs) => obs !== callback);
    };
  }

  private notifyObservers(): void {
    this.observers.forEach((callback) => callback());
  }
}

class UserViewModel {
  private model: UserModel;
  private users: Observable<User[]>;
  private selectedUser: Observable<User | null>;
  private isLoading: Observable<boolean>;
  private errorMessage: Observable<string>;

  // Form data
  private formName: Observable<string>;
  private formEmail: Observable<string>;
  private formAge: Observable<number>;

  constructor(model: UserModel) {
    this.model = model;
    this.users = new Observable(this.model.getAllUsers());
    this.selectedUser = new Observable<User | null>(null);
    this.isLoading = new Observable(false);
    this.errorMessage = new Observable("");
    this.formName = new Observable("");
    this.formEmail = new Observable("");
    this.formAge = new Observable(0);
  }

  // Properties for data binding
  get users$() {
    return this.users;
  }

  get selectedUser$() {
    return this.selectedUser;
  }

  get isLoading$() {
    return this.isLoading;
  }

  get errorMessage$() {
    return this.errorMessage;
  }

  get formName$() {
    return this.formName;
  }

  get formEmail$() {
    return this.formEmail;
  }

  get formAge$() {
    return this.formAge;
  }

  // Commands
  addUserCommand(): void {
    try {
      this.isLoading.set(true);
      this.errorMessage.set("");

      const user = this.model.addUser(
        this.formName.get(),
        this.formEmail.get(),
        this.formAge.get(),
      );

      this.users.set(this.model.getAllUsers());
      this.clearForm();
      console.log(`✅ User added with ID: ${user.id}`);
    } catch (error) {
      this.errorMessage.set((error as Error).message);
    } finally {
      this.isLoading.set(false);
    }
  }

  updateUserCommand(id: number): void {
    try {
      this.isLoading.set(true);
      this.errorMessage.set("");

      const updated = this.model.updateUser(id, {
        name: this.formName.get(),
        email: this.formEmail.get(),
        age: this.formAge.get(),
      });

      if (updated) {
        this.users.set(this.model.getAllUsers());
        this.selectedUser.set(updated);
        this.clearForm();
        console.log(`✅ User ${id} updated`);
      } else {
        this.errorMessage.set(`User ${id} not found`);
      }
    } catch (error) {
      this.errorMessage.set((error as Error).message);
    } finally {
      this.isLoading.set(false);
    }
  }

  deleteUserCommand(id: number): void {
    try {
      const deleted = this.model.deleteUser(id);
      if (deleted) {
        this.users.set(this.model.getAllUsers());
        this.selectedUser.set(null);
        console.log(`✅ User ${id} deleted`);
      } else {
        this.errorMessage.set(`User ${id} not found`);
      }
    } catch (error) {
      this.errorMessage.set((error as Error).message);
    }
  }

  selectUserCommand(user: User): void {
    this.selectedUser.set(user);
    this.formName.set(user.name);
    this.formEmail.set(user.email);
    this.formAge.set(user.age);
  }

  private clearForm(): void {
    this.formName.set("");
    this.formEmail.set("");
    this.formAge.set(0);
  }
}

// View - Simple UI layer
class UserView {
  constructor(private viewModel: UserViewModel) {
    this.bindData();
  }

  private bindData(): void {
    // Subscribe to ViewModel observable properties
    this.viewModel.users$.subscribe(() => this.renderUserList());
    this.viewModel.errorMessage$.subscribe(() => this.renderErrors());
    this.viewModel.isLoading$.subscribe(() => this.renderLoadingState());
  }

  private renderUserList(): void {
    const users = this.viewModel.users$.get();
    console.log("=== User List ===");
    users.forEach((user) => {
      console.log(`ID: ${user.id} | ${user.name} (${user.email}) - Age: ${user.age}`);
    });
  }

  private renderErrors(): void {
    const error = this.viewModel.errorMessage$.get();
    if (error) {
      console.error(`❌ ${error}`);
    }
  }

  private renderLoadingState(): void {
    const loading = this.viewModel.isLoading$.get();
    if (loading) {
      console.log("⏳ Loading...");
    }
  }

  // User interactions
  onAddUserFormSubmit(name: string, email: string, age: number): void {
    this.viewModel.formName$.set(name);
    this.viewModel.formEmail$.set(email);
    this.viewModel.formAge$.set(age);
    this.viewModel.addUserCommand();
  }

  onSelectUser(user: User): void {
    this.viewModel.selectUserCommand(user);
  }

  onDeleteUser(id: number): void {
    this.viewModel.deleteUserCommand(id);
  }

  displayUserList(): void {
    this.renderUserList();
  }
}

// Usage
const model = new UserModel();
const viewModel = new UserViewModel(model);
const view = new UserView(viewModel);

view.onAddUserFormSubmit("John Doe", "john@example.com", 30);
view.displayUserList();

view.onAddUserFormSubmit("Jane Smith", "jane@example.com", 28);
view.displayUserList();
```



```python [python]
from typing import Dict, List, Optional, Callable, TypeVar
from dataclasses import dataclass

T = TypeVar('T')

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

        user = User(id=self.next_id, name=name, email=email, age=age)
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
        return bool(self.users.pop(user_id, None))

# Observable - Data binding support
class Observable:
    def __init__(self, initial_value):
        self.value = initial_value
        self.observers: List[Callable] = []

    def get(self):
        return self.value

    def set(self, new_value):
        self.value = new_value
        self.notify_observers()

    def subscribe(self, callback: Callable) -> Callable:
        self.observers.append(callback)
        return lambda: self.observers.remove(callback) if callback in self.observers else None

    def notify_observers(self) -> None:
        for observer in self.observers:
            observer()

# ViewModel - Exposes model data and commands
class UserViewModel:
    def __init__(self, model: UserModel):
        self.model = model
        self.users = Observable(self.model.get_all_users())
        self.selected_user = Observable(None)
        self.is_loading = Observable(False)
        self.error_message = Observable("")
        self.form_name = Observable("")
        self.form_email = Observable("")
        self.form_age = Observable(0)

    def add_user_command(self) -> None:
        try:
            self.is_loading.set(True)
            self.error_message.set("")

            user = self.model.add_user(
                self.form_name.get(),
                self.form_email.get(),
                self.form_age.get()
            )

            self.users.set(self.model.get_all_users())
            self.clear_form()
            print(f"✅ User added with ID: {user.id}")
        except ValueError as e:
            self.error_message.set(str(e))
        finally:
            self.is_loading.set(False)

    def update_user_command(self, user_id: int) -> None:
        try:
            self.is_loading.set(True)
            self.error_message.set("")

            updated = self.model.update_user(
                user_id,
                name=self.form_name.get(),
                email=self.form_email.get(),
                age=self.form_age.get()
            )

            if updated:
                self.users.set(self.model.get_all_users())
                self.selected_user.set(updated)
                self.clear_form()
                print(f"✅ User {user_id} updated")
            else:
                self.error_message.set(f"User {user_id} not found")
        except ValueError as e:
            self.error_message.set(str(e))
        finally:
            self.is_loading.set(False)

    def delete_user_command(self, user_id: int) -> None:
        try:
            if self.model.delete_user(user_id):
                self.users.set(self.model.get_all_users())
                self.selected_user.set(None)
                print(f"✅ User {user_id} deleted")
            else:
                self.error_message.set(f"User {user_id} not found")
        except Exception as e:
            self.error_message.set(str(e))

    def select_user_command(self, user: User) -> None:
        self.selected_user.set(user)
        self.form_name.set(user.name)
        self.form_email.set(user.email)
        self.form_age.set(user.age)

    def clear_form(self) -> None:
        self.form_name.set("")
        self.form_email.set("")
        self.form_age.set(0)

# View - UI layer
class UserView:
    def __init__(self, view_model: UserViewModel):
        self.view_model = view_model
        self.bind_data()

    def bind_data(self) -> None:
        self.view_model.users.subscribe(self.render_user_list)
        self.view_model.error_message.subscribe(self.render_errors)
        self.view_model.is_loading.subscribe(self.render_loading_state)

    def render_user_list(self) -> None:
        users = self.view_model.users.get()
        print("=== User List ===")
        for user in users:
            print(f"ID: {user.id} | {user.name} ({user.email}) - Age: {user.age}")

    def render_errors(self) -> None:
        error = self.view_model.error_message.get()
        if error:
            print(f"❌ {error}")

    def render_loading_state(self) -> None:
        if self.view_model.is_loading.get():
            print("⏳ Loading...")

    def on_add_user_form_submit(self, name: str, email: str, age: int) -> None:
        self.view_model.form_name.set(name)
        self.view_model.form_email.set(email)
        self.view_model.form_age.set(age)
        self.view_model.add_user_command()

    def on_select_user(self, user: User) -> None:
        self.view_model.select_user_command(user)

    def on_delete_user(self, user_id: int) -> None:
        self.view_model.delete_user_command(user_id)

    def display_user_list(self) -> None:
        self.render_user_list()

# Usage
model = UserModel()
view_model = UserViewModel(model)
view = UserView(view_model)

view.on_add_user_form_submit("John Doe", "john@example.com", 30)
view.display_user_list()

view.on_add_user_form_submit("Jane Smith", "jane@example.com", 28)
view.display_user_list()
```

:::

## Real-World Examples

### WPF (Windows Presentation Foundation)

MVVM is the standard for WPF applications:

```xml
<TextBlock Text="{Binding FirstName, Mode=TwoWay}" />
<Button Command="{Binding SaveCommand}" />
```

### Angular Framework

Angular uses MVVM principles:

- **Model**: Services and data models
- **View**: Component templates
- **ViewModel**: Component class with `@Input` and `@Output`

### Vue.js

Vue naturally follows MVVM:

```javascript
data() {
  return { message: '' }
}
methods: {
  updateMessage() { /* ... */ }
}
```

## Advantages ✅

- **Two-Way Data Binding**: Automatic synchronization between View and ViewModel
- **Testable**: ViewModel can be thoroughly tested without UI
- **Separation of Concerns**: UI is completely separate from logic
- **Designer-Developer Separation**: Designers can work on View independently
- **Declarative Binding**: UI changes automatically with data
- **Reusable ViewModels**: Same logic can serve multiple views
- **Reactive Updates**: Changes propagate automatically
- **Clean Code-Behind**: Views have minimal code-behind

## Disadvantages ❌

- **Complexity**: Requires understanding of data binding
- **Learning Curve**: Developers new to MVVM need training
- **Performance**: Data binding can add overhead
- **Debugging**: Two-way binding can make debugging harder
- **Memory Leaks**: Improper subscription management can leak memory
- **Over-Engineering**: May be excessive for simple applications
- **Framework Lock-In**: Often tied to specific frameworks
- **Binding Issues**: Circular bindings or binding errors can be hard to trace

## When to Use ✅

- **WPF Applications**: Native Windows applications
- **Angular Applications**: Single-page web applications
- **Vue.js Projects**: Reactive web frameworks
- **Complex UI Logic**: Applications with sophisticated UI
- **Data-Heavy Interfaces**: When binding multiple data sources
- **Designer-Developer Workflow**: When UI design is separate from development
- **Reactive Systems**: Applications needing reactive updates
- **Long-Term Maintenance**: Projects with complex UI requirements

## When NOT to Use ❌

- **Simple Web Pages**: Static content or minimal interactivity
- **Real-Time Systems**: Where binding overhead matters
- **Server-Side Rendering**: Traditional server-side applications
- **Simple Scripts**: Command-line tools or utilities
- **Performance-Critical**: Latency-sensitive applications
- **Legacy Systems**: Where MVVM framework support is absent
- **Rapid Prototypes**: Quick throwaway projects
- **Microservices**: Where UI is already decoupled

## Related Patterns

- **Model-View-Controller (MVC)**: The original three-tier pattern
- **Model-View-Presenter (MVP)**: Similar but without automatic binding
- **Observer Pattern**: Foundation for reactive data binding
- **Command Pattern**: Used for ViewModel commands
- **Property Pattern**: Used for observable properties
- **Mediator Pattern**: ViewModel mediates between View and Model
