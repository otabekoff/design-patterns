---
title: Adapter Pattern
description: Converts the interface of a class into another interface clients expect, allowing incompatible interfaces to work together.
icon: Package
---

# Adapter Pattern

<CoverImage src="/covers/structural/adapter.png" alt="Cover">
  <h1>Adapter</h1>
  <p>A comical, over-engineered travel adapter trying to connect a standard US 3-pin plug to a ridiculous triangle-shaped socket using small colorful gears.</p>
</CoverImage>

## Overview

The **Adapter** pattern is a structural design pattern that lets classes with incompatible interfaces work together without changing their source code. It wraps one interface and exposes another, translating calls, data shapes, or naming conventions so the client can keep using a familiar contract.

**Key advantage**: You can integrate legacy code, third-party SDKs, or framework mismatches without rewriting either side.

**Modern perspective**: Adapter is still very relevant in 2026 because systems are increasingly assembled from APIs, packages, services, and older internal libraries. It is especially common at boundaries: payment gateways, HTTP clients, database drivers, and platform SDK wrappers.

The important distinction is intent. Adapter is not about adding behavior. It is about compatibility.

## Purpose

- Enable integration between components with incompatible interfaces
- Reuse existing code without modifying it
- Hide vendor- or legacy-specific APIs behind a stable application contract
- Keep the rest of the codebase insulated from interface churn

## Real-World Analogy

Think of a travel plug adapter. Your laptop charger expects one plug shape, but the wall socket in another country is different. The adapter does not change the charger and it does not change the wall. It simply makes the two sides compatible.

Software adapters do the same thing: they make a mismatch usable without changing either side.

## Problem

Imagine you have a modern checkout service that expects a payment processor with a clean processPayment(amount, paymentMethod) method. But the only provider available is a legacy gateway with a very different shape: it wants card objects, cents instead of dollars, and synchronous calls.

The two systems have:

- Different method names
- Different parameter order and units
- Different error handling conventions
- Different data structures

You cannot modify either system, yet you need them to work together. This is where the Adapter Pattern comes in.

### Scenario 1: Legacy Payment Gateway

```typescript
// ❌ Problem: the client expects a modern interface
interface PaymentProcessor {
  processPayment(amount: number, currency: string): Promise<void>;
}

// ❌ Problem: the legacy gateway exposes a different API
class LegacyPaymentGateway {
  chargeCard(
    cardInfo: { cardNumber: string; cvv: string },
    cents: number,
  ): void {
    console.log(`Charging ${cents} cents to ${cardInfo.cardNumber.slice(-4)}`);
  }
}
```

### Scenario 2: HTTP Library Mismatch

```typescript
// ❌ Problem: application expects fetch-like methods
interface HttpClient {
  get(url: string): Promise<unknown>;
  post(url: string, data: unknown): Promise<unknown>;
}

// ❌ Problem: old library uses a different vocabulary
class LegacyHttpLib {
  fetchGet(endpoint: string): unknown {
    return { status: 200, data: [] };
  }

  fetchPost(endpoint: string, payload: unknown): unknown {
    return { status: 201, data: payload };
  }
}
```

## Solution

The Adapter Pattern provides a solution by creating an adapter class that:

1. Implements the interface that clients expect
2. Holds or extends the incompatible adaptee
3. Translates method calls, arguments, and return values
4. Keeps the compatibility logic in one place

There are two main approaches:

### Object Adapter

The adapter contains an instance of the adaptee and delegates work to it. This is the most practical option in TypeScript, Python, Go, and Rust.

### Class Adapter

The adapter inherits from the adaptee and implements the target interface through overriding. This is common in languages with single inheritance or mixin-like mechanisms, but composition is usually easier to maintain.

