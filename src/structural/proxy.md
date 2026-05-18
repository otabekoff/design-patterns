---
title: Proxy Pattern
description: Provides a surrogate or placeholder for another object to control access to it.
icon: Shield
---

# Proxy Pattern

<CoverImage src="/covers/structural/proxy.png" alt="Cover">
  <h1>Proxy</h1>
  <p>A massive, intimidating bouncer robot wearing sunglasses and a tuxedo, blocking a gate, checking the credentials of a tiny nervous robot before letting it talk to the main supercomputer behind it.</p>
</CoverImage>

## Overview

The **Proxy** pattern is a structural design pattern that provides a stand-in object for another object so access can be controlled, delayed, monitored, or modified. The proxy implements the same interface as the real object, but adds an extra layer around it.

**Key advantage**: It lets you manage expensive or sensitive objects without changing the client code that uses them.

**Modern perspective**: Proxy is still common in remote services, lazy-loaded resources, authorization gates, caching layers, and SDK wrappers. It is one of the most practical patterns for infrastructure code.

Proxy is about control of access, not interface translation.

## Real-World Analogy

Think of a **security guard at a private archive**. Visitors do not walk directly to the vault. The guard checks permissions, decides whether to unlock the door, and only then lets the visitor see the archive.

The guard is the proxy. The archive is the real object.

## The Problem

Some objects are expensive, sensitive, or both:

- large documents that should be loaded only when needed
- records that require permissions before reading
- remote objects that should be accessed through a network boundary
- resources that need monitoring or caching

If the client instantiates and talks to these objects directly, you lose control over when they are loaded and who is allowed to access them.

### Problem Example

```typescript
// ❌ Bad: client directly handles loading and authorization
const document = new RealDocument("annual-report.pdf");
if (user.role !== "admin") {
  throw new Error("Access denied");
}
console.log(document.getContent());
```

That spreads policy and loading concerns into every caller.

## The Solution

Proxy solves this by placing a controlled object in front of the real one.

1. Define a shared interface
2. Implement the real object separately
3. Implement a proxy that holds the real object lazily
4. Put authorization, caching, logging, or remote access logic in the proxy
5. Keep the client unaware of the difference

## Implementation

::: code-group

```typescript [TypeScript]
interface DocumentSource {
  getContent(): string;
  display(): void;
}

class RealDocument implements DocumentSource {
  private content: string;

  constructor(private readonly filename: string) {
    this.content = this.loadFromDisk();
  }

  private loadFromDisk(): string {
    console.log(`Loading document from disk: ${this.filename}`);
    return `Content of ${this.filename}`;
  }

  getContent(): string {
    return this.content;
  }

  display(): void {
    console.log(this.content);
  }
}

type UserRole = "guest" | "user" | "admin";

interface User {
  name: string;
  role: UserRole;
}

class ProtectedDocumentProxy implements DocumentSource {
  private realDocument: RealDocument | null = null;

  constructor(
    private readonly filename: string,
    private readonly currentUser: User,
    private readonly requiredRole: UserRole,
  ) {}

  private hasAccess(): boolean {
    const rank: Record<UserRole, number> = { guest: 1, user: 2, admin: 3 };
    return rank[this.currentUser.role] >= rank[this.requiredRole];
  }

  private ensureLoaded(): void {
    if (!this.realDocument) {
      this.realDocument = new RealDocument(this.filename);
    }
  }

  getContent(): string {
    if (!this.hasAccess()) {
      throw new Error(`Access denied for ${this.currentUser.name}`);
    }

    this.ensureLoaded();
    return this.realDocument.getContent();
  }

  display(): void {
    if (!this.hasAccess()) {
      throw new Error(`Access denied for ${this.currentUser.name}`);
    }

    this.ensureLoaded();
    this.realDocument.display();
  }
}

const admin: User = { name: "Alice", role: "admin" };
const guest: User = { name: "Bob", role: "guest" };

const protectedDoc = new ProtectedDocumentProxy(
  "annual-report.pdf",
  admin,
  "admin",
);
console.log(protectedDoc.getContent());

const deniedDoc = new ProtectedDocumentProxy(
  "annual-report.pdf",
  guest,
  "admin",
);
// deniedDoc.getContent(); // throws access denied
```

