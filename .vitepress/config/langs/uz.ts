export const uz = {
  title: "Loyihalash andozalari",
  description: "Loyihalash andozalari (Design Patterns) bo'yicha to'liq qo'llanma",
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
          { text: 'Qo\'llab-quvvatlash', link: 'https://taps.uz/uzhandy' }
        ]
      }
    ],
    sidebar: [
      {
        text: 'Boshlash',
        collapsed: false,
        items: [
          { text: 'Kirish', link: '/uz/introduction' },
          { text: 'Loyihalash andozasi nima?', link: '/uz/what-is-design-pattern' },
          { text: 'Sayohat', link: '/uz/tour' },
          { text: 'Tezkor ma\'lumotnoma', link: '/uz/quick-reference' }
        ]
      },
      {
        text: "Qo'llanmalar",
        collapsed: false,
        items: [
          { text: 'Andozani tanlash', link: '/uz/choosing-a-pattern' },
          { text: 'Strategiya va Holat', link: '/uz/comparisons/strategy-vs-state' },
          { text: "Dekorator va O'rinbosar", link: '/uz/comparisons/decorator-vs-proxy' },
          { text: 'Fabrika metodi va Abstrakt fabrika', link: '/uz/comparisons/factory-method-vs-abstract-factory' },
          { text: "Adapter, Fasad va Ko'prik", link: '/uz/comparisons/adapter-vs-facade-vs-bridge' },
          { text: 'MVC, MVP va MVVM', link: '/uz/comparisons/mvc-vs-mvp-vs-mvvm' },
          { text: 'Repozitoriy, Data Mapper va Active Record', link: '/uz/comparisons/repository-vs-data-mapper-vs-active-record' }
        ]
      },
      {
        text: 'Arxitektura andozalari',
        collapsed: false,
        items: [
          { text: 'Active Record', link: '/uz/architectural/active-record' },
          { text: 'CQRS', link: '/uz/architectural/cqrs' },
          { text: 'Data Mapper', link: '/uz/architectural/data-mapper' },
          { text: "Bog'liqliklarni kiritish", link: '/uz/architectural/dependency-injection' },
          { text: 'Event Sourcing', link: '/uz/architectural/event-sourcing' },
          { text: 'Identifikatorlar xaritasi', link: '/uz/architectural/identity-map' },
          { text: 'MVC', link: '/uz/architectural/mvc' },
          { text: 'MVP', link: '/uz/architectural/mvp' },
          { text: 'MVT', link: '/uz/architectural/mvt' },
          { text: 'MVVM', link: '/uz/architectural/mvvm' },
          { text: "Ishlab chiqaruvchi–iste'molchi", link: '/uz/architectural/producer-consumer' },
          { text: "O'qish-yozish qulfi", link: '/uz/architectural/read-write-lock' },
          { text: 'Repozitoriy', link: '/uz/architectural/repository' },
          { text: 'Rejalashtiruvchi', link: '/uz/architectural/scheduler' },
          { text: 'Servis lokatori', link: '/uz/architectural/service-locator' },
          { text: 'Ish birligi', link: '/uz/architectural/unit-of-work' }
        ]
      },
      {
        text: 'Xulq-atvor andozalari',
        collapsed: false,
        items: [
          { text: "Mas'uliyatlar zanjiri", link: '/uz/behavioral/chain-of-responsibility' },
          { text: 'Buyruq', link: '/uz/behavioral/command' },
          { text: 'Interpretator', link: '/uz/behavioral/interpreter' },
          { text: 'Iterator', link: '/uz/behavioral/iterator' },
          { text: 'Vositachi', link: '/uz/behavioral/mediator' },
          { text: 'Memento', link: '/uz/behavioral/memento' },
          { text: "Bo'sh obyekt", link: '/uz/behavioral/null-object' },
          { text: 'Kuzatuvchi', link: '/uz/behavioral/observer' },
          { text: 'Holat', link: '/uz/behavioral/state' },
          { text: 'Strategiya', link: '/uz/behavioral/strategy' },
          { text: 'Shablon metod', link: '/uz/behavioral/template-method' },
          { text: 'Tashrifchi', link: '/uz/behavioral/visitor' }
        ]
      },
      {
        text: 'Yaratuvchi andozalar',
        collapsed: false,
        items: [
          { text: 'Singleton', link: '/uz/creational/singleton' },
          { text: 'Fabrika metodi', link: '/uz/creational/factory-method' },
          { text: 'Abstrakt fabrika', link: '/uz/creational/abstract-factory' },
          { text: 'Quruvchi', link: '/uz/creational/builder' },
          { text: 'Prototip', link: '/uz/creational/prototype' },
          { text: 'Obyektlar havzasi', link: '/uz/creational/object-pool' }
        ]
      },
      {
        text: 'Tuzilmaviy andozalar',
        collapsed: false,
        items: [
          { text: 'Adapter', link: '/uz/structural/adapter' },
          { text: "Ko'prik", link: '/uz/structural/bridge' },
          { text: 'Kompozit', link: '/uz/structural/composite' },
          { text: 'Dekorator', link: '/uz/structural/decorator' },
          { text: 'Fasad', link: '/uz/structural/facade' },
          { text: 'Yengilvazn', link: '/uz/structural/flyweight' },
          { text: "O'rinbosar", link: '/uz/structural/proxy' }
        ]
      }
    ],
    footer: {
      message: '<a href="https://github.com/otabekoff/design-patterns/blob/main/LICENSE">MIT Litsenziyasi</a> ostida tarqatilgan.',
      copyright: 'Mualliflik huquqi © 2025-hozirga qadar <a href="https://github.com/otabekoff">Otabek Sadiridinov</a>'
    }
  }
}
