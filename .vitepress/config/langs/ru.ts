export const ru = {
  title: "Паттерны проектирования",
  description: "Полное руководство",
  label: 'Русский',
  lang: 'ru',
  link: '/ru/',
  search: {
    translations: {
      button: { buttonText: 'Поиск', buttonAriaLabel: 'Поиск' },
      modal: {
        displayDetails: 'Показать подробный список',
        resetButtonTitle: 'Сбросить поиск',
        backButtonTitle: 'Закрыть поиск',
        noResultsText: 'Результатов не найдено',
        footer: {
          selectText: 'выбрать',
          selectKeyAriaLabel: 'ввод',
          navigateText: 'навигация',
          navigateUpKeyAriaLabel: 'стрелка вверх',
          navigateDownKeyAriaLabel: 'стрелка вниз',
          closeText: 'закрыть',
          closeKeyAriaLabel: 'escape'
        }
      }
    }
  },
  themeConfig: {
    editLink: {
      pattern: 'https://github.com/otabekoff/design-patterns/edit/main/:path',
      text: 'Редактировать эту страницу на GitHub'
    },
    nav: [
      { text: 'Главная', link: '/ru/' },
      { text: 'Краткий справочник', link: '/ru/quick-reference' },
          { text: 'Другие проекты', link: 'https://github.com/otabekoff' },
      { text: 'Поддержать нас', link: 'https://tirikchilik.uz/uzhandy' }
    ],
    sidebar: [
      {
        text: 'Начало работы',
        collapsed: false,
        items: [
          { text: 'Введение', link: '/ru/introduction' },
          { text: 'Тур', link: '/ru/tour' },
          { text: 'Краткий справочник', link: '/ru/quick-reference' }
        ]
      },
      {
        text: 'Архитектурные паттерны',
        collapsed: false,
        items: [
          { text: 'Active Record', link: '/ru/architectural/active-record' },
          { text: 'CQRS', link: '/ru/architectural/cqrs' },
          { text: 'Data Mapper', link: '/ru/architectural/data-mapper' },
          { text: 'Dependency Injection', link: '/ru/architectural/dependency-injection' },
          { text: 'Event Sourcing', link: '/ru/architectural/event-sourcing' },
          { text: 'MVC', link: '/ru/architectural/mvc' },
          { text: 'MVP', link: '/ru/architectural/mvp' },
          { text: 'MVVM', link: '/ru/architectural/mvvm' },
          { text: 'Producer Consumer', link: '/ru/architectural/producer-consumer' },
          { text: 'Read Write Lock', link: '/ru/architectural/read-write-lock' },
          { text: 'Repository', link: '/ru/architectural/repository' },
          { text: 'Scheduler', link: '/ru/architectural/scheduler' },
          { text: 'Service Locator', link: '/ru/architectural/service-locator' }
        ]
      },
      {
        text: 'Поведенческие паттерны',
        collapsed: false,
        items: [
          { text: 'Chain of Responsibility', link: '/ru/behavioral/chain-of-responsibility' },
          { text: 'Command', link: '/ru/behavioral/command' },
          { text: 'Interpreter', link: '/ru/behavioral/interpreter' },
          { text: 'Iterator', link: '/ru/behavioral/iterator' },
          { text: 'Mediator', link: '/ru/behavioral/mediator' },
          { text: 'Memento', link: '/ru/behavioral/memento' },
          { text: 'Null Object', link: '/ru/behavioral/null-object' },
          { text: 'Observer', link: '/ru/behavioral/observer' },
          { text: 'State', link: '/ru/behavioral/state' },
          { text: 'Strategy', link: '/ru/behavioral/strategy' },
          { text: 'Template Method', link: '/ru/behavioral/template-method' },
          { text: 'Visitor', link: '/ru/behavioral/visitor' }
        ]
      },
      {
        text: 'Порождающие паттерны',
        collapsed: false,
        items: [
          { text: 'Singleton', link: '/ru/creational/singleton' },
          { text: 'Factory Method', link: '/ru/creational/factory-method' },
          { text: 'Abstract Factory', link: '/ru/creational/abstract-factory' },
          { text: 'Builder', link: '/ru/creational/builder' },
          { text: 'Prototype', link: '/ru/creational/prototype' },
          { text: 'Object Pool', link: '/ru/creational/object-pool' }
        ]
      },
      {
        text: 'Структурные паттерны',
        collapsed: false,
        items: [
          { text: 'Adapter', link: '/ru/structural/adapter' },
          { text: 'Bridge', link: '/ru/structural/bridge' },
          { text: 'Composite', link: '/ru/structural/composite' },
          { text: 'Decorator', link: '/ru/structural/decorator' },
          { text: 'Facade', link: '/ru/structural/facade' },
          { text: 'Flyweight', link: '/ru/structural/flyweight' },
          { text: 'Proxy', link: '/ru/structural/proxy' }
        ]
      }
    ]
  }
}
