---
title: Decorator Pattern
description: Dynamically adds responsibilities to objects by wrapping them in decorator objects.
icon: Wand
---

# Decorator Pattern

<CoverImage src="/covers/structural/decorator.png" alt="Cover">
  <h1>Decorator</h1>
  <p>A funny little white robot wearing way too many layers of winter clothing: a scarf, a hat, glowing earmuffs, a heavy jacket, and snowshoes, adding features without changing the core robot.</p>
</CoverImage>

## Overview

The **Decorator** pattern is a structural design pattern that adds behavior to an object dynamically by wrapping it in another object that implements the same interface. Each decorator forwards to the wrapped component and adds its own work before or after the call.

**Key advantage**: You can layer responsibilities at runtime without subclass explosion.

**Modern perspective**: Decorator is everywhere in production code today: middleware, stream wrappers, HTTP clients, caching layers, logging layers, retry policies, and security wrappers.

Decorator adds behavior. It does not translate incompatible interfaces.

## Real-World Analogy

Think of **layering clothes**. A shirt works on its own, but you can add a jacket, a raincoat, or a scarf depending on the weather. Each layer keeps the same body underneath, but changes the overall result.

That is exactly what decorators do: each layer adds something without changing the original object.

## The Problem

Suppose you have a simple API client, but different call sites need different combinations of logging, caching, retries, and metrics.

If you use inheritance, you quickly end up with a class explosion:

- BasicClient
- LoggedClient
- CachedClient
- RetryingClient
- LoggedCachedClient
- LoggedRetryingClient
- CachedRetryingClient
- LoggedCachedRetryingClient

That grows badly as features increase.

### Problem Example

```typescript
// ❌ Bad: inheritance combinatorics
class LoggedCachedRetryingApiClient extends ApiClient {}
class CachedRetryingApiClient extends ApiClient {}
class LoggedApiClient extends ApiClient {}
```

## The Solution

Decorator solves this by wrapping the object and preserving the same interface.

1. Define a shared component interface
2. Implement the core object once
3. Add one decorator class per behavior
4. Compose decorators as needed at runtime

This keeps the base object simple and lets you add features only where needed.

## Implementation

::: code-group

```typescript [typescript]
interface ApiClient {
  fetch(path: string): Promise<string>;
}

class HttpApiClient implements ApiClient {
  async fetch(path: string): Promise<string> {
    return `response from ${path}`;
  }
}

abstract class ApiClientDecorator implements ApiClient {
  constructor(protected readonly client: ApiClient) {}
  abstract fetch(path: string): Promise<string>;
}

class LoggingDecorator extends ApiClientDecorator {
  async fetch(path: string): Promise<string> {
    console.log(`[LOG] fetching ${path}`);
    const result = await this.client.fetch(path);
    console.log(`[LOG] received ${result}`);
    return result;
  }
}

class CachingDecorator extends ApiClientDecorator {
  private cache = new Map<string, string>();

  async fetch(path: string): Promise<string> {
    if (this.cache.has(path)) {
      console.log(`[CACHE] hit for ${path}`);
      return this.cache.get(path)!;
    }

    const result = await this.client.fetch(path);
    this.cache.set(path, result);
    return result;
  }
}

class RetryDecorator extends ApiClientDecorator {
  constructor(
    client: ApiClient,
    private readonly maxRetries: number = 3,
  ) {
    super(client);
  }

  async fetch(path: string): Promise<string> {
    let lastError: unknown;

    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        return await this.client.fetch(path);
      } catch (error) {
        lastError = error;
        console.log(`[RETRY] attempt ${attempt} failed`);
      }
    }

    throw lastError;
  }
}

const client: ApiClient = new LoggingDecorator(
  new RetryDecorator(new CachingDecorator(new HttpApiClient())),
);

client.fetch("/users");
```

