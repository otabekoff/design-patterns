---
title: State
description: Allow an object to alter its behavior when its internal state changes. Encapsulate state-specific behavior.
icon: Zap
---

# State



## Overview

The **State** pattern is a behavioral design pattern that allows an object to alter its behavior when its internal state changes. It lets an object appear to change its class by changing its state object. This pattern encapsulates state-specific behavior and transitions between states.

## Purpose

The State pattern aims to:

- Encapsulate state-specific behavior in separate classes
- Eliminate complex conditional logic based on states
- Make state transitions explicit and manageable
- Allow objects to change behavior based on state
- Simplify code by separating concerns
- Make state machines easier to understand and maintain

## Problem

Consider a music player with different states (playing, paused, stopped):

```typescript
// Without State pattern - complex conditionals
class MusicPlayer {
  private state: string = "stopped";

  play(): void {
    if (this.state === "stopped") {
      console.log("Starting playback");
      this.state = "playing";
    } else if (this.state === "paused") {
      console.log("Resuming playback");
      this.state = "playing";
    } else if (this.state === "playing") {
      console.log("Already playing");
    }
  }

  pause(): void {
    if (this.state === "playing") {
      console.log("Pausing playback");
      this.state = "paused";
    }
  }

  stop(): void {
    if (this.state === "playing" || this.state === "paused") {
      console.log("Stopping playback");
      this.state = "stopped";
    }
  }
}
```

Issues with this approach:

- Complex nested conditionals for each state
- Adding new states requires modifying existing code
- State-specific logic is scattered throughout the class
- Hard to test individual states
- Transitions become implicit and hard to track

## Solution

The State pattern encapsulates each state in its own class:

```typescript
// State interface
interface State {
  play(player: MusicPlayer): void;
  pause(player: MusicPlayer): void;
  stop(player: MusicPlayer): void;
}

// Concrete states
class PlayingState implements State {
  play(player: MusicPlayer): void {
    console.log("Already playing");
  }

  pause(player: MusicPlayer): void {
    console.log("Pausing playback");
    player.setState(new PausedState());
  }

  stop(player: MusicPlayer): void {
    console.log("Stopping playback");
    player.setState(new StoppedState());
  }
}
```

## Implementation

::: code-group

```typescript [typescript]
// State interface
    interface PlayerState {
      play(player: MediaPlayer): void;
      pause(player: MediaPlayer): void;
      stop(player: MediaPlayer): void;
      getStateName(): string;
    }

    // Concrete States
    class StoppedState implements PlayerState {
      play(player: MediaPlayer): void {
        console.log('Starting playback from stopped state');
        player.setState(new PlayingState());
      }

      pause(player: MediaPlayer): void {
        console.log('Cannot pause - not playing');
      }

      stop(player: MediaPlayer): void {
        console.log('Already stopped');
      }

      getStateName(): string {
        return 'STOPPED';
      }
    }

    class PlayingState implements PlayerState {
      play(player: MediaPlayer): void {
        console.log('Already playing');
      }

      pause(player: MediaPlayer): void {
        console.log('Pausing playback');
        player.setState(new PausedState());
      }

      stop(player: MediaPlayer): void {
        console.log('Stopping playback');
        player.setState(new StoppedState());
      }

      getStateName(): string {
        return 'PLAYING';
      }
    }

    class PausedState implements PlayerState {
      play(player: MediaPlayer): void {
        console.log('Resuming playback from pause');
        player.setState(new PlayingState());
      }

      pause(player: MediaPlayer): void {
        console.log('Already paused');
      }

      stop(player: MediaPlayer): void {
        console.log('Stopping playback from pause');
        player.setState(new StoppedState());
      }

      getStateName(): string {
        return 'PAUSED';
      }
    }

    // Context
    class MediaPlayer {
      private state: PlayerState;
      private currentTrack: string = '';

      constructor() {
        this.state = new StoppedState();
      }

      setState(state: PlayerState): void {
        console.log(`Transitioning to ${state.getStateName()}`);
        this.state = state;
      }

      play(): void {
        this.state.play(this);
      }

      pause(): void {
        this.state.pause(this);
      }

      stop(): void {
        this.state.stop(this);
      }

      setTrack(track: string): void {
        this.currentTrack = track;
        console.log(`Loaded track: ${track}`);
      }

      getState(): string {
        return this.state.getStateName();
      }
    }

    // Usage
    const player = new MediaPlayer();
    player.setTrack('Song.mp3');

    player.play();    // Starting playback from stopped state
    player.play();    // Already playing
    player.pause();   // Pausing playback
    player.play();    // Resuming playback from pause
    player.stop();    // Stopping playback
    player.pause();   // Cannot pause - not playing
```


  
```python [python]
from abc import ABC, abstractmethod

    class PlayerState(ABC):
        @abstractmethod
        def play(self, player: 'MediaPlayer') -> None:
            pass

        @abstractmethod
        def pause(self, player: 'MediaPlayer') -> None:
            pass

        @abstractmethod
        def stop(self, player: 'MediaPlayer') -> None:
            pass

        @abstractmethod
        def get_state_name(self) -> str:
            pass

    class StoppedState(PlayerState):
        def play(self, player: 'MediaPlayer') -> None:
            print("Starting playback from stopped state")
            player.set_state(PlayingState())

        def pause(self, player: 'MediaPlayer') -> None:
            print("Cannot pause - not playing")

        def stop(self, player: 'MediaPlayer') -> None:
            print("Already stopped")

        def get_state_name(self) -> str:
            return "STOPPED"

    class PlayingState(PlayerState):
        def play(self, player: 'MediaPlayer') -> None:
            print("Already playing")

        def pause(self, player: 'MediaPlayer') -> None:
            print("Pausing playback")
            player.set_state(PausedState())

        def stop(self, player: 'MediaPlayer') -> None:
            print("Stopping playback")
            player.set_state(StoppedState())

        def get_state_name(self) -> str:
            return "PLAYING"

    class PausedState(PlayerState):
        def play(self, player: 'MediaPlayer') -> None:
            print("Resuming playback from pause")
            player.set_state(PlayingState())

        def pause(self, player: 'MediaPlayer') -> None:
            print("Already paused")

        def stop(self, player: 'MediaPlayer') -> None:
            print("Stopping playback from pause")
            player.set_state(StoppedState())

        def get_state_name(self) -> str:
            return "PAUSED"

    class MediaPlayer:
        def __init__(self):
            self.state: PlayerState = StoppedState()
            self.current_track = ""

        def set_state(self, state: PlayerState) -> None:
            print(f"Transitioning to {state.get_state_name()}")
            self.state = state

        def play(self) -> None:
            self.state.play(self)

        def pause(self) -> None:
            self.state.pause(self)

        def stop(self) -> None:
            self.state.stop(self)

        def set_track(self, track: str) -> None:
            self.current_track = track
            print(f"Loaded track: {track}")

        def get_state(self) -> str:
            return self.state.get_state_name()

    # Usage
    player = MediaPlayer()
    player.set_track("Song.mp3")

    player.play()     # Starting playback from stopped state
    player.play()     # Already playing
    player.pause()    # Pausing playback
    player.play()     # Resuming playback from pause
    player.stop()     # Stopping playback
    player.pause()    # Cannot pause - not playing
```

