---
title: Mediator
description: Encapsulate complex communication between objects. Promote loose coupling by defining an object that coordinates interaction.
icon: Users
---

import { Callout } from "fumadocs-ui/components/callout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "fumadocs-ui/components/tabs";

## Overview

The **Mediator** pattern is a behavioral design pattern that promotes loose coupling by keeping objects from referring to each other explicitly and letting a mediator object handle their interactions. It centralizes complex communication and control logic between objects.

## Purpose

The Mediator pattern aims to:

- Centralize complex communication between multiple objects
- Promote loose coupling by avoiding direct object references
- Simplify object interactions and dependencies
- Make the system easier to understand and maintain
- Reduce the number of connections between objects
- Reuse objects in different contexts

## Problem

Consider a dialog box with multiple UI controls that interact with each other:

```typescript
// Without Mediator pattern - tightly coupled
class LoginDialog {
  usernameTxt: TextBox;
  passwordTxt: TextBox;
  loginBtn: Button;
  registerBtn: Button;

  constructor() {
    // Controls have direct dependencies on each other
    this.loginBtn.onClick = () => {
      // Complex interdependencies
      if (this.usernameTxt.getText() && this.passwordTxt.getText()) {
        this.registerBtn.setEnabled(false);
      }
    };
  }
}
```

Issues with this approach:

- Each component needs to know about others
- Complex interdependencies create a web of connections
- Difficult to modify one component without affecting others
- Hard to reuse components in different contexts
- Testing components in isolation is difficult
- Adding new interactions requires modifying multiple classes

## Solution

The Mediator pattern centralizes this communication logic in a mediator object:

```typescript
// Mediator interface
interface Mediator {
  sendMessage(message: string, sender: UIComponent): void;
}

// Component interface
interface UIComponent {
  setMediator(mediator: Mediator): void;
}

// Concrete mediator
class LoginDialogMediator implements Mediator {
  sendMessage(message: string, sender: UIComponent): void {
    // Handle all component interactions here
  }
}
```

## Implementation

::: code-group
<TabsList className="grid w-full grid-cols-2">
    <TabsTrigger value="typescript">TypeScript</TabsTrigger>
    <TabsTrigger value="python">Python</TabsTrigger>
  </TabsList>

  
```typescript [typescript]
// Mediator interface
    interface ChatMediator {
      displayMessage(user: User, message: string): void;
      addUser(user: User): void;
      removeUser(user: User): void;
    }

    // Colleague interface
    abstract class User {
      protected mediator: ChatMediator;
      protected name: string;

      constructor(mediator: ChatMediator, name: string) {
        this.mediator = mediator;
        this.name = name;
      }

      getName(): string {
        return this.name;
      }

      send(message: string): void {
        console.log(`${this.name} sends: ${message}`);
        this.mediator.displayMessage(this, message);
      }

      abstract receive(message: string): void;
    }

    // Concrete colleagues
    class RegularUser extends User {
      receive(message: string): void {
        console.log(`${this.name} received: ${message}`);
      }
    }

    class AdminUser extends User {
      receive(message: string): void {
        console.log(`ADMIN ${this.name} received: ${message}`);
      }

      banUser(user: User): void {
        this.mediator.removeUser(user);
        this.send(`${user.getName()} has been banned`);
      }
    }

    // Concrete mediator
    class ChatRoom implements ChatMediator {
      private users: Map<string, User> = new Map();

      addUser(user: User): void {
        this.users.set(user.getName(), user);
        this.broadcastMessage(`${user.getName()} joined the chat`);
      }

      removeUser(user: User): void {
        this.users.delete(user.getName());
        this.broadcastMessage(`${user.getName()} left the chat`);
      }

      displayMessage(sender: User, message: string): void {
        // Broadcast to all users
        this.users.forEach((user) => {
          if (user.getName() !== sender.getName()) {
            user.receive(`${sender.getName()}: ${message}`);
          }
        });
      }

      private broadcastMessage(message: string): void {
        this.users.forEach((user) => {
          user.receive(message);
        });
      }

      getUser(name: string): User | undefined {
        return this.users.get(name);
      }
    }

    // Usage
    const chatRoom = new ChatRoom();

    const user1 = new RegularUser(chatRoom, 'Alice');
    const user2 = new RegularUser(chatRoom, 'Bob');
    const admin = new AdminUser(chatRoom, 'Admin');

    chatRoom.addUser(user1);
    chatRoom.addUser(user2);
    chatRoom.addUser(admin);

    user1.send('Hello everyone!');
    user2.send('Hi Alice!');
    admin.send('Welcome to chat room!');
```


  
```python [python]
from abc import ABC, abstractmethod
    from typing import Dict

    class ChatMediator(ABC):
        @abstractmethod
        def display_message(self, user: 'User', message: str) -> None:
            pass

        @abstractmethod
        def add_user(self, user: 'User') -> None:
            pass

        @abstractmethod
        def remove_user(self, user: 'User') -> None:
            pass

    class User(ABC):
        def __init__(self, mediator: ChatMediator, name: str):
            self.mediator = mediator
            self.name = name

        def get_name(self) -> str:
            return self.name

        def send(self, message: str) -> None:
            print(f"{self.name} sends: {message}")
            self.mediator.display_message(self, message)

        @abstractmethod
        def receive(self, message: str) -> None:
            pass

    class RegularUser(User):
        def receive(self, message: str) -> None:
            print(f"{self.name} received: {message}")

    class AdminUser(User):
        def receive(self, message: str) -> None:
            print(f"ADMIN {self.name} received: {message}")

        def ban_user(self, user: User) -> None:
            self.mediator.remove_user(user)
            self.send(f"{user.get_name()} has been banned")

    class ChatRoom(ChatMediator):
        def __init__(self):
            self.users: Dict[str, User] = {}

        def add_user(self, user: User) -> None:
            self.users[user.get_name()] = user
            self.broadcast_message(f"{user.get_name()} joined the chat")

        def remove_user(self, user: User) -> None:
            if user.get_name() in self.users:
                del self.users[user.get_name()]
            self.broadcast_message(f"{user.get_name()} left the chat")

        def display_message(self, sender: User, message: str) -> None:
            for user in self.users.values():
                if user.get_name() != sender.get_name():
                    user.receive(f"{sender.get_name()}: {message}")

        def broadcast_message(self, message: str) -> None:
            for user in self.users.values():
                user.receive(message)

        def get_user(self, name: str) -> User:
            return self.users.get(name)

    # Usage
    chat_room = ChatRoom()

    user1 = RegularUser(chat_room, "Alice")
    user2 = RegularUser(chat_room, "Bob")
    admin = AdminUser(chat_room, "Admin")

    chat_room.add_user(user1)
    chat_room.add_user(user2)
    chat_room.add_user(admin)

    user1.send("Hello everyone!")
    user2.send("Hi Alice!")
    admin.send("Welcome to chat room!")
```

