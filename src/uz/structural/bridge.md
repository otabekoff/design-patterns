---
title: Bridge Pattern
description: Decouples an abstraction from its implementation so the two can vary independently
icon: Layers
---

# Bridge Pattern

<CoverImage src="/covers/structural/bridge.png" alt="Cover">
  <h1>Bridge</h1>
  <p>A beautiful futuristic bridge separating a floating "Control Room" sphere (Abstraction) from various interchangeable "Engine/Power" docks below (Implementations) connected by flexible glowing tubes.</p>
</CoverImage>

## Overview

The Bridge Pattern is a structural design pattern that decouples an abstraction from its implementation, allowing the two to vary independently. It's useful when you want to avoid a permanent binding between abstraction and implementation, or when changes in implementation should not affect clients.

## Purpose

- **Separate abstraction from implementation** allowing them to change independently
- **Avoid exponential class hierarchy growth** when combining multiple dimensions of variation
- **Share implementation** across multiple abstractions
- **Reduce coupling** between high-level and low-level modules

## Problem

Consider a `Shape` hierarchy with `Circle`, `Rectangle`, etc. Now you also need to support different rendering implementations: `WindowsRenderer`, `LinuxRenderer`, `WebRenderer`.

Without the Bridge Pattern, you'd need to create classes like:

- `WindowsCircle`, `LinuxCircle`, `WebCircle`
- `WindowsRectangle`, `LinuxRectangle`, `WebRectangle`

This creates a **2D class hierarchy explosion** (N shapes × M renderers = N×M classes). When you add a new shape or renderer, you multiply the number of classes needed.

The Bridge Pattern solves this by separating the shape abstraction from the rendering implementation.

## Solution

The Bridge Pattern provides two hierarchies that bridge to each other:

1. **Abstraction Hierarchy**: `Shape` with concrete classes like `Circle`, `Rectangle`
2. **Implementation Hierarchy**: `Renderer` with concrete classes like `WindowsRenderer`, `LinuxRenderer`

The abstraction holds a reference to an implementation, allowing them to vary independently:

- Add new shapes without modifying existing renderers
- Add new renderers without modifying existing shapes

## Implementation

::: code-group

