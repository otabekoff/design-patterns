---
title: Composite Pattern
description: Composes objects into tree structures to represent part-whole hierarchies, letting clients treat individual objects and compositions uniformly
icon: GitBranch
---

## Overview

The Composite Pattern is a structural design pattern that allows you to compose objects into tree structures to represent part-whole hierarchies. It lets clients treat individual objects and compositions of objects uniformly, creating recursive tree structures.

## Purpose

- **Represent hierarchical structures** using tree compositions
- **Treat individual and composite objects uniformly** through a common interface
- **Simplify client code** by hiding the structure complexity
- **Support tree traversal** and manipulation operations
- **Build flexible hierarchies** that can grow dynamically

## Problem

Consider a GUI framework where you need to represent nested components:

- A `Window` contains `Buttons`, `TextBoxes`, and `Panels`
- A `Panel` contains other `Panels`, `Buttons`, and `TextBoxes`
- A `Toolbar` contains `Icons`, `Separators`, and `DropdownMenus`

Without the Composite Pattern, client code must know:

- Whether an object is a leaf (like a Button) or a container (like a Panel)
- How to iterate through container children
- Different operations for containers vs leaves

This creates complex, error-prone client code filled with type checks and conditional logic.

## Solution

The Composite Pattern provides a solution by:

1. **Common Interface**: Both leaf and composite objects implement the same interface
2. **Uniform Treatment**: Clients treat all objects uniformly through the interface
3. **Tree Structure**: Composite objects contain collections of child components
4. **Recursive Composition**: Composites can contain other composites, forming trees
5. **Operation Delegation**: Operations recurse through the tree structure

## Implementation

::: code-group
<TabsList className="grid w-full grid-cols-2">
    <TabsTrigger value="typescript">TypeScript</TabsTrigger>
    <TabsTrigger value="python">Python</TabsTrigger>
  </TabsList>

  