```python [python]
from abc import ABC, abstractmethod

class ApiClient(ABC):
    @abstractmethod
    def fetch(self, path: str) -> str:
        pass

class HttpApiClient(ApiClient):
    def fetch(self, path: str) -> str:
        return f"response from {path}"

class ApiClientDecorator(ApiClient):
    def __init__(self, client: ApiClient):
        self._client = client

class LoggingDecorator(ApiClientDecorator):
    def fetch(self, path: str) -> str:
        print(f"[LOG] fetching {path}")
        result = self._client.fetch(path)
        print(f"[LOG] received {result}")
        return result

class CachingDecorator(ApiClientDecorator):
    def __init__(self, client: ApiClient):
        super().__init__(client)
        self._cache = {}

    def fetch(self, path: str) -> str:
        if path in self._cache:
            print(f"[CACHE] hit for {path}")
            return self._cache[path]
        result = self._client.fetch(path)
        self._cache[path] = result
        return result

class RetryDecorator(ApiClientDecorator):
    def __init__(self, client: ApiClient, max_retries: int = 3):
        super().__init__(client)
        self._max_retries = max_retries

    def fetch(self, path: str) -> str:
        last_error = None
        for attempt in range(1, self._max_retries + 1):
            try:
                return self._client.fetch(path)
            except Exception as error:
                last_error = error
                print(f"[RETRY] attempt {attempt} failed")
        raise last_error

client = LoggingDecorator(RetryDecorator(CachingDecorator(HttpApiClient())))
print(client.fetch("/users"))
```

```java [java]
interface ApiClient {
    String fetch(String path);
}

class HttpApiClient implements ApiClient {
    @Override
    public String fetch(String path) {
        return "response from " + path;
    }
}

abstract class ApiClientDecorator implements ApiClient {
    protected final ApiClient client;

    protected ApiClientDecorator(ApiClient client) {
        this.client = client;
    }
}

class LoggingDecorator extends ApiClientDecorator {
    LoggingDecorator(ApiClient client) {
        super(client);
    }

    @Override
    public String fetch(String path) {
        System.out.println("[LOG] fetching " + path);
        String result = client.fetch(path);
        System.out.println("[LOG] received " + result);
        return result;
    }
}

class CachingDecorator extends ApiClientDecorator {
    private final java.util.Map<String, String> cache = new java.util.HashMap<>();

    CachingDecorator(ApiClient client) {
        super(client);
    }

    @Override
    public String fetch(String path) {
        if (cache.containsKey(path)) {
            System.out.println("[CACHE] hit for " + path);
            return cache.get(path);
        }
        String result = client.fetch(path);
        cache.put(path, result);
        return result;
    }
}

class RetryDecorator extends ApiClientDecorator {
    private final int maxRetries;

    RetryDecorator(ApiClient client, int maxRetries) {
        super(client);
        this.maxRetries = maxRetries;
    }

    @Override
    public String fetch(String path) {
        RuntimeException last = null;
        for (int attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                return client.fetch(path);
            } catch (RuntimeException error) {
                last = error;
                System.out.println("[RETRY] attempt " + attempt + " failed");
            }
        }
        throw last;
    }
}
```

```go [go]
package main

import "fmt"

type ApiClient interface {
  Fetch(path string) (string, error)
}

type HttpApiClient struct{}

func (c *HttpApiClient) Fetch(path string) (string, error) {
  return "response from " + path, nil
}

type ApiClientDecorator struct {
	client ApiClient
}

type LoggingDecorator struct {
	ApiClientDecorator
}

func (d *LoggingDecorator) Fetch(path string) (string, error) {
	fmt.Println("[LOG] fetching", path)
  result, err := d.client.Fetch(path)
  if err != nil {
    return "", err
  }
	fmt.Println("[LOG] received", result)
  return result, nil
}

type CachingDecorator struct {
	ApiClientDecorator
	cache map[string]string
}

func NewCachingDecorator(client ApiClient) *CachingDecorator {
	return &CachingDecorator{
		ApiClientDecorator: ApiClientDecorator{client: client},
		cache:              make(map[string]string),
	}
}

func (d *CachingDecorator) Fetch(path string) (string, error) {
	if value, ok := d.cache[path]; ok {
		fmt.Println("[CACHE] hit for", path)
    return value, nil
	}
  result, err := d.client.Fetch(path)
  if err != nil {
    return "", err
  }
	d.cache[path] = result
  return result, nil
}

type RetryDecorator struct {
  ApiClientDecorator
  maxRetries int
}

func (d *RetryDecorator) Fetch(path string) (string, error) {
  var lastErr error
  for attempt := 1; attempt <= d.maxRetries; attempt++ {
    result, err := d.client.Fetch(path)
    if err == nil {
      return result, nil
    }
    lastErr = err
    fmt.Println("[RETRY] attempt", attempt, "failed")
  }
  return "", lastErr
}
```

