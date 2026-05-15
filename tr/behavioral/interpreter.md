---
title: Interpreter
description: Define a language grammar and interpreter to evaluate sentences of that language. Useful for DSLs and expression evaluation.
icon: Brackets
---

import { Callout } from "fumadocs-ui/components/callout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "fumadocs-ui/components/tabs";

## Overview

The **Interpreter** pattern is a behavioral design pattern that defines a language grammar and an interpreter to parse and evaluate sentences in that language. It provides a way to represent language constructs and operations in a hierarchical structure that can be evaluated.

## Purpose

The Interpreter pattern aims to:

- Define a language grammar using classes and objects
- Create an interpreter to evaluate expressions in that language
- Support parsing and evaluating domain-specific languages (DSLs)
- Build abstract syntax trees (ASTs) for complex expressions
- Extend language capabilities without modifying the core system

## Problem

Consider building a simple expression parser that needs to handle arithmetic operations. Without the Interpreter pattern:

```typescript
// Without Interpreter pattern
class ExpressionParser {
  parse(expression: string): number {
    // Complex nested conditionals
    // Manual parsing logic
    // Hard to extend for new operations
    if (expression.includes("+")) {
      // Parse addition
    } else if (expression.includes("-")) {
      // Parse subtraction
    }
    // ... more conditions
  }
}
```

Issues with this approach:

- Parser becomes increasingly complex with more operators
- Grammar is implicit and difficult to understand
- Hard to extend with new operations
- Testing individual operations is difficult
- Lacks separation between parsing and evaluation

## Solution

The Interpreter pattern solves this by creating an abstract expression hierarchy where each node represents a grammar rule that can be interpreted.

```typescript
// Abstract expression
interface Expression {
  interpret(): number;
}

// Terminal expressions
class NumberExpression implements Expression {
  constructor(private value: number) {}

  interpret(): number {
    return this.value;
  }
}

// Non-terminal expressions
class AddExpression implements Expression {
  constructor(
    private left: Expression,
    private right: Expression,
  ) {}

  interpret(): number {
    return this.left.interpret() + this.right.interpret();
  }
}

class MultiplyExpression implements Expression {
  constructor(
    private left: Expression,
    private right: Expression,
  ) {}

  interpret(): number {
    return this.left.interpret() * this.right.interpret();
  }
}
```

## Implementation

::: code-group
<TabsList className="grid w-full grid-cols-2">
    <TabsTrigger value="typescript">TypeScript</TabsTrigger>
    <TabsTrigger value="python">Python</TabsTrigger>
  </TabsList>

  
