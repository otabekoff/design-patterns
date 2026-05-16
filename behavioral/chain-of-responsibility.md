---
title: Chain of Responsibility
description: Pass requests along a handler chain until one handles it. Avoid tight coupling by letting multiple handlers process a request sequentially.
icon: Link
---

# Chain of Responsibility



## Overview

The **Chain of Responsibility** pattern is a behavioral design pattern that passes requests along a chain of handlers. Each handler decides either to process the request or pass it along the chain. This pattern promotes loose coupling by avoiding the need for senders to know which object will ultimately handle their request.

## Purpose

The Chain of Responsibility pattern aims to:

- Decouple the sender of a request from its receivers
- Allow multiple objects to handle a request without knowing which one will do it
- Dynamically build the chain of handlers at runtime
- Provide a way to structure handlers in a clear hierarchy

## Problem

Consider a logging system where you need to handle different types of messages with different severity levels. The naive approach would be:

```typescript
// Without Chain of Responsibility - tightly coupled
class Logger {
  log(level: string, message: string) {
    if (level === "error") {
      console.error(message);
      // write to error log
    } else if (level === "warning") {
      console.warn(message);
      // write to warning log
    } else if (level === "info") {
      console.info(message);
      // write to info log
    }
  }
}
```

Issues with this approach:

- Adding new log levels requires modifying the Logger class
- The class becomes increasingly complex with more conditions
- Handlers are tightly coupled to the logger
- Difficult to reorder or skip handlers
- Hard to test individual handlers

## Solution

The Chain of Responsibility pattern solves this by creating a chain of handler objects, each capable of handling a specific request type. If a handler can't process the request, it passes it to the next handler in the chain.

```typescript
// Handler interface
abstract class Handler {
  protected nextHandler: Handler | null = null;

  setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }

  abstract handle(request: Request): void;
}

// Concrete handlers
class InfoHandler extends Handler {
  handle(request: Request): void {
    if (request.level === "info") {
      console.log(`[INFO] ${request.message}`);
    } else if (this.nextHandler) {
      this.nextHandler.handle(request);
    }
  }
}

class WarningHandler extends Handler {
  handle(request: Request): void {
    if (request.level === "warning") {
      console.warn(`[WARNING] ${request.message}`);
    } else if (this.nextHandler) {
      this.nextHandler.handle(request);
    }
  }
}

class ErrorHandler extends Handler {
  handle(request: Request): void {
    if (request.level === "error") {
      console.error(`[ERROR] ${request.message}`);
    } else if (this.nextHandler) {
      this.nextHandler.handle(request);
    }
  }
}
```

## Implementation

::: code-group

```typescript [typescript]
// Request interface
    interface Request {
      level: 'info' | 'warning' | 'error' | 'critical';
      message: string;
      timestamp: Date;
    }

    // Abstract handler
    abstract class Logger {
      protected nextLogger: Logger | null = null;

      setNext(logger: Logger): Logger {
        this.nextLogger = logger;
        return logger;
      }

      handle(request: Request): void {
        if (this.canHandle(request)) {
          this.write(request);
        } else if (this.nextLogger) {
          this.nextLogger.handle(request);
        }
      }

      protected abstract canHandle(request: Request): boolean;
      protected abstract write(request: Request): void;
    }

    // Concrete handlers
    class ConsoleLogger extends Logger {
      protected canHandle(request: Request): boolean {
        return request.level === 'info';
      }

      protected write(request: Request): void {
        console.log(`[${request.timestamp.toISOString()}] INFO: ${request.message}`);
      }
    }

    class WarningLogger extends Logger {
      protected canHandle(request: Request): boolean {
        return request.level === 'warning';
      }

      protected write(request: Request): void {
        console.warn(`[${request.timestamp.toISOString()}] WARNING: ${request.message}`);
      }
    }

    class ErrorLogger extends Logger {
      protected canHandle(request: Request): boolean {
        return request.level === 'error' || request.level === 'critical';
      }

      protected write(request: Request): void {
        console.error(`[${request.timestamp.toISOString()}] ERROR: ${request.message}`);
        // Send email for critical errors
        if (request.level === 'critical') {
          this.sendEmailAlert(request.message);
        }
      }

      private sendEmailAlert(message: string): void {
        // Email logic here
      }
    }

    // Usage
    const loggerChain = new ConsoleLogger();
    loggerChain
      .setNext(new WarningLogger())
      .setNext(new ErrorLogger());

    loggerChain.handle({
      level: 'info',
      message: 'Application started',
      timestamp: new Date(),
    });

    loggerChain.handle({
      level: 'critical',
      message: 'Database connection failed',
      timestamp: new Date(),
    });
```


  
```python [python]
from abc import ABC, abstractmethod
    from datetime import datetime
    from enum import Enum

    class LogLevel(Enum):
        INFO = 1
        WARNING = 2
        ERROR = 3
        CRITICAL = 4

    class Request:
        def __init__(self, level: LogLevel, message: str):
            self.level = level
            self.message = message
            self.timestamp = datetime.now()

    class Logger(ABC):
        def __init__(self):
            self.next_logger = None

        def set_next(self, logger):
            self.next_logger = logger
            return logger

        def handle(self, request: Request):
            if self.can_handle(request):
                self.write(request)
            elif self.next_logger:
                self.next_logger.handle(request)

        @abstractmethod
        def can_handle(self, request: Request) -> bool:
            pass

        @abstractmethod
        def write(self, request: Request):
            pass

    class ConsoleLogger(Logger):
        def can_handle(self, request: Request) -> bool:
            return request.level == LogLevel.INFO

        def write(self, request: Request):
            timestamp = request.timestamp.isoformat()
            print(f"[{timestamp}] INFO: {request.message}")

    class WarningLogger(Logger):
        def can_handle(self, request: Request) -> bool:
            return request.level == LogLevel.WARNING

        def write(self, request: Request):
            timestamp = request.timestamp.isoformat()
            print(f"[{timestamp}] WARNING: {request.message}")

    class ErrorLogger(Logger):
        def can_handle(self, request: Request) -> bool:
            return request.level in (LogLevel.ERROR, LogLevel.CRITICAL)

        def write(self, request: Request):
            timestamp = request.timestamp.isoformat()
            print(f"[{timestamp}] ERROR: {request.message}")
            if request.level == LogLevel.CRITICAL:
                self.send_alert(request.message)

        def send_alert(self, message: str):
            print(f"ALERT: Sending email about {message}")

    # Usage
    logger_chain = ConsoleLogger()
    logger_chain.set_next(WarningLogger()).set_next(ErrorLogger())

    logger_chain.handle(Request(LogLevel.INFO, "Application started"))
    logger_chain.handle(Request(LogLevel.CRITICAL, "Database connection failed"))
```