```typescript
// ✅ Solution: a thin compatibility layer
interface PaymentProcessor {
  processPayment(amount: number, cardData: string): Promise<void>;
}

class LegacyPaymentGateway {
  chargeCard(
    cardInfo: { cardNumber: string; cvv: string },
    cents: number,
  ): void {
    console.log(
      `Legacy gateway: charging ${cents} cents to ${cardInfo.cardNumber.slice(-4)}`,
    );
  }
}

class PaymentGatewayAdapter implements PaymentProcessor {
  constructor(private readonly legacyGateway: LegacyPaymentGateway) {}

  async processPayment(amount: number, cardData: string): Promise<void> {
    const cardInfo = this.parseCardData(cardData);
    const cents = Math.round(amount * 100);
    this.legacyGateway.chargeCard(cardInfo, cents);
  }

  private parseCardData(cardData: string): { cardNumber: string; cvv: string } {
    const [cardNumber, cvv] = cardData.split("|");
    if (!cardNumber || !cvv) {
      throw new Error("Invalid card data");
    }

    return { cardNumber, cvv };
  }
}
```

## Implementation

::: code-group

```typescript [TypeScript]
interface PaymentProcessor {
  processPayment(amount: number, cardData: string): Promise<void>;
}

class LegacyPaymentGateway {
  chargeCard(
    cardInfo: { cardNumber: string; cvv: string },
    cents: number,
  ): void {
    console.log(
      `Legacy gateway: charging ${cents} cents to card ending in ${cardInfo.cardNumber.slice(-4)}`,
    );
  }
}

class PaymentGatewayAdapter implements PaymentProcessor {
  constructor(private readonly legacyGateway: LegacyPaymentGateway) {}

  async processPayment(amount: number, cardData: string): Promise<void> {
    const cardInfo = this.parseCardData(cardData);
    const cents = Math.round(amount * 100);
    this.legacyGateway.chargeCard(cardInfo, cents);
  }

  private parseCardData(cardData: string): { cardNumber: string; cvv: string } {
    const [cardNumber, cvv] = cardData.split("|");
    if (!cardNumber || !cvv) {
      throw new Error("Invalid card data");
    }

    return { cardNumber, cvv };
  }
}

class CheckoutService {
  constructor(private readonly processor: PaymentProcessor) {}

  async checkout(amount: number, cardData: string): Promise<void> {
    console.log(`Processing payment of $${amount.toFixed(2)}`);
    await this.processor.processPayment(amount, cardData);
    console.log("Payment processed successfully");
  }
}

const checkout = new CheckoutService(
  new PaymentGatewayAdapter(new LegacyPaymentGateway()),
);

checkout.checkout(99.99, "4111111111111111|123");

interface HttpClient {
  get(url: string): Promise<unknown>;
  post(url: string, data: unknown): Promise<unknown>;
}

class LegacyHttpLib {
  fetchGet(endpoint: string): unknown {
    return { status: 200, data: [] };
  }

  fetchPost(endpoint: string, payload: unknown): unknown {
    return { status: 201, data: payload };
  }
}

class HttpClientAdapter implements HttpClient {
  constructor(private readonly legacyLib: LegacyHttpLib) {}

  async get(url: string): Promise<unknown> {
    const response = this.legacyLib.fetchGet(url) as { data: unknown };
    return response.data;
  }

  async post(url: string, data: unknown): Promise<unknown> {
    const response = this.legacyLib.fetchPost(url, data) as { data: unknown };
    return response.data;
  }
}

const httpAdapter = new HttpClientAdapter(new LegacyHttpLib());
httpAdapter.get("/api/users").then((data) => console.log("User data:", data));
```