```typescript [typescript]
// ========== Component Interface ==========
interface Component {
  getName(): string;
  render(): string;
  add?(component: Component): void;
  remove?(component: Component): void;
  getChild?(index: number): Component | undefined;
}

// ========== Leaf Classes ==========
class Button implements Component {
constructor(private name: string) {}

getName(): string {
return this.name;
}

render(): string {
return `<button>${this.name}</button>`;
}
}

class TextBox implements Component {
constructor(private name: string, private placeholder: string) {}

getName(): string {
return this.name;
}

render(): string {
return `<input type="text" placeholder="${this.placeholder}" />`;
}
}

class Label implements Component {
constructor(private name: string, private text: string) {}

getName(): string {
return this.name;
}

render(): string {
return `<label>${this.text}</label>`;
}
}

// ========== Composite Classes ==========
class Panel implements Component {
private children: Component[] = [];

constructor(private name: string) {}

getName(): string {
return this.name;
}

add(component: Component): void {
this.children.push(component);
}

remove(component: Component): void {
this.children = this.children.filter(child => child !== component);
}

getChild(index: number): Component | undefined {
return this.children[index];
}

render(): string {
const childrenHtml = this.children.map(child => child.render()).join('\n');
return `<div class="panel" id="${this.name}">\n${childrenHtml}\n</div>`;
}

// Additional composite operations
renderWithIndentation(indent: number = 0): string {
const spacing = ' '.repeat(indent);
let result = `${spacing}<Panel: ${this.name}>\n`;
for (const child of this.children) {
if ('renderWithIndentation' in child) {
result += (child as Panel).renderWithIndentation(indent + 2);
} else {
result += `${spacing}  <${child.getName()}>\n`;
}
}
return result;
}

getChildrenCount(): number {
return this.children.length;
}

getAllDescendants(): Component[] {
let descendants: Component[] = [];
for (const child of this.children) {
descendants.push(child);
if ('getAllDescendants' in child) {
descendants = descendants.concat((child as Panel).getAllDescendants());
}
}
return descendants;
}
}

class Window implements Component {
private children: Component[] = [];

constructor(private name: string, private title: string) {}

getName(): string {
return this.name;
}

add(component: Component): void {
this.children.push(component);
}

remove(component: Component): void {
this.children = this.children.filter(child => child !== component);
}

getChild(index: number): Component | undefined {
return this.children[index];
}

render(): string {
const childrenHtml = this.children.map(child => child.render()).join('\n');
return `<html>\n<head><title>${this.title}</title></head>\n<body>\n${childrenHtml}\n</body>\n</html>`;
}
}

// ========== Usage ==========
// Create a complex UI structure
const window = new Window('mainWindow', 'My Application');

// Create header panel
const headerPanel = new Panel('header');
headerPanel.add(new Label('title', 'Welcome to My App'));

// Create form panel
const formPanel = new Panel('form');
formPanel.add(new Label('nameLabel', 'Name:'));
formPanel.add(new TextBox('nameInput', 'Enter your name'));
formPanel.add(new Label('emailLabel', 'Email:'));
formPanel.add(new TextBox('emailInput', 'Enter your email'));

// Create button panel
const buttonPanel = new Panel('buttons');
buttonPanel.add(new Button('Submit'));
buttonPanel.add(new Button('Cancel'));

// Compose the structure
window.add(headerPanel);
window.add(formPanel);
window.add(buttonPanel);

// Render the entire structure
console.log(window.render());

// Show tree structure
console.log('\n--- Tree Structure ---');
console.log((window as any).renderWithIndentation());

// Get all descendants
console.log('\n--- All Descendants ---');
console.log((window as any).getAllDescendants().map((c: Component) => c.getName()));

// ========== Real-world example: File System ==========

interface FileSystemItem {
getName(): string;
getSize(): number;
display(indent: number): void;
}

class File implements FileSystemItem {
constructor(private name: string, private size: number) {}

getName(): string {
return this.name;
}

getSize(): number {
return this.size;
}

display(indent: number = 0): void {
console.log(`${'  '.repeat(indent)}📄 ${this.name} (${this.size} KB)`);
}
}

class Directory implements FileSystemItem {
private items: FileSystemItem[] = [];

constructor(private name: string) {}

add(item: FileSystemItem): void {
this.items.push(item);
}

getName(): string {
return this.name;
}

getSize(): number {
return this.items.reduce((sum, item) => sum + item.getSize(), 0);
}

display(indent: number = 0): void {
console.log(`${'  '.repeat(indent)}📁 ${this.name}/`);
for (const item of this.items) {
item.display(indent + 1);
}
}

getItemCount(): number {
return this.items.length;
}

findByName(name: string): FileSystemItem | undefined {
for (const item of this.items) {
if (item.getName() === name) {
return item;
}
if (item instanceof Directory) {
const found = item.findByName(name);
if (found) return found;
}
}
return undefined;
}
}

// ========== File System Usage ==========
const root = new Directory('root');

const documents = new Directory('Documents');
documents.add(new File('Resume.pdf', 250));
documents.add(new File('CoverLetter.docx', 180));

const photos = new Directory('Photos');
const vacation = new Directory('Vacation');
vacation.add(new File('beach01.jpg', 2400));
vacation.add(new File('beach02.jpg', 2200));
photos.add(vacation);

const projects = new Directory('Projects');
const project1 = new Directory('WebApp');
project1.add(new File('index.html', 45));
project1.add(new File('style.css', 120));
project1.add(new File('script.js', 350));
projects.add(project1);

root.add(documents);
root.add(photos);
root.add(projects);

root.display();
console.log(`\nTotal size: ${root.getSize()} KB`);
console.log(`Total items in projects: ${projects.getItemCount()}`);

// Find a file
const found = root.findByName('script.js');
console.log(`\nFound: ${found?.getName()}`);

`
```

  
```python [python]
from abc import ABC, abstractmethod
from typing import List, Optional

# ========== Component Interface ==========

class Component(ABC):
    @abstractmethod
    def get_name(self) -> str:
        pass

    @abstractmethod
    def render(self) -> str:
        pass

    def add(self, component: 'Component') -> None:
        raise NotImplementedError("add() is not supported for leaf components")

    def remove(self, component: 'Component') -> None:
        raise NotImplementedError("remove() is not supported for leaf components")

    def get_child(self, index: int) -> Optional['Component']:
        raise NotImplementedError("get_child() is not supported for leaf components")

# ========== Leaf Classes ==========

