---
title: Command
description: Encapsulate requests as objects, allowing parameterization of clients with different requests, queuing, and logging.
icon: Command
---

# Command

![Cover](/covers/behavioral/command.png)

## Overview

The **Command** pattern is a behavioral design pattern that encapsulates a request as an object, thereby allowing you to parameterize clients with different requests, queue requests, and support undoable operations. This pattern turns an action or request into a standalone object that can be passed around, stored, and executed.

## Purpose

The Command pattern aims to:

- Encapsulate requests as objects so they can be parameterized and queued
- Decouple the object that invokes an operation from the one that performs it
- Support undoable and redoable operations
- Support queuing operations, scheduling execution, and logging
- Support transactions and macro commands

## Problem

Consider a text editor with undo/redo functionality. Without the Command pattern, you might have:

```typescript
// Without Command pattern - tightly coupled
class TextEditor {
  private text = "";

  executeUndo() {
    // How do we know what to undo?
    // What if we have multiple undo operations?
  }

  executeRedo() {
    // Similar problem
  }
}
```

Issues with this approach:

- No clear way to handle undo/redo for different operations
- Tightly coupling operations to the editor
- Difficult to queue or schedule operations
- Hard to log or audit what operations were performed
- Cannot easily support macros or composite operations

## Solution

The Command pattern solves this by creating command objects that encapsulate operations. Each command knows how to execute itself and potentially how to undo itself.

```typescript
// Command interface
interface Command {
  execute(): void;
  undo(): void;
}

// Concrete commands
class InsertTextCommand implements Command {
  constructor(
    private editor: TextEditor,
    private position: number,
    private text: string,
  ) {}

  execute(): void {
    this.editor.insertText(this.position, this.text);
  }

  undo(): void {
    this.editor.deleteText(this.position, this.text.length);
  }
}

// Invoker
class TextEditor {
  private history: Command[] = [];
  private undoStack: Command[] = [];

  executeCommand(command: Command): void {
    command.execute();
    this.history.push(command);
    this.undoStack = []; // Clear redo stack
  }

  undo(): void {
    const command = this.history.pop();
    if (command) {
      command.undo();
      this.undoStack.push(command);
    }
  }

  redo(): void {
    const command = this.undoStack.pop();
    if (command) {
      command.execute();
      this.history.push(command);
    }
  }
}
```

## Implementation

::: code-group