```python [Python]
from abc import ABC, abstractmethod
from dataclasses import dataclass

class PaymentProcessor(ABC):
    @abstractmethod
    def process_payment(self, amount: float, card_data: str) -> None:
        pass

class LegacyPaymentGateway:
    def charge_card(self, card_info: dict, cents: int) -> None:
        print(
            f"Legacy gateway: charging {cents} cents to card ending in {card_info['card_number'][-4:]}"
        )

class PaymentGatewayAdapter(PaymentProcessor):
    def __init__(self, legacy_gateway: LegacyPaymentGateway):
        self._legacy_gateway = legacy_gateway

    def process_payment(self, amount: float, card_data: str) -> None:
        card_info = self._parse_card_data(card_data)
        cents = round(amount * 100)
        self._legacy_gateway.charge_card(card_info, cents)

    @staticmethod
    def _parse_card_data(card_data: str) -> dict:
        card_number, cvv = card_data.split("|")
        if not card_number or not cvv:
            raise ValueError("Invalid card data")
        return {"card_number": card_number, "cvv": cvv}

class CheckoutService:
    def __init__(self, processor: PaymentProcessor):
        self._processor = processor

    def checkout(self, amount: float, card_data: str) -> None:
        print(f"Processing payment of ${amount:.2f}")
        self._processor.process_payment(amount, card_data)
        print("Payment processed successfully")

@dataclass
class LegacyWeatherApiResponse:
    temp_c: float
    condition: str
    humidity: int

class WeatherData(ABC):
    @property
    @abstractmethod
    def temperature(self) -> float:
        pass

    @property
    @abstractmethod
    def description(self) -> str:
        pass

class WeatherApiAdapter(WeatherData):
    def __init__(self, response: LegacyWeatherApiResponse):
        self._response = response

    @property
    def temperature(self) -> float:
        return self._response.temp_c

    @property
    def description(self) -> str:
        return self._response.condition

checkout = CheckoutService(PaymentGatewayAdapter(LegacyPaymentGateway()))
checkout.checkout(99.99, "4111111111111111|123")

weather = WeatherApiAdapter(LegacyWeatherApiResponse(20, "Sunny", 45))
print(f"Weather: {weather.temperature}C, {weather.description}")
```

```java [Java]
interface PaymentProcessor {
    void processPayment(double amount, String cardData);
}

class LegacyPaymentGateway {
    public void chargeCard(String cardNumber, String cvv, int cents) {
        System.out.println(
            "Legacy gateway: charging " + cents + " cents to card ending in " +
            cardNumber.substring(cardNumber.length() - 4)
        );
    }
}

class PaymentGatewayAdapter implements PaymentProcessor {
    private final LegacyPaymentGateway legacyGateway;

    public PaymentGatewayAdapter(LegacyPaymentGateway legacyGateway) {
        this.legacyGateway = legacyGateway;
    }

    @Override
    public void processPayment(double amount, String cardData) {
        String[] parts = cardData.split("\\|");
        if (parts.length != 2) {
            throw new IllegalArgumentException("Invalid card data");
        }

        int cents = (int) Math.round(amount * 100);
        legacyGateway.chargeCard(parts[0], parts[1], cents);
    }
}

interface HttpClient {
    Object get(String url);
    Object post(String url, Object data);
}

class LegacyHttpLib {
    public Object fetchGet(String endpoint) {
        return new Object();
    }

    public Object fetchPost(String endpoint, Object payload) {
        return payload;
    }
}

class HttpClientAdapter implements HttpClient {
    private final LegacyHttpLib legacyLib;

    public HttpClientAdapter(LegacyHttpLib legacyLib) {
        this.legacyLib = legacyLib;
    }

    @Override
    public Object get(String url) {
        return legacyLib.fetchGet(url);
    }

    @Override
    public Object post(String url, Object data) {
        return legacyLib.fetchPost(url, data);
    }
}
```

```go [Go]
package main

import "fmt"

type PaymentProcessor interface {
	ProcessPayment(amount float64, cardData string) error
}

type LegacyPaymentGateway struct{}

func (g *LegacyPaymentGateway) ChargeCard(cardNumber, cvv string, cents int) {
	fmt.Printf("Legacy gateway: charging %d cents to card ending in %s\n", cents, cardNumber[len(cardNumber)-4:])
}

type PaymentGatewayAdapter struct {
	legacyGateway *LegacyPaymentGateway
}

func NewPaymentGatewayAdapter(legacyGateway *LegacyPaymentGateway) *PaymentGatewayAdapter {
	return &PaymentGatewayAdapter{legacyGateway: legacyGateway}
}

func (a *PaymentGatewayAdapter) ProcessPayment(amount float64, cardData string) error {
	parts := splitCardData(cardData)
	if len(parts) != 2 {
		return fmt.Errorf("invalid card data")
	}

	cents := int(amount * 100)
	a.legacyGateway.ChargeCard(parts[0], parts[1], cents)
	return nil
}

func splitCardData(cardData string) []string {
	for i := 0; i < len(cardData); i++ {
		if cardData[i] == '|' {
			return []string{cardData[:i], cardData[i+1:]}
		}
	}
	return []string{cardData}
}

type HttpClient interface {
	Get(url string) (any, error)
	Post(url string, data any) (any, error)
}

type LegacyHttpLib struct{}

func (l *LegacyHttpLib) FetchGet(endpoint string) any {
	return map[string]any{"status": 200}
}

func (l *LegacyHttpLib) FetchPost(endpoint string, payload any) any {
	return payload
}

type HttpClientAdapter struct {
	legacyLib *LegacyHttpLib
}

func NewHttpClientAdapter(legacyLib *LegacyHttpLib) *HttpClientAdapter {
	return &HttpClientAdapter{legacyLib: legacyLib}
}

func (a *HttpClientAdapter) Get(url string) (any, error) {
	return a.legacyLib.FetchGet(url), nil
}

func (a *HttpClientAdapter) Post(url string, data any) (any, error) {
	return a.legacyLib.FetchPost(url, data), nil
}
```

