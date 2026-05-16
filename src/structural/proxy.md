---
title: Proxy Pattern
description: Provides a surrogate or placeholder for another object to control access to it
icon: Shield
---

# Proxy Pattern

## Overview

The Proxy Pattern is a structural design pattern that provides a surrogate or placeholder for another object to control access to it. A proxy is a wrapper or agent object that acts as an intermediary between clients and the real subject, allowing you to enhance, restrict, or modify access to the subject.

## Purpose

- **Control access** to another object
- **Defer expensive object creation** until needed (lazy initialization)
- **Add logging, caching, or monitoring** without modifying the real subject
- **Implement access control** and authentication
- **Provide a simplified interface** to complex objects
- **Handle remote objects** or network communication

## Problem

Consider a scenario where you have:

- **Document Loading**: Documents are expensive to load from disk (heavy I/O)
- **Access Control**: Only authorized users should access certain documents
- **Performance**: You want to load documents only when needed, not when created
- **Monitoring**: You want to track who accesses what document and when
- **Caching**: You want to cache frequently accessed documents

Modifying the `Document` class to add all these features would violate Single Responsibility and create a bloated, hard-to-maintain class.

## Solution

The Proxy Pattern provides a solution by:

1. **Creating a Proxy Class**: Implements the same interface as the real subject
2. **Controlling Access**: The proxy controls when and how the real subject is accessed
3. **Lazy Initialization**: Creates the real subject only when needed
4. **Adding Features**: Adds logging, caching, access control without modifying the subject
5. **Transparency**: From the client's perspective, proxy and subject are interchangeable

## Implementation

::: code-group


  
```typescript [typescript]
// ========== Common Interface ==========

interface Document {
getContent(): string;
display(): void;
}

// ========== Real Subject ==========

class RealDocument implements Document {
private content: string = '';

constructor(private filename: string) {
// Simulate expensive document loading
this.loadFromDisk();
}

private loadFromDisk(): void {
console.log(`⏳ Loading document: ${this.filename}...`);
// Simulate heavy I/O operation
this.content = `Content of ${this.filename}`;
console.log(`✅ Document loaded: ${this.filename}`);
}

getContent(): string {
return this.content;
}

display(): void {
console.log(`📄 Displaying: ${this.content}`);
}
}

// ========== Protection Proxy ==========
// Controls access based on user permissions

interface User {
name: string;
role: 'admin' | 'user' | 'guest';
}

class DocumentProtectionProxy implements Document {
private realDocument: RealDocument | null = null;

constructor(
private filename: string,
private currentUser: User,
private requiredRole: 'admin' | 'user' | 'guest'
) {}

private hasAccess(): boolean {
const roleHierarchy = { admin: 3, user: 2, guest: 1 };
return roleHierarchy[this.currentUser.role] >= roleHierarchy[this.requiredRole];
}

private initializeDocument(): void {
if (!this.realDocument) {
this.realDocument = new RealDocument(this.filename);
}
}

getContent(): string {
if (!this.hasAccess()) {
console.log(`❌ Access denied for user: ${this.currentUser.name}. Required role: ${this.requiredRole}`);
return 'ACCESS DENIED';
}

    this.initializeDocument();
    return this.realDocument!.getContent();

}

display(): void {
if (!this.hasAccess()) {
console.log(`❌ Access denied for user: ${this.currentUser.name}`);
return;
}

    this.initializeDocument();
    this.realDocument!.display();

}
}

// ========== Caching Proxy ==========
// Caches document content to improve performance

class DocumentCachingProxy implements Document {
private realDocument: RealDocument | null = null;
private cachedContent: string | null = null;
private accessCount: number = 0;

constructor(private filename: string) {}

private initializeDocument(): void {
if (!this.realDocument) {
this.realDocument = new RealDocument(this.filename);
}
}

getContent(): string {
this.accessCount++;

    if (this.cachedContent === null) {
      console.log(`📦 Cache miss, loading document...`);
      this.initializeDocument();
      this.cachedContent = this.realDocument!.getContent();
    } else {
      console.log(`⚡ Cache hit! (Access #${this.accessCount})`);
    }

    return this.cachedContent;

}

display(): void {
const content = this.getContent();
console.log(`📄 Displaying (cached): ${content}`);
}

getAccessCount(): number {
return this.accessCount;
}

invalidateCache(): void {
console.log(`🔄 Invalidating cache for ${this.filename}`);
this.cachedContent = null;
this.realDocument = null;
}
}