```typescript [typescript]
// Command interface
    interface Command {
      execute(): void;
      undo(): void;
      getDescription(): string;
    }

    // Receiver class
    class Document {
      private text: string = '';

      getText(): string {
        return this.text;
      }

      addText(position: number, text: string): void {
        this.text = this.text.slice(0, position) + text + this.text.slice(position);
      }

      deleteText(position: number, length: number): void {
        this.text = this.text.slice(0, position) + this.text.slice(position + length);
      }

      replaceText(position: number, length: number, text: string): void {
        this.text = this.text.slice(0, position) + text + this.text.slice(position + length);
      }

      format(position: number, length: number, style: string): void {
        // Apply formatting
        console.log(`Applied ${style} to text at position ${position}`);
      }
    }

    // Concrete command 1
    class AddTextCommand implements Command {
      private previousText: string = '';

      constructor(
        private document: Document,
        private position: number,
        private text: string
      ) {}

      execute(): void {
        this.previousText = this.document.getText();
        this.document.addText(this.position, this.text);
      }

      undo(): void {
        this.document.deleteText(this.position, this.text.length);
      }

      getDescription(): string {
        return `Added "${this.text}" at position ${this.position}`;
      }
    }

    // Concrete command 2
    class DeleteTextCommand implements Command {
      private deletedText: string = '';

      constructor(
        private document: Document,
        private position: number,
        private length: number
      ) {}

      execute(): void {
        const text = this.document.getText();
        this.deletedText = text.slice(this.position, this.position + this.length);
        this.document.deleteText(this.position, this.length);
      }

      undo(): void {
        this.document.addText(this.position, this.deletedText);
      }

      getDescription(): string {
        return `Deleted ${this.length} characters at position ${this.position}`;
      }
    }

    // Concrete command 3 - Macro command
    class FormatTextCommand implements Command {
      constructor(
        private document: Document,
        private position: number,
        private length: number,
        private style: string
      ) {}

      execute(): void {
        this.document.format(this.position, this.length, this.style);
      }

      undo(): void {
        this.document.format(this.position, this.length, 'normal');
      }

      getDescription(): string {
        return `Applied ${this.style} formatting to text`;
      }
    }

    // Invoker class
    class CommandHistory {
      private history: Command[] = [];
      private undoStack: Command[] = [];

      executeCommand(command: Command): void {
        command.execute();
        this.history.push(command);
        this.undoStack = []; // Clear redo stack
        console.log(`Executed: ${command.getDescription()}`);
      }

      undo(): boolean {
        if (this.history.length === 0) return false;
        const command = this.history.pop()!;
        command.undo();
        this.undoStack.push(command);
        console.log(`Undone: ${command.getDescription()}`);
        return true;
      }

      redo(): boolean {
        if (this.undoStack.length === 0) return false;
        const command = this.undoStack.pop()!;
        command.execute();
        this.history.push(command);
        console.log(`Redone: ${command.getDescription()}`);
        return true;
      }

      getHistory(): string {
        return this.history.map(cmd => cmd.getDescription()).join('\n');
      }
    }

    // Usage
    const document = new Document();
    const editor = new CommandHistory();

    const cmd1 = new AddTextCommand(document, 0, 'Hello');
    editor.executeCommand(cmd1);

    const cmd2 = new AddTextCommand(document, 5, ' World');
    editor.executeCommand(cmd2);

    console.log(document.getText()); // "Hello World"

    editor.undo(); // Removes " World"
    console.log(document.getText()); // "Hello"

    editor.redo(); // Adds " World" back
    console.log(document.getText()); // "Hello World"
```

  
```python [python]
from abc import ABC, abstractmethod
    from typing import List

    class Document:
        def __init__(self):
            self.text = ""

        def get_text(self) -> str:
            return self.text

        def add_text(self, position: int, text: str) -> None:
            self.text = self.text[:position] + text + self.text[position:]

        def delete_text(self, position: int, length: int) -> None:
            self.text = self.text[:position] + self.text[position + length:]

        def format(self, position: int, length: int, style: str) -> None:
            print(f"Applied {style} to text at position {position}")

    class Command(ABC):
        @abstractmethod
        def execute(self) -> None:
            pass

        @abstractmethod
        def undo(self) -> None:
            pass

        @abstractmethod
        def get_description(self) -> str:
            pass

    class AddTextCommand(Command):
        def __init__(self, document: Document, position: int, text: str):
            self.document = document
            self.position = position
            self.text = text

        def execute(self) -> None:
            self.document.add_text(self.position, self.text)

        def undo(self) -> None:
            self.document.delete_text(self.position, len(self.text))

        def get_description(self) -> str:
            return f'Added "{self.text}" at position {self.position}'

    class DeleteTextCommand(Command):
        def __init__(self, document: Document, position: int, length: int):
            self.document = document
            self.position = position
            self.length = length
            self.deleted_text = ""

        def execute(self) -> None:
            text = self.document.get_text()
            self.deleted_text = text[self.position:self.position + self.length]
            self.document.delete_text(self.position, self.length)

        def undo(self) -> None:
            self.document.add_text(self.position, self.deleted_text)

        def get_description(self) -> str:
            return f"Deleted {self.length} characters at position {self.position}"

    class CommandHistory:
        def __init__(self):
            self.history: List[Command] = []
            self.undo_stack: List[Command] = []

        def execute_command(self, command: Command) -> None:
            command.execute()
            self.history.append(command)
            self.undo_stack = []  # Clear redo stack
            print(f"Executed: {command.get_description()}")

        def undo(self) -> bool:
            if not self.history:
                return False
            command = self.history.pop()
            command.undo()
            self.undo_stack.append(command)
            print(f"Undone: {command.get_description()}")
            return True

        def redo(self) -> bool:
            if not self.undo_stack:
                return False
            command = self.undo_stack.pop()
            command.execute()
            self.history.append(command)
            print(f"Redone: {command.get_description()}")
            return True

    # Usage
    document = Document()
    editor = CommandHistory()

    cmd1 = AddTextCommand(document, 0, "Hello")
    editor.execute_command(cmd1)

    cmd2 = AddTextCommand(document, 5, " World")
    editor.execute_command(cmd2)

    print(document.get_text())  # Hello World

    editor.undo()  # Removes " World"
    print(document.get_text())  # Hello

    editor.redo()  # Adds " World" back
    print(document.get_text())  # Hello World
```