```typescript [typescript]
// Abstract expression interface
    interface Expression {
      interpret(context: Context): number;
    }

    // Context for variable values
    class Context {
      private variables: Map<string, number> = new Map();

      setVariable(name: string, value: number): void {
        this.variables.set(name, value);
      }

      getVariable(name: string): number {
        return this.variables.get(name) ?? 0;
      }
    }

    // Terminal expression - Numbers
    class NumberExpression implements Expression {
      constructor(private value: number) {}

      interpret(context: Context): number {
        return this.value;
      }
    }

    // Terminal expression - Variables
    class VariableExpression implements Expression {
      constructor(private name: string) {}

      interpret(context: Context): number {
        return context.getVariable(this.name);
      }
    }

    // Non-terminal expression - Addition
    class AddExpression implements Expression {
      constructor(
        private left: Expression,
        private right: Expression
      ) {}

      interpret(context: Context): number {
        return this.left.interpret(context) + this.right.interpret(context);
      }
    }

    // Non-terminal expression - Subtraction
    class SubtractExpression implements Expression {
      constructor(
        private left: Expression,
        private right: Expression
      ) {}

      interpret(context: Context): number {
        return this.left.interpret(context) - this.right.interpret(context);
      }
    }

    // Non-terminal expression - Multiplication
    class MultiplyExpression implements Expression {
      constructor(
        private left: Expression,
        private right: Expression
      ) {}

      interpret(context: Context): number {
        return this.left.interpret(context) * this.right.interpret(context);
      }
    }

    // Non-terminal expression - Division
    class DivideExpression implements Expression {
      constructor(
        private left: Expression,
        private right: Expression
      ) {}

      interpret(context: Context): number {
        const divisor = this.right.interpret(context);
        if (divisor === 0) throw new Error('Division by zero');
        return this.left.interpret(context) / divisor;
      }
    }

    // Parser to build expression tree
    class ExpressionParser {
      private tokens: string[];
      private current: number = 0;

      parse(expression: string): Expression {
        this.tokens = this.tokenize(expression);
        this.current = 0;
        return this.parseExpression();
      }

      private parseExpression(): Expression {
        let left = this.parseTerm();

        while (
          this.current < this.tokens.length &&
          (this.tokens[this.current] === '+' || this.tokens[this.current] === '-')
        ) {
          const operator = this.tokens[this.current++];
          const right = this.parseTerm();
          left =
            operator === '+' ? new AddExpression(left, right) : new SubtractExpression(left, right);
        }

        return left;
      }

      private parseTerm(): Expression {
        let left = this.parsePrimary();

        while (
          this.current < this.tokens.length &&
          (this.tokens[this.current] === '*' || this.tokens[this.current] === '/')
        ) {
          const operator = this.tokens[this.current++];
          const right = this.parsePrimary();
          left =
            operator === '*' ? new MultiplyExpression(left, right) : new DivideExpression(left, right);
        }

        return left;
      }

      private parsePrimary(): Expression {
        const token = this.tokens[this.current];

        if (/^\d+$/.test(token)) {
          this.current++;
          return new NumberExpression(parseInt(token));
        }

        if (/^[a-zA-Z]+$/.test(token)) {
          this.current++;
          return new VariableExpression(token);
        }

        if (token === '(') {
          this.current++; // skip '('
          const expr = this.parseExpression();
          this.current++; // skip ')'
          return expr;
        }

        throw new Error(`Unknown token: ${token}`);
      }

      private tokenize(expression: string): string[] {
        return expression.match(/\d+|[a-zA-Z]+|[+\-*/()]/g) || [];
      }
    }

    // Usage
    const parser = new ExpressionParser();
    const context = new Context();
    context.setVariable('x', 10);
    context.setVariable('y', 5);

    const expr1 = parser.parse('x + y * 2');
    console.log(expr1.interpret(context)); // 20

    const expr2 = parser.parse('(x - y) * 2');
    console.log(expr2.interpret(context)); // 10
```


  
```python [python]
from abc import ABC, abstractmethod
    from typing import Dict, List, Optional
    import re

    class Context:
        def __init__(self):
            self.variables: Dict[str, int] = {}

        def set_variable(self, name: str, value: int) -> None:
            self.variables[name] = value

        def get_variable(self, name: str) -> int:
            return self.variables.get(name, 0)

    class Expression(ABC):
        @abstractmethod
        def interpret(self, context: Context) -> int:
            pass

    class NumberExpression(Expression):
        def __init__(self, value: int):
            self.value = value

        def interpret(self, context: Context) -> int:
            return self.value

    class VariableExpression(Expression):
        def __init__(self, name: str):
            self.name = name

        def interpret(self, context: Context) -> int:
            return context.get_variable(self.name)

    class AddExpression(Expression):
        def __init__(self, left: Expression, right: Expression):
            self.left = left
            self.right = right

        def interpret(self, context: Context) -> int:
            return self.left.interpret(context) + self.right.interpret(context)

    class SubtractExpression(Expression):
        def __init__(self, left: Expression, right: Expression):
            self.left = left
            self.right = right

        def interpret(self, context: Context) -> int:
            return self.left.interpret(context) - self.right.interpret(context)

    class MultiplyExpression(Expression):
        def __init__(self, left: Expression, right: Expression):
            self.left = left
            self.right = right

        def interpret(self, context: Context) -> int:
            return self.left.interpret(context) * self.right.interpret(context)

    class DivideExpression(Expression):
        def __init__(self, left: Expression, right: Expression):
            self.left = left
            self.right = right

        def interpret(self, context: Context) -> int:
            divisor = self.right.interpret(context)
            if divisor == 0:
                raise ValueError("Division by zero")
            return self.left.interpret(context) // divisor

    class ExpressionParser:
        def __init__(self):
            self.tokens: List[str] = []
            self.current: int = 0

        def parse(self, expression: str) -> Expression:
            self.tokens = self.tokenize(expression)
            self.current = 0
            return self.parse_expression()

        def parse_expression(self) -> Expression:
            left = self.parse_term()

            while (
                self.current < len(self.tokens)
                and self.tokens[self.current] in ["+", "-"]
            ):
                operator = self.tokens[self.current]
                self.current += 1
                right = self.parse_term()
                if operator == "+":
                    left = AddExpression(left, right)
                else:
                    left = SubtractExpression(left, right)

            return left

        def parse_term(self) -> Expression:
            left = self.parse_primary()

            while (
                self.current < len(self.tokens)
                and self.tokens[self.current] in ["*", "/"]
            ):
                operator = self.tokens[self.current]
                self.current += 1
                right = self.parse_primary()
                if operator == "*":
                    left = MultiplyExpression(left, right)
                else:
                    left = DivideExpression(left, right)

            return left

        def parse_primary(self) -> Expression:
            token = self.tokens[self.current]

            if token.isdigit():
                self.current += 1
                return NumberExpression(int(token))

            if token.isalpha():
                self.current += 1
                return VariableExpression(token)

            if token == "(":
                self.current += 1  # skip '('
                expr = self.parse_expression()
                self.current += 1  # skip ')'
                return expr

            raise ValueError(f"Unknown token: {token}")

        @staticmethod
        def tokenize(expression: str) -> List[str]:
            return re.findall(r"\d+|[a-zA-Z]+|[+\-*/()]", expression)

    # Usage
    parser = ExpressionParser()
    context = Context()
    context.set_variable("x", 10)
    context.set_variable("y", 5)

    expr1 = parser.parse("x + y * 2")
    print(expr1.interpret(context))  # 20

    expr2 = parser.parse("(x - y) * 2")
    print(expr2.interpret(context))  # 10
```

