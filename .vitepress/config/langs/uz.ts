export const uz = {
  title: "Dizayn Naqshlari",
  description: "To'liq qo'llanma",
  label: 'O\'zbek',
  lang: 'uz',
  search: {
    translations: {
      button: { buttonText: 'Qidiruv', buttonAriaLabel: 'Qidiruv' },
      modal: {
        displayDetails: 'Batafsil ro\'yxatni ko\'rsatish',
        resetButtonTitle: 'Qidiruvni tozalash',
        backButtonTitle: 'Qidiruvni yopish',
        noResultsText: 'Natija topilmadi',
        footer: {
          selectText: 'tanlash uchun',
          selectKeyAriaLabel: 'kirish',
          navigateText: 'navigatsiya qilish uchun',
          navigateUpKeyAriaLabel: 'yuqoriga',
          navigateDownKeyAriaLabel: 'pastga',
          closeText: 'yopish uchun',
          closeKeyAriaLabel: 'chiqish'
        }
      }
    }
  },
  themeConfig: {
    lastUpdated: {
      text: 'Oxirgi yangilanish',
      formatOptions: {
        dateStyle: 'long',
        timeStyle: 'short',
        forceLocale: true
      }
    },
    outline: {
      level: 'deep',
      label: 'Ushbu sahifada'
    },
    docFooter: {
      prev: 'Oldingi sahifa',
      next: 'Keyingi sahifa'
    },
    darkModeSwitchLabel: 'Ko\'rinish',
    lightModeSwitchTitle: 'Yorug\' rejimga o\'tish',
    darkModeSwitchTitle: 'Qorong\'u rejimga o\'tish',
    sidebarMenuLabel: 'Menyu',
    returnToTopLabel: 'Yuqoriga qaytish',
    langMenuLabel: 'Tilni o\'zgartirish',
    skipToContentLabel: 'Asosiy kontentga o\'tish',
    editLink: {
      pattern: 'https://github.com/otabekoff/design-patterns/edit/main/src/:path',
      text: 'Ushbu sahifani GitHubda tahrirlash'
    },
    nav: [
      { text: 'Bosh sahifa', link: '/uz/' },
      { text: 'Tezkor ma\'lumotnoma', link: '/uz/quick-reference' },
      {
        text: 'Ko\'proq',
        items: [
          { text: 'Boshqa loyihalar', link: 'https://github.com/otabekoff' },
          { text: 'Qo\'llab-quvvatlash', link: 'https://tirikchilik.uz/uzhandy' }
        ]
      }
    ],
    sidebar: [
      {
        text: 'Boshlash',
        collapsed: false,
        items: [
          { text: 'Kirish', link: '/uz/introduction' },
          { text: 'Sayohat', link: '/uz/tour' },
          { text: 'Tezkor ma\'lumotnoma', link: '/uz/quick-reference' }
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
        text: 'Behavioral Patterns',
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
        text: 'Creational Patterns',
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
        text: 'Structural Patterns',
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
    ],
    footer: {
      message: '<a href="https://github.com/otabekoff/design-patterns/blob/main/LICENSE">MIT Litsenziyasi</a> ostida tarqatilgan.',
      copyright: 'Mualliflik huquqi © 2025-hozirga qadar <a href="https://github.com/otabekoff">Otabek Sadiridinov</a>'
    }
  }
}
