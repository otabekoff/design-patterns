---
title: Adapter Pattern
description: Converts the interface of a class into another interface clients expect, allowing incompatible interfaces to work together
icon: Package
---

import { Callout } from "fumadocs-ui/components/callout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "fumadocs-ui/components/tabs";

## Overview

The Adapter Pattern is a structural design pattern that allows incompatible interfaces to collaborate. It acts as a bridge between two incompatible interfaces by converting the interface of a class into another interface that clients expect.

## Purpose

- **Enable integration** between components with incompatible interfaces
- **Reuse existing code** without modifying it
- **Provide compatibility** for legacy systems with new implementations
- **Reduce coupling** between incompatible components

## Problem

Imagine you have a modern payment processing system that expects a `PaymentProcessor` interface with a `processPayment(amount: number, cardData: string)` method. However, you also need to integrate with a legacy payment system that has a completely different interface: `LegacyPaymentGateway.chargeCard(cardInfo: object, cents: number)`.

The two systems have:

- Different method names
- Different parameter orders and types
- Different conventions

You cannot modify either system, yet you need them to work together. This is where the Adapter Pattern comes in.

## Solution

The Adapter Pattern provides a solution by creating an adapter class that:

1. Implements the interface that clients expect
2. Translates calls to the incompatible interface
3. Adapts data types and formats between systems

There are two main approaches:

### Class Adapter (Inheritance)

The adapter inherits from both the target interface and the adaptee class, implementing the required methods by delegating to the adaptee.

### Object Adapter (Composition)

The adapter holds a reference to the adaptee and implements the target interface by delegating calls to the adaptee while adapting the data.

## Implementation

::: code-group
<TabsList className="grid w-full grid-cols-2">
    <TabsTrigger value="typescript">TypeScript</TabsTrigger>
    <TabsTrigger value="python">Python</TabsTrigger>
  </TabsList>

  
```typescript [typescript]
// The target interface that clients expect
interface PaymentProcessor {
  processPayment(amount: number, cardData: string): void;
}

// The legacy incompatible interface
class LegacyPaymentGateway {
chargeCard(cardInfo: { cardNumber: string; cvv: string }, cents: number): void {
console.log(`Legacy gateway: Charging ${cents} cents to card ending in ${cardInfo.cardNumber.slice(-4)}`);
}
}

// Object Adapter
class PaymentGatewayAdapter implements PaymentProcessor {
private legacyGateway: LegacyPaymentGateway;

constructor(legacyGateway: LegacyPaymentGateway) {
this.legacyGateway = legacyGateway;
}

processPayment(amount: number, cardData: string): void {
// Adapt the interface
const cardInfo = this.parseCardData(cardData);
const cents = Math.round(amount \* 100);

    // Call the legacy method with adapted parameters
    this.legacyGateway.chargeCard(cardInfo, cents);

}

private parseCardData(cardData: string): { cardNumber: string; cvv: string } {
const [cardNumber, cvv] = cardData.split('|');
return { cardNumber, cvv };
}
}

// Client code
class CheckoutService {
constructor(private processor: PaymentProcessor) {}

checkout(amount: number, cardData: string): void {
console.log(`Processing payment of $${amount}`);
this.processor.processPayment(amount, cardData);
console.log('Payment processed successfully');
}
}

// Usage
const legacyGateway = new LegacyPaymentGateway();
const adapter = new PaymentGatewayAdapter(legacyGateway);
const checkout = new CheckoutService(adapter);

checkout.checkout(99.99, '4111111111111111|123');

// ============================================
// Alternative: Class Adapter (Multiple Inheritance)
// Note: TypeScript doesn't support true multiple inheritance,
// but we can simulate it using mixins or composition
// ============================================

// A more practical example: Adapting HTTP clients
interface HttpClient {
get(url: string): Promise<any>;
post(url: string, data: any): Promise<any>;
}

// Old HTTP library with different interface
class LegacyHttpLib {
fetchGet(endpoint: string): any {
return { status: 200, data: {} };
}

fetchPost(endpoint: string, payload: any): any {
return { status: 201, data: {} };
}
}

// Adapter for modern interface
class HttpClientAdapter implements HttpClient {
constructor(private legacyLib: LegacyHttpLib) {}

async get(url: string): Promise<any> {
const response = this.legacyLib.fetchGet(url);
return response.data;
}

async post(url: string, data: any): Promise<any> {
const response = this.legacyLib.fetchPost(url, data);
return response.data;
}
}

// Using the adapter
const legacyHttp = new LegacyHttpLib();
const httpAdapter = new HttpClientAdapter(legacyHttp);

// Now we can use it with modern async/await code
(async () => {
const data = await httpAdapter.get('/api/users');
console.log('User data:', data);
})();

`
```


  
```python [python]
from abc import ABC, abstractmethod

# The target interface that clients expect
class PaymentProcessor(ABC):
    @abstractmethod
    def process_payment(self, amount: float, card_data: str) -> None:
        pass

# The legacy incompatible interface
class LegacyPaymentGateway:
    def charge_card(self, card_info: dict, cents: int) -> None:
        print(f"Legacy gateway: Charging {cents} cents to card ending in {card_info['card_number'][-4:]}")

