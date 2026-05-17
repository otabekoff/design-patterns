---
title: Facade Pattern
description: Provides a unified, simplified interface to a set of interfaces in a subsystem.
icon: Zap
---

![Facade Concept](/images/patterns/facade-mini-2x.png)

# Facade Pattern

## Overview

The **Facade** pattern is a structural design pattern that provides a simple, high-level interface to a complex subsystem. It does not remove the subsystem; it just gives clients a cleaner entry point so they do not need to coordinate every internal service themselves.

**Key advantage**: It reduces coupling and keeps client code focused on one intention instead of many moving parts.

**Modern perspective**: Facade is still widely used in API orchestration, SDK wrappers, checkout flows, authentication flows, and domain service coordination. It is one of the most practical structural patterns in everyday application code.

Facade is not about translating incompatible interfaces. It is about **simplifying access**.

## Real-World Analogy

Think of the **reception desk in a hotel**. Guests do not need to talk to housekeeping, security, billing, maintenance, and room service separately. They tell the front desk what they need, and the desk coordinates the rest.

That is a facade: one simple interface over many internal systems.

## The Problem

A modern checkout flow often touches several services:

- pricing and tax calculation
- inventory reservation
- payment authorization
- order persistence
- notification delivery

If each controller or UI action has to orchestrate all of that manually, the code becomes fragile and repetitive.

### Problem Example

```typescript
// ❌ Bad: controller knows too much about the subsystem
const pricing = new PricingService();
const inventory = new InventoryService();
const payment = new PaymentService();
const orders = new OrderRepository();

const total = pricing.calculate(cart);
inventory.reserve(cart.items);
payment.authorize(card, total);
orders.saveOrder(cart, total);
```

That is hard to test, hard to reuse, and hard to change safely.

## The Solution

Facade solves this by moving orchestration into a dedicated class.

1. The client talks to one facade method
2. The facade coordinates the subsystem calls
3. The subsystem classes remain available if direct access is still needed

The result is a simpler API at the boundary and lower coupling across the application.

## Implementation

::: code-group

```typescript [typescript]
class PricingService {
  calculateTotal(items: { price: number; quantity: number }[]): number {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
}

class InventoryService {
  reserve(items: { sku: string; quantity: number }[]): void {
    console.log(`Reserving ${items.length} line items`);
  }
}

class PaymentService {
  authorize(amount: number, cardToken: string): string {
    console.log(`Authorizing payment for $${amount.toFixed(2)}`);
    return `auth_${Date.now()}`;
  }
}

class OrderRepository {
  save(orderId: string, amount: number, authCode: string): void {
    console.log(`Saving order ${orderId} with auth ${authCode}`);
  }
}

class NotificationService {
  sendOrderConfirmation(orderId: string): void {
    console.log(`Sending confirmation for ${orderId}`);
  }
}

class CheckoutFacade {
  constructor(
    private readonly pricing: PricingService,
    private readonly inventory: InventoryService,
    private readonly payment: PaymentService,
    private readonly orders: OrderRepository,
    private readonly notifications: NotificationService,
  ) {}

  placeOrder(
    orderId: string,
    items: { price: number; quantity: number; sku: string }[],
    cardToken: string,
  ): void {
    const total = this.pricing.calculateTotal(items);
    this.inventory.reserve(
      items.map(({ sku, quantity }) => ({ sku, quantity })),
    );
    const authCode = this.payment.authorize(total, cardToken);
    this.orders.save(orderId, total, authCode);
    this.notifications.sendOrderConfirmation(orderId);
  }
}

const checkout = new CheckoutFacade(
  new PricingService(),
  new InventoryService(),
  new PaymentService(),
  new OrderRepository(),
  new NotificationService(),
);

checkout.placeOrder(
  "order_123",
  [
    { sku: "book-1", price: 19.99, quantity: 2 },
    { sku: "bag-4", price: 49.5, quantity: 1 },
  ],
  "tok_abc",
);
```

```python [python]
class PricingService:
    def calculate_total(self, items):
        return sum(item["price"] * item["quantity"] for item in items)


class InventoryService:
    def reserve(self, items):
        print(f"Reserving {len(items)} line items")


class PaymentService:
    def authorize(self, amount, card_token):
        print(f"Authorizing payment for ${amount:.2f}")
        return f"auth_{int(amount * 100)}"


class OrderRepository:
    def save(self, order_id, amount, auth_code):
        print(f"Saving order {order_id} with auth {auth_code}")


class NotificationService:
    def send_order_confirmation(self, order_id):
        print(f"Sending confirmation for {order_id}")


class CheckoutFacade:
    def __init__(self, pricing, inventory, payment, orders, notifications):
        self._pricing = pricing
        self._inventory = inventory
        self._payment = payment
        self._orders = orders
        self._notifications = notifications

    def place_order(self, order_id, items, card_token):
        total = self._pricing.calculate_total(items)
        self._inventory.reserve([{"sku": item["sku"], "quantity": item["quantity"]} for item in items])
        auth_code = self._payment.authorize(total, card_token)
        self._orders.save(order_id, total, auth_code)
        self._notifications.send_order_confirmation(order_id)


checkout = CheckoutFacade(
    PricingService(),
    InventoryService(),
    PaymentService(),
    OrderRepository(),
    NotificationService(),
)

checkout.place_order(
    "order_123",
    [
        {"sku": "book-1", "price": 19.99, "quantity": 2},
        {"sku": "bag-4", "price": 49.5, "quantity": 1},
    ],
    "tok_abc",
)
```