:::

## Real-World Example

### Task Scheduler and Batch Processing

```typescript
interface Task extends Command {
  getPriority(): number;
  getEstimatedTime(): number;
}

class EmailTask implements Task {
  constructor(
    private recipient: string,
    private subject: string,
    private body: string,
  ) {}

  execute(): void {
    console.log(`Sending email to ${this.recipient}: ${this.subject}`);
    // Send email logic
  }

  undo(): void {
    console.log(`Email to ${this.recipient} marked as unsent`);
  }

  getPriority(): number {
    return 1;
  }

  getEstimatedTime(): number {
    return 100; // milliseconds
  }

  getDescription(): string {
    return `Email to ${this.recipient}`;
  }
}

class TaskScheduler {
  private queue: Task[] = [];

  schedule(task: Task): void {
    this.queue.push(task);
    this.queue.sort((a, b) => b.getPriority() - a.getPriority());
  }

  processAll(): void {
    while (this.queue.length > 0) {
      const task = this.queue.shift()!;
      task.execute();
    }
  }

  executeLater(task: Task, delay: number): void {
    setTimeout(() => task.execute(), delay);
  }
}

// Usage
const scheduler = new TaskScheduler();
scheduler.schedule(new EmailTask("user@example.com", "Welcome", "Welcome aboard!"));
scheduler.processAll();
```

## Advantages

✅ **Decoupling** - Decouples objects that invoke operations from those that perform them
✅ **Undo/Redo Support** - Easy to implement undo and redo functionality
✅ **Queuing Operations** - Commands can be queued, logged, and executed later
✅ **Macro Commands** - Support for composite commands (macro operations)
✅ **Flexible Execution** - Commands can be executed immediately or scheduled
✅ **Auditing** - Easy to track and log all operations performed
✅ **Transactional Support** - Easier to implement atomic operations

## Disadvantages

❌ **Memory Overhead** - Each command object requires memory allocation
❌ **Complexity** - Increased number of classes for each command type
❌ **Undo Storage** - Storing large command histories can consume significant memory
❌ **Error Handling** - Complex to handle errors in command chains
❌ **Performance** - Extra layer of indirection can impact performance

## When to Use

- You need to parameterize objects with operations
- You need to queue operations, schedule their execution, or execute them remotely
- You need to support undo/redo operations
- You need to support logging changes or transaction support
- You need to structure a system around high-level operations built on primitive operations
- You want to avoid tight coupling between clients and service objects

## When NOT to Use

- Operations are simple and don't require undo/redo
- You need real-time execution without any delay
- Memory is extremely limited and command history is large
- The system is already using asynchronous events
- Simple function calls would be more appropriate

## Related Patterns

- **Memento** - Often used with Command for storing state snapshots for undo
- **Observer** - Can be used to notify objects about command execution
- **Strategy** - Similar but Strategy encapsulates algorithms while Command encapsulates requests
- **Composite** - Can be used to create macro commands
- **Iterator** - Can be used to iterate through command history