:::

## Real-World Example

### Flight Control Tower

```typescript
class Airplane {
  constructor(
    private callSign: string,
    private mediator: ControlTower,
  ) {}

  requestLanding(): void {
    this.mediator.requestLanding(this);
  }

  requestTakeoff(): void {
    this.mediator.requestTakeoff(this);
  }

  land(): void {
    console.log(`${this.callSign} is landing`);
  }

  takeoff(): void {
    console.log(`${this.callSign} is taking off`);
  }

  getCallSign(): string {
    return this.callSign;
  }
}

class ControlTower {
  private airplanes: Airplane[] = [];
  private runwayBusy: boolean = false;

  registerAirplane(airplane: Airplane): void {
    this.airplanes.push(airplane);
  }

  requestLanding(airplane: Airplane): void {
    if (!this.runwayBusy) {
      this.runwayBusy = true;
      airplane.land();
      this.runwayBusy = false;
    } else {
      console.log(`${airplane.getCallSign()} hold position, runway busy`);
    }
  }

  requestTakeoff(airplane: Airplane): void {
    if (!this.runwayBusy) {
      this.runwayBusy = true;
      airplane.takeoff();
      this.runwayBusy = false;
    } else {
      console.log(`${airplane.getCallSign()} wait for clearance`);
    }
  }
}

// Usage
const tower = new ControlTower();
const plane1 = new Airplane("AA101", tower);
const plane2 = new Airplane("BA202", tower);

tower.registerAirplane(plane1);
tower.registerAirplane(plane2);

plane1.requestLanding();
plane2.requestLanding(); // Will be told to hold position
```

## Advantages

✅ **Centralized Control** - All complex interactions are in one place
✅ **Loose Coupling** - Objects don't need direct references to each other
✅ **Single Responsibility** - Each colleague handles only its own logic
✅ **Reusability** - Colleagues can be reused with different mediators
✅ **Simplified Communication** - Clear paths for object interaction
✅ **Easier Maintenance** - Changes to interaction logic don't affect colleagues
✅ **Testability** - Easier to test colleagues in isolation

## Disadvantages

❌ **Mediator Complexity** - Mediator can become very complex with many colleagues
❌ **God Object Problem** - Mediator might become a monolithic object with too much responsibility
❌ **Performance** - Additional indirection through mediator can impact performance
❌ **Debugging** - Complex logic in mediator can make debugging harder
❌ **Not Always Clear** - May not be obvious when to use mediator pattern
❌ **Mediator Reusability** - Mediators are often specific to certain colleague configurations

## When to Use

- You have complex communication between multiple objects
- Objects need to be loosely coupled
- You want to centralize control logic
- You want to make objects reusable in different contexts
- You want to vary interactions dynamically
- You have "god object" tendencies that need refactoring
- You need to coordinate interaction between multiple independent objects

## When NOT to Use

- Communication between objects is simple and straightforward
- There are only two or three objects communicating
- Direct object references are appropriate
- Performance is critical with many interactions
- The mediator logic would be trivial
- You can use simpler patterns like Observer
- Objects need peer-to-peer communication

## Related Patterns

- **Observer** - Alternative for loose coupling but with different communication model
- **Facade** - Similar intent but works with subsystems
- **Command** - Can be used with Mediator to encapsulate requests
- **Strategy** - Can be used in mediator for different interaction algorithms