```rust [rust]
use std::collections::HashMap;

trait ApiClient {
    fn fetch(&mut self, path: &str) -> String;
}

struct HttpApiClient;

impl ApiClient for HttpApiClient {
    fn fetch(&mut self, path: &str) -> String {
        format!("response from {}", path)
    }
}

struct LoggingDecorator<T: ApiClient> {
    client: T,
}

impl<T: ApiClient> LoggingDecorator<T> {
    fn new(client: T) -> Self {
        Self { client }
    }
}

impl<T: ApiClient> ApiClient for LoggingDecorator<T> {
    fn fetch(&mut self, path: &str) -> String {
        println!("[LOG] fetching {}", path);
        let result = self.client.fetch(path);
        println!("[LOG] received {}", result);
        result
    }
}

struct CachingDecorator<T: ApiClient> {
    client: T,
    cache: HashMap<String, String>,
}

impl<T: ApiClient> CachingDecorator<T> {
    fn new(client: T) -> Self {
        Self {
            client,
            cache: HashMap::new(),
        }
    }
}

impl<T: ApiClient> ApiClient for CachingDecorator<T> {
    fn fetch(&mut self, path: &str) -> String {
        if let Some(value) = self.cache.get(path) {
            println!("[CACHE] hit for {}", path);
            return value.clone();
        }

        let result = self.client.fetch(path);
        self.cache.insert(path.to_string(), result.clone());
        result
    }
}
```

:::

## Real-World Example

A common production use of Decorator is wrapping an HTTP client with logging, caching, or retry behavior. Each concern stays separate, and the wrapper chain is assembled only where needed.

```typescript
const client: ApiClient = new LoggingDecorator(
  new RetryDecorator(new CachingDecorator(new HttpApiClient())),
);
```

This keeps the base client reusable and avoids hardcoding all cross-cutting concerns into one class.

## Advantages

- Adds behavior without modifying the base class
- Avoids inheritance explosion
- Supports runtime composition of features
- Keeps responsibilities separated into small wrappers
- Makes cross-cutting concerns reusable
- Lets you apply behavior only where needed

## Disadvantages

- Can create many small wrapper objects
- Deep decorator chains can be harder to debug
- Order of wrapping matters
- Can become confusing if too many behaviors are stacked
- Requires a shared interface across all layers

## When to Use

- You need optional behavior layers
- You want to add cross-cutting concerns such as logging or caching
- You want to avoid subclass combinations
- You need runtime composition
- You want the same core object to serve many contexts

## When NOT to Use

- The behavior should be fixed and simple
- The wrapper chain would become too hard to understand
- The extra indirection is not worth the flexibility
- The behavior belongs in the base object itself
- You need interface translation instead of behavior layering

## Common Mistakes

### Mistake 1: Changing the interface

```typescript
// ❌ Bad: no longer a true decorator
class BadDecorator {
  logFetch() {}
}

// ✅ Good: keep the same interface
class LoggingDecorator implements ApiClient {
  fetch(path: string): Promise<string> {
    return Promise.resolve(path);
  }
}
```

### Mistake 2: Making wrappers do unrelated work

```typescript
// ❌ Bad: decorator handles business rules
class BadDecorator {
  fetch(path: string) {
    // pricing logic here
  }
}

// ✅ Good: decorator only layers one concern
```

### Mistake 3: Ignoring wrapper order

```typescript
// ❌ Bad: cache outside retry may cache failures incorrectly
// ✅ Good: choose the order intentionally
```

### Mistake 4: Overusing decorators for every small variation

```typescript
// ❌ Bad: dozens of one-off wrappers
// ✅ Good: use decorators for meaningful cross-cutting concerns
```

## Related Patterns

- **Adapter**: Changes interface compatibility rather than behavior
- **Proxy**: Controls access; can look similar but has different intent
- **Facade**: Simplifies access to a subsystem instead of wrapping behavior
- **Chain of Responsibility**: Passes requests through handlers instead of layering all behavior on one object

## Modern Alternatives

- Middleware pipelines in web frameworks
- Interceptors in HTTP clients
- Aspect-oriented programming
- Functional composition with higher-order functions
- Reactive operator chains

## Interview Insights

**Q1: What does Decorator solve?**

A: It lets you add behavior dynamically without subclassing. That is the main reason it exists.

**Q2: How is Decorator different from Proxy?**

A: Proxy controls access or lifecycle. Decorator adds responsibilities and behavior.

**Q3: Why is Decorator better than subclassing for optional features?**

A: Because subclass combinations grow exponentially. Decorators compose features at runtime instead.

**Q4: Why does decorator order matter?**

A: Because each layer sees the output of the previous layer. A cache around a retry behaves differently from a retry around a cache.

**Q5: When is Decorator overkill?**

A: When there is only one or two simple variations and a direct method or simple helper is enough.