// ========== Logging Proxy ==========
// Logs all access to the document

class DocumentLoggingProxy implements Document {
private realDocument: RealDocument | null = null;
private logs: string[] = [];

constructor(private filename: string, private userId: string) {}

private initializeDocument(): void {
if (!this.realDocument) {
this.realDocument = new RealDocument(this.filename);
}
}

private log(action: string): void {
const timestamp = new Date().toISOString();
const logEntry = `[${timestamp}] User ${this.userId} - ${action} on ${this.filename}`;
this.logs.push(logEntry);
console.log(`📝 ${logEntry}`);
}

getContent(): string {
this.log('getContent()');
this.initializeDocument();
return this.realDocument!.getContent();
}

display(): void {
this.log('display()');
this.initializeDocument();
this.realDocument!.display();
}

getLogs(): string[] {
return this.logs;
}
}

// ========== Usage Examples ==========

console.log('=== Protection Proxy Example ===\n');

const adminUser: User = { name: 'Alice', role: 'admin' };
const regularUser: User = { name: 'Bob', role: 'user' };
const guestUser: User = { name: 'Charlie', role: 'guest' };

// Admin can access everything
const adminDoc = new DocumentProtectionProxy('secret.txt', adminUser, 'admin');
adminDoc.getContent();
adminDoc.display();

console.log('\n');

// Guest cannot access
const guestDoc = new DocumentProtectionProxy('secret.txt', guestUser, 'admin');
guestDoc.getContent();

console.log('\n=== Caching Proxy Example ===\n');

const cachedDoc = new DocumentCachingProxy('report.pdf');
cachedDoc.getContent();
cachedDoc.getContent();
cachedDoc.getContent();
console.log(`Total accesses: ${cachedDoc.getAccessCount()}`);

console.log('\n=== Logging Proxy Example ===\n');

const loggedDoc = new DocumentLoggingProxy('data.csv', 'user123');
loggedDoc.getContent();
loggedDoc.display();
console.log(`\nAccess logs: ${loggedDoc.getLogs().length} entries`);

// ========== Real-world example: Virtual Proxy ==========

interface Image {
render(): void;
getWidth(): number;
getHeight(): number;
}

class RealImage implements Image {
constructor(private filename: string, private width: number, private height: number) {
this.loadImage();
}

private loadImage(): void {
console.log(`🖼️  Loading image: ${this.filename}...`);
}

render(): void {
console.log(`📸 Rendering image: ${this.filename} (${this.width}x${this.height})`);
}

getWidth(): number {
return this.width;
}

getHeight(): number {
return this.height;
}
}

class ImageProxy implements Image {
private realImage: RealImage | null = null;
private width: number;
private height: number;

constructor(filename: string, width: number, height: number) {
this.width = width;
this.height = height;
console.log(`✏️  Created proxy for image: ${filename} (${width}x${height})`);
}

private ensureLoaded(): void {
if (!this.realImage) {
// In real scenario, we'd pass filename but for simplicity...
this.realImage = new RealImage('image.jpg', this.width, this.height);
}
}

render(): void {
this.ensureLoaded();
this.realImage!.render();
}

getWidth(): number {
return this.width;
}

getHeight(): number {
return this.height;
}
}

console.log('\n=== Virtual Proxy Example (Lazy Loading) ===\n');

const images: Image[] = [
new ImageProxy('image1.jpg', 800, 600),
new ImageProxy('image2.jpg', 1024, 768),
new ImageProxy('image3.jpg', 640, 480),
];

console.log(`\n✅ Created ${images.length} image proxies without loading`);

console.log(`\nGetting dimensions (no loading needed):`);
for (const img of images) {
console.log(`  ${img.getWidth()}x${img.getHeight()}`);
}

console.log(`\nRendering specific image (triggers loading):`);
images[1].render();
```


  
```python [python]
from abc import ABC, abstractmethod
from datetime import datetime

# ========== Common Interface ==========

class Document(ABC):
    @abstractmethod
    def get_content(self) -> str:
        pass

    @abstractmethod
    def display(self) -> None:
        pass

# ========== Real Subject ==========

class RealDocument(Document):
    def __init__(self, filename: str):
        self._filename = filename
        self._content = ""
        self._load_from_disk()

    def _load_from_disk(self) -> None:
        print(f"⏳ Loading document: {self._filename}...")
        # Simulate heavy I/O operation
        self._content = f"Content of {self._filename}"
        print(f"✅ Document loaded: {self._filename}")

    def get_content(self) -> str:
        return self._content

    def display(self) -> None:
        print(f"📄 Displaying: {self._content}")

