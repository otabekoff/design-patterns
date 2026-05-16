export const de = {
  title: "Entwurfsmuster",
  description: "Vollständiges Referenzhandbuch",
  label: 'Deutsch',
  lang: 'de',
  link: '/de/',
  themeConfig: {
    editLink: {
      pattern: 'https://github.com/otabekoff/design-patterns/edit/main/:path',
      text: 'Diese Seite auf GitHub bearbeiten'
    },
    nav: [
      { text: 'Startseite', link: '/de/' },
      { text: 'Kurzreferenz', link: '/de/quick-reference' },
          { text: 'Andere Projekte', link: 'https://github.com/otabekoff' },
      { text: 'Unterstützen Sie uns', link: 'https://tirikchilik.uz/uzhandy' }
    ],
    sidebar: [
      {
        text: 'Erste Schritte',
        collapsed: false,
        items: [
          { text: 'Einführung', link: '/de/introduction' },
          { text: 'Tour', link: '/de/tour' },
          { text: 'Kurzreferenz', link: '/de/quick-reference' }
        ]
      },
      {
        text: 'Architekturmuster',
        collapsed: false,
        items: [
          { text: 'Active Record', link: '/de/architectural/active-record' },
          { text: 'CQRS', link: '/de/architectural/cqrs' },
          { text: 'Data Mapper', link: '/de/architectural/data-mapper' },
          { text: 'Dependency Injection', link: '/de/architectural/dependency-injection' },
          { text: 'Event Sourcing', link: '/de/architectural/event-sourcing' },
          { text: 'MVC', link: '/de/architectural/mvc' },
          { text: 'MVP', link: '/de/architectural/mvp' },
          { text: 'MVVM', link: '/de/architectural/mvvm' },
          { text: 'Producer Consumer', link: '/de/architectural/producer-consumer' },
          { text: 'Read Write Lock', link: '/de/architectural/read-write-lock' },
          { text: 'Repository', link: '/de/architectural/repository' },
          { text: 'Scheduler', link: '/de/architectural/scheduler' },
          { text: 'Service Locator', link: '/de/architectural/service-locator' }
        ]
      },
      {
        text: 'Verhaltensmuster',
        collapsed: false,
        items: [
          { text: 'Chain of Responsibility', link: '/de/behavioral/chain-of-responsibility' },
          { text: 'Command', link: '/de/behavioral/command' },
          { text: 'Interpreter', link: '/de/behavioral/interpreter' },
          { text: 'Iterator', link: '/de/behavioral/iterator' },
          { text: 'Mediator', link: '/de/behavioral/mediator' },
          { text: 'Memento', link: '/de/behavioral/memento' },
          { text: 'Null Object', link: '/de/behavioral/null-object' },
          { text: 'Observer', link: '/de/behavioral/observer' },
          { text: 'State', link: '/de/behavioral/state' },
          { text: 'Strategy', link: '/de/behavioral/strategy' },
          { text: 'Template Method', link: '/de/behavioral/template-method' },
          { text: 'Visitor', link: '/de/behavioral/visitor' }
        ]
      },
      {
        text: 'Erzeugungsmuster',
        collapsed: false,
        items: [
          { text: 'Singleton', link: '/de/creational/singleton' },
          { text: 'Factory Method', link: '/de/creational/factory-method' },
          { text: 'Abstract Factory', link: '/de/creational/abstract-factory' },
          { text: 'Builder', link: '/de/creational/builder' },
          { text: 'Prototype', link: '/de/creational/prototype' },
          { text: 'Object Pool', link: '/de/creational/object-pool' }
        ]
      },
      {
        text: 'Strukturmuster',
        collapsed: false,
        items: [
          { text: 'Adapter', link: '/de/structural/adapter' },
          { text: 'Bridge', link: '/de/structural/bridge' },
          { text: 'Composite', link: '/de/structural/composite' },
          { text: 'Decorator', link: '/de/structural/decorator' },
          { text: 'Facade', link: '/de/structural/facade' },
          { text: 'Flyweight', link: '/de/structural/flyweight' },
          { text: 'Proxy', link: '/de/structural/proxy' }
        ]
      }
    ]
  }
}
