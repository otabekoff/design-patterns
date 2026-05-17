---
title: Composite Pattern
description: Composes objects into tree structures and lets clients treat individual objects and compositions uniformly.
icon: GitBranch
---

![Composite Concept](/images/patterns/composite-mini.png)

# Composite Pattern

## Overview

The **Composite** pattern is a structural design pattern that lets you build tree structures of objects and treat individual objects and groups of objects through the same interface. The client code does not need to know whether it is dealing with a leaf node or a container node.

**Key advantage**: It makes recursive hierarchies easy to work with and hides tree traversal details from clients.

**Modern perspective**: Composite shows up in document editors, UI trees, DOM-like structures, menu systems, permission trees, ASTs, and CMS content models. Any time a leaf and a container should expose the same operations, Composite is a strong fit.

Composite is about uniform treatment of part and whole.

## Real-World Analogy

Think of a **company organization chart**. An individual employee can be a leaf. A manager is also an employee, but that manager can contain reports. The same questions still make sense for both: who is your manager, what is your name, and what is your role?

That shared shape is what Composite models.

## The Problem

Suppose you are building a content management system where content can be:

- text blocks
- images
- callout boxes
- sections
- pages
- nested subpages

If every client has to special-case leaf nodes and container nodes, the code becomes full of `if` statements, type checks, and recursion logic.

### Problem Example

```typescript
// ❌ Bad: client code knows too much about the hierarchy
function renderNode(node: Page | TextBlock | ImageBlock | Section): string {
  if (node instanceof Section) {
    return node.children.map(renderNode).join("");
  }

  if (node instanceof TextBlock) {
    return `<p>${node.text}</p>`;
  }

  if (node instanceof ImageBlock) {
    return `<img src="${node.src}" />`;
  }

  return "";
}
```

That approach does not scale as the tree grows.

## The Solution

Composite solves this by giving both leaf and container objects the same interface.

1. Define a component interface
2. Implement leaf nodes with simple behavior
3. Implement composite nodes that store children
4. Delegate recursive work to child nodes
5. Let clients call the same method on any node

## Implementation

::: code-group

```typescript [typescript]
interface ContentNode {
  getTitle(): string;
  render(): string;
}

class TextBlock implements ContentNode {
  constructor(
    private readonly title: string,
    private readonly text: string,
  ) {}

  getTitle(): string {
    return this.title;
  }

  render(): string {
    return `<p>${this.text}</p>`;
  }
}

class ImageBlock implements ContentNode {
  constructor(
    private readonly title: string,
    private readonly src: string,
  ) {}

  getTitle(): string {
    return this.title;
  }

  render(): string {
    return `<img alt="${this.title}" src="${this.src}" />`;
  }
}

class Section implements ContentNode {
  private children: ContentNode[] = [];

  constructor(private readonly title: string) {}

  getTitle(): string {
    return this.title;
  }

  add(child: ContentNode): void {
    this.children.push(child);
  }

  remove(child: ContentNode): void {
    this.children = this.children.filter((node) => node !== child);
  }

  render(): string {
    const body = this.children.map((child) => child.render()).join("\n");
    return `<section><h2>${this.title}</h2>${body}</section>`;
  }

  listTitles(): string[] {
    const titles = [this.title];
    for (const child of this.children) {
      titles.push(child.getTitle());
      if (child instanceof Section) {
        titles.push(...child.listTitles().slice(1));
      }
    }
    return titles;
  }
}

class Page implements ContentNode {
  private children: ContentNode[] = [];

  constructor(private readonly title: string) {}

  getTitle(): string {
    return this.title;
  }

  add(child: ContentNode): void {
    this.children.push(child);
  }

  render(): string {
    const body = this.children.map((child) => child.render()).join("\n");
    return `<!doctype html><html><body><main><h1>${this.title}</h1>${body}</main></body></html>`;
  }
}

const page = new Page("Design Patterns Handbook");
const intro = new Section("Introduction");
intro.add(new TextBlock("Overview", "Composite models tree structures."));
intro.add(new ImageBlock("Diagram", "/images/composite.png"));

const guide = new Section("Guide");
guide.add(new TextBlock("Leaf", "A leaf has no children."));
guide.add(new TextBlock("Composite", "A composite contains children."));

page.add(intro);
page.add(guide);
console.log(page.render());
```