:::

## Real-World Example

### Boolean Expression Evaluator

```typescript
interface BoolExpression extends Expression {
  interpret(context: Context): boolean;
}

class BooleanVariable implements BoolExpression {
  constructor(private name: string) {}

  interpret(context: Context): boolean {
    return context.getBoolean(this.name);
  }
}

class AndExpression implements BoolExpression {
  constructor(
    private left: BoolExpression,
    private right: BoolExpression,
  ) {}

  interpret(context: Context): boolean {
    return this.left.interpret(context) && this.right.interpret(context);
  }
}

class OrExpression implements BoolExpression {
  constructor(
    private left: BoolExpression,
    private right: BoolExpression,
  ) {}

  interpret(context: Context): boolean {
    return this.left.interpret(context) || this.right.interpret(context);
  }
}

class NotExpression implements BoolExpression {
  constructor(private expr: BoolExpression) {}

  interpret(context: Context): boolean {
    return !this.expr.interpret(context);
  }
}

// Usage: Parse boolean expressions like "user.isAdmin AND (user.isActive OR user.isPremium)"
```

## Advantages

✅ **Grammar Clarity** - Makes the grammar explicit and easy to understand
✅ **Extensibility** - Easy to add new expression types
✅ **Separation of Concerns** - Parsing and interpretation are separated
✅ **Flexible** - Can represent complex nested expressions
✅ **Testable** - Each expression type can be tested independently
✅ **DSL Support** - Excellent for implementing domain-specific languages

## Disadvantages

❌ **Performance Overhead** - Tree traversal can be slower than direct evaluation
❌ **Memory Usage** - Expression trees consume significant memory
❌ **Complexity** - Can become complex for complex grammars
❌ **Parsing Complexity** - Implementing robust parsers is non-trivial
❌ **Error Handling** - Debugging parsing errors can be challenging
❌ **Limited Optimization** - Difficult to optimize expression evaluation

## When to Use

- You need to interpret a domain-specific language
- You have grammar rules that need to be represented in code
- You want to build an abstract syntax tree (AST)
- You need flexible expression evaluation
- The language/grammar is relatively simple and stable
- You want to support user-defined expressions or queries

## When NOT to Use

- Performance is critical and expressions are evaluated frequently
- The grammar is very complex or changes frequently
- You can use existing parsing libraries
- Memory usage is a concern with large expression trees
- Simple conditional logic would suffice
- The domain doesn't warrant a custom language

## Related Patterns

- **Composite** - Used to build tree structures of expressions
- **Visitor** - Can be used to separate evaluation logic from expression classes
- **Strategy** - Similar goal but for selecting algorithms
- **Factory** - Can be used to create expressions during parsing