class Button(Component):
    def __init__(self, name: str):
        self._name = name

    def get_name(self) -> str:
        return self._name

    def render(self) -> str:
        return f"<button>{self._name}</button>"

class TextBox(Component):
    def __init__(self, name: str, placeholder: str):
        self._name = name
        self._placeholder = placeholder

    def get_name(self) -> str:
        return self._name

    def render(self) -> str:
        return f'<input type="text" placeholder="{self._placeholder}" />'

class Label(Component):
    def __init__(self, name: str, text: str):
        self._name = name
        self._text = text

    def get_name(self) -> str:
        return self._name

    def render(self) -> str:
        return f"<label>{self._text}</label>"

# ========== Composite Classes ==========

class Panel(Component):
    def __init__(self, name: str):
        self._name = name
        self._children: List[Component] = []

    def get_name(self) -> str:
        return self._name

    def add(self, component: Component) -> None:
        self._children.append(component)

    def remove(self, component: Component) -> None:
        if component in self._children:
            self._children.remove(component)

    def get_child(self, index: int) -> Optional[Component]:
        return self._children[index] if index < len(self._children) else None

    def render(self) -> str:
        children_html = '\n'.join(child.render() for child in self._children)
        return f'<div class="panel" id="{self._name}">\n{children_html}\n</div>'

    def render_with_indentation(self, indent: int = 0) -> str:
        spacing = ' ' * indent
        result = f"{spacing}<Panel: {self._name}>\n"
        for child in self._children:
            if isinstance(child, Panel):
                result += child.render_with_indentation(indent + 2)
            else:
                result += f"{spacing}  <{child.get_name()}>\n"
        return result

    def get_children_count(self) -> int:
        return len(self._children)

    def get_all_descendants(self) -> List[Component]:
        descendants = []
        for child in self._children:
            descendants.append(child)
            if isinstance(child, Panel):
                descendants.extend(child.get_all_descendants())
        return descendants

class Window(Component):
    def __init__(self, name: str, title: str):
        self._name = name
        self._title = title
        self._children: List[Component] = []

    def get_name(self) -> str:
        return self._name

    def add(self, component: Component) -> None:
        self._children.append(component)

    def remove(self, component: Component) -> None:
        if component in self._children:
            self._children.remove(component)

    def get_child(self, index: int) -> Optional[Component]:
        return self._children[index] if index < len(self._children) else None

    def render(self) -> str:
        children_html = '\n'.join(child.render() for child in self._children)
        return f"<html>\n<head><title>{self._title}</title></head>\n<body>\n{children_html}\n</body>\n</html>"

# ========== Usage ==========

window = Window('mainWindow', 'My Application')

# Create header panel
header_panel = Panel('header')
header_panel.add(Label('title', 'Welcome to My App'))

# Create form panel
form_panel = Panel('form')
form_panel.add(Label('nameLabel', 'Name:'))
form_panel.add(TextBox('nameInput', 'Enter your name'))
form_panel.add(Label('emailLabel', 'Email:'))
form_panel.add(TextBox('emailInput', 'Enter your email'))

# Create button panel
button_panel = Panel('buttons')
button_panel.add(Button('Submit'))
button_panel.add(Button('Cancel'))

# Compose the structure
window.add(header_panel)
window.add(form_panel)
window.add(button_panel)

# Render the entire structure
print(window.render())

# Show tree structure
print('\n--- Tree Structure ---')
print(header_panel.render_with_indentation())

# Get all descendants
print('\n--- All Descendants ---')
descendants = header_panel.get_all_descendants()
print([c.get_name() for c in descendants])

# ========== Real-world example: File System ==========

class FileSystemItem(ABC):
    @abstractmethod
    def get_name(self) -> str:
        pass

    @abstractmethod
    def get_size(self) -> int:
        pass

    @abstractmethod
    def display(self, indent: int = 0) -> None:
        pass

class File(FileSystemItem):
    def __init__(self, name: str, size: int):
        self._name = name
        self._size = size

    def get_name(self) -> str:
        return self._name

    def get_size(self) -> int:
        return self._size

    def display(self, indent: int = 0) -> None:
        print(f"{'  ' * indent}📄 {self._name} ({self._size} KB)")

