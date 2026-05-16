---
title: MVT (Model-View-Template)
description: A software architectural pattern used by web frameworks like Django to separate logic, data, and presentation.
icon: Layout
---

# MVT (Model-View-Template)

## Overview

**MVT (Model-View-Template)** is a software architectural pattern that is a slight variation of the well-known **MVC (Model-View-Controller)** pattern. It is most famously used by the **Django** web framework.

The key difference lies in who handles the "Controller" logic. In MVT:
- The **Model** handles data and business logic.
- The **View** handles the business logic for processing a request and returning a response (effectively the Controller in MVC).
- The **Template** handles the presentation logic (effectively the View in MVC).
- The **Framework** itself (Django) acts as the Controller, routing requests to the appropriate View.

## Components

### 1. Model
Defines the structure of the data and provides methods to interact with the database.

### 2. View
Contains the logic to fetch data from the Model and pass it to the Template. It bridge the gap between the user's request and the final HTML response.

### 3. Template
The presentation layer. It consists of HTML and a template language (like Django Template Language or Jinja2) to dynamically render data.

## Flow of Data

1. **Request**: User sends a request to a URL.
2. **URL Resolver**: The framework matches the URL to a specific **View**.
3. **View Logic**: The View queries the **Model** for data.
4. **Data Return**: The Model returns data from the database.
5. **Template Rendering**: The View passes the data to a **Template**.
6. **Response**: The Template is rendered into HTML and sent back to the user as a **Response**.

## Implementation Example (Django-style)

::: code-group

```python [python]
# models.py
class Article(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()

# views.py
def article_detail(request, id):
    # Model Interaction
    article = Article.objects.get(id=id)
    # Context for Template
    context = {'article': article}
    # Rendering Template
    return render(request, 'article_detail.html', context)

# article_detail.html (Template)
# <h1>{{ article.title }}</h1>
# <p>{{ article.content }}</p>
```

```typescript [typescript]
// Conceptual MVT in TypeScript
interface Model {
  id: number;
  title: string;
}

const Template = (data: Model) => `
  <h1>${data.title}</h1>
  <p>Content for ID: ${data.id}</p>
`;

const View = (id: number) => {
  // Model interaction
  const data: Model = { id, title: "MVT Pattern Explained" };
  // Render Template
  return Template(data);
};

// Request handling
console.log(View(1));
```

:::

## MVT vs MVC

| Component | MVC | MVT |
| :--- | :--- | :--- |
| **Data Layer** | Model | Model |
| **Logic Layer** | Controller | View |
| **Presentation Layer** | View | Template |
| **Routing / Glue** | Controller | Framework |

## Advantages ✅

- **Rapid Development**: High-level abstractions allow for building features quickly.
- **Separation of Concerns**: Clear distinction between data, logic, and presentation.
- **Pluggability**: Templates can be easily swapped or reused.
- **Framework Managed**: The framework handles the low-level "Controller" plumbing.

## Disadvantages ❌

- **Learning Curve**: Requires understanding the framework's specific way of doing things.
- **Magic**: Some logic is hidden within the framework, making debugging harder.
- **Monolithic Bias**: Tends to lead toward monolithic application structures.

## When to Use ✅

- **Building with Django**: It is the native architecture of the framework.
- **Content-Heavy Sites**: Where templates are complex and data is structured.
- **Rapid Prototyping**: When speed of delivery is critical.

## Related Patterns

- **MVC (Model-View-Controller)**: The parent pattern.
- **MVP (Model-View-Presenter)**: Another MVC variant.
- **MVVM (Model-View-ViewModel)**: Commonly used in frontend frameworks.