```typescript [typescript]
// ========== Implementation Hierarchy ==========
interface Renderer {
  renderCircle(radius: number): void;
  renderRectangle(width: number, height: number): void;
}

class WindowsRenderer implements Renderer {
renderCircle(radius: number): void {
console.log(`[Windows] Rendering circle with radius ${radius} using DirectX`);
}

renderRectangle(width: number, height: number): void {
console.log(`[Windows] Rendering rectangle ${width}x${height} using DirectX`);
}
}

class LinuxRenderer implements Renderer {
renderCircle(radius: number): void {
console.log(`[Linux] Rendering circle with radius ${radius} using X11`);
}

renderRectangle(width: number, height: number): void {
console.log(`[Linux] Rendering rectangle ${width}x${height} using X11`);
}
}

class WebRenderer implements Renderer {
renderCircle(radius: number): void {
console.log(`[Web] Rendering circle with radius ${radius} using Canvas API`);
}

renderRectangle(width: number, height: number): void {
console.log(`[Web] Rendering rectangle ${width}x${height} using SVG`);
}
}

// ========== Abstraction Hierarchy ==========
abstract class Shape {
constructor(protected renderer: Renderer) {}

abstract draw(): void;
}

class Circle extends Shape {
constructor(private radius: number, renderer: Renderer) {
super(renderer);
}

draw(): void {
console.log(`Drawing circle`);
this.renderer.renderCircle(this.radius);
}

getArea(): number {
return Math.PI _ this.radius _ this.radius;
}
}

class Rectangle extends Shape {
constructor(private width: number, private height: number, renderer: Renderer) {
super(renderer);
}

draw(): void {
console.log(`Drawing rectangle`);
this.renderer.renderRectangle(this.width, this.height);
}

getArea(): number {
return this.width \* this.height;
}
}

// ========== Usage ==========
const windowsRenderer = new WindowsRenderer();
const linuxRenderer = new LinuxRenderer();
const webRenderer = new WebRenderer();

// Create same shapes with different renderers
const windowsCircle = new Circle(5, windowsRenderer);
const linuxCircle = new Circle(5, linuxRenderer);
const webCircle = new Circle(5, webRenderer);

// All shapes work independently of renderer
windowsCircle.draw();
linuxCircle.draw();
webCircle.draw();

console.log('---');

const windowsRect = new Rectangle(10, 20, windowsRenderer);
const linuxRect = new Rectangle(10, 20, linuxRenderer);

windowsRect.draw();
linuxRect.draw();

// ========== Real-world example: Device & Remote Controls ==========

interface Device {
powerOn(): void;
powerOff(): void;
setChannel(channel: number): void;
getStatus(): string;
}

class TV implements Device {
private isOn: boolean = false;
private currentChannel: number = 1;

powerOn(): void {
this.isOn = true;
console.log('TV is now ON');
}

powerOff(): void {
this.isOn = false;
console.log('TV is now OFF');
}

setChannel(channel: number): void {
if (this.isOn) {
this.currentChannel = channel;
console.log(`TV changed to channel ${channel}`);
}
}

getStatus(): string {
return this.isOn ? `TV is ON, channel: ${this.currentChannel}` : 'TV is OFF';
}
}

class Radio implements Device {
private isOn: boolean = false;
private currentFrequency: number = 88.5;

powerOn(): void {
this.isOn = true;
console.log('Radio is now ON');
}

powerOff(): void {
this.isOn = false;
console.log('Radio is now OFF');
}

setChannel(frequency: number): void {
if (this.isOn) {
this.currentFrequency = frequency;
console.log(`Radio tuned to ${frequency} FM`);
}
}

getStatus(): string {
return this.isOn ? `Radio is ON, tuned to: ${this.currentFrequency} FM` : 'Radio is OFF';
}
}

// Remote control abstraction
abstract class RemoteControl {
constructor(protected device: Device) {}

togglePower(): void {
if (this.device.getStatus().includes('ON')) {
this.device.powerOff();
} else {
this.device.powerOn();
}
}

changeChannel(channel: number): void {
this.device.setChannel(channel);
}

getStatus(): void {
console.log(this.device.getStatus());
}

abstract mute(): void;
}

class BasicRemote extends RemoteControl {
mute(): void {
console.log('Basic remote: muting device');
}
}

class AdvancedRemote extends RemoteControl {
mute(): void {
console.log('Advanced remote: applying noise cancellation');
}

record(): void {
console.log('Advanced remote: recording content');
}

// Add more advanced features
}

// ========== Usage ==========
const tv = new TV();
const basicRemote = new BasicRemote(tv);

basicRemote.togglePower();
basicRemote.changeChannel(10);
basicRemote.getStatus();

console.log('---');

const radio = new Radio();
const advancedRemote = new AdvancedRemote(radio);

advancedRemote.togglePower();
advancedRemote.changeChannel(102.3);
advancedRemote.record();
advancedRemote.getStatus();
```

  
```python [python]
from abc import ABC, abstractmethod

# ========== Implementation Hierarchy ==========

class Renderer(ABC):
    @abstractmethod
    def render_circle(self, radius: float) -> None:
        pass

    @abstractmethod
    def render_rectangle(self, width: float, height: float) -> None:
        pass

class WindowsRenderer(Renderer):
    def render_circle(self, radius: float) -> None:
        print(f"[Windows] Rendering circle with radius {radius} using DirectX")

    def render_rectangle(self, width: float, height: float) -> None:
        print(f"[Windows] Rendering rectangle {width}x{height} using DirectX")

class LinuxRenderer(Renderer):
    def render_circle(self, radius: float) -> None:
        print(f"[Linux] Rendering circle with radius {radius} using X11")

    def render_rectangle(self, width: float, height: float) -> None:
        print(f"[Linux] Rendering rectangle {width}x{height} using X11")

class WebRenderer(Renderer):
    def render_circle(self, radius: float) -> None:
        print(f"[Web] Rendering circle with radius {radius} using Canvas API")

    def render_rectangle(self, width: float, height: float) -> None:
        print(f"[Web] Rendering rectangle {width}x{height} using SVG")

# ========== Abstraction Hierarchy ==========

class Shape(ABC):
    def __init__(self, renderer: Renderer):
        self._renderer = renderer

    @abstractmethod
    def draw(self) -> None:
        pass

class Circle(Shape):
    def __init__(self, radius: float, renderer: Renderer):
        super().__init__(renderer)
        self._radius = radius

    def draw(self) -> None:
        print("Drawing circle")
        self._renderer.render_circle(self._radius)

    def get_area(self) -> float:
        import math
        return math.pi * self._radius ** 2

class Rectangle(Shape):
    def __init__(self, width: float, height: float, renderer: Renderer):
        super().__init__(renderer)
        self._width = width
        self._height = height

    def draw(self) -> None:
        print("Drawing rectangle")
        self._renderer.render_rectangle(self._width, self._height)

    def get_area(self) -> float:
        return self._width * self._height

# ========== Usage ==========

windows_renderer = WindowsRenderer()
linux_renderer = LinuxRenderer()
web_renderer = WebRenderer()

# Create same shapes with different renderers
windows_circle = Circle(5, windows_renderer)
linux_circle = Circle(5, linux_renderer)
web_circle = Circle(5, web_renderer)

windows_circle.draw()
linux_circle.draw()
web_circle.draw()

print('---')

windows_rect = Rectangle(10, 20, windows_renderer)
linux_rect = Rectangle(10, 20, linux_renderer)

windows_rect.draw()
linux_rect.draw()

# ========== Real-world example: Device & Remote Controls ==========

class Device(ABC):
    @abstractmethod
    def power_on(self) -> None:
        pass

    @abstractmethod
    def power_off(self) -> None:
        pass

    @abstractmethod
    def set_channel(self, channel: float) -> None:
        pass

    @abstractmethod
    def get_status(self) -> str:
        pass

class TV(Device):
    def __init__(self):
        self._is_on = False
        self._current_channel = 1

    def power_on(self) -> None:
        self._is_on = True
        print("TV is now ON")

    def power_off(self) -> None:
        self._is_on = False
        print("TV is now OFF")

    def set_channel(self, channel: int) -> None:
        if self._is_on:
            self._current_channel = channel
            print(f"TV changed to channel {channel}")

    def get_status(self) -> str:
        return f"TV is {'ON' if self._is_on else 'OFF'}, channel: {self._current_channel}" if self._is_on else "TV is OFF"

class Radio(Device):
    def __init__(self):
        self._is_on = False
        self._current_frequency = 88.5

    def power_on(self) -> None:
        self._is_on = True
        print("Radio is now ON")

    def power_off(self) -> None:
        self._is_on = False
        print("Radio is now OFF")

    def set_channel(self, frequency: float) -> None:
        if self._is_on:
            self._current_frequency = frequency
            print(f"Radio tuned to {frequency} FM")

    def get_status(self) -> str:
        return f"Radio is {'ON' if self._is_on else 'OFF'}, tuned to: {self._current_frequency} FM" if self._is_on else "Radio is OFF"

# Remote control abstraction
class RemoteControl(ABC):
    def __init__(self, device: Device):
        self._device = device

    def toggle_power(self) -> None:
        if "ON" in self._device.get_status():
            self._device.power_off()
        else:
            self._device.power_on()

    def change_channel(self, channel: float) -> None:
        self._device.set_channel(channel)

    def get_status(self) -> None:
        print(self._device.get_status())

    @abstractmethod
    def mute(self) -> None:
        pass

class BasicRemote(RemoteControl):
    def mute(self) -> None:
        print("Basic remote: muting device")

class AdvancedRemote(RemoteControl):
    def mute(self) -> None:
        print("Advanced remote: applying noise cancellation")

    def record(self) -> None:
        print("Advanced remote: recording content")

# ========== Usage ==========

tv = TV()
basic_remote = BasicRemote(tv)

basic_remote.toggle_power()
basic_remote.change_channel(10)
basic_remote.get_status()

print('---')

radio = Radio()
advanced_remote = AdvancedRemote(radio)

advanced_remote.toggle_power()
advanced_remote.change_channel(102.3)
advanced_remote.record()
advanced_remote.get_status()
```