```python [Python]
from abc import ABC, abstractmethod

class DocumentSource(ABC):
    @abstractmethod
    def get_content(self) -> str:
        pass

    @abstractmethod
    def display(self) -> None:
        pass

class RealDocument(DocumentSource):
    def __init__(self, filename: str):
        self._filename = filename
        self._content = self._load_from_disk()

    def _load_from_disk(self) -> str:
        print(f"Loading document from disk: {self._filename}")
        return f"Content of {self._filename}"

    def get_content(self) -> str:
        return self._content

    def display(self) -> None:
        print(self._content)

class User:
    def __init__(self, name: str, role: str):
        self.name = name
        self.role = role

class ProtectedDocumentProxy(DocumentSource):
    def __init__(self, filename: str, current_user: User, required_role: str):
        self._filename = filename
        self._current_user = current_user
        self._required_role = required_role
        self._real_document = None

    def _has_access(self) -> bool:
        rank = {"guest": 1, "user": 2, "admin": 3}
        return rank.get(self._current_user.role, 0) >= rank.get(self._required_role, 0)

    def _ensure_loaded(self) -> None:
        if self._real_document is None:
            self._real_document = RealDocument(self._filename)

    def get_content(self) -> str:
        if not self._has_access():
            raise PermissionError(f"Access denied for {self._current_user.name}")

        self._ensure_loaded()
        return self._real_document.get_content()

    def display(self) -> None:
        if not self._has_access():
            raise PermissionError(f"Access denied for {self._current_user.name}")

        self._ensure_loaded()
        self._real_document.display()

admin = User("Alice", "admin")
guest = User("Bob", "guest")

protected_doc = ProtectedDocumentProxy("annual-report.pdf", admin, "admin")
print(protected_doc.get_content())

# denied_doc = ProtectedDocumentProxy("annual-report.pdf", guest, "admin")
# denied_doc.get_content()
```

```java [Java]
interface DocumentSource {
    String getContent();
    void display();
}

class RealDocument implements DocumentSource {
    private final String filename;
    private final String content;

    RealDocument(String filename) {
        this.filename = filename;
        this.content = loadFromDisk();
    }

    private String loadFromDisk() {
        System.out.println("Loading document from disk: " + filename);
        return "Content of " + filename;
    }

    @Override
    public String getContent() {
        return content;
    }

    @Override
    public void display() {
        System.out.println(content);
    }
}

enum Role {
    GUEST, USER, ADMIN
}

class User {
    final String name;
    final Role role;

    User(String name, Role role) {
        this.name = name;
        this.role = role;
    }
}

class ProtectedDocumentProxy implements DocumentSource {
    private final String filename;
    private final User currentUser;
    private final Role requiredRole;
    private RealDocument realDocument;

    ProtectedDocumentProxy(String filename, User currentUser, Role requiredRole) {
        this.filename = filename;
        this.currentUser = currentUser;
        this.requiredRole = requiredRole;
    }

    private boolean hasAccess() {
        return currentUser.role.ordinal() >= requiredRole.ordinal();
    }

    private void ensureLoaded() {
        if (realDocument == null) {
            realDocument = new RealDocument(filename);
        }
    }

    @Override
    public String getContent() {
        if (!hasAccess()) {
            throw new SecurityException("Access denied for " + currentUser.name);
        }

        ensureLoaded();
        return realDocument.getContent();
    }

    @Override
    public void display() {
        if (!hasAccess()) {
            throw new SecurityException("Access denied for " + currentUser.name);
        }

        ensureLoaded();
        realDocument.display();
    }
}
```

```go [Go]
package main

import "fmt"

type DocumentSource interface {
	GetContent() string
	Display()
}

type RealDocument struct {
	filename string
	content  string
}

func NewRealDocument(filename string) *RealDocument {
	return &RealDocument{
		filename: filename,
		content:  loadFromDisk(filename),
	}
}

func loadFromDisk(filename string) string {
	fmt.Println("Loading document from disk:", filename)
	return "Content of " + filename
}

func (d *RealDocument) GetContent() string { return d.content }
func (d *RealDocument) Display()           { fmt.Println(d.content) }

type User struct {
	Name string
	Role string
}

type ProtectedDocumentProxy struct {
	filename     string
	currentUser  User
	requiredRole string
	realDocument *RealDocument
}

func NewProtectedDocumentProxy(filename string, currentUser User, requiredRole string) *ProtectedDocumentProxy {
	return &ProtectedDocumentProxy{filename: filename, currentUser: currentUser, requiredRole: requiredRole}
}

func roleRank(role string) int {
	ranks := map[string]int{"guest": 1, "user": 2, "admin": 3}
	return ranks[role]
}

func (p *ProtectedDocumentProxy) hasAccess() bool {
	return roleRank(p.currentUser.Role) >= roleRank(p.requiredRole)
}

func (p *ProtectedDocumentProxy) ensureLoaded() {
	if p.realDocument == nil {
		p.realDocument = NewRealDocument(p.filename)
	}
}

func (p *ProtectedDocumentProxy) GetContent() string {
	if !p.hasAccess() {
		panic("access denied for " + p.currentUser.Name)
	}
	p.ensureLoaded()
	return p.realDocument.GetContent()
}

func (p *ProtectedDocumentProxy) Display() {
	if !p.hasAccess() {
		panic("access denied for " + p.currentUser.Name)
	}
	p.ensureLoaded()
	p.realDocument.Display()
}
```

