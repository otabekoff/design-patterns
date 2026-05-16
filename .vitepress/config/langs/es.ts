export const es = {
  title: "Patrones de Diseño",
  description: "Guía de Referencia Completa",
  label: 'Español',
  lang: 'es',
  link: '/es/',
  search: {
    translations: {
      button: { buttonText: 'Buscar', buttonAriaLabel: 'Buscar' },
      modal: {
        displayDetails: 'Mostrar lista detallada',
        resetButtonTitle: 'Restablecer búsqueda',
        backButtonTitle: 'Cerrar búsqueda',
        noResultsText: 'No se encontraron resultados',
        footer: {
          selectText: 'para seleccionar',
          selectKeyAriaLabel: 'entrada',
          navigateText: 'para navegar',
          navigateUpKeyAriaLabel: 'flecha arriba',
          navigateDownKeyAriaLabel: 'flecha abajo',
          closeText: 'para cerrar',
          closeKeyAriaLabel: 'escape'
        }
      }
    }
  },
  themeConfig: {
    editLink: {
      pattern: 'https://github.com/otabekoff/design-patterns/edit/main/:path',
      text: 'Editar esta página en GitHub'
    },
    nav: [
      { text: 'Inicio', link: '/es/' },
      { text: 'Referencia Rápida', link: '/es/quick-reference' },
          { text: 'Otros proyectos', link: 'https://github.com/otabekoff' },
      { text: 'Apóyanos', link: 'https://tirikchilik.uz/uzhandy' }
    ],
    sidebar: [
      {
        text: 'Empezando',
        collapsed: false,
        items: [
          { text: 'Introducción', link: '/es/introduction' },
          { text: 'Tour', link: '/es/tour' },
          { text: 'Referencia Rápida', link: '/es/quick-reference' }
        ]
      },
      {
        text: 'Patrones Arquitectónicos',
        collapsed: false,
        items: [
          { text: 'Active Record', link: '/es/architectural/active-record' },
          { text: 'CQRS', link: '/es/architectural/cqrs' },
          { text: 'Data Mapper', link: '/es/architectural/data-mapper' },
          { text: 'Dependency Injection', link: '/es/architectural/dependency-injection' },
          { text: 'Event Sourcing', link: '/es/architectural/event-sourcing' },
          { text: 'MVC', link: '/es/architectural/mvc' },
          { text: 'MVP', link: '/es/architectural/mvp' },
          { text: 'MVVM', link: '/es/architectural/mvvm' },
          { text: 'Producer Consumer', link: '/es/architectural/producer-consumer' },
          { text: 'Read Write Lock', link: '/es/architectural/read-write-lock' },
          { text: 'Repository', link: '/es/architectural/repository' },
          { text: 'Scheduler', link: '/es/architectural/scheduler' },
          { text: 'Service Locator', link: '/es/architectural/service-locator' }
        ]
      },
      {
        text: 'Patrones de Comportamiento',
        collapsed: false,
        items: [
          { text: 'Chain of Responsibility', link: '/es/behavioral/chain-of-responsibility' },
          { text: 'Command', link: '/es/behavioral/command' },
          { text: 'Interpreter', link: '/es/behavioral/interpreter' },
          { text: 'Iterator', link: '/es/behavioral/iterator' },
          { text: 'Mediator', link: '/es/behavioral/mediator' },
          { text: 'Memento', link: '/es/behavioral/memento' },
          { text: 'Null Object', link: '/es/behavioral/null-object' },
          { text: 'Observer', link: '/es/behavioral/observer' },
          { text: 'State', link: '/es/behavioral/state' },
          { text: 'Strategy', link: '/es/behavioral/strategy' },
          { text: 'Template Method', link: '/es/behavioral/template-method' },
          { text: 'Visitor', link: '/es/behavioral/visitor' }
        ]
      },
      {
        text: 'Patrones Creacionales',
        collapsed: false,
        items: [
          { text: 'Singleton', link: '/es/creational/singleton' },
          { text: 'Factory Method', link: '/es/creational/factory-method' },
          { text: 'Abstract Factory', link: '/es/creational/abstract-factory' },
          { text: 'Builder', link: '/es/creational/builder' },
          { text: 'Prototype', link: '/es/creational/prototype' },
          { text: 'Object Pool', link: '/es/creational/object-pool' }
        ]
      },
      {
        text: 'Patrones Estructurales',
        collapsed: false,
        items: [
          { text: 'Adapter', link: '/es/structural/adapter' },
          { text: 'Bridge', link: '/es/structural/bridge' },
          { text: 'Composite', link: '/es/structural/composite' },
          { text: 'Decorator', link: '/es/structural/decorator' },
          { text: 'Facade', link: '/es/structural/facade' },
          { text: 'Flyweight', link: '/es/structural/flyweight' },
          { text: 'Proxy', link: '/es/structural/proxy' }
        ]
      }
    ]
  }
}