```rust [Rust]
trait PaymentProcessor {
    fn process_payment(&self, amount: f64, card_data: &str) -> Result<(), String>;
}

struct LegacyPaymentGateway;

impl LegacyPaymentGateway {
    fn charge_card(&self, card_number: &str, cvv: &str, cents: i32) {
        println!(
            "Legacy gateway: charging {} cents to card ending in {}",
            cents,
            &card_number[card_number.len() - 4..]
        );
    }
}

struct PaymentGatewayAdapter {
    legacy_gateway: LegacyPaymentGateway,
}

impl PaymentGatewayAdapter {
    fn new(legacy_gateway: LegacyPaymentGateway) -> Self {
        Self { legacy_gateway }
    }

    fn parse_card_data(&self, card_data: &str) -> Result<(&str, &str), String> {
        let parts: Vec<&str> = card_data.split('|').collect();
        if parts.len() != 2 {
            return Err("Invalid card data".to_string());
        }
        Ok((parts[0], parts[1]))
    }
}

impl PaymentProcessor for PaymentGatewayAdapter {
    fn process_payment(&self, amount: f64, card_data: &str) -> Result<(), String> {
        let (card_number, cvv) = self.parse_card_data(card_data)?;
        let cents = (amount * 100.0).round() as i32;
        self.legacy_gateway.charge_card(card_number, cvv, cents);
        Ok(())
    }
}

trait HttpClient {
    fn get(&self, url: &str) -> Result<String, String>;
    fn post(&self, url: &str, data: &str) -> Result<String, String>;
}

struct LegacyHttpLib;

impl LegacyHttpLib {
    fn fetch_get(&self, _endpoint: &str) -> String {
        "{\"status\":200}".to_string()
    }

    fn fetch_post(&self, _endpoint: &str, payload: &str) -> String {
        payload.to_string()
    }
}

struct HttpClientAdapter {
    legacy_lib: LegacyHttpLib,
}

impl HttpClientAdapter {
    fn new(legacy_lib: LegacyHttpLib) -> Self {
        Self { legacy_lib }
    }
}

impl HttpClient for HttpClientAdapter {
    fn get(&self, url: &str) -> Result<String, String> {
        Ok(self.legacy_lib.fetch_get(url))
    }

    fn post(&self, url: &str, data: &str) -> Result<String, String> {
        Ok(self.legacy_lib.fetch_post(url, data))
    }
}
```

:::

## Real-World Example

A practical adapter layer often sits at the edge of a codebase. One common example is a weather aggregation service that needs to normalize multiple providers into a single internal contract.

Suppose your application wants a simple shape:

```typescript
interface WeatherSnapshot {
  temperatureC: number;
  description: string;
  humidity: number;
}
```

But the providers disagree:

- OpenWeatherMap returns Kelvin in a nested structure.
- WeatherAPI returns Celsius with a different naming scheme.
- An internal legacy cache returns tuples and codes instead of objects.

Without adapters, the application code becomes littered with provider-specific branching. With adapters, each provider gets one translator and the rest of the system depends on WeatherSnapshot only.

That boundary is where the pattern pays off most: the rest of the app becomes stable even when upstream APIs change.

```typescript
interface WeatherSnapshot {
  temperatureC: number;
  description: string;
  humidity: number;
}

interface WeatherSource {
  fetch(): Promise<WeatherSnapshot>;
}

class OpenWeatherMapAdapter implements WeatherSource {
  constructor(private readonly response: unknown) {}

  async fetch(): Promise<WeatherSnapshot> {
    const data = this.response as {
      main: { temp: number };
      weather: { description: string }[];
      humidity: number;
    };

    return {
      temperatureC: Math.round(data.main.temp - 273.15),
      description: data.weather[0]?.description ?? "unknown",
      humidity: data.humidity,
    };
  }
}
```