:::

## Real-World Example

### Order Processing State Machine

```typescript
interface OrderState {
  confirm(order: Order): void;
  pay(order: Order): void;
  ship(order: Order): void;
  cancel(order: Order): void;
  getStatus(): string;
}

class PendingState implements OrderState {
  confirm(order: Order): void {
    console.log("Order confirmed");
    order.setState(new ConfirmedState());
  }
  pay(order: Order): void {
    console.log("Cannot pay - order not confirmed");
  }
  ship(order: Order): void {
    console.log("Cannot ship - order not paid");
  }
  cancel(order: Order): void {
    order.setState(new CancelledState());
  }
  getStatus(): string {
    return "PENDING";
  }
}

class ConfirmedState implements OrderState {
  confirm(order: Order): void {
    console.log("Already confirmed");
  }
  pay(order: Order): void {
    console.log("Payment processed");
    order.setState(new PaidState());
  }
  ship(order: Order): void {
    console.log("Cannot ship - not paid");
  }
  cancel(order: Order): void {
    order.setState(new CancelledState());
  }
  getStatus(): string {
    return "CONFIRMED";
  }
}

class PaidState implements OrderState {
  confirm(order: Order): void {
    console.log("Already confirmed and paid");
  }
  pay(order: Order): void {
    console.log("Already paid");
  }
  ship(order: Order): void {
    console.log("Order shipped");
    order.setState(new ShippedState());
  }
  cancel(order: Order): void {
    console.log("Cannot cancel - order already paid");
  }
  getStatus(): string {
    return "PAID";
  }
}

class Order {
  private state: OrderState = new PendingState();

  setState(state: OrderState): void {
    this.state = state;
  }

  confirm(): void {
    this.state.confirm(this);
  }
  pay(): void {
    this.state.pay(this);
  }
  ship(): void {
    this.state.ship(this);
  }
  cancel(): void {
    this.state.cancel(this);
  }
  getStatus(): string {
    return this.state.getStatus();
  }
}

// Usage
const order = new Order();
order.confirm(); // Order confirmed
order.pay(); // Payment processed
order.ship(); // Order shipped
```

## Advantages

✅ **Eliminates Conditionals** - No complex if-else chains based on state
✅ **Single Responsibility** - Each state class has one responsibility
✅ **Easy to Add States** - New states can be added without modifying existing code
✅ **Explicit Transitions** - State transitions are clear and explicit
✅ **Testability** - Each state can be tested independently
✅ **Maintainability** - Code is easier to understand and maintain
✅ **Encapsulation** - State-specific behavior is encapsulated

## Disadvantages

❌ **Increased Classes** - Can create many state classes
❌ **Complexity** - Adds complexity for simple state machines
❌ **Performance** - Extra object creation and method calls
❌ **Memory Overhead** - Multiple state objects consume memory
❌ **Overhead for Simple Enums** - Overkill if state is just a simple enum
❌ **State Sharing** - Handling shared data between states can be complex

## When to Use

- An object has complex behavior that varies significantly based on state
- You want to eliminate large conditional statements
- You need explicit state machine transitions
- Different states have different operations
- You want to reuse state logic
- You need to test states independently
- State transitions are frequent and complex

## When NOT to Use

- Only a few states with simple logic
- State is just a simple flag or enum
- Performance is critical
- The number of states is very large
- State transitions are very simple
- You can use simpler patterns like Strategy
- State logic is trivial

## Related Patterns

- **Strategy** - Similar structure but used for algorithms, not state-driven behavior
- **Template Method** - Can work with State for state-specific algorithms
- **Singleton** - State objects can be implemented as singletons
- **Factory** - Can create appropriate state objects