# Object Adapter
class PaymentGatewayAdapter(PaymentProcessor):
    def __init__(self, legacy_gateway: LegacyPaymentGateway):
        self._legacy_gateway = legacy_gateway

    def process_payment(self, amount: float, card_data: str) -> None:
        # Adapt the interface
        card_info = self._parse_card_data(card_data)
        cents = round(amount * 100)

        # Call the legacy method with adapted parameters
        self._legacy_gateway.charge_card(card_info, cents)

    @staticmethod
    def _parse_card_data(card_data: str) -> dict:
        card_number, cvv = card_data.split('|')
        return {'card_number': card_number, 'cvv': cvv}

# Client code
class CheckoutService:
    def __init__(self, processor: PaymentProcessor):
        self._processor = processor

    def checkout(self, amount: float, card_data: str) -> None:
        print(f"Processing payment of ${amount}")
        self._processor.process_payment(amount, card_data)
        print("Payment processed successfully")

# Usage
legacy_gateway = LegacyPaymentGateway()
adapter = PaymentGatewayAdapter(legacy_gateway)
checkout = CheckoutService(adapter)

checkout.checkout(99.99, "4111111111111111|123")

# ============================================
# Another practical example: Database adapters
# ============================================

from abc import ABC, abstractmethod
import json

class DatabaseConnection(ABC):
    @abstractmethod
    def execute_query(self, query: str, params: list = None) -> list:
        pass

    @abstractmethod
    def close(self) -> None:
        pass

# Old database library
class OldDatabaseLib:
    def __init__(self, connection_string: str):
        self.conn_str = connection_string

    def run_sql(self, sql_text: str, parameters: tuple = None):
        print(f"Old library executing: {sql_text}")
        return [{'id': 1, 'name': 'John'}, {'id': 2, 'name': 'Jane'}]

    def disconnect(self):
        print("Old library disconnecting")

# Adapter for modern interface
class OldDatabaseAdapter(DatabaseConnection):
    def __init__(self, old_db: OldDatabaseLib):
        self._old_db = old_db

    def execute_query(self, query: str, params: list = None) -> list:
        # Adapt list parameters to tuple
        parameters = tuple(params) if params else None
        return self._old_db.run_sql(query, parameters)

    def close(self) -> None:
        self._old_db.disconnect()

# Usage
old_db = OldDatabaseLib("Server=localhost;Database=mydb")
db_adapter = OldDatabaseAdapter(old_db)

results = db_adapter.execute_query("SELECT * FROM users WHERE status = ?", ['active'])
print(f"Results: {json.dumps(results, indent=2)}")
db_adapter.close()
`
```

:::

## Real-World Example

Consider a weather application that needs to display weather data from multiple sources:

- **OpenWeatherMap API**: Returns data as `{ main: { temp: 293.15 }, weather: [...] }`
- **WeatherAPI.com**: Returns data as `{ current: { temp_c: 20, condition: {...} } }`
- **Your Application**: Expects `{ temperature: 20, description: "Sunny" }`

You can create adapters for each weather service to convert their responses to your standardized format. This allows you to switch providers without changing your application code.

```typescript
interface WeatherData {
  temperature: number;
  description: string;
  humidity: number;
}

class OpenWeatherAdapter implements WeatherData {
  // Adapts OpenWeatherMap response
}

class WeatherAPIAdapter implements WeatherData {
  // Adapts WeatherAPI.com response
}
```

## Advantages

::: success
✅ **Promotes Reusability**: Use existing classes without modification

✅ **Improves Flexibility**: Change implementations without affecting clients

✅ **Separates Concerns**: Keeps adaptation logic separate from business logic

✅ **Single Responsibility**: Each adapter handles one specific adaptation

✅ **Open/Closed Principle**: Open for extension, closed for modification

✅ **Easy to Test**: Adapters can be tested independently

✅ **Reduces Coupling**: Clients depend on abstractions, not implementations
:::

## Disadvantages

::: warning
❌ **Increased Complexity**: Adding extra classes can complicate the codebase

❌ **Runtime Overhead**: Adapter layer adds method call overhead

❌ **Maintenance Burden**: Multiple adapters need to be maintained

❌ **Not a Cure-All**: Won't fix fundamentally incompatible systems

❌ **Difficult to Debug**: Extra indirection makes debugging harder

❌ **Potential Performance Impact**: Extra object creation and method calls
:::

## When to Use

- You need to integrate incompatible interfaces
- You want to use an existing class but its interface doesn't match your requirements
- You need to create a unified interface for multiple similar implementations
- You're building a plugin system with varying interfaces
- You need to support legacy code alongside new implementations
- You want to provide different interfaces for the same data structure

## When NOT to Use

- When you can simply modify the original interface
- When the incompatibility is fundamental and cannot be reasonably adapted
- When the adapter logic becomes too complex
- When performance is critical and you need minimal overhead
- When you only need to integrate one or two classes (simpler solutions might suffice)
- When the interfaces are constantly changing

## Related Patterns

- **Bridge Pattern**: Similar structure but different purpose. Bridge defines an abstraction upfront, while Adapter works with existing incompatible interfaces.
- **Decorator Pattern**: Both provide enhanced functionality, but Decorator adds responsibilities while Adapter converts interfaces.
- **Facade Pattern**: Both simplify interfaces, but Facade creates a new interface for a subsystem while Adapter makes existing interfaces compatible.
- **Strategy Pattern**: Both encapsulate variations, but Strategy is about algorithms while Adapter is about interfaces.
