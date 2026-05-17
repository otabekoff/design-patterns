---
title: Memento
description: Capture and externalize an object's internal state without violating encapsulation. Support undo/redo functionality.
icon: History
---

# Memento

<CoverImage src="/covers/behavioral/memento.png" alt="Cover">
  <h1>Memento</h1>
  <p>A cute little retro camera taking a snapshot of a sandcastle; next to it, the sandcastle is destroyed, but the robot has the photo and is effortlessly rebuilding it to look exactly like the snapshot.</p>
</CoverImage>

## Overview

The **Memento** pattern is a behavioral design pattern that captures and externalizes an object's internal state without violating encapsulation, allowing the object to be restored to this state later. It's useful for implementing undo/redo functionality and saving application state.

## Purpose

The Memento pattern aims to:

- Capture the internal state of an object at a specific point in time
- Store the state without violating the object's encapsulation
- Restore objects to their previous states
- Implement undo/redo functionality
- Provide checkpoints for state recovery
- Support saving and restoring application state

## Problem

Consider an editor that needs undo functionality. Without the Memento pattern:

```typescript
// Without Memento pattern - encapsulation violation
class Editor {
  private text: string = "";

  // Violates encapsulation - exposes private state
  getInternalState(): any {
    return { text: this.text };
  }

  setInternalState(state: any): void {
    this.text = state.text;
  }

  undo(): void {
    // How do we know what the previous state was?
  }
}
```

Issues with this approach:

- Internal state is exposed, violating encapsulation
- No clean way to store state snapshots
- Difficult to manage state history
- Object internals become tightly coupled to undo logic
- Hard to version state properly

## Solution

The Memento pattern creates separate objects to hold state:

```typescript
// Memento - holds state
class EditorMemento {
  constructor(private text: string) {}

  getText(): string {
    return this.text;
  }
}

// Originator - creates mementos
class Editor {
  private text: string = "";

  createMemento(): EditorMemento {
    return new EditorMemento(this.text);
  }

  restoreFromMemento(memento: EditorMemento): void {
    this.text = memento.getText();
  }
}

// Caretaker - manages mementos
class EditorHistory {
  private history: EditorMemento[] = [];

  save(memento: EditorMemento): void {
    this.history.push(memento);
  }

  getMemento(index: number): EditorMemento {
    return this.history[index];
  }
}
```

## Implementation

::: code-group

```typescript [typescript]
// Memento class - stores state
    class EditorMemento {
      private readonly content: string;
      private readonly timestamp: Date;

      constructor(content: string) {
        this.content = content;
        this.timestamp = new Date();
      }

      getContent(): string {
        return this.content;
      }

      getTimestamp(): Date {
        return this.timestamp;
      }

      getDescription(): string {
        return `State at ${this.timestamp.toLocaleTimeString()}`;
      }
    }

    // Originator class - creates and uses mementos
    class Editor {
      private content: string = '';

      getContent(): string {
        return this.content;
      }

      setContent(content: string): void {
        this.content = content;
        console.log(`Content changed: "${this.content}"`);
      }

      // Create a memento with current state
      createMemento(): EditorMemento {
        return new EditorMemento(this.content);
      }

      // Restore state from a memento
      restoreFromMemento(memento: EditorMemento): void {
        this.content = memento.getContent();
        console.log(`Content restored: "${this.content}"`);
      }
    }

    // Caretaker class - manages mementos
    class EditorHistory {
      private mementos: EditorMemento[] = [];
      private currentIndex: number = -1;

      save(memento: EditorMemento): void {
        // Remove any mementos after current index (redo stack becomes invalid)
        this.mementos = this.mementos.slice(0, this.currentIndex + 1);
        this.mementos.push(memento);
        this.currentIndex++;
        console.log(`Saved: ${memento.getDescription()}`);
      }

      undo(editor: Editor): boolean {
        if (this.currentIndex <= 0) {
          console.log('Cannot undo');
          return false;
        }

        this.currentIndex--;
        const memento = this.mementos[this.currentIndex];
        editor.restoreFromMemento(memento);
        return true;
      }

      redo(editor: Editor): boolean {
        if (this.currentIndex >= this.mementos.length - 1) {
          console.log('Cannot redo');
          return false;
        }

        this.currentIndex++;
        const memento = this.mementos[this.currentIndex];
        editor.restoreFromMemento(memento);
        return true;
      }

      getHistory(): string {
        return this.mementos
          .map((m, i) => `${i}: ${m.getDescription()}`)
          .join('\n');
      }
    }

    // Usage
    const editor = new Editor();
    const history = new EditorHistory();

    // Make some changes
    editor.setContent('Hello');
    history.save(editor.createMemento());

    editor.setContent('Hello World');
    history.save(editor.createMemento());

    editor.setContent('Hello World!');
    history.save(editor.createMemento());

    console.log(`Current: ${editor.getContent()}`); // Hello World!

    // Undo
    history.undo(editor);
    console.log(`After undo: ${editor.getContent()}`); // Hello World

    history.undo(editor);
    console.log(`After undo: ${editor.getContent()}`); // Hello

    // Redo
    history.redo(editor);
    console.log(`After redo: ${editor.getContent()}`); // Hello World
```

  
```python [python]
from datetime import datetime
    from typing import List

    class EditorMemento:
        def __init__(self, content: str):
            self.content = content
            self.timestamp = datetime.now()

        def get_content(self) -> str:
            return self.content

        def get_timestamp(self) -> datetime:
            return self.timestamp

        def get_description(self) -> str:
            return f"State at {self.timestamp.strftime('%H:%M:%S')}"

    class Editor:
        def __init__(self):
            self.content = ""

        def get_content(self) -> str:
            return self.content

        def set_content(self, content: str) -> None:
            self.content = content
            print(f'Content changed: "{self.content}"')

        def create_memento(self) -> EditorMemento:
            return EditorMemento(self.content)

        def restore_from_memento(self, memento: EditorMemento) -> None:
            self.content = memento.get_content()
            print(f'Content restored: "{self.content}"')

    class EditorHistory:
        def __init__(self):
            self.mementos: List[EditorMemento] = []
            self.current_index: int = -1

        def save(self, memento: EditorMemento) -> None:
            # Remove mementos after current index
            self.mementos = self.mementos[: self.current_index + 1]
            self.mementos.append(memento)
            self.current_index += 1
            print(f"Saved: {memento.get_description()}")

        def undo(self, editor: Editor) -> bool:
            if self.current_index <= 0:
                print("Cannot undo")
                return False

            self.current_index -= 1
            memento = self.mementos[self.current_index]
            editor.restore_from_memento(memento)
            return True

        def redo(self, editor: Editor) -> bool:
            if self.current_index >= len(self.mementos) - 1:
                print("Cannot redo")
                return False

            self.current_index += 1
            memento = self.mementos[self.current_index]
            editor.restore_from_memento(memento)
            return True

        def get_history(self) -> str:
            return "\n".join(
                f"{i}: {m.get_description()}"
                for i, m in enumerate(self.mementos)
            )

    # Usage
    editor = Editor()
    history = EditorHistory()

    # Make some changes
    editor.set_content("Hello")
    history.save(editor.create_memento())

    editor.set_content("Hello World")
    history.save(editor.create_memento())

    editor.set_content("Hello World!")
    history.save(editor.create_memento())

    print(f"Current: {editor.get_content()}")  # Hello World!

    # Undo
    history.undo(editor)
    print(f"After undo: {editor.get_content()}")  # Hello World

    history.undo(editor)
    print(f"After undo: {editor.get_content()}")  # Hello

    # Redo
    history.redo(editor)
    print(f"After redo: {editor.get_content()}")  # Hello World
```