class Directory(FileSystemItem):
    def __init__(self, name: str):
        self._name = name
        self._items: List[FileSystemItem] = []

    def add(self, item: FileSystemItem) -> None:
        self._items.append(item)

    def get_name(self) -> str:
        return self._name

    def get_size(self) -> int:
        return sum(item.get_size() for item in self._items)

    def display(self, indent: int = 0) -> None:
        print(f"{'  ' * indent}📁 {self._name}/")
        for item in self._items:
            item.display(indent + 1)

    def get_item_count(self) -> int:
        return len(self._items)

    def find_by_name(self, name: str) -> Optional[FileSystemItem]:
        for item in self._items:
            if item.get_name() == name:
                return item
            if isinstance(item, Directory):
                found = item.find_by_name(name)
                if found:
                    return found
        return None

# ========== File System Usage ==========

root = Directory('root')

documents = Directory('Documents')
documents.add(File('Resume.pdf', 250))
documents.add(File('CoverLetter.docx', 180))

photos = Directory('Photos')
vacation = Directory('Vacation')
vacation.add(File('beach01.jpg', 2400))
vacation.add(File('beach02.jpg', 2200))
photos.add(vacation)

projects = Directory('Projects')
project1 = Directory('WebApp')
project1.add(File('index.html', 45))
project1.add(File('style.css', 120))
project1.add(File('script.js', 350))
projects.add(project1)

root.add(documents)
root.add(photos)
root.add(projects)

root.display()
print(f"\nTotal size: {root.get_size()} KB")
print(f"Total items in projects: {projects.get_item_count()}")

# Find a file
found = root.find_by_name('script.js')
print(f"\nFound: {found.get_name() if found else 'Not found'}")
`
```

:::

## Real-World Example

**Organization Hierarchy**: Represent a company structure where:

- An **Organization** contains **Departments**
- A **Department** contains **Teams** and **Employees**
- A **Team** contains **Employees**
- An **Employee** is a leaf node

Both departments and teams can contain employees, and departments can contain both teams and employees. You can perform operations like calculating total headcount, salary expenses, or generating organization charts uniformly across all levels.

## Advantages

::: success
✅ **Simplified Client Code**: Clients treat individual and composite objects uniformly

✅ **Natural Hierarchy Representation**: Easily represents tree structures in problem domain

✅ **Easy to Add New Components**: Add new leaf or composite types without changing existing code

✅ **Flexible Structure**: Build and modify hierarchies dynamically at runtime

✅ **Recursive Operations**: Operations naturally work recursively through the tree

✅ **Single Responsibility**: Each class has a clear, focused responsibility

✅ **Open/Closed Principle**: Open for extension, closed for modification
:::

## Disadvantages

::: warning
❌ **Overly General Design**: May oversimplify by treating unrelated objects uniformly

❌ **Difficult Type Safety**: Can't enforce type constraints (e.g., preventing certain children)

❌ **Performance Issues**: Recursive operations on deep trees can be slow

❌ **Memory Overhead**: Tree structures consume more memory than alternatives

❌ **Complex Traversal**: Some tree operations can become complex and inefficient

❌ **Difficult Debugging**: Deep recursion makes debugging challenging

❌ **Not Always Appropriate**: Not all hierarchies need this level of uniformity
:::

## When to Use

- You need to represent part-whole hierarchies as tree structures
- You want clients to treat individual and composite objects uniformly
- You need to perform operations recursively on all components
- You're building file systems, DOM trees, organization structures
- You want to add new types without modifying existing client code
- You need to build flexible hierarchies dynamically

## When NOT to Use

- You need strong type safety and different handling for different types
- The hierarchy is simple and doesn't benefit from uniform treatment
- Performance is critical and recursion overhead is unacceptable
- Leaf and composite objects need significantly different interfaces
- You rarely perform operations on the entire tree
- The hierarchy is very deep and recursion isn't suitable

## Related Patterns

- **Iterator Pattern**: Use to traverse composite structures sequentially
- **Visitor Pattern**: Use to perform complex operations on composite structures
- **Factory Pattern**: Often used with Composite to create complex hierarchies
- **Decorator Pattern**: Both use recursive composition, but Decorator adds functionality while Composite represents hierarchies
- **Observer Pattern**: Can be combined with Composite to notify observers of tree changes
