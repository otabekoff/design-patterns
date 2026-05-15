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

- [**Singleton**](/creational/singleton): Garantiza que una clase tenga una sola instancia con un punto de acceso global
  - [**Factory Method**](/creational/factory-method): Crea objetos sin especificar las clases exactas
  - [**Abstract Factory**](/creational/abstract-factory): Crea familias de objetos relacionados
  - [**Builder**](/creational/builder): Construye objetos complejos paso a paso
  - [**Prototype**](/creational/prototype): Crea nuevos objetos clonando los existentes
  - [**Object Pool**](/creational/object-pool): Reutiliza objetos inicializados de manera eficiente

## 🔧 Patrones Estructurales (Structural)

Se ocupan de la composición de objetos y las relaciones entre ellos. Ayudan a componer objetos en estructuras más grandes manteniendo estas estructuras flexibles y eficientes.

- [**Adapter**](/structural/adapter): Convierte interfaces para que objetos incompatibles trabajen juntos
  - [**Bridge**](/structural/bridge): Desacopla la abstracción de la implementación
  - [**Composite**](/structural/composite): Compone objetos en estructuras de árbol
  - [**Decorator**](/structural/decorator): Añade responsabilidades a los objetos dinámicamente
  - [**Facade**](/structural/facade): Proporciona una interfaz simplificada a un subsistema complejo
  - [**Flyweight**](/structural/flyweight): Comparte objetos eficientemente para ahorrar memoria
  - [**Proxy**](/structural/proxy): Proporciona un sustituto para controlar el acceso

## 🔄 Patrones de Comportamiento (Behavioral)

Se ocupan de la comunicación y responsabilidad entre objetos. Definen cómo interactúan los objetos y distribuyen responsabilidades entre ellos.

- [**Chain of Responsibility**](/behavioral/chain-of-responsibility): Pasa las solicitudes a lo largo de una cadena de manejadores
  - [**Command**](/behavioral/command): Encapsula las solicitudes como objetos
  - [**Interpreter**](/behavioral/interpreter): Define la gramática de un lenguaje y un intérprete
  - [**Iterator**](/behavioral/iterator): Accede a los elementos de una colección secuencialmente
  - [**Mediator**](/behavioral/mediator): Encapsula la interacción entre objetos
  - [**Memento**](/behavioral/memento): Captura y restaura el estado de un objeto
  - [**Observer**](/behavioral/observer): Notifica a múltiples objetos sobre los cambios de estado
  - [**State**](/behavioral/state): Altera el comportamiento basado en el estado interno
  - [**Strategy**](/behavioral/strategy): Encapsula algoritmos intercambiables
  - [**Template Method**](/behavioral/template-method): Define el esqueleto de un algoritmo en una clase base
  - [**Visitor**](/behavioral/visitor): Añade operaciones a los objetos sin modificarlos
  - [**Null Object**](/behavioral/null-object): Proporciona un comportamiento por defecto que no hace nada

## 🏛️ Patrones Arquitectónicos y de Concurrencia

Patrones de nivel superior para la estructura del sistema y multihilo. Estos patrones abordan preocupaciones arquitectónicas mayores.

- [**MVC**](/architectural/mvc): Separa el modelo, la vista y el controlador
  - [**MVP**](/architectural/mvp): El presentador maneja toda la lógica de la interfaz
  - [**MVVM**](/architectural/mvvm): Vincula la interfaz a un modelo de vista reactivo
  - [**Repository**](/architectural/repository): Abstrae la capa de acceso a datos
  - [**CQRS**](/architectural/cqrs): Separa las operaciones de lectura y escritura
  - [**Event Sourcing**](/architectural/event-sourcing): Almacena el estado como una secuencia de eventos
  - [**Active Record**](/architectural/active-record): Envuelve una fila de la base de datos en un objeto
  - [**Data Mapper**](/architectural/data-mapper): Separa los objetos en memoria de la base de datos
  - [**Service Locator**](/architectural/service-locator): Localiza servicios desde un registro
  - [**Dependency Injection**](/architectural/dependency-injection): Pasa las dependencias a los objetos
  - [**Producer-Consumer**](/architectural/producer-consumer): Desacopla productores y consumidores
  - [**Scheduler**](/architectural/scheduler): Controla el acceso a los recursos de los hilos
  - [**Read-Write Lock**](/architectural/read-write-lock): Permite lecturas concurrentes y escrituras exclusivas

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