## Advantages

- Promotes reuse of existing classes without modification
- Improves flexibility at system boundaries
- Keeps compatibility logic centralized
- Lets client code depend on one stable abstraction
- Supports gradual migration off old libraries
- Makes third-party or legacy integration testable in isolation

## Disadvantages

- Adds another layer of indirection
- Can become a dumping ground for translation logic if not kept small
- Requires maintenance when the adaptee API changes
- Does not solve deeper semantic mismatches
- Can make debugging slightly less direct
- Extra code is unnecessary when you control both sides

## When to Use

- You need to integrate incompatible interfaces
- You want to use a class but its API does not match your application contract
- You are wrapping a third-party SDK or legacy module
- You need one stable interface over multiple providers
- You are migrating away from an old system incrementally

## When NOT to Use

- You can change the original interface directly
- The mismatch is small enough to solve with a simple helper function
- The adapter would contain too much business logic
- The incompatibility is semantic, not structural
- Performance and allocation overhead are more important than compatibility

## Common Mistakes

### Mistake 1: Letting the adapter own business logic

```typescript
// ❌ Bad: adapter is doing pricing, discounts, and policy
class BadPaymentAdapter {
  process(amount: number) {
    const discounted = amount * 0.9;
    const cents = Math.round(discounted * 100);
    // too much policy here
  }
}

// ✅ Good: adapter only translates interface shape
class GoodPaymentAdapter {
  process(amount: number) {
    const cents = Math.round(amount * 100);
  }
}
```

### Mistake 2: Leaking adaptee types into client code

```typescript
// ❌ Bad: client still depends on legacy shape
function handlePayment(gateway: LegacyPaymentGateway) {}

// ✅ Good: client depends on stable abstraction
function handlePayment(processor: PaymentProcessor) {}
```

### Mistake 3: Doing no validation on translated inputs

```typescript
// ❌ Bad: assumes card_data always has a delimiter
const [cardNumber, cvv] = cardData.split("|");

// ✅ Good: validate before translating
if (!cardData.includes("|")) {
  throw new Error("Invalid card data");
}
```

### Mistake 4: One adapter per method instead of per boundary

```typescript
// ❌ Bad: many tiny adapters for one provider
class GetWeatherAdapter {}
class GetHumidityAdapter {}

// ✅ Good: one adapter for one external source
class WeatherApiAdapter {}
```

## Related Patterns

- **Facade**: Simplifies an interface, but does not primarily translate incompatible ones
- **Decorator**: Adds behavior; Adapter changes interface
- **Bridge**: Separates abstraction from implementation before incompatibility appears
- **Proxy**: Controls access to an object without changing its interface

## Modern Alternatives

- TypeScript utility functions and typed DTO mappers
- API gateway transformation layers
- OpenAPI client generation with custom transformers
- Integration middleware in enterprise service buses
- Language-level wrappers around SDKs

## Interview Insights

**Q1: What is the main purpose of Adapter?**

A: To make incompatible interfaces work together without modifying either side. It is a compatibility pattern, not a behavior pattern.

**Q2: How is Adapter different from Decorator?**

A: Decorator preserves the interface and adds behavior. Adapter changes the interface so one type can be used where another is expected.

**Q3: When would you prefer an object adapter over a class adapter?**

A: Almost always in modern codebases, because object adapters use composition, are easier to test, and avoid inheritance constraints.

**Q4: Can Adapter hide breaking API changes?**

A: Yes. It is often used as a compatibility layer during migrations so the rest of the app can keep using the old contract while the backend changes.

**Q5: Is Adapter still relevant with modern REST/GraphQL APIs?**

A: Yes. It is very common for API clients, SDK wrappers, and legacy integrations. Most real systems still need translation layers.

**Q6: What is the biggest risk when using Adapter?**

A: Letting it grow into a second business layer. If the adapter starts owning policy, validation rules, and orchestration, it becomes harder to maintain and no longer stays a pure translator.