```rust [Rust]
trait DocumentSource {
    fn get_content(&mut self) -> String;
    fn display(&mut self);
}

struct RealDocument {
    filename: String,
    content: String,
}

impl RealDocument {
    fn new(filename: String) -> Self {
        let content = Self::load_from_disk(&filename);
        Self { filename, content }
    }

    fn load_from_disk(filename: &str) -> String {
        println!("Loading document from disk: {}", filename);
        format!("Content of {}", filename)
    }
}

impl DocumentSource for RealDocument {
    fn get_content(&mut self) -> String {
        self.content.clone()
    }

    fn display(&mut self) {
        println!("{}", self.content);
    }
}

#[derive(Clone)]
struct User {
    name: String,
    role: String,
}

struct ProtectedDocumentProxy {
    filename: String,
    current_user: User,
    required_role: String,
    real_document: Option<RealDocument>,
}

impl ProtectedDocumentProxy {
    fn new(filename: String, current_user: User, required_role: String) -> Self {
        Self {
            filename,
            current_user,
            required_role,
            real_document: None,
        }
    }

    fn rank(role: &str) -> i32 {
        match role {
            "guest" => 1,
            "user" => 2,
            "admin" => 3,
            _ => 0,
        }
    }

    fn has_access(&self) -> bool {
        Self::rank(&self.current_user.role) >= Self::rank(&self.required_role)
    }

    fn ensure_loaded(&mut self) {
        if self.real_document.is_none() {
            self.real_document = Some(RealDocument::new(self.filename.clone()));
        }
    }
}

impl DocumentSource for ProtectedDocumentProxy {
    fn get_content(&mut self) -> String {
        if !self.has_access() {
            panic!("access denied for {}", self.current_user.name);
        }

        self.ensure_loaded();
        self.real_document.as_mut().unwrap().get_content()
    }

    fn display(&mut self) {
        if !self.has_access() {
            panic!("access denied for {}", self.current_user.name);
        }

        self.ensure_loaded();
        self.real_document.as_mut().unwrap().display();
    }
}
```

:::

## Real-World Example

A practical proxy in a document platform can guard access to sensitive files while loading them only when needed. The client just asks for a document source; the proxy checks permissions and initializes the real document lazily.

```typescript
const doc = new ProtectedDocumentProxy(
  "annual-report.pdf",
  { name: "Alice", role: "admin" },
  "admin",
);

console.log(doc.getContent());
```

That is useful when the real object is expensive, remote, or sensitive.

## Advantages

- Controls access without changing client code
- Supports lazy loading of expensive objects
- Centralizes authorization or validation
- Can add caching, logging, or monitoring
- Keeps the real object focused on its core work
- Works well for remote or heavyweight resources

## Disadvantages

- Adds another layer of indirection
- Can hide behavior and make debugging harder
- Requires careful synchronization for shared proxies
- Can become complex if it handles too many concerns
- Extra wrapper code is unnecessary for cheap objects

## When to Use

- The real object is expensive to create
- Access must be controlled or validated
- You want lazy loading
- You need a remote object boundary
- You want to add logging or caching transparently

## When NOT to Use

- The object is lightweight and always needed
- The proxy would duplicate too much business logic
- Simplicity matters more than access control
- The extra indirection hurts readability
- The proxy and real object would diverge too much

## Common Mistakes

### Mistake 1: Putting business logic in the proxy

```typescript
// ❌ Bad: proxy owns domain rules
class BadProxy {
  getContent() {
    // pricing, formatting, and policy here
  }
}

// ✅ Good: proxy controls access, real object owns behavior
```

### Mistake 2: Eagerly loading expensive objects

```typescript
// ❌ Bad: no lazy loading
const doc = new RealDocument("big.pdf");

// ✅ Good: defer creation until needed
```

### Mistake 3: Leaking direct access to the real object

```typescript
// ❌ Bad: clients bypass the proxy
class BadProxy {
  getRealDocument() {}
}

// ✅ Good: keep the proxy as the boundary
```

### Mistake 4: Treating Proxy like Decorator

```typescript
// ❌ Bad: adding behavior without access control intent
// ✅ Good: use Proxy when the main goal is control of access
```

## Related Patterns

- **Decorator**: Adds responsibilities; Proxy controls access
- **Adapter**: Converts one interface to another
- **Facade**: Simplifies a subsystem instead of gating access
- **Singleton**: Sometimes used to share a proxy instance, but not required

## Modern Alternatives

- ORM lazy-loading entities
- HTTP client interceptors and middleware
- API gateways and BFFs
- Service meshes and sidecars
- Cloud IAM / policy enforcement layers

## Interview Insights

**Q1: What is the main purpose of Proxy?**

A: To control access to another object through a stand-in that implements the same interface.

**Q2: How is Proxy different from Decorator?**

A: Proxy is about access control, lazy loading, or remote access. Decorator is about adding behavior.

**Q3: Why is lazy loading a common Proxy use case?**

A: It delays expensive object creation until the object is actually needed, which improves startup cost and memory usage.

**Q4: Can Proxy be used for security?**

A: Yes. Protection proxies are a standard way to centralize authorization checks.

**Q5: What is the biggest risk with Proxy?**

A: Overloading it with extra concerns until it becomes harder to reason about than the real object itself.