# ========== Protection Proxy ==========
# Controls access based on user permissions

class User:
    def __init__(self, name: str, role: str):
        self.name = name
        self.role = role  # 'admin', 'user', 'guest'

class DocumentProtectionProxy(Document):
    def __init__(self, filename: str, current_user: User, required_role: str):
        self._filename = filename
        self._current_user = current_user
        self._required_role = required_role
        self._real_document = None

    def _has_access(self) -> bool:
        role_hierarchy = {'admin': 3, 'user': 2, 'guest': 1}
        return role_hierarchy.get(self._current_user.role, 0) >= role_hierarchy.get(self._required_role, 0)

    def _initialize_document(self) -> None:
        if self._real_document is None:
            self._real_document = RealDocument(self._filename)

    def get_content(self) -> str:
        if not self._has_access():
            print(f"❌ Access denied for user: {self._current_user.name}. Required role: {self._required_role}")
            return "ACCESS DENIED"

        self._initialize_document()
        return self._real_document.get_content()

    def display(self) -> None:
        if not self._has_access():
            print(f"❌ Access denied for user: {self._current_user.name}")
            return

        self._initialize_document()
        self._real_document.display()

# ========== Caching Proxy ==========
# Caches document content to improve performance

class DocumentCachingProxy(Document):
    def __init__(self, filename: str):
        self._filename = filename
        self._real_document = None
        self._cached_content = None
        self._access_count = 0

    def _initialize_document(self) -> None:
        if self._real_document is None:
            self._real_document = RealDocument(self._filename)

    def get_content(self) -> str:
        self._access_count += 1

        if self._cached_content is None:
            print(f"📦 Cache miss, loading document...")
            self._initialize_document()
            self._cached_content = self._real_document.get_content()
        else:
            print(f"⚡ Cache hit! (Access #{self._access_count})")

        return self._cached_content

    def display(self) -> None:
        content = self.get_content()
        print(f"📄 Displaying (cached): {content}")

    def get_access_count(self) -> int:
        return self._access_count

    def invalidate_cache(self) -> None:
        print(f"🔄 Invalidating cache for {self._filename}")
        self._cached_content = None
        self._real_document = None

# ========== Logging Proxy ==========
# Logs all access to the document

class DocumentLoggingProxy(Document):
    def __init__(self, filename: str, user_id: str):
        self._filename = filename
        self._user_id = user_id
        self._real_document = None
        self._logs = []

    def _initialize_document(self) -> None:
        if self._real_document is None:
            self._real_document = RealDocument(self._filename)

    def _log(self, action: str) -> None:
        timestamp = datetime.now().isoformat()
        log_entry = f"[{timestamp}] User {self._user_id} - {action} on {self._filename}"
        self._logs.append(log_entry)
        print(f"📝 {log_entry}")

    def get_content(self) -> str:
        self._log("get_content()")
        self._initialize_document()
        return self._real_document.get_content()

    def display(self) -> None:
        self._log("display()")
        self._initialize_document()
        self._real_document.display()

    def get_logs(self) -> list:
        return self._logs

# ========== Usage Examples ==========

print("=== Protection Proxy Example ===\n")

admin_user = User("Alice", "admin")
regular_user = User("Bob", "user")
guest_user = User("Charlie", "guest")

# Admin can access everything
admin_doc = DocumentProtectionProxy("secret.txt", admin_user, "admin")
admin_doc.get_content()
admin_doc.display()

print("\n")

# Guest cannot access
guest_doc = DocumentProtectionProxy("secret.txt", guest_user, "admin")
guest_doc.get_content()

print("\n=== Caching Proxy Example ===\n")

cached_doc = DocumentCachingProxy("report.pdf")
cached_doc.get_content()
cached_doc.get_content()
cached_doc.get_content()
print(f"Total accesses: {cached_doc.get_access_count()}")

print("\n=== Logging Proxy Example ===\n")

logged_doc = DocumentLoggingProxy("data.csv", "user123")
logged_doc.get_content()
logged_doc.display()
print(f"\nAccess logs: {len(logged_doc.get_logs())} entries")

# ========== Real-world example: Virtual Proxy ==========