:::

## Real-World Example

### Game Save/Load System

```typescript
interface GameState {
  playerPosition: { x: number; y: number };
  health: number;
  inventory: string[];
  level: number;
}

class GameMemento {
  constructor(private state: GameState) {}

  getState(): GameState {
    return JSON.parse(JSON.stringify(this.state));
  }
}

class Game {
  private state: GameState = {
    playerPosition: { x: 0, y: 0 },
    health: 100,
    inventory: [],
    level: 1,
  };

  updateState(updates: Partial<GameState>): void {
    this.state = { ...this.state, ...updates };
  }

  createSavePoint(): GameMemento {
    return new GameMemento(this.state);
  }

  loadGame(memento: GameMemento): void {
    this.state = memento.getState();
    console.log("Game loaded");
  }

  getState(): GameState {
    return this.state;
  }
}

class GameProgress {
  private saves: Map<string, GameMemento> = new Map();

  save(name: string, memento: GameMemento): void {
    this.saves.set(name, memento);
  }

  load(name: string): GameMemento | undefined {
    return this.saves.get(name);
  }

  listSaves(): string[] {
    return Array.from(this.saves.keys());
  }
}

// Usage
const game = new Game();
const progress = new GameProgress();

game.updateState({ level: 2, health: 80 });
progress.save("checkpoint1", game.createSavePoint());

game.updateState({ level: 3, health: 50 });
progress.save("checkpoint2", game.createSavePoint());

const savePoint = progress.load("checkpoint1");
if (savePoint) {
  game.loadGame(savePoint);
}
```

## Advantages

✅ **Encapsulation** - Preserves encapsulation while storing state
✅ **Undo/Redo Support** - Easy to implement undo/redo functionality
✅ **State Snapshots** - Capture state at specific points in time
✅ **Separation of Concerns** - Originators focus on behavior, caretakers manage history
✅ **Flexible Storage** - Mementos can be stored, transmitted, or logged
✅ **Recovery** - Easy recovery from specific saved states
✅ **Testability** - State can be saved and restored for testing

## Disadvantages

❌ **Memory Overhead** - Storing many mementos consumes significant memory
❌ **Performance Impact** - Creating mementos for large objects is expensive
❌ **Serialization Complexity** - Deep copying state can be complex
❌ **State Size** - Storing complete state can be wasteful
❌ **Not Always Practical** - May not be suitable for very large or complex objects
❌ **Versioning Issues** - Managing different state versions can be complex

## When to Use

- You need to implement undo/redo functionality
- You want to save and restore application state
- You need to create checkpoints or snapshots
- You want to preserve encapsulation while storing state
- You need to support state recovery
- You're implementing a game or rich application with state management
- You need to audit state changes over time

## When NOT to Use

- Objects are too large to store state efficiently
- State changes are so frequent that storing history is impractical
- Memory is extremely limited
- You only need simple recovery, not full history
- State is constantly being updated
- The object's state includes resources that can't be copied
- You can use simpler mechanisms like database snapshots

## Related Patterns

- **Command** - Can be combined with Memento for more powerful undo
- **Prototype** - Can be used to create deep copies of objects
- **Iterator** - Can iterate through state history
- **Observer** - Can notify when state is saved/restored
