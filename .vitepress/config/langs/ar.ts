export const ar = {
  title: "أنماط التصميم",
  description: "الدليل المرجعي الشامل",
  label: 'العربية',
  lang: 'ar',
  link: '/ar/',
  dir: 'rtl',
  search: {
    translations: {
      button: { buttonText: 'بحث', buttonAriaLabel: 'بحث' },
      modal: {
        displayDetails: 'عرض قائمة مفصلة',
        resetButtonTitle: 'إعادة ضبط البحث',
        backButtonTitle: 'إغلاق البحث',
        noResultsText: 'لم يتم العثور على نتائج',
        footer: {
          selectText: 'للاختيار',
          selectKeyAriaLabel: 'إدخال',
          navigateText: 'للتنقل',
          navigateUpKeyAriaLabel: 'السهم لأعلى',
          navigateDownKeyAriaLabel: 'السهم لأسفل',
          closeText: 'للإغلاق',
          closeKeyAriaLabel: 'إغلاق'
        }
      }
    }
  },
  themeConfig: {
    lastUpdated: {
      text: 'آخر تحديث',
      formatOptions: {
        dateStyle: 'long',
        timeStyle: 'short',
        forceLocale: true
      }
    },
    outline: {
      level: 'deep',
      label: 'في هذه الصفحة'
    },
    docFooter: {
      prev: 'الصفحة السابقة',
      next: 'الصفحة التالية'
    },
    darkModeSwitchLabel: 'المظهر',
    lightModeSwitchTitle: 'التبديل إلى المظهر الفاتح',
    darkModeSwitchTitle: 'التبديل إلى المظهر الداكن',
    sidebarMenuLabel: 'القائمة',
    returnToTopLabel: 'العودة إلى الأعلى',
    langMenuLabel: 'تغيير اللغة',
    skipToContentLabel: 'تخطي إلى المحتوى',
    editLink: {
      pattern: 'https://github.com/otabekoff/design-patterns/edit/main/:path',
      text: 'تعديل هذه الصفحة على GitHub'
    },
    nav: [
      { text: 'الرئيسية', link: '/ar/' },
      { text: 'مرجع سريع', link: '/ar/quick-reference' },
      {
        text: 'المزيد',
        items: [
          { text: 'مشاريع أخرى', link: 'https://github.com/otabekoff' },
          { text: 'ادعمنا', link: 'https://tirikchilik.uz/uzhandy' }
        ]
      }
    ],
    sidebar: [
      {
        text: 'البدء',
        collapsed: false,
        items: [
          { text: 'مقدمة', link: '/ar/introduction' },
          { text: 'جولة', link: '/ar/tour' },
          { text: 'مرجع سريع', link: '/ar/quick-reference' }
        ]
      },
      {
        text: 'الأنماط المعمارية',
        collapsed: false,
        items: [
          { text: 'Active Record', link: '/ar/architectural/active-record' },
          { text: 'CQRS', link: '/ar/architectural/cqrs' },
          { text: 'Data Mapper', link: '/ar/architectural/data-mapper' },
          { text: 'Dependency Injection', link: '/ar/architectural/dependency-injection' },
          { text: 'Event Sourcing', link: '/ar/architectural/event-sourcing' },
          { text: 'MVC', link: '/ar/architectural/mvc' },
          { text: 'MVP', link: '/ar/architectural/mvp' },
          { text: 'MVVM', link: '/ar/architectural/mvvm' },
          { text: 'Producer Consumer', link: '/ar/architectural/producer-consumer' },
          { text: 'Read Write Lock', link: '/ar/architectural/read-write-lock' },
          { text: 'Repository', link: '/ar/architectural/repository' },
          { text: 'Scheduler', link: '/ar/architectural/scheduler' },
          { text: 'Service Locator', link: '/ar/architectural/service-locator' }
        ]
      },
      {
        text: 'الأنماط السلوكية',
        collapsed: false,
        items: [
          { text: 'Chain of Responsibility', link: '/ar/behavioral/chain-of-responsibility' },
          { text: 'Command', link: '/ar/behavioral/command' },
          { text: 'Interpreter', link: '/ar/behavioral/interpreter' },
          { text: 'Iterator', link: '/ar/behavioral/iterator' },
          { text: 'Mediator', link: '/ar/behavioral/mediator' },
          { text: 'Memento', link: '/ar/behavioral/memento' },
          { text: 'Null Object', link: '/ar/behavioral/null-object' },
          { text: 'Observer', link: '/ar/behavioral/observer' },
          { text: 'State', link: '/ar/behavioral/state' },
          { text: 'Strategy', link: '/ar/behavioral/strategy' },
          { text: 'Template Method', link: '/ar/behavioral/template-method' },
          { text: 'Visitor', link: '/ar/behavioral/visitor' }
        ]
      },
      {
        text: 'الأنماط الإنشائية',
        collapsed: false,
        items: [
          { text: 'Singleton', link: '/ar/creational/singleton' },
          { text: 'Factory Method', link: '/ar/creational/factory-method' },
          { text: 'Abstract Factory', link: '/ar/creational/abstract-factory' },
          { text: 'Builder', link: '/ar/creational/builder' },
          { text: 'Prototype', link: '/ar/creational/prototype' },
          { text: 'Object Pool', link: '/ar/creational/object-pool' }
        ]
      },
      {
        text: 'الأنماط الهيكلية',
        collapsed: false,
        items: [
          { text: 'Adapter', link: '/ar/structural/adapter' },
          { text: 'Bridge', link: '/ar/structural/bridge' },
          { text: 'Composite', link: '/ar/structural/composite' },
          { text: 'Decorator', link: '/ar/structural/decorator' },
          { text: 'Facade', link: '/ar/structural/facade' },
          { text: 'Flyweight', link: '/ar/structural/flyweight' },
          { text: 'Proxy', link: '/ar/structural/proxy' }
        ]
      }
    ],
    footer: {
      message: 'صدر تحت <a href="https://github.com/otabekoff/design-patterns/blob/main/LICENSE">رخصة MIT</a>.',
      copyright: 'حقوق النشر © 2025-الحاضر <a href="https://github.com/otabekoff">أوتابيك ساديريدينوف</a>'
    }
  }
}