class Image(ABC):
    @abstractmethod
    def render(self) -> None:
        pass

    @abstractmethod
    def get_width(self) -> int:
        pass

    @abstractmethod
    def get_height(self) -> int:
        pass

class RealImage(Image):
    def __init__(self, filename: str, width: int, height: int):
        self._filename = filename
        self._width = width
        self._height = height
        self._load_image()

    def _load_image(self) -> None:
        print(f"🖼️  Loading image: {self._filename}...")

    def render(self) -> None:
        print(f"📸 Rendering image: {self._filename} ({self._width}x{self._height})")

    def get_width(self) -> int:
        return self._width

    def get_height(self) -> int:
        return self._height

class ImageProxy(Image):
    def __init__(self, filename: str, width: int, height: int):
        self._filename = filename
        self._width = width
        self._height = height
        self._real_image = None
        print(f"✏️  Created proxy for image: {filename} ({width}x{height})")

    def _ensure_loaded(self) -> None:
        if self._real_image is None:
            self._real_image = RealImage(self._filename, self._width, self._height)

    def render(self) -> None:
        self._ensure_loaded()
        self._real_image.render()

    def get_width(self) -> int:
        return self._width

    def get_height(self) -> int:
        return self._height

print("\n=== Virtual Proxy Example (Lazy Loading) ===\n")

images = [
    ImageProxy("image1.jpg", 800, 600),
    ImageProxy("image2.jpg", 1024, 768),
    ImageProxy("image3.jpg", 640, 480),
]

print(f"\n✅ Created {len(images)} image proxies without loading")

print(f"\nGetting dimensions (no loading needed):")
for img in images:
    print(f"  {img.get_width()}x{img.get_height()}")

print(f"\nRendering specific image (triggers loading):")
images[1].render()
```

:::

## Real-World Example

**Remote Service Proxy**: When working with remote services (databases, APIs), a proxy can:

- **Buffer requests**: Batch multiple requests to reduce network calls
- **Handle failures**: Implement retry logic and fallbacks
- **Cache results**: Store responses to avoid repeated calls
- **Throttle access**: Implement rate limiting
- **Convert formats**: Translate between local and remote data formats

Example: A `DatabaseProxy` wraps a remote database connection, implementing caching, connection pooling, and retry logic transparently.

## Advantages

::: tip
✅ **Lazy Initialization**: Create expensive objects only when needed

✅ **Access Control**: Restrict or control how objects are accessed

✅ **Enhanced Functionality**: Add logging, caching, or monitoring without modifying the subject

✅ **Separation of Concerns**: Keep access control logic separate from business logic

✅ **Network Optimization**: Reduce network traffic with caching and batching

✅ **Transparency**: Proxy and subject share the same interface

✅ **Single Responsibility**: Each proxy handles one specific concern
:::

## Disadvantages

::: warning
❌ **Added Complexity**: Additional layer of indirection

❌ **Performance Overhead**: Extra method calls add latency

❌ **Maintenance Burden**: Multiple proxies need to be maintained

❌ **Difficult Debugging**: Indirection makes tracing execution harder

❌ **Thread Safety**: Shared proxies require careful synchronization

❌ **Memory Overhead**: Proxy objects consume additional memory

❌ **Unexpected Behavior**: Lazy loading or caching can cause surprising behavior
:::

## When to Use

- You need lazy initialization (defer expensive object creation)
- You need access control (authentication, authorization)
- You want logging or monitoring without modifying the subject
- You're implementing remote object access (RPC, network services)
- You need caching to improve performance
- You want to implement copy-on-write semantics
- You're building a plugin system with security restrictions
- You need to throttle or rate-limit access

## When NOT to Use

- The real object is lightweight and always needed
- Performance is critical and overhead is unacceptable
- Simplicity is more important than added features
- The proxy logic becomes too complex
- Thread synchronization becomes a major concern
- The proxy makes behavior unpredictable or unclear
- The shared interface doesn't fit both proxy and subject well

## Related Patterns

- **Decorator Pattern**: Similar structure, but Decorator adds responsibilities while Proxy controls access
- **Facade Pattern**: Both provide simplified interfaces, but Facade simplifies subsystems while Proxy controls access
- **Adapter Pattern**: Both involve wrapping, but Adapter converts interfaces while Proxy controls access
- **Factory Pattern**: Often used with Proxy to create proxies for created objects
- **Strategy Pattern**: Both involve object composition, but Strategy encapsulates algorithms while Proxy controls access