```java [java]
class PricingService {
    double calculateTotal(java.util.List<Item> items) {
        return items.stream().mapToDouble(item -> item.price * item.quantity).sum();
    }
}

class Item {
    final String sku;
    final double price;
    final int quantity;

    Item(String sku, double price, int quantity) {
        this.sku = sku;
        this.price = price;
        this.quantity = quantity;
    }
}

class InventoryService {
    void reserve(java.util.List<Item> items) {
        System.out.println("Reserving " + items.size() + " line items");
    }
}

class PaymentService {
    String authorize(double amount, String cardToken) {
        System.out.printf("Authorizing payment for $%.2f%n", amount);
        return "auth_" + Math.round(amount * 100);
    }
}

class OrderRepository {
    void save(String orderId, double amount, String authCode) {
        System.out.println("Saving order " + orderId + " with auth " + authCode);
    }
}

class NotificationService {
    void sendOrderConfirmation(String orderId) {
        System.out.println("Sending confirmation for " + orderId);
    }
}

class CheckoutFacade {
    private final PricingService pricing;
    private final InventoryService inventory;
    private final PaymentService payment;
    private final OrderRepository orders;
    private final NotificationService notifications;

    CheckoutFacade(
        PricingService pricing,
        InventoryService inventory,
        PaymentService payment,
        OrderRepository orders,
        NotificationService notifications
    ) {
        this.pricing = pricing;
        this.inventory = inventory;
        this.payment = payment;
        this.orders = orders;
        this.notifications = notifications;
    }

    void placeOrder(String orderId, java.util.List<Item> items, String cardToken) {
        double total = pricing.calculateTotal(items);
        inventory.reserve(items);
        String authCode = payment.authorize(total, cardToken);
        orders.save(orderId, total, authCode);
        notifications.sendOrderConfirmation(orderId);
    }
}
```

```go [go]
package main

import "fmt"

type Item struct {
	SKU      string
	Price    float64
	Quantity int
}

type PricingService struct{}

func (p *PricingService) CalculateTotal(items []Item) float64 {
	total := 0.0
	for _, item := range items {
		total += item.Price * float64(item.Quantity)
	}
	return total
}

type InventoryService struct{}

func (i *InventoryService) Reserve(items []Item) {
	fmt.Printf("Reserving %d line items\n", len(items))
}

type PaymentService struct{}

func (p *PaymentService) Authorize(amount float64, cardToken string) string {
	fmt.Printf("Authorizing payment for $%.2f\n", amount)
	return fmt.Sprintf("auth_%d", int(amount*100))
}

type OrderRepository struct{}

func (o *OrderRepository) Save(orderID string, amount float64, authCode string) {
	fmt.Printf("Saving order %s with auth %s\n", orderID, authCode)
}

type NotificationService struct{}

func (n *NotificationService) SendOrderConfirmation(orderID string) {
	fmt.Printf("Sending confirmation for %s\n", orderID)
}

type CheckoutFacade struct {
	pricing      *PricingService
	inventory    *InventoryService
	payment      *PaymentService
	orders       *OrderRepository
	notifications *NotificationService
}

func NewCheckoutFacade() *CheckoutFacade {
	return &CheckoutFacade{
		pricing:      &PricingService{},
		inventory:    &InventoryService{},
		payment:      &PaymentService{},
		orders:       &OrderRepository{},
		notifications: &NotificationService{},
	}
}

func (f *CheckoutFacade) PlaceOrder(orderID string, items []Item, cardToken string) {
	total := f.pricing.CalculateTotal(items)
	f.inventory.Reserve(items)
	authCode := f.payment.Authorize(total, cardToken)
	f.orders.Save(orderID, total, authCode)
	f.notifications.SendOrderConfirmation(orderID)
}
```

