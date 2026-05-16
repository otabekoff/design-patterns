---
title: Patrones de Diseño en Programación
description: Una guía completa sobre los patrones de diseño utilizados en el desarrollo de software.
icon: Palette
---

# Patrones de Diseño en Programación

Los patrones de diseño son soluciones reutilizables a problemas comunes en el diseño de software. Representan las mejores prácticas y pueden acelerar el proceso de desarrollo al proporcionar paradigmas de desarrollo probados y testeados.

Los patrones de diseño suelen organizarse en **tres categorías principales** según su propósito:

## 🏗️ Patrones Creacionales (Creational)

Se ocupan de los mecanismos de creación de objetos. Abstraen el proceso de instanciación para que los sistemas sean independientes de cómo se crean, componen y representan sus objetos.

<Cards>
  <Card
    title="Singleton"
    description="Garantiza que una clase tenga una sola instancia con un punto de acceso global"
    href="/creational/singleton"
  />
  <Card
    title="Factory Method"
    description="Crea objetos sin especificar las clases exactas"
    href="/creational/factory-method"
  />
  <Card
    title="Abstract Factory"
    description="Crea familias de objetos relacionados"
    href="/creational/abstract-factory"
  />
  <Card
    title="Builder"
    description="Construye objetos complejos paso a paso"
    href="/creational/builder"
  />
  <Card
    title="Prototype"
    description="Crea nuevos objetos clonando los existentes"
    href="/creational/prototype"
  />
  <Card
    title="Object Pool"
    description="Reutiliza objetos inicializados de manera eficiente"
    href="/creational/object-pool"
  />
</Cards>

## 🔧 Patrones Estructurales (Structural)

Se ocupan de la composición de objetos y las relaciones entre ellos. Ayudan a componer objetos en estructuras más grandes manteniendo estas estructuras flexibles y eficientes.

<Cards>
  <Card
    title="Adapter"
    description="Convierte interfaces para que objetos incompatibles trabajen juntos"
    href="/structural/adapter"
  />
  <Card
    title="Bridge"
    description="Desacopla la abstracción de la implementación"
    href="/structural/bridge"
  />
  <Card
    title="Composite"
    description="Compone objetos en estructuras de árbol"
    href="/structural/composite"
  />
  <Card
    title="Decorator"
    description="Añade responsabilidades a los objetos dinámicamente"
    href="/structural/decorator"
  />
  <Card
    title="Facade"
    description="Proporciona una interfaz simplificada a un subsistema complejo"
    href="/structural/facade"
  />
  <Card
    title="Flyweight"
    description="Comparte objetos eficientemente para ahorrar memoria"
    href="/structural/flyweight"
  />
  <Card
    title="Proxy"
    description="Proporciona un sustituto para controlar el acceso"
    href="/structural/proxy"
  />
</Cards>

## 🔄 Patrones de Comportamiento (Behavioral)

Se ocupan de la comunicación y responsabilidad entre objetos. Definen cómo interactúan los objetos y distribuyen responsabilidades entre ellos.

<Cards>
  <Card
    title="Chain of Responsibility"
    description="Pasa las solicitudes a lo largo de una cadena de manejadores"
    href="/behavioral/chain-of-responsibility"
  />
  <Card
    title="Command"
    description="Encapsula las solicitudes como objetos"
    href="/behavioral/command"
  />
  <Card
    title="Interpreter"
    description="Define la gramática de un lenguaje y un intérprete"
    href="/behavioral/interpreter"
  />
  <Card
    title="Iterator"
    description="Accede a los elementos de una colección secuencialmente"
    href="/behavioral/iterator"
  />
  <Card
    title="Mediator"
    description="Encapsula la interacción entre objetos"
    href="/behavioral/mediator"
  />
  <Card
    title="Memento"
    description="Captura y restaura el estado de un objeto"
    href="/behavioral/memento"
  />
  <Card
    title="Observer"
    description="Notifica a múltiples objetos sobre los cambios de estado"
    href="/behavioral/observer"
  />
  <Card
    title="State"
    description="Altera el comportamiento basado en el estado interno"
    href="/behavioral/state"
  />
  <Card
    title="Strategy"
    description="Encapsula algoritmos intercambiables"
    href="/behavioral/strategy"
  />
  <Card
    title="Template Method"
    description="Define el esqueleto de un algoritmo en una clase base"
    href="/behavioral/template-method"
  />
  <Card
    title="Visitor"
    description="Añade operaciones a los objetos sin modificarlos"
    href="/behavioral/visitor"
  />
  <Card
    title="Null Object"
    description="Proporciona un comportamiento por defecto que no hace nada"
    href="/behavioral/null-object"
  />
</Cards>

## 🏛️ Patrones Arquitectónicos y de Concurrencia

Patrones de nivel superior para la estructura del sistema y multihilo. Estos patrones abordan preocupaciones arquitectónicas mayores.

<Cards>
  <Card
    title="MVC"
    description="Separa el modelo, la vista y el controlador"
    href="/architectural/mvc"
  />
  <Card
    title="MVP"
    description="El presentador maneja toda la lógica de la interfaz"
    href="/architectural/mvp"
  />
  <Card
    title="MVVM"
    description="Vincula la interfaz a un modelo de vista reactivo"
    href="/architectural/mvvm"
  />
  <Card
    title="Repository"
    description="Abstrae la capa de acceso a datos"
    href="/architectural/repository"
  />
  <Card
    title="CQRS"
    description="Separa las operaciones de lectura y escritura"
    href="/architectural/cqrs"
  />
  <Card
    title="Event Sourcing"
    description="Almacena el estado como una secuencia de eventos"
    href="/architectural/event-sourcing"
  />
  <Card
    title="Active Record"
    description="Envuelve una fila de la base de datos en un objeto"
    href="/architectural/active-record"
  />
  <Card
    title="Data Mapper"
    description="Separa los objetos en memoria de la base de datos"
    href="/architectural/data-mapper"
  />
  <Card
    title="Service Locator"
    description="Localiza servicios desde un registro"
    href="/architectural/service-locator"
  />
  <Card
    title="Dependency Injection"
    description="Pasa las dependencias a los objetos"
    href="/architectural/dependency-injection"
  />
  <Card
    title="Producer-Consumer"
    description="Desacopla productores y consumidores"
    href="/architectural/producer-consumer"
  />
  <Card
    title="Scheduler"
    description="Controla el acceso a los recursos de los hilos"
    href="/architectural/scheduler"
  />
  <Card
    title="Read-Write Lock"
    description="Permite lecturas concurrentes y escrituras exclusivas"
    href="/architectural/read-write-lock"
  />
</Cards>

---

## Sobre los Patrones de Diseño

Los primeros 23 patrones (Creacionales, Estructurales y de Comportamiento) son los patrones clásicos de la **"Banda de los Cuatro" (GoF)** del libro fundamental de 1994 *Design Patterns* de Gamma, Helm, Johnson y Vlissides. Los patrones restantes son extensiones ampliamente reconocidas por la comunidad de ingeniería de software en general.

### ¿Por qué aprender patrones de diseño?

- **Soluciones Probadas**: Proporcionan soluciones testeadas a problemas comunes.
- **Mejor Comunicación**: Proporcionan un vocabulario común para los desarrolladores.
- **Desarrollo más rápido**: Puedes reutilizar soluciones existentes en lugar de reinventar la rueda.
- **Calidad del Código**: Conducen a un código más mantenible y flexible.
- **Mejores Prácticas**: Encarnan las mejores prácticas de la ingeniería de software.

¡Empieza a explorar los patrones seleccionando una categoría arriba!

