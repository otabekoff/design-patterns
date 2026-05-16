export const tr = {
  title: "Tasarım Kalıpları",
  description: "Tam Referans Kılavuzu",
  label: 'Türkçe',
  lang: 'tr',
  link: '/tr/',
  search: {
    translations: {
      button: { buttonText: 'Ara', buttonAriaLabel: 'Ara' },
      modal: {
        displayDetails: 'Detaylı listeyi göster',
        resetButtonTitle: 'Aramayı sıfırla',
        backButtonTitle: 'Aramayı kapat',
        noResultsText: 'Sonuç bulunamadı',
        footer: {
          selectText: 'seçmek için',
          selectKeyAriaLabel: 'giriş',
          navigateText: 'gezinmek için',
          navigateUpKeyAriaLabel: 'yukarı ok',
          navigateDownKeyAriaLabel: 'aşağı ok',
          closeText: 'kapatmak için',
          closeKeyAriaLabel: 'kaçış'
        }
      }
    }
  },
  themeConfig: {
    lastUpdated: {
      text: 'Son güncelleme',
      formatOptions: {
        dateStyle: 'long',
        timeStyle: 'short',
        forceLocale: true
      }
    },
    outline: {
      level: 'deep',
      label: 'Bu sayfada'
    },
    docFooter: {
      prev: 'Önceki sayfa',
      next: 'Sonraki sayfa'
    },
    darkModeSwitchLabel: 'Görünüm',
    lightModeSwitchTitle: 'Açık temaya geç',
    darkModeSwitchTitle: 'Koyu temaya geç',
    sidebarMenuLabel: 'Menü',
    returnToTopLabel: 'Yukarı dön',
    langMenuLabel: 'Dili değiştir',
    skipToContentLabel: 'İçeriğe atla',
    editLink: {
      pattern: 'https://github.com/otabekoff/design-patterns/edit/main/:path',
      text: "Bu sayfayı GitHub'da düzenleyin"
    },
    nav: [
      { text: 'Ana Sayfa', link: '/tr/' },
      { text: 'Hızlı Başvuru', link: '/tr/quick-reference' },
      {
        text: 'Daha fazla',
        items: [
          { text: 'Diğer projeler', link: 'https://github.com/otabekoff' },
          { text: 'Bizi Destekleyin', link: 'https://tirikchilik.uz/uzhandy' }
        ]
      }
    ],
    sidebar: [
      {
        text: 'Başlarken',
        collapsed: false,
        items: [
          { text: 'Giriş', link: '/tr/introduction' },
          { text: 'Tur', link: '/tr/tour' },
          { text: 'Hızlı Başvuru', link: '/tr/quick-reference' }
        ]
      },
      {
        text: 'Mimari Kalıplar',
        collapsed: false,
        items: [
          { text: 'Active Record', link: '/tr/architectural/active-record' },
          { text: 'CQRS', link: '/tr/architectural/cqrs' },
          { text: 'Data Mapper', link: '/tr/architectural/data-mapper' },
          { text: 'Dependency Injection', link: '/tr/architectural/dependency-injection' },
          { text: 'Event Sourcing', link: '/tr/architectural/event-sourcing' },
          { text: 'MVC', link: '/tr/architectural/mvc' },
          { text: 'MVP', link: '/tr/architectural/mvp' },
          { text: 'MVVM', link: '/tr/architectural/mvvm' },
          { text: 'Producer Consumer', link: '/tr/architectural/producer-consumer' },
          { text: 'Read Write Lock', link: '/tr/architectural/read-write-lock' },
          { text: 'Repository', link: '/tr/architectural/repository' },
          { text: 'Scheduler', link: '/tr/architectural/scheduler' },
          { text: 'Service Locator', link: '/tr/architectural/service-locator' }
        ]
      },
      {
        text: 'Davranışsal Kalıplar',
        collapsed: false,
        items: [
          { text: 'Chain of Responsibility', link: '/tr/behavioral/chain-of-responsibility' },
          { text: 'Command', link: '/tr/behavioral/command' },
          { text: 'Interpreter', link: '/tr/behavioral/interpreter' },
          { text: 'Iterator', link: '/tr/behavioral/iterator' },
          { text: 'Mediator', link: '/tr/behavioral/mediator' },
          { text: 'Memento', link: '/tr/behavioral/memento' },
          { text: 'Null Object', link: '/tr/behavioral/null-object' },
          { text: 'Observer', link: '/tr/behavioral/observer' },
          { text: 'State', link: '/tr/behavioral/state' },
          { text: 'Strategy', link: '/tr/behavioral/strategy' },
          { text: 'Template Method', link: '/tr/behavioral/template-method' },
          { text: 'Visitor', link: '/tr/behavioral/visitor' }
        ]
      },
      {
        text: 'Yaratımsal Kalıplar',
        collapsed: false,
        items: [
          { text: 'Singleton', link: '/tr/creational/singleton' },
          { text: 'Factory Method', link: '/tr/creational/factory-method' },
          { text: 'Abstract Factory', link: '/tr/creational/abstract-factory' },
          { text: 'Builder', link: '/tr/creational/builder' },
          { text: 'Prototype', link: '/tr/creational/prototype' },
          { text: 'Object Pool', link: '/tr/creational/object-pool' }
        ]
      },
      {
        text: 'Yapısal Kalıplar',
        collapsed: false,
        items: [
          { text: 'Adapter', link: '/tr/structural/adapter' },
          { text: 'Bridge', link: '/tr/structural/bridge' },
          { text: 'Composite', link: '/tr/structural/composite' },
          { text: 'Decorator', link: '/tr/structural/decorator' },
          { text: 'Facade', link: '/tr/structural/facade' },
          { text: 'Flyweight', link: '/tr/structural/flyweight' },
          { text: 'Proxy', link: '/tr/structural/proxy' }
        ]
      }
    ],
    footer: {
      message: '<a href="https://github.com/otabekoff/design-patterns/blob/main/LICENSE">MIT Lisansı</a> altında yayınlanmıştır.',
      copyright: 'Telif Hakkı © 2025-günümüz <a href="https://github.com/otabekoff">Otabek Sadiridinov</a>'
    }
  }
}