:::

## Real-World Example

### HTTP Request Processing Pipeline

```typescript
interface HttpRequest {
  url: string;
  method: string;
  headers: Record<string, string>;
  body?: unknown;
}

abstract class Middleware {
  protected next: Middleware | null = null;

  setNext(middleware: Middleware): Middleware {
    this.next = middleware;
    return middleware;
  }

  async handle(request: HttpRequest): Promise<void> {
    if (await this.process(request)) {
      console.log("Request processed");
    } else if (this.next) {
      await this.next.handle(request);
    }
  }

  protected abstract process(request: HttpRequest): Promise<boolean>;
}

class AuthenticationMiddleware extends Middleware {
  protected async process(request: HttpRequest): Promise<boolean> {
    const token = request.headers["authorization"];
    if (token) {
      console.log("User authenticated");
      return true;
    }
    return false;
  }
}

class RateLimitMiddleware extends Middleware {
  protected async process(request: HttpRequest): Promise<boolean> {
    // Check rate limit
    console.log("Rate limit checked");
    return true;
  }
}

class LoggingMiddleware extends Middleware {
  protected async process(request: HttpRequest): Promise<boolean> {
    console.log(`[${new Date().toISOString()}] ${request.method} ${request.url}`);
    return true;
  }
}

// Setup chain
const middlewareChain = new AuthenticationMiddleware();
middlewareChain.setNext(new RateLimitMiddleware()).setNext(new LoggingMiddleware());
```

## Advantages

✅ **Loose Coupling** - Senders don't need to know about receivers
✅ **Single Responsibility** - Each handler focuses on one task
✅ **Open/Closed Principle** - Easy to add new handlers without modifying existing code
✅ **Flexible Ordering** - Chain can be constructed dynamically
✅ **Easier Testing** - Each handler can be tested in isolation
✅ **Runtime Configuration** - Change the chain at runtime based on conditions

## Disadvantages

❌ **Request Might Not Be Handled** - If no handler matches, request could be lost
❌ **Performance Overhead** - Traversing the chain takes additional processing time
❌ **Difficult Debugging** - Hard to trace which handler actually processed the request
❌ **Chain Configuration Complexity** - Building an optimal chain requires careful design
❌ **Unpredictable Behavior** - Handler order affects results, which can be error-prone

## When to Use

- You have multiple objects that might handle a request
- You don't know which object should handle a request ahead of time
- You want to issue a request to one of several objects without specifying the receiver
- The set of handler objects should be specified dynamically
- You want to avoid coupling the sender to the receivers

## When NOT to Use

- The request should always be handled by a specific, predetermined object
- You need guaranteed handling of every request
- Performance is critical and the chain is very deep
- Handler logic is complex and interdependent
- The request routing is simple and can be handled with conditional logic

## Related Patterns

- **Command** - Can be used with Chain of Responsibility to encapsulate requests
- **Responsibility** - Helps implement the single responsibility principle
- **Observer** - Alternative for handling multiple receivers
- **Strategy** - Similar intent but used for selecting algorithms rather than handlers
