export const uz = {
  title: "Dizayn Naqshlari",
  description: "To'liq Ma'lumotnoma",
  label: 'Oʻzbekcha',
  lang: 'uz',
  link: '/uz/',
  themeConfig: {
    editLink: {
      pattern: 'https://github.com/otabekoff/design-patterns/edit/main/:path',
      text: 'Ushbu sahifani GitHub-da tahrirlash'
    },
    nav: [
      { text: 'Bosh sahifa', link: '/uz/' },
      { text: 'Tezkor ma\'lumotnoma', link: '/uz/quick-reference' },
          { text: 'Boshqa loyihalar', link: 'https://github.com/otabekoff' },
      { text: "Qo'llab-quvvatlash", link: 'https://tirikchilik.uz/uzhandy' }
    ],
    sidebar: [
      {
        text: 'Boshlash',
        collapsed: false,
        items: [
          { text: 'Kirish', link: '/uz/introduction' },
          { text: 'Sayohat', link: '/uz/tour' },
          { text: 'Tezkor ma\'lumot', link: '/uz/quick-reference' }
        ]
      },
      {
        text: 'Arxitektura Naqshlari',
        collapsed: false,
        items: [
          { text: 'Active Record', link: '/uz/architectural/active-record' },
          { text: 'CQRS', link: '/uz/architectural/cqrs' },
          { text: 'Data Mapper', link: '/uz/architectural/data-mapper' },
          { text: 'Dependency Injection', link: '/uz/architectural/dependency-injection' },
          { text: 'Event Sourcing', link: '/uz/architectural/event-sourcing' },
          { text: 'MVC', link: '/uz/architectural/mvc' },
          { text: 'MVP', link: '/uz/architectural/mvp' },
          { text: 'MVVM', link: '/uz/architectural/mvvm' },
          { text: 'Producer Consumer', link: '/uz/architectural/producer-consumer' },
          { text: 'Read Write Lock', link: '/uz/architectural/read-write-lock' },
          { text: 'Repository', link: '/uz/architectural/repository' },
          { text: 'Scheduler', link: '/uz/architectural/scheduler' },
          { text: 'Service Locator', link: '/uz/architectural/service-locator' }
        ]
      },
      {
        text: 'Xulq-atvor Naqshlari',
        collapsed: false,
        items: [
          { text: 'Chain of Responsibility', link: '/uz/behavioral/chain-of-responsibility' },
          { text: 'Command', link: '/uz/behavioral/command' },
          { text: 'Interpreter', link: '/uz/behavioral/interpreter' },
          { text: 'Iterator', link: '/uz/behavioral/iterator' },
          { text: 'Mediator', link: '/uz/behavioral/mediator' },
          { text: 'Memento', link: '/uz/behavioral/memento' },
          { text: 'Null Object', link: '/uz/behavioral/null-object' },
          { text: 'Observer', link: '/uz/behavioral/observer' },
          { text: 'State', link: '/uz/behavioral/state' },
          { text: 'Strategy', link: '/uz/behavioral/strategy' },
          { text: 'Template Method', link: '/uz/behavioral/template-method' },
          { text: 'Visitor', link: '/uz/behavioral/visitor' }
        ]
      },
      {
        text: 'Yaratuvchi Naqshlar',
        collapsed: false,
        items: [
          { text: 'Singleton', link: '/uz/creational/singleton' },
          { text: 'Factory Method', link: '/uz/creational/factory-method' },
          { text: 'Abstract Factory', link: '/uz/creational/abstract-factory' },
          { text: 'Builder', link: '/uz/creational/builder' },
          { text: 'Prototype', link: '/uz/creational/prototype' },
          { text: 'Object Pool', link: '/uz/creational/object-pool' }
        ]
      },
      {
        text: 'Tuzilmali Naqshlar',
        collapsed: false,
        items: [
          { text: 'Adapter', link: '/uz/structural/adapter' },
          { text: 'Bridge', link: '/uz/structural/bridge' },
          { text: 'Composite', link: '/uz/structural/composite' },
          { text: 'Decorator', link: '/uz/structural/decorator' },
          { text: 'Facade', link: '/uz/structural/facade' },
          { text: 'Flyweight', link: '/uz/structural/flyweight' },
          { text: 'Proxy', link: '/uz/structural/proxy' }
        ]
      }
    ]
  }
}
