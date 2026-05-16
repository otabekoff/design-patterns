export const en = {
  title: "Design Patterns",
  description: "Complete Reference Guide",
  label: 'English',
  lang: 'en',
  search: {
    translations: {
      button: { buttonText: 'Search', buttonAriaLabel: 'Search' },
      modal: {
        displayDetails: 'Display detailed list',
        resetButtonTitle: 'Reset search',
        backButtonTitle: 'Close search',
        noResultsText: 'No results found',
        footer: {
          selectText: 'to select',
          selectKeyAriaLabel: 'enter',
          navigateText: 'to navigate',
          navigateUpKeyAriaLabel: 'up arrow',
          navigateDownKeyAriaLabel: 'down arrow',
          closeText: 'to close',
          closeKeyAriaLabel: 'escape'
        }
      }
    }
  },
  themeConfig: {
    lastUpdated: {
      text: 'Last updated',
      formatOptions: {
        dateStyle: 'long',
        timeStyle: 'short',
        forceLocale: true
      }
    },
    outline: {
      level: 'deep',
      label: 'On this page'
    },
    docFooter: {
      prev: 'Previous page',
      next: 'Next page'
    },
    darkModeSwitchLabel: 'Appearance',
    lightModeSwitchTitle: 'Switch to light theme',
    darkModeSwitchTitle: 'Switch to dark theme',
    sidebarMenuLabel: 'Menu',
    returnToTopLabel: 'Return to top',
    langMenuLabel: 'Change language',
    skipToContentLabel: 'Skip to content',
    editLink: {
      pattern: 'https://github.com/otabekoff/design-patterns/edit/main/:path',
      text: 'Edit this page on GitHub'
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Quick Reference', link: '/quick-reference' },
      {
        text: 'More',
        items: [
          { text: 'Other projects', link: 'https://github.com/otabekoff' },
          { text: 'Support Us', link: 'https://tirikchilik.uz/uzhandy' }
        ]
      }
    ],
    sidebar: [
      {
        text: 'Getting Started',
        collapsed: false,
        items: [
          { text: 'Introduction', link: '/introduction' },
          { text: 'Tour', link: '/tour' },
          { text: 'Quick Reference', link: '/quick-reference' }
        ]
      },
      {
        text: 'Architectural Patterns',
        collapsed: false,
        items: [
          { text: 'Active Record', link: '/architectural/active-record' },
          { text: 'CQRS', link: '/architectural/cqrs' },
          { text: 'Data Mapper', link: '/architectural/data-mapper' },
          { text: 'Dependency Injection', link: '/architectural/dependency-injection' },
          { text: 'Event Sourcing', link: '/architectural/event-sourcing' },
          { text: 'MVC', link: '/architectural/mvc' },
          { text: 'MVP', link: '/architectural/mvp' },
          { text: 'MVVM', link: '/architectural/mvvm' },
          { text: 'Producer Consumer', link: '/architectural/producer-consumer' },
          { text: 'Read Write Lock', link: '/architectural/read-write-lock' },
          { text: 'Repository', link: '/architectural/repository' },
          { text: 'Scheduler', link: '/architectural/scheduler' },
          { text: 'Service Locator', link: '/architectural/service-locator' }
        ]
      },
      {
        text: 'Behavioral Patterns',
        collapsed: false,
        items: [
          { text: 'Chain of Responsibility', link: '/behavioral/chain-of-responsibility' },
          { text: 'Command', link: '/behavioral/command' },
          { text: 'Interpreter', link: '/behavioral/interpreter' },
          { text: 'Iterator', link: '/behavioral/iterator' },
          { text: 'Mediator', link: '/behavioral/mediator' },
          { text: 'Memento', link: '/behavioral/memento' },
          { text: 'Null Object', link: '/behavioral/null-object' },
          { text: 'Observer', link: '/behavioral/observer' },
          { text: 'State', link: '/behavioral/state' },
          { text: 'Strategy', link: '/behavioral/strategy' },
          { text: 'Template Method', link: '/behavioral/template-method' },
          { text: 'Visitor', link: '/behavioral/visitor' }
        ]
      },
      {
        text: 'Creational Patterns',
        collapsed: false,
        items: [
          { text: 'Singleton', link: '/creational/singleton' },
          { text: 'Factory Method', link: '/creational/factory-method' },
          { text: 'Abstract Factory', link: '/creational/abstract-factory' },
          { text: 'Builder', link: '/creational/builder' },
          { text: 'Prototype', link: '/creational/prototype' },
          { text: 'Object Pool', link: '/creational/object-pool' }
        ]
      },
      {
        text: 'Structural Patterns',
        collapsed: false,
        items: [
          { text: 'Adapter', link: '/structural/adapter' },
          { text: 'Bridge', link: '/structural/bridge' },
          { text: 'Composite', link: '/structural/composite' },
          { text: 'Decorator', link: '/structural/decorator' },
          { text: 'Facade', link: '/structural/facade' },
          { text: 'Flyweight', link: '/structural/flyweight' },
          { text: 'Proxy', link: '/structural/proxy' }
        ]
      }
    ],
    footer: {
      message: 'Released under the <a href="https://github.com/otabekoff/design-patterns/blob/main/LICENSE">MIT License</a>.',
      copyright: 'Copyright © 2025-present <a href="https://github.com/otabekoff">Otabek Sadiridinov</a>'
    }
  }
}