:::

## Real-World Example

A cross-platform drawing application needs to support:

- **Abstractions**: Different drawing tools (Pen, Brush, Eraser)
- **Implementations**: Different graphics libraries (OpenGL, DirectX, Canvas)

Using the Bridge Pattern:

- Adding a new drawing tool doesn't require changes to graphics implementations
- Adding support for a new graphics library doesn't require changes to drawing tools
- Any tool can use any graphics library seamlessly

Similarly, a multi-platform UI framework might have:

- **Abstractions**: Button, TextBox, Window components
- **Implementations**: Platform-specific renderers (WindowsRenderer, MacRenderer, AndroidRenderer)

## Advantages

::: tip
✅ **Avoids Dimension Explosion**: Prevents N×M class explosion with multiple variations

✅ **Independent Variation**: Abstraction and implementation can change independently

✅ **Runtime Flexibility**: Switch implementations at runtime without changing code

✅ **Deferred Binding**: Implementation choice doesn't affect abstraction design

✅ **Promotes Abstraction**: Encourages thinking in terms of abstractions first

✅ **Easy to Extend**: Add new abstractions or implementations without modifying existing code

✅ **Single Responsibility**: Reduces coupling by separating concerns
:::

## Disadvantages

::: warning
❌ **Added Complexity**: Introduces more classes and indirection

❌ **Harder to Understand**: The design can be complex for simple cases

❌ **Performance Overhead**: Extra indirection adds method call overhead

❌ **Overkill for Simple Cases**: May be unnecessary when you have few variations

❌ **Difficult Design Upfront**: Requires identifying the right abstractions beforehand

❌ **Maintenance Burden**: Multiple hierarchies need to be kept in sync
:::

## When to Use

- You want to avoid permanent binding between abstraction and implementation
- Both abstraction and implementation need to be extended with new subclasses
- You have multiple independent dimensions of variation
- You want to share implementation among multiple objects
- You're building platform-independent libraries or frameworks
- You need to switch implementations at runtime

## When NOT to Use

- Your system has only one or two implementations (too simple)
- The abstraction and implementation are tightly coupled by nature
- The added complexity doesn't provide sufficient benefit
- Performance is critical and you need minimal method call overhead
- The design will remain stable with minimal future changes

## Related Patterns

- **Adapter Pattern**: Both involve working with different interfaces, but Adapter makes incompatible interfaces work together while Bridge separates abstraction from implementation.
- **Abstract Factory Pattern**: Often used together with Bridge to create abstract and concrete implementations.
- **Strategy Pattern**: Both involve encapsulating variations, but Bridge varies both abstraction and implementation while Strategy only varies algorithms.
- **Decorator Pattern**: Both use composition for flexibility, but Decorator adds responsibilities while Bridge separates abstraction from implementation.