```rust [rust]
#[derive(Clone)]
struct Item {
    sku: String,
    price: f64,
    quantity: i32,
}

struct PricingService;

impl PricingService {
    fn calculate_total(&self, items: &[Item]) -> f64 {
        items.iter().map(|item| item.price * item.quantity as f64).sum()
    }
}

struct InventoryService;

impl InventoryService {
    fn reserve(&self, items: &[Item]) {
        println!("Reserving {} line items", items.len());
    }
}

struct PaymentService;

impl PaymentService {
    fn authorize(&self, amount: f64, _card_token: &str) -> String {
        println!("Authorizing payment for ${:.2}", amount);
        format!("auth_{}", (amount * 100.0).round() as i64)
    }
}

struct OrderRepository;

impl OrderRepository {
    fn save(&self, order_id: &str, _amount: f64, auth_code: &str) {
        println!("Saving order {} with auth {}", order_id, auth_code);
    }
}

struct NotificationService;

impl NotificationService {
    fn send_order_confirmation(&self, order_id: &str) {
        println!("Sending confirmation for {}", order_id);
    }
}

struct CheckoutFacade {
    pricing: PricingService,
    inventory: InventoryService,
    payment: PaymentService,
    orders: OrderRepository,
    notifications: NotificationService,
}

impl CheckoutFacade {
    fn new() -> Self {
        Self {
            pricing: PricingService,
            inventory: InventoryService,
            payment: PaymentService,
            orders: OrderRepository,
            notifications: NotificationService,
        }
    }

    fn place_order(&self, order_id: &str, items: &[Item], card_token: &str) {
        let total = self.pricing.calculate_total(items);
        self.inventory.reserve(items);
        let auth_code = self.payment.authorize(total, card_token);
        self.orders.save(order_id, total, &auth_code);
        self.notifications.send_order_confirmation(order_id);
    }
}
```

:::

## Real-World Example

A realistic facade is a **checkout workflow** in an e-commerce app. The client wants one operation: place an order. The facade coordinates pricing, inventory, payment, order storage, and notifications.

That keeps the controller thin and makes the business flow easier to test.

```typescript
const checkout = new CheckoutFacade(
  new PricingService(),
  new InventoryService(),
  new PaymentService(),
  new OrderRepository(),
  new NotificationService(),
);

checkout.placeOrder("order_123", cartItems, "tok_abc");
```

If the pricing rules change, or if a new notification channel is added, the controller does not change. Only the facade and subsystem code do.

## Advantages

- Simplifies complex workflows for clients
- Reduces coupling to subsystem classes
- Makes controllers and UI handlers smaller
- Centralizes orchestration logic in one place
- Improves testability of high-level flows
- Helps create a stable API over changing internals

## Disadvantages

- Can become a “god object” if it does too much
- May hide useful subsystem capabilities from clients
- Adds another layer of indirection
- Can encourage oversimplification of complex domains
- Requires discipline to keep orchestration focused

## When to Use

- A subsystem has many cooperating classes
- Clients only need a small set of common workflows
- You want a simple API for a complex process
- You want to reduce duplication in orchestration code
- You want a clean boundary around a domain capability

## When NOT to Use

- The subsystem is already simple
- Clients need full low-level control all the time
- The facade would just mirror every subsystem method 1:1
- You would be hiding important business decisions
- The orchestration logic is tiny and duplicated rarely

## Common Mistakes

### Mistake 1: Turning the facade into a catch-all service

```typescript
// ❌ Bad: too many unrelated responsibilities
class BadFacade {
  placeOrder() {}
  resetPassword() {}
  exportCsv() {}
}

// ✅ Good: one facade for one bounded workflow
class CheckoutFacade {
  placeOrder() {}
}
```

### Mistake 2: Hiding every subsystem forever

```typescript
// ❌ Bad: no escape hatch for advanced use
class BadFacade {}

// ✅ Good: expose subsystems when needed
class CheckoutFacade {
  getPricingService() {}
}
```

### Mistake 3: Moving domain rules into the facade

```typescript
// ❌ Bad: facade owns pricing policy
class BadCheckoutFacade {
  placeOrder() {
    // lots of pricing policy here
  }
}

// ✅ Good: facade orchestrates, services decide their own rules
```

### Mistake 4: Mirroring subsystem methods one by one

```typescript
// ❌ Bad: no simplification
class BadFacade {
  calculateTotal() {}
  reserveStock() {}
  authorizePayment() {}
}

// ✅ Good: offer a business-level operation
class CheckoutFacade {
  placeOrder() {}
}
```

## Related Patterns

- **Adapter**: Translates incompatible interfaces; Facade simplifies access
- **Mediator**: Coordinates colleagues more dynamically
- **Singleton**: Sometimes used to share one facade instance, but not required
- **Facade + Builder**: A facade can hide a complex construction process

## Modern Alternatives

- API gateways and service orchestration layers
- BFFs (Backend for Frontend)
- Domain services in application-layer architecture
- Workflow engines for multi-step business processes
- Server-side aggregation endpoints

## Interview Insights

**Q1: What is the main purpose of Facade?**

A: To provide a simplified, unified interface over a complex subsystem. It reduces the number of things a client has to know about.

**Q2: How is Facade different from Adapter?**

A: Facade simplifies. Adapter converts incompatible interfaces.

**Q3: Does Facade replace the subsystem?**

A: No. It sits on top of the subsystem and delegates to it.

**Q4: When does Facade become an anti-pattern?**

A: When it turns into a giant god object that owns too many unrelated workflows or hides important complexity that callers actually need.

**Q5: Is Facade only for object-oriented code?**

A: No. The pattern exists in APIs, services, orchestration layers, and even CLI tooling. The core idea is a simplified entry point.