```python [python]
from abc import ABC, abstractmethod


class ContentNode(ABC):
    @abstractmethod
    def get_title(self) -> str:
        pass

    @abstractmethod
    def render(self) -> str:
        pass


class TextBlock(ContentNode):
    def __init__(self, title: str, text: str):
        self._title = title
        self._text = text

    def get_title(self) -> str:
        return self._title

    def render(self) -> str:
        return f"<p>{self._text}</p>"


class ImageBlock(ContentNode):
    def __init__(self, title: str, src: str):
        self._title = title
        self._src = src

    def get_title(self) -> str:
        return self._title

    def render(self) -> str:
        return f'<img alt="{self._title}" src="{self._src}" />'


class Section(ContentNode):
    def __init__(self, title: str):
        self._title = title
        self._children = []

    def get_title(self) -> str:
        return self._title

    def add(self, child: ContentNode) -> None:
        self._children.append(child)

    def remove(self, child: ContentNode) -> None:
        if child in self._children:
            self._children.remove(child)

    def render(self) -> str:
        body = "\n".join(child.render() for child in self._children)
        return f"<section><h2>{self._title}</h2>{body}</section>"

    def list_titles(self):
        titles = [self._title]
        for child in self._children:
            titles.append(child.get_title())
            if isinstance(child, Section):
                titles.extend(child.list_titles()[1:])
        return titles


class Page(ContentNode):
    def __init__(self, title: str):
        self._title = title
        self._children = []

    def get_title(self) -> str:
        return self._title

    def add(self, child: ContentNode) -> None:
        self._children.append(child)

    def render(self) -> str:
        body = "\n".join(child.render() for child in self._children)
        return f"<!doctype html><html><body><main><h1>{self._title}</h1>{body}</main></body></html>"


page = Page("Design Patterns Handbook")
intro = Section("Introduction")
intro.add(TextBlock("Overview", "Composite models tree structures."))
intro.add(ImageBlock("Diagram", "/images/composite.png"))

guide = Section("Guide")
guide.add(TextBlock("Leaf", "A leaf has no children."))
guide.add(TextBlock("Composite", "A composite contains children."))

page.add(intro)
page.add(guide)
print(page.render())
```

```java [java]
interface ContentNode {
    String getTitle();
    String render();
}

class TextBlock implements ContentNode {
    private final String title;
    private final String text;

    TextBlock(String title, String text) {
        this.title = title;
        this.text = text;
    }

    @Override
    public String getTitle() {
        return title;
    }

    @Override
    public String render() {
        return "<p>" + text + "</p>";
    }
}

class ImageBlock implements ContentNode {
    private final String title;
    private final String src;

    ImageBlock(String title, String src) {
        this.title = title;
        this.src = src;
    }

    @Override
    public String getTitle() {
        return title;
    }

    @Override
    public String render() {
        return "<img alt=\"" + title + "\" src=\"" + src + "\" />";
    }
}

class Section implements ContentNode {
    private final String title;
    private final java.util.List<ContentNode> children = new java.util.ArrayList<>();

    Section(String title) {
        this.title = title;
    }

    @Override
    public String getTitle() {
        return title;
    }

    void add(ContentNode child) {
        children.add(child);
    }

    void remove(ContentNode child) {
        children.remove(child);
    }

    @Override
    public String render() {
        StringBuilder body = new StringBuilder();
        for (ContentNode child : children) {
            body.append(child.render()).append("\n");
        }
        return "<section><h2>" + title + "</h2>" + body + "</section>";
    }
}

class Page implements ContentNode {
    private final String title;
    private final java.util.List<ContentNode> children = new java.util.ArrayList<>();

    Page(String title) {
        this.title = title;
    }

    @Override
    public String getTitle() {
        return title;
    }

    void add(ContentNode child) {
        children.add(child);
    }

    @Override
    public String render() {
        StringBuilder body = new StringBuilder();
        for (ContentNode child : children) {
            body.append(child.render()).append("\n");
        }
        return "<!doctype html><html><body><main><h1>" + title + "</h1>" + body + "</main></body></html>";
    }
}
```

```go [go]
package main

import "fmt"

type ContentNode interface {
	GetTitle() string
	Render() string
}

type TextBlock struct {
	title string
	text  string
}

func (t *TextBlock) GetTitle() string { return t.title }
func (t *TextBlock) Render() string    { return "<p>" + t.text + "</p>" }

type ImageBlock struct {
	title string
	src   string
}

func (i *ImageBlock) GetTitle() string { return i.title }
func (i *ImageBlock) Render() string {
	return fmt.Sprintf("<img alt=\"%s\" src=\"%s\" />", i.title, i.src)
}

type Section struct {
	title    string
	children []ContentNode
}

func NewSection(title string) *Section { return &Section{title: title} }
func (s *Section) GetTitle() string    { return s.title }
func (s *Section) Add(child ContentNode) { s.children = append(s.children, child) }

func (s *Section) Render() string {
	body := ""
	for _, child := range s.children {
		body += child.Render() + "\n"
	}
	return "<section><h2>" + s.title + "</h2>" + body + "</section>"
}

type Page struct {
	title    string
	children []ContentNode
}

func NewPage(title string) *Page { return &Page{title: title} }
func (p *Page) GetTitle() string { return p.title }
func (p *Page) Add(child ContentNode) { p.children = append(p.children, child) }

func (p *Page) Render() string {
	body := ""
	for _, child := range p.children {
		body += child.Render() + "\n"
	}
	return "<!doctype html><html><body><main><h1>" + p.title + "</h1>" + body + "</main></body></html>"
}
```

```rust [rust]
trait ContentNode {
    fn get_title(&self) -> &str;
    fn render(&self) -> String;
}

struct TextBlock {
    title: String,
    text: String,
}

impl ContentNode for TextBlock {
    fn get_title(&self) -> &str { &self.title }
    fn render(&self) -> String { format!("<p>{}</p>", self.text) }
}

struct ImageBlock {
    title: String,
    src: String,
}

impl ContentNode for ImageBlock {
    fn get_title(&self) -> &str { &self.title }
    fn render(&self) -> String {
        format!("<img alt=\"{}\" src=\"{}\" />", self.title, self.src)
    }
}

struct Section {
    title: String,
    children: Vec<Box<dyn ContentNode>>,
}

impl Section {
    fn new(title: String) -> Self {
        Self { title, children: Vec::new() }
    }

    fn add(&mut self, child: Box<dyn ContentNode>) {
        self.children.push(child);
    }
}

impl ContentNode for Section {
    fn get_title(&self) -> &str { &self.title }

    fn render(&self) -> String {
        let body: String = self.children.iter().map(|c| c.render() + "\n").collect();
        format!("<section><h2>{}</h2>{}</section>", self.title, body)
    }
}

struct Page {
    title: String,
    children: Vec<Box<dyn ContentNode>>,
}

impl Page {
    fn new(title: String) -> Self {
        Self { title, children: Vec::new() }
    }

    fn add(&mut self, child: Box<dyn ContentNode>) {
        self.children.push(child);
    }
}

impl ContentNode for Page {
    fn get_title(&self) -> &str { &self.title }

    fn render(&self) -> String {
        let body: String = self.children.iter().map(|c| c.render() + "\n").collect();
        format!("<!doctype html><html><body><main><h1>{}</h1>{}</main></body></html>", self.title, body)
    }
}
```

:::

## Real-World Example

A content management system is a natural fit for Composite because pages contain sections, sections contain blocks, and blocks may themselves contain nested content.

A single render operation can work on any node in the tree, while recursive delegation handles the rest.

```typescript
const page = new Page("Design Patterns Handbook");
const intro = new Section("Introduction");
intro.add(new TextBlock("Overview", "Composite models tree structures."));
intro.add(new ImageBlock("Diagram", "/images/composite.png"));

page.add(intro);
console.log(page.render());
```

That same pattern applies to menus, outlines, permission trees, and UI component trees.

## Advantages

- Models part-whole hierarchies naturally
- Treats leaf and composite nodes uniformly
- Makes recursive traversal simpler for clients
- Supports dynamic tree growth
- Reduces client-side type checking and branching
- Fits document and UI structures well

## Disadvantages

- Can make the model harder to understand at first
- Leaf and composite nodes may not have identical capabilities
- Can become too generic if the interface is overloaded
- Recursive operations may be expensive on large trees
- Debugging deep hierarchies can take more effort

## When to Use

- You need a tree or recursive hierarchy
- Leaves and containers should expose the same operations
- You want clients to ignore whether they are handling a leaf or a composite
- You expect the hierarchy to grow dynamically
- You are modeling documents, menus, UI trees, or ASTs

## When NOT to Use

- Your structure is flat, not recursive
- Leaf and container operations are too different to unify cleanly
- The hierarchy is tiny and unlikely to grow
- A simple list or map is enough
- Uniform treatment would hide important distinctions

## Common Mistakes

### Mistake 1: Forcing every leaf to support container methods

```typescript
// ❌ Bad: meaningless add() on a leaf
class TextBlock {
  add() {}
}

// ✅ Good: keep leaf behavior minimal and clear
```

### Mistake 2: Making the interface too broad

```typescript
// ❌ Bad: huge interface with unrelated methods
interface ContentNode {
  render(): string;
  add(): void;
  saveToDb(): void;
  sendEmail(): void;
}

// ✅ Good: keep the shared contract focused
```

### Mistake 3: Putting traversal in clients

```typescript
// ❌ Bad: every caller recursively walks the tree
// ✅ Good: put recursion in the composite itself
```

### Mistake 4: Treating Composite like Adapter

```typescript
// ❌ Bad: using Composite to fix mismatched interfaces
// ✅ Good: use Composite for tree structures, Adapter for compatibility
```

## Related Patterns

- **Iterator**: Can traverse composite trees
- **Visitor**: Often used to perform operations across composite hierarchies
- **Decorator**: Adds behavior to nodes without changing the tree structure
- **Command**: Can represent tree operations as commands

## Modern Alternatives

- JSON document models
- React/Vue component trees
- AST libraries and syntax trees
- Graph-based content editors
- Recursive data structures with visitor utilities

## Interview Insights

**Q1: What problem does Composite solve?**

A: It lets clients treat individual objects and groups of objects uniformly in a tree structure.

**Q2: How is Composite different from Decorator?**

A: Composite represents whole-part hierarchies. Decorator adds behavior to one object.

**Q3: Why is Composite useful for UI trees?**

A: UI trees naturally mix containers and leaves, but many operations such as render or measure should work on both.

**Q4: What is the biggest design risk with Composite?**

A: Making the shared interface too broad or too vague.

**Q5: When should you avoid Composite?**

A: When the structure is not really recursive or when leaves and containers have too different a shape to share one contract cleanly.
