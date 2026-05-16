// .vitepress/config/index.ts
import { defineConfig } from "file:///D:/vitepress/design-patterns/node_modules/vitepress/dist/node/index.js";
import path2 from "path";
import { joinURL, withoutTrailingSlash } from "file:///D:/vitepress/design-patterns/node_modules/ufo/dist/index.mjs";
import { addOgImage } from "file:///D:/vitepress/design-patterns/node_modules/vitepress-plugin-og/dist/index.mjs";
import { groupIconMdPlugin, groupIconVitePlugin } from "file:///D:/vitepress/design-patterns/node_modules/vitepress-plugin-group-icons/dist/index.mjs";

// .vitepress/config/langs/en.ts
var en = {
  title: "Design Patterns",
  description: "Complete Reference Guide",
  label: "English",
  lang: "en",
  search: {
    translations: {
      button: { buttonText: "Search", buttonAriaLabel: "Search" },
      modal: {
        displayDetails: "Display detailed list",
        resetButtonTitle: "Reset search",
        backButtonTitle: "Close search",
        noResultsText: "No results found",
        footer: {
          selectText: "to select",
          selectKeyAriaLabel: "enter",
          navigateText: "to navigate",
          navigateUpKeyAriaLabel: "up arrow",
          navigateDownKeyAriaLabel: "down arrow",
          closeText: "to close",
          closeKeyAriaLabel: "escape"
        }
      }
    }
  },
  themeConfig: {
    lastUpdated: {
      text: "Last updated",
      formatOptions: {
        dateStyle: "long",
        timeStyle: "short",
        forceLocale: true
      }
    },
    outline: {
      level: "deep",
      label: "On this page"
    },
    docFooter: {
      prev: "Previous page",
      next: "Next page"
    },
    darkModeSwitchLabel: "Appearance",
    lightModeSwitchTitle: "Switch to light theme",
    darkModeSwitchTitle: "Switch to dark theme",
    sidebarMenuLabel: "Menu",
    returnToTopLabel: "Return to top",
    langMenuLabel: "Change language",
    skipToContentLabel: "Skip to content",
    editLink: {
      pattern: "https://github.com/otabekoff/design-patterns/edit/main/:path",
      text: "Edit this page on GitHub"
    },
    nav: [
      { text: "Home", link: "/" },
      { text: "Quick Reference", link: "/quick-reference" },
      {
        text: "More",
        items: [
          { text: "Other projects", link: "https://github.com/otabekoff" },
          { text: "Support Us", link: "https://tirikchilik.uz/uzhandy" }
        ]
      }
    ],
    sidebar: [
      {
        text: "Getting Started",
        collapsed: false,
        items: [
          { text: "Introduction", link: "/introduction" },
          { text: "Tour", link: "/tour" },
          { text: "Quick Reference", link: "/quick-reference" }
        ]
      },
      {
        text: "Architectural Patterns",
        collapsed: false,
        items: [
          { text: "Active Record", link: "/architectural/active-record" },
          { text: "CQRS", link: "/architectural/cqrs" },
          { text: "Data Mapper", link: "/architectural/data-mapper" },
          { text: "Dependency Injection", link: "/architectural/dependency-injection" },
          { text: "Event Sourcing", link: "/architectural/event-sourcing" },
          { text: "MVC", link: "/architectural/mvc" },
          { text: "MVP", link: "/architectural/mvp" },
          { text: "MVVM", link: "/architectural/mvvm" },
          { text: "Producer Consumer", link: "/architectural/producer-consumer" },
          { text: "Read Write Lock", link: "/architectural/read-write-lock" },
          { text: "Repository", link: "/architectural/repository" },
          { text: "Scheduler", link: "/architectural/scheduler" },
          { text: "Service Locator", link: "/architectural/service-locator" }
        ]
      },
      {
        text: "Behavioral Patterns",
        collapsed: false,
        items: [
          { text: "Chain of Responsibility", link: "/behavioral/chain-of-responsibility" },
          { text: "Command", link: "/behavioral/command" },
          { text: "Interpreter", link: "/behavioral/interpreter" },
          { text: "Iterator", link: "/behavioral/iterator" },
          { text: "Mediator", link: "/behavioral/mediator" },
          { text: "Memento", link: "/behavioral/memento" },
          { text: "Null Object", link: "/behavioral/null-object" },
          { text: "Observer", link: "/behavioral/observer" },
          { text: "State", link: "/behavioral/state" },
          { text: "Strategy", link: "/behavioral/strategy" },
          { text: "Template Method", link: "/behavioral/template-method" },
          { text: "Visitor", link: "/behavioral/visitor" }
        ]
      },
      {
        text: "Creational Patterns",
        collapsed: false,
        items: [
          { text: "Singleton", link: "/creational/singleton" },
          { text: "Factory Method", link: "/creational/factory-method" },
          { text: "Abstract Factory", link: "/creational/abstract-factory" },
          { text: "Builder", link: "/creational/builder" },
          { text: "Prototype", link: "/creational/prototype" },
          { text: "Object Pool", link: "/creational/object-pool" }
        ]
      },
      {
        text: "Structural Patterns",
        collapsed: false,
        items: [
          { text: "Adapter", link: "/structural/adapter" },
          { text: "Bridge", link: "/structural/bridge" },
          { text: "Composite", link: "/structural/composite" },
          { text: "Decorator", link: "/structural/decorator" },
          { text: "Facade", link: "/structural/facade" },
          { text: "Flyweight", link: "/structural/flyweight" },
          { text: "Proxy", link: "/structural/proxy" }
        ]
      }
    ],
    footer: {
      message: 'Released under the <a href="https://github.com/otabekoff/design-patterns/blob/main/LICENSE">MIT License</a>.',
      copyright: 'Copyright \xA9 2025-present <a href="https://github.com/otabekoff">Otabek Sadiridinov</a>'
    }
  }
};

// .vitepress/config/langs/uz.ts
var uz = {
  title: "Dizayn Naqshlari",
  description: "To'liq qo'llanma",
  label: "O'zbek",
  lang: "uz",
  search: {
    translations: {
      button: { buttonText: "Qidiruv", buttonAriaLabel: "Qidiruv" },
      modal: {
        displayDetails: "Batafsil ro'yxatni ko'rsatish",
        resetButtonTitle: "Qidiruvni tozalash",
        backButtonTitle: "Qidiruvni yopish",
        noResultsText: "Natija topilmadi",
        footer: {
          selectText: "tanlash uchun",
          selectKeyAriaLabel: "kirish",
          navigateText: "navigatsiya qilish uchun",
          navigateUpKeyAriaLabel: "yuqoriga",
          navigateDownKeyAriaLabel: "pastga",
          closeText: "yopish uchun",
          closeKeyAriaLabel: "chiqish"
        }
      }
    }
  },
  themeConfig: {
    lastUpdated: {
      text: "Oxirgi yangilanish",
      formatOptions: {
        dateStyle: "long",
        timeStyle: "short",
        forceLocale: true
      }
    },
    outline: {
      level: "deep",
      label: "Ushbu sahifada"
    },
    docFooter: {
      prev: "Oldingi sahifa",
      next: "Keyingi sahifa"
    },
    darkModeSwitchLabel: "Ko'rinish",
    lightModeSwitchTitle: "Yorug' rejimga o'tish",
    darkModeSwitchTitle: "Qorong'u rejimga o'tish",
    sidebarMenuLabel: "Menyu",
    returnToTopLabel: "Yuqoriga qaytish",
    langMenuLabel: "Tilni o'zgartirish",
    skipToContentLabel: "Asosiy kontentga o'tish",
    editLink: {
      pattern: "https://github.com/otabekoff/design-patterns/edit/main/src/:path",
      text: "Ushbu sahifani GitHubda tahrirlash"
    },
    nav: [
      { text: "Bosh sahifa", link: "/uz/" },
      { text: "Tezkor ma'lumotnoma", link: "/uz/quick-reference" },
      {
        text: "Ko'proq",
        items: [
          { text: "Boshqa loyihalar", link: "https://github.com/otabekoff" },
          { text: "Qo'llab-quvvatlash", link: "https://tirikchilik.uz/uzhandy" }
        ]
      }
    ],
    sidebar: [
      {
        text: "Boshlash",
        collapsed: false,
        items: [
          { text: "Kirish", link: "/uz/introduction" },
          { text: "Sayohat", link: "/uz/tour" },
          { text: "Tezkor ma'lumotnoma", link: "/uz/quick-reference" }
        ]
      },
      {
        text: "Arxitektura Naqshlari",
        collapsed: false,
        items: [
          { text: "Active Record", link: "/uz/architectural/active-record" },
          { text: "CQRS", link: "/uz/architectural/cqrs" },
          { text: "Data Mapper", link: "/uz/architectural/data-mapper" },
          { text: "Dependency Injection", link: "/uz/architectural/dependency-injection" },
          { text: "Event Sourcing", link: "/uz/architectural/event-sourcing" },
          { text: "MVC", link: "/uz/architectural/mvc" },
          { text: "MVP", link: "/uz/architectural/mvp" },
          { text: "MVVM", link: "/uz/architectural/mvvm" },
          { text: "Producer Consumer", link: "/uz/architectural/producer-consumer" },
          { text: "Read Write Lock", link: "/uz/architectural/read-write-lock" },
          { text: "Repository", link: "/uz/architectural/repository" },
          { text: "Scheduler", link: "/uz/architectural/scheduler" },
          { text: "Service Locator", link: "/uz/architectural/service-locator" }
        ]
      },
      {
        text: "Behavioral Patterns",
        collapsed: false,
        items: [
          { text: "Chain of Responsibility", link: "/uz/behavioral/chain-of-responsibility" },
          { text: "Command", link: "/uz/behavioral/command" },
          { text: "Interpreter", link: "/uz/behavioral/interpreter" },
          { text: "Iterator", link: "/uz/behavioral/iterator" },
          { text: "Mediator", link: "/uz/behavioral/mediator" },
          { text: "Memento", link: "/uz/behavioral/memento" },
          { text: "Null Object", link: "/uz/behavioral/null-object" },
          { text: "Observer", link: "/uz/behavioral/observer" },
          { text: "State", link: "/uz/behavioral/state" },
          { text: "Strategy", link: "/uz/behavioral/strategy" },
          { text: "Template Method", link: "/uz/behavioral/template-method" },
          { text: "Visitor", link: "/uz/behavioral/visitor" }
        ]
      },
      {
        text: "Creational Patterns",
        collapsed: false,
        items: [
          { text: "Singleton", link: "/uz/creational/singleton" },
          { text: "Factory Method", link: "/uz/creational/factory-method" },
          { text: "Abstract Factory", link: "/uz/creational/abstract-factory" },
          { text: "Builder", link: "/uz/creational/builder" },
          { text: "Prototype", link: "/uz/creational/prototype" },
          { text: "Object Pool", link: "/uz/creational/object-pool" }
        ]
      },
      {
        text: "Structural Patterns",
        collapsed: false,
        items: [
          { text: "Adapter", link: "/uz/structural/adapter" },
          { text: "Bridge", link: "/uz/structural/bridge" },
          { text: "Composite", link: "/uz/structural/composite" },
          { text: "Decorator", link: "/uz/structural/decorator" },
          { text: "Facade", link: "/uz/structural/facade" },
          { text: "Flyweight", link: "/uz/structural/flyweight" },
          { text: "Proxy", link: "/uz/structural/proxy" }
        ]
      }
    ],
    footer: {
      message: '<a href="https://github.com/otabekoff/design-patterns/blob/main/LICENSE">MIT Litsenziyasi</a> ostida tarqatilgan.',
      copyright: 'Mualliflik huquqi \xA9 2025-hozirga qadar <a href="https://github.com/otabekoff">Otabek Sadiridinov</a>'
    }
  }
};

// .vitepress/config/langs/ru.ts
var ru = {
  title: "\u041F\u0430\u0442\u0442\u0435\u0440\u043D\u044B \u043F\u0440\u043E\u0435\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F",
  description: "\u041F\u043E\u043B\u043D\u043E\u0435 \u0440\u0443\u043A\u043E\u0432\u043E\u0434\u0441\u0442\u0432\u043E",
  label: "\u0420\u0443\u0441\u0441\u043A\u0438\u0439",
  lang: "ru",
  link: "/ru/",
  search: {
    translations: {
      button: { buttonText: "\u041F\u043E\u0438\u0441\u043A", buttonAriaLabel: "\u041F\u043E\u0438\u0441\u043A" },
      modal: {
        displayDetails: "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u043F\u043E\u0434\u0440\u043E\u0431\u043D\u044B\u0439 \u0441\u043F\u0438\u0441\u043E\u043A",
        resetButtonTitle: "\u0421\u0431\u0440\u043E\u0441\u0438\u0442\u044C \u043F\u043E\u0438\u0441\u043A",
        backButtonTitle: "\u0417\u0430\u043A\u0440\u044B\u0442\u044C \u043F\u043E\u0438\u0441\u043A",
        noResultsText: "\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u043E\u0432 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E",
        footer: {
          selectText: "\u0432\u044B\u0431\u0440\u0430\u0442\u044C",
          selectKeyAriaLabel: "\u0432\u0432\u043E\u0434",
          navigateText: "\u043D\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u044F",
          navigateUpKeyAriaLabel: "\u0441\u0442\u0440\u0435\u043B\u043A\u0430 \u0432\u0432\u0435\u0440\u0445",
          navigateDownKeyAriaLabel: "\u0441\u0442\u0440\u0435\u043B\u043A\u0430 \u0432\u043D\u0438\u0437",
          closeText: "\u0437\u0430\u043A\u0440\u044B\u0442\u044C",
          closeKeyAriaLabel: "escape"
        }
      }
    }
  },
  themeConfig: {
    lastUpdated: {
      text: "\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u0435\u0435 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435",
      formatOptions: {
        dateStyle: "long",
        timeStyle: "short",
        forceLocale: true
      }
    },
    outline: {
      level: "deep",
      label: "\u041D\u0430 \u044D\u0442\u043E\u0439 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0435"
    },
    docFooter: {
      prev: "\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0430\u044F \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430",
      next: "\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0430\u044F \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430"
    },
    darkModeSwitchLabel: "\u041E\u0444\u043E\u0440\u043C\u043B\u0435\u043D\u0438\u0435",
    lightModeSwitchTitle: "\u041F\u0435\u0440\u0435\u043A\u043B\u044E\u0447\u0438\u0442\u044C\u0441\u044F \u043D\u0430 \u0441\u0432\u0435\u0442\u043B\u0443\u044E \u0442\u0435\u043C\u0443",
    darkModeSwitchTitle: "\u041F\u0435\u0440\u0435\u043A\u043B\u044E\u0447\u0438\u0442\u044C\u0441\u044F \u043D\u0430 \u0442\u0435\u043C\u043D\u0443\u044E \u0442\u0435\u043C\u0443",
    sidebarMenuLabel: "\u041C\u0435\u043D\u044E",
    returnToTopLabel: "\u0412\u0435\u0440\u043D\u0443\u0442\u044C\u0441\u044F \u043A \u043D\u0430\u0447\u0430\u043B\u0443",
    langMenuLabel: "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u044F\u0437\u044B\u043A",
    skipToContentLabel: "\u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u043A \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u043D\u0438\u044E",
    editLink: {
      pattern: "https://github.com/otabekoff/design-patterns/edit/main/:path",
      text: "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u044D\u0442\u0443 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u043D\u0430 GitHub"
    },
    nav: [
      { text: "\u0413\u043B\u0430\u0432\u043D\u0430\u044F", link: "/ru/" },
      { text: "\u041A\u0440\u0430\u0442\u043A\u0438\u0439 \u0441\u043F\u0440\u0430\u0432\u043E\u0447\u043D\u0438\u043A", link: "/ru/quick-reference" },
      {
        text: "\u0415\u0449\u0451",
        items: [
          { text: "\u0414\u0440\u0443\u0433\u0438\u0435 \u043F\u0440\u043E\u0435\u043A\u0442\u044B", link: "https://github.com/otabekoff" },
          { text: "\u041F\u043E\u0434\u0434\u0435\u0440\u0436\u0430\u0442\u044C \u043D\u0430\u0441", link: "https://tirikchilik.uz/uzhandy" }
        ]
      }
    ],
    sidebar: [
      {
        text: "\u041D\u0430\u0447\u0430\u043B\u043E \u0440\u0430\u0431\u043E\u0442\u044B",
        collapsed: false,
        items: [
          { text: "\u0412\u0432\u0435\u0434\u0435\u043D\u0438\u0435", link: "/ru/introduction" },
          { text: "\u0422\u0443\u0440", link: "/ru/tour" },
          { text: "\u041A\u0440\u0430\u0442\u043A\u0438\u0439 \u0441\u043F\u0440\u0430\u0432\u043E\u0447\u043D\u0438\u043A", link: "/ru/quick-reference" }
        ]
      },
      {
        text: "\u0410\u0440\u0445\u0438\u0442\u0435\u043A\u0442\u0443\u0440\u043D\u044B\u0435 \u043F\u0430\u0442\u0442\u0435\u0440\u043D\u044B",
        collapsed: false,
        items: [
          { text: "Active Record", link: "/ru/architectural/active-record" },
          { text: "CQRS", link: "/ru/architectural/cqrs" },
          { text: "Data Mapper", link: "/ru/architectural/data-mapper" },
          { text: "Dependency Injection", link: "/ru/architectural/dependency-injection" },
          { text: "Event Sourcing", link: "/ru/architectural/event-sourcing" },
          { text: "MVC", link: "/ru/architectural/mvc" },
          { text: "MVP", link: "/ru/architectural/mvp" },
          { text: "MVVM", link: "/ru/architectural/mvvm" },
          { text: "Producer Consumer", link: "/ru/architectural/producer-consumer" },
          { text: "Read Write Lock", link: "/ru/architectural/read-write-lock" },
          { text: "Repository", link: "/ru/architectural/repository" },
          { text: "Scheduler", link: "/ru/architectural/scheduler" },
          { text: "Service Locator", link: "/ru/architectural/service-locator" }
        ]
      },
      {
        text: "\u041F\u043E\u0432\u0435\u0434\u0435\u043D\u0447\u0435\u0441\u043A\u0438\u0435 \u043F\u0430\u0442\u0442\u0435\u0440\u043D\u044B",
        collapsed: false,
        items: [
          { text: "Chain of Responsibility", link: "/ru/behavioral/chain-of-responsibility" },
          { text: "Command", link: "/ru/behavioral/command" },
          { text: "Interpreter", link: "/ru/behavioral/interpreter" },
          { text: "Iterator", link: "/ru/behavioral/iterator" },
          { text: "Mediator", link: "/ru/behavioral/mediator" },
          { text: "Memento", link: "/ru/behavioral/memento" },
          { text: "Null Object", link: "/ru/behavioral/null-object" },
          { text: "Observer", link: "/ru/behavioral/observer" },
          { text: "State", link: "/ru/behavioral/state" },
          { text: "Strategy", link: "/ru/behavioral/strategy" },
          { text: "Template Method", link: "/ru/behavioral/template-method" },
          { text: "Visitor", link: "/ru/behavioral/visitor" }
        ]
      },
      {
        text: "\u041F\u043E\u0440\u043E\u0436\u0434\u0430\u044E\u0449\u0438\u0435 \u043F\u0430\u0442\u0442\u0435\u0440\u043D\u044B",
        collapsed: false,
        items: [
          { text: "Singleton", link: "/ru/creational/singleton" },
          { text: "Factory Method", link: "/ru/creational/factory-method" },
          { text: "Abstract Factory", link: "/ru/creational/abstract-factory" },
          { text: "Builder", link: "/ru/creational/builder" },
          { text: "Prototype", link: "/ru/creational/prototype" },
          { text: "Object Pool", link: "/ru/creational/object-pool" }
        ]
      },
      {
        text: "\u0421\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u043D\u044B\u0435 \u043F\u0430\u0442\u0442\u0435\u0440\u043D\u044B",
        collapsed: false,
        items: [
          { text: "Adapter", link: "/ru/structural/adapter" },
          { text: "Bridge", link: "/ru/structural/bridge" },
          { text: "Composite", link: "/ru/structural/composite" },
          { text: "Decorator", link: "/ru/structural/decorator" },
          { text: "Facade", link: "/ru/structural/facade" },
          { text: "Flyweight", link: "/ru/structural/flyweight" },
          { text: "Proxy", link: "/ru/structural/proxy" }
        ]
      }
    ],
    footer: {
      message: '\u0420\u0430\u0441\u043F\u0440\u043E\u0441\u0442\u0440\u0430\u043D\u044F\u0435\u0442\u0441\u044F \u043F\u043E\u0434 <a href="https://github.com/otabekoff/design-patterns/blob/main/LICENSE">\u043B\u0438\u0446\u0435\u043D\u0437\u0438\u0435\u0439 MIT</a>.',
      copyright: '\u0410\u0432\u0442\u043E\u0440\u0441\u043A\u043E\u0435 \u043F\u0440\u0430\u0432\u043E \xA9 2025-\u043D\u0430\u0441\u0442\u043E\u044F\u0449\u0435\u0435 \u0432\u0440\u0435\u043C\u044F <a href="https://github.com/otabekoff">\u041E\u0442\u0430\u0431\u0435\u043A \u0421\u0430\u0434\u0438\u0440\u0438\u0434\u0434\u0438\u043D\u043E\u0432</a>'
    }
  }
};

// .vitepress/config/langs/tr.ts
var tr = {
  title: "Tasar\u0131m Kal\u0131plar\u0131",
  description: "Tam Referans K\u0131lavuzu",
  label: "T\xFCrk\xE7e",
  lang: "tr",
  link: "/tr/",
  search: {
    translations: {
      button: { buttonText: "Ara", buttonAriaLabel: "Ara" },
      modal: {
        displayDetails: "Detayl\u0131 listeyi g\xF6ster",
        resetButtonTitle: "Aramay\u0131 s\u0131f\u0131rla",
        backButtonTitle: "Aramay\u0131 kapat",
        noResultsText: "Sonu\xE7 bulunamad\u0131",
        footer: {
          selectText: "se\xE7mek i\xE7in",
          selectKeyAriaLabel: "giri\u015F",
          navigateText: "gezinmek i\xE7in",
          navigateUpKeyAriaLabel: "yukar\u0131 ok",
          navigateDownKeyAriaLabel: "a\u015Fa\u011F\u0131 ok",
          closeText: "kapatmak i\xE7in",
          closeKeyAriaLabel: "ka\xE7\u0131\u015F"
        }
      }
    }
  },
  themeConfig: {
    lastUpdated: {
      text: "Son g\xFCncelleme",
      formatOptions: {
        dateStyle: "long",
        timeStyle: "short",
        forceLocale: true
      }
    },
    outline: {
      level: "deep",
      label: "Bu sayfada"
    },
    docFooter: {
      prev: "\xD6nceki sayfa",
      next: "Sonraki sayfa"
    },
    darkModeSwitchLabel: "G\xF6r\xFCn\xFCm",
    lightModeSwitchTitle: "A\xE7\u0131k temaya ge\xE7",
    darkModeSwitchTitle: "Koyu temaya ge\xE7",
    sidebarMenuLabel: "Men\xFC",
    returnToTopLabel: "Yukar\u0131 d\xF6n",
    langMenuLabel: "Dili de\u011Fi\u015Ftir",
    skipToContentLabel: "\u0130\xE7eri\u011Fe atla",
    editLink: {
      pattern: "https://github.com/otabekoff/design-patterns/edit/main/:path",
      text: "Bu sayfay\u0131 GitHub'da d\xFCzenleyin"
    },
    nav: [
      { text: "Ana Sayfa", link: "/tr/" },
      { text: "H\u0131zl\u0131 Ba\u015Fvuru", link: "/tr/quick-reference" },
      {
        text: "Daha fazla",
        items: [
          { text: "Di\u011Fer projeler", link: "https://github.com/otabekoff" },
          { text: "Bizi Destekleyin", link: "https://tirikchilik.uz/uzhandy" }
        ]
      }
    ],
    sidebar: [
      {
        text: "Ba\u015Flarken",
        collapsed: false,
        items: [
          { text: "Giri\u015F", link: "/tr/introduction" },
          { text: "Tur", link: "/tr/tour" },
          { text: "H\u0131zl\u0131 Ba\u015Fvuru", link: "/tr/quick-reference" }
        ]
      },
      {
        text: "Mimari Kal\u0131plar",
        collapsed: false,
        items: [
          { text: "Active Record", link: "/tr/architectural/active-record" },
          { text: "CQRS", link: "/tr/architectural/cqrs" },
          { text: "Data Mapper", link: "/tr/architectural/data-mapper" },
          { text: "Dependency Injection", link: "/tr/architectural/dependency-injection" },
          { text: "Event Sourcing", link: "/tr/architectural/event-sourcing" },
          { text: "MVC", link: "/tr/architectural/mvc" },
          { text: "MVP", link: "/tr/architectural/mvp" },
          { text: "MVVM", link: "/tr/architectural/mvvm" },
          { text: "Producer Consumer", link: "/tr/architectural/producer-consumer" },
          { text: "Read Write Lock", link: "/tr/architectural/read-write-lock" },
          { text: "Repository", link: "/tr/architectural/repository" },
          { text: "Scheduler", link: "/tr/architectural/scheduler" },
          { text: "Service Locator", link: "/tr/architectural/service-locator" }
        ]
      },
      {
        text: "Davran\u0131\u015Fsal Kal\u0131plar",
        collapsed: false,
        items: [
          { text: "Chain of Responsibility", link: "/tr/behavioral/chain-of-responsibility" },
          { text: "Command", link: "/tr/behavioral/command" },
          { text: "Interpreter", link: "/tr/behavioral/interpreter" },
          { text: "Iterator", link: "/tr/behavioral/iterator" },
          { text: "Mediator", link: "/tr/behavioral/mediator" },
          { text: "Memento", link: "/tr/behavioral/memento" },
          { text: "Null Object", link: "/tr/behavioral/null-object" },
          { text: "Observer", link: "/tr/behavioral/observer" },
          { text: "State", link: "/tr/behavioral/state" },
          { text: "Strategy", link: "/tr/behavioral/strategy" },
          { text: "Template Method", link: "/tr/behavioral/template-method" },
          { text: "Visitor", link: "/tr/behavioral/visitor" }
        ]
      },
      {
        text: "Yarat\u0131msal Kal\u0131plar",
        collapsed: false,
        items: [
          { text: "Singleton", link: "/tr/creational/singleton" },
          { text: "Factory Method", link: "/tr/creational/factory-method" },
          { text: "Abstract Factory", link: "/tr/creational/abstract-factory" },
          { text: "Builder", link: "/tr/creational/builder" },
          { text: "Prototype", link: "/tr/creational/prototype" },
          { text: "Object Pool", link: "/tr/creational/object-pool" }
        ]
      },
      {
        text: "Yap\u0131sal Kal\u0131plar",
        collapsed: false,
        items: [
          { text: "Adapter", link: "/tr/structural/adapter" },
          { text: "Bridge", link: "/tr/structural/bridge" },
          { text: "Composite", link: "/tr/structural/composite" },
          { text: "Decorator", link: "/tr/structural/decorator" },
          { text: "Facade", link: "/tr/structural/facade" },
          { text: "Flyweight", link: "/tr/structural/flyweight" },
          { text: "Proxy", link: "/tr/structural/proxy" }
        ]
      }
    ],
    footer: {
      message: '<a href="https://github.com/otabekoff/design-patterns/blob/main/LICENSE">MIT Lisans\u0131</a> alt\u0131nda yay\u0131nlanm\u0131\u015Ft\u0131r.',
      copyright: 'Telif Hakk\u0131 \xA9 2025-g\xFCn\xFCm\xFCz <a href="https://github.com/otabekoff">Otabek Sadiridinov</a>'
    }
  }
};

// .vitepress/config/langs/de.ts
var de = {
  title: "Entwurfsmuster",
  description: "Vollst\xE4ndiges Referenzhandbuch",
  label: "Deutsch",
  lang: "de",
  link: "/de/",
  search: {
    translations: {
      button: { buttonText: "Suche", buttonAriaLabel: "Suche" },
      modal: {
        displayDetails: "Detaillierte Liste anzeigen",
        resetButtonTitle: "Suche zur\xFCcksetzen",
        backButtonTitle: "Suche schlie\xDFen",
        noResultsText: "Keine Ergebnisse gefunden",
        footer: {
          selectText: "ausw\xE4hlen",
          selectKeyAriaLabel: "Eingabe",
          navigateText: "navigieren",
          navigateUpKeyAriaLabel: "Pfeil nach oben",
          navigateDownKeyAriaLabel: "Pfeil nach unten",
          closeText: "schlie\xDFen",
          closeKeyAriaLabel: "Escape"
        }
      }
    }
  },
  themeConfig: {
    lastUpdated: {
      text: "Zuletzt aktualisiert",
      formatOptions: {
        dateStyle: "long",
        timeStyle: "short",
        forceLocale: true
      }
    },
    outline: {
      level: "deep",
      label: "Auf dieser Seite"
    },
    docFooter: {
      prev: "Vorherige Seite",
      next: "N\xE4chste Seite"
    },
    darkModeSwitchLabel: "Erscheinungsbild",
    lightModeSwitchTitle: "Zum hellen Design wechseln",
    darkModeSwitchTitle: "Zum dunklen Design wechseln",
    sidebarMenuLabel: "Men\xFC",
    returnToTopLabel: "Zur\xFCck zum Seitenanfang",
    langMenuLabel: "Sprache \xE4ndern",
    skipToContentLabel: "Zum Inhalt springen",
    editLink: {
      pattern: "https://github.com/otabekoff/design-patterns/edit/main/:path",
      text: "Diese Seite auf GitHub bearbeiten"
    },
    nav: [
      { text: "Startseite", link: "/de/" },
      { text: "Kurzreferenz", link: "/de/quick-reference" },
      {
        text: "Mehr",
        items: [
          { text: "Andere Projekte", link: "https://github.com/otabekoff" },
          { text: "Unterst\xFCtzen Sie uns", link: "https://tirikchilik.uz/uzhandy" }
        ]
      }
    ],
    sidebar: [
      {
        text: "Erste Schritte",
        collapsed: false,
        items: [
          { text: "Einf\xFChrung", link: "/de/introduction" },
          { text: "Tour", link: "/de/tour" },
          { text: "Kurzreferenz", link: "/de/quick-reference" }
        ]
      },
      {
        text: "Architekturmuster",
        collapsed: false,
        items: [
          { text: "Active Record", link: "/de/architectural/active-record" },
          { text: "CQRS", link: "/de/architectural/cqrs" },
          { text: "Data Mapper", link: "/de/architectural/data-mapper" },
          { text: "Dependency Injection", link: "/de/architectural/dependency-injection" },
          { text: "Event Sourcing", link: "/de/architectural/event-sourcing" },
          { text: "MVC", link: "/de/architectural/mvc" },
          { text: "MVP", link: "/de/architectural/mvp" },
          { text: "MVVM", link: "/de/architectural/mvvm" },
          { text: "Producer Consumer", link: "/de/architectural/producer-consumer" },
          { text: "Read Write Lock", link: "/de/architectural/read-write-lock" },
          { text: "Repository", link: "/de/architectural/repository" },
          { text: "Scheduler", link: "/de/architectural/scheduler" },
          { text: "Service Locator", link: "/de/architectural/service-locator" }
        ]
      },
      {
        text: "Verhaltensmuster",
        collapsed: false,
        items: [
          { text: "Chain of Responsibility", link: "/de/behavioral/chain-of-responsibility" },
          { text: "Command", link: "/de/behavioral/command" },
          { text: "Interpreter", link: "/de/behavioral/interpreter" },
          { text: "Iterator", link: "/de/behavioral/iterator" },
          { text: "Mediator", link: "/de/behavioral/mediator" },
          { text: "Memento", link: "/de/behavioral/memento" },
          { text: "Null Object", link: "/de/behavioral/null-object" },
          { text: "Observer", link: "/de/behavioral/observer" },
          { text: "State", link: "/de/behavioral/state" },
          { text: "Strategy", link: "/de/behavioral/strategy" },
          { text: "Template Method", link: "/de/behavioral/template-method" },
          { text: "Visitor", link: "/de/behavioral/visitor" }
        ]
      },
      {
        text: "Erzeugungsmuster",
        collapsed: false,
        items: [
          { text: "Singleton", link: "/de/creational/singleton" },
          { text: "Factory Method", link: "/de/creational/factory-method" },
          { text: "Abstract Factory", link: "/de/creational/abstract-factory" },
          { text: "Builder", link: "/de/creational/builder" },
          { text: "Prototype", link: "/de/creational/prototype" },
          { text: "Object Pool", link: "/de/creational/object-pool" }
        ]
      },
      {
        text: "Strukturmuster",
        collapsed: false,
        items: [
          { text: "Adapter", link: "/de/structural/adapter" },
          { text: "Bridge", link: "/de/structural/bridge" },
          { text: "Composite", link: "/de/structural/composite" },
          { text: "Decorator", link: "/de/structural/decorator" },
          { text: "Facade", link: "/de/structural/facade" },
          { text: "Flyweight", link: "/de/structural/flyweight" },
          { text: "Proxy", link: "/de/structural/proxy" }
        ]
      }
    ],
    footer: {
      message: 'Ver\xF6ffentlicht unter der <a href="https://github.com/otabekoff/design-patterns/blob/main/LICENSE">MIT-Lizenz</a>.',
      copyright: 'Urheberrecht \xA9 2025-heute <a href="https://github.com/otabekoff">Otabek Sadiridinov</a>'
    }
  }
};

// .vitepress/config/langs/es.ts
var es = {
  title: "Patrones de Dise\xF1o",
  description: "Gu\xEDa de Referencia Completa",
  label: "Espa\xF1ol",
  lang: "es",
  link: "/es/",
  search: {
    translations: {
      button: { buttonText: "Buscar", buttonAriaLabel: "Buscar" },
      modal: {
        displayDetails: "Mostrar lista detallada",
        resetButtonTitle: "Restablecer b\xFAsqueda",
        backButtonTitle: "Cerrar b\xFAsqueda",
        noResultsText: "No se encontraron resultados",
        footer: {
          selectText: "para seleccionar",
          selectKeyAriaLabel: "entrada",
          navigateText: "para navegar",
          navigateUpKeyAriaLabel: "flecha arriba",
          navigateDownKeyAriaLabel: "flecha abajo",
          closeText: "para cerrar",
          closeKeyAriaLabel: "escape"
        }
      }
    }
  },
  themeConfig: {
    lastUpdated: {
      text: "\xDAltima actualizaci\xF3n",
      formatOptions: {
        dateStyle: "long",
        timeStyle: "short",
        forceLocale: true
      }
    },
    outline: {
      level: "deep",
      label: "En esta p\xE1gina"
    },
    docFooter: {
      prev: "P\xE1gina anterior",
      next: "P\xE1gina siguiente"
    },
    darkModeSwitchLabel: "Apariencia",
    lightModeSwitchTitle: "Cambiar al tema claro",
    darkModeSwitchTitle: "Cambiar al tema oscuro",
    sidebarMenuLabel: "Men\xFA",
    returnToTopLabel: "Volver arriba",
    langMenuLabel: "Cambiar idioma",
    skipToContentLabel: "Saltar al contenido",
    editLink: {
      pattern: "https://github.com/otabekoff/design-patterns/edit/main/:path",
      text: "Editar esta p\xE1gina en GitHub"
    },
    nav: [
      { text: "Inicio", link: "/es/" },
      { text: "Referencia R\xE1pida", link: "/es/quick-reference" },
      {
        text: "M\xE1s",
        items: [
          { text: "Otros proyectos", link: "https://github.com/otabekoff" },
          { text: "Ap\xF3yanos", link: "https://tirikchilik.uz/uzhandy" }
        ]
      }
    ],
    sidebar: [
      {
        text: "Empezando",
        collapsed: false,
        items: [
          { text: "Introducci\xF3n", link: "/es/introduction" },
          { text: "Tour", link: "/es/tour" },
          { text: "Referencia R\xE1pida", link: "/es/quick-reference" }
        ]
      },
      {
        text: "Patrones Arquitect\xF3nicos",
        collapsed: false,
        items: [
          { text: "Active Record", link: "/es/architectural/active-record" },
          { text: "CQRS", link: "/es/architectural/cqrs" },
          { text: "Data Mapper", link: "/es/architectural/data-mapper" },
          { text: "Dependency Injection", link: "/es/architectural/dependency-injection" },
          { text: "Event Sourcing", link: "/es/architectural/event-sourcing" },
          { text: "MVC", link: "/es/architectural/mvc" },
          { text: "MVP", link: "/es/architectural/mvp" },
          { text: "MVVM", link: "/es/architectural/mvvm" },
          { text: "Producer Consumer", link: "/es/architectural/producer-consumer" },
          { text: "Read Write Lock", link: "/es/architectural/read-write-lock" },
          { text: "Repository", link: "/es/architectural/repository" },
          { text: "Scheduler", link: "/es/architectural/scheduler" },
          { text: "Service Locator", link: "/es/architectural/service-locator" }
        ]
      },
      {
        text: "Patrones de Comportamiento",
        collapsed: false,
        items: [
          { text: "Chain of Responsibility", link: "/es/behavioral/chain-of-responsibility" },
          { text: "Command", link: "/es/behavioral/command" },
          { text: "Interpreter", link: "/es/behavioral/interpreter" },
          { text: "Iterator", link: "/es/behavioral/iterator" },
          { text: "Mediator", link: "/es/behavioral/mediator" },
          { text: "Memento", link: "/es/behavioral/memento" },
          { text: "Null Object", link: "/es/behavioral/null-object" },
          { text: "Observer", link: "/es/behavioral/observer" },
          { text: "State", link: "/es/behavioral/state" },
          { text: "Strategy", link: "/es/behavioral/strategy" },
          { text: "Template Method", link: "/es/behavioral/template-method" },
          { text: "Visitor", link: "/es/behavioral/visitor" }
        ]
      },
      {
        text: "Patrones Creacionales",
        collapsed: false,
        items: [
          { text: "Singleton", link: "/es/creational/singleton" },
          { text: "Factory Method", link: "/es/creational/factory-method" },
          { text: "Abstract Factory", link: "/es/creational/abstract-factory" },
          { text: "Builder", link: "/es/creational/builder" },
          { text: "Prototype", link: "/es/creational/prototype" },
          { text: "Object Pool", link: "/es/creational/object-pool" }
        ]
      },
      {
        text: "Patrones Estructurales",
        collapsed: false,
        items: [
          { text: "Adapter", link: "/es/structural/adapter" },
          { text: "Bridge", link: "/es/structural/bridge" },
          { text: "Composite", link: "/es/structural/composite" },
          { text: "Decorator", link: "/es/structural/decorator" },
          { text: "Facade", link: "/es/structural/facade" },
          { text: "Flyweight", link: "/es/structural/flyweight" },
          { text: "Proxy", link: "/es/structural/proxy" }
        ]
      }
    ],
    footer: {
      message: 'Publicado bajo la <a href="https://github.com/otabekoff/design-patterns/blob/main/LICENSE">Licencia MIT</a>.',
      copyright: 'Derechos de autor \xA9 2025-presente <a href="https://github.com/otabekoff">Otabek Sadiridinov</a>'
    }
  }
};

// .vitepress/config/langs/ar.ts
var ar = {
  title: "\u0623\u0646\u0645\u0627\u0637 \u0627\u0644\u062A\u0635\u0645\u064A\u0645",
  description: "\u0627\u0644\u062F\u0644\u064A\u0644 \u0627\u0644\u0645\u0631\u062C\u0639\u064A \u0627\u0644\u0634\u0627\u0645\u0644",
  label: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629",
  lang: "ar",
  link: "/ar/",
  dir: "rtl",
  search: {
    translations: {
      button: { buttonText: "\u0628\u062D\u062B", buttonAriaLabel: "\u0628\u062D\u062B" },
      modal: {
        displayDetails: "\u0639\u0631\u0636 \u0642\u0627\u0626\u0645\u0629 \u0645\u0641\u0635\u0644\u0629",
        resetButtonTitle: "\u0625\u0639\u0627\u062F\u0629 \u0636\u0628\u0637 \u0627\u0644\u0628\u062D\u062B",
        backButtonTitle: "\u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0628\u062D\u062B",
        noResultsText: "\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0646\u062A\u0627\u0626\u062C",
        footer: {
          selectText: "\u0644\u0644\u0627\u062E\u062A\u064A\u0627\u0631",
          selectKeyAriaLabel: "\u0625\u062F\u062E\u0627\u0644",
          navigateText: "\u0644\u0644\u062A\u0646\u0642\u0644",
          navigateUpKeyAriaLabel: "\u0627\u0644\u0633\u0647\u0645 \u0644\u0623\u0639\u0644\u0649",
          navigateDownKeyAriaLabel: "\u0627\u0644\u0633\u0647\u0645 \u0644\u0623\u0633\u0641\u0644",
          closeText: "\u0644\u0644\u0625\u063A\u0644\u0627\u0642",
          closeKeyAriaLabel: "\u0625\u063A\u0644\u0627\u0642"
        }
      }
    }
  },
  themeConfig: {
    lastUpdated: {
      text: "\u0622\u062E\u0631 \u062A\u062D\u062F\u064A\u062B",
      formatOptions: {
        dateStyle: "long",
        timeStyle: "short",
        forceLocale: true
      }
    },
    outline: {
      level: "deep",
      label: "\u0641\u064A \u0647\u0630\u0647 \u0627\u0644\u0635\u0641\u062D\u0629"
    },
    docFooter: {
      prev: "\u0627\u0644\u0635\u0641\u062D\u0629 \u0627\u0644\u0633\u0627\u0628\u0642\u0629",
      next: "\u0627\u0644\u0635\u0641\u062D\u0629 \u0627\u0644\u062A\u0627\u0644\u064A\u0629"
    },
    darkModeSwitchLabel: "\u0627\u0644\u0645\u0638\u0647\u0631",
    lightModeSwitchTitle: "\u0627\u0644\u062A\u0628\u062F\u064A\u0644 \u0625\u0644\u0649 \u0627\u0644\u0645\u0638\u0647\u0631 \u0627\u0644\u0641\u0627\u062A\u062D",
    darkModeSwitchTitle: "\u0627\u0644\u062A\u0628\u062F\u064A\u0644 \u0625\u0644\u0649 \u0627\u0644\u0645\u0638\u0647\u0631 \u0627\u0644\u062F\u0627\u0643\u0646",
    sidebarMenuLabel: "\u0627\u0644\u0642\u0627\u0626\u0645\u0629",
    returnToTopLabel: "\u0627\u0644\u0639\u0648\u062F\u0629 \u0625\u0644\u0649 \u0627\u0644\u0623\u0639\u0644\u0649",
    langMenuLabel: "\u062A\u063A\u064A\u064A\u0631 \u0627\u0644\u0644\u063A\u0629",
    skipToContentLabel: "\u062A\u062E\u0637\u064A \u0625\u0644\u0649 \u0627\u0644\u0645\u062D\u062A\u0648\u0649",
    editLink: {
      pattern: "https://github.com/otabekoff/design-patterns/edit/main/:path",
      text: "\u062A\u0639\u062F\u064A\u0644 \u0647\u0630\u0647 \u0627\u0644\u0635\u0641\u062D\u0629 \u0639\u0644\u0649 GitHub"
    },
    nav: [
      { text: "\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629", link: "/ar/" },
      { text: "\u0645\u0631\u062C\u0639 \u0633\u0631\u064A\u0639", link: "/ar/quick-reference" },
      {
        text: "\u0627\u0644\u0645\u0632\u064A\u062F",
        items: [
          { text: "\u0645\u0634\u0627\u0631\u064A\u0639 \u0623\u062E\u0631\u0649", link: "https://github.com/otabekoff" },
          { text: "\u0627\u062F\u0639\u0645\u0646\u0627", link: "https://tirikchilik.uz/uzhandy" }
        ]
      }
    ],
    sidebar: [
      {
        text: "\u0627\u0644\u0628\u062F\u0621",
        collapsed: false,
        items: [
          { text: "\u0645\u0642\u062F\u0645\u0629", link: "/ar/introduction" },
          { text: "\u062C\u0648\u0644\u0629", link: "/ar/tour" },
          { text: "\u0645\u0631\u062C\u0639 \u0633\u0631\u064A\u0639", link: "/ar/quick-reference" }
        ]
      },
      {
        text: "\u0627\u0644\u0623\u0646\u0645\u0627\u0637 \u0627\u0644\u0645\u0639\u0645\u0627\u0631\u064A\u0629",
        collapsed: false,
        items: [
          { text: "Active Record", link: "/ar/architectural/active-record" },
          { text: "CQRS", link: "/ar/architectural/cqrs" },
          { text: "Data Mapper", link: "/ar/architectural/data-mapper" },
          { text: "Dependency Injection", link: "/ar/architectural/dependency-injection" },
          { text: "Event Sourcing", link: "/ar/architectural/event-sourcing" },
          { text: "MVC", link: "/ar/architectural/mvc" },
          { text: "MVP", link: "/ar/architectural/mvp" },
          { text: "MVVM", link: "/ar/architectural/mvvm" },
          { text: "Producer Consumer", link: "/ar/architectural/producer-consumer" },
          { text: "Read Write Lock", link: "/ar/architectural/read-write-lock" },
          { text: "Repository", link: "/ar/architectural/repository" },
          { text: "Scheduler", link: "/ar/architectural/scheduler" },
          { text: "Service Locator", link: "/ar/architectural/service-locator" }
        ]
      },
      {
        text: "\u0627\u0644\u0623\u0646\u0645\u0627\u0637 \u0627\u0644\u0633\u0644\u0648\u0643\u064A\u0629",
        collapsed: false,
        items: [
          { text: "Chain of Responsibility", link: "/ar/behavioral/chain-of-responsibility" },
          { text: "Command", link: "/ar/behavioral/command" },
          { text: "Interpreter", link: "/ar/behavioral/interpreter" },
          { text: "Iterator", link: "/ar/behavioral/iterator" },
          { text: "Mediator", link: "/ar/behavioral/mediator" },
          { text: "Memento", link: "/ar/behavioral/memento" },
          { text: "Null Object", link: "/ar/behavioral/null-object" },
          { text: "Observer", link: "/ar/behavioral/observer" },
          { text: "State", link: "/ar/behavioral/state" },
          { text: "Strategy", link: "/ar/behavioral/strategy" },
          { text: "Template Method", link: "/ar/behavioral/template-method" },
          { text: "Visitor", link: "/ar/behavioral/visitor" }
        ]
      },
      {
        text: "\u0627\u0644\u0623\u0646\u0645\u0627\u0637 \u0627\u0644\u0625\u0646\u0634\u0627\u0626\u064A\u0629",
        collapsed: false,
        items: [
          { text: "Singleton", link: "/ar/creational/singleton" },
          { text: "Factory Method", link: "/ar/creational/factory-method" },
          { text: "Abstract Factory", link: "/ar/creational/abstract-factory" },
          { text: "Builder", link: "/ar/creational/builder" },
          { text: "Prototype", link: "/ar/creational/prototype" },
          { text: "Object Pool", link: "/ar/creational/object-pool" }
        ]
      },
      {
        text: "\u0627\u0644\u0623\u0646\u0645\u0627\u0637 \u0627\u0644\u0647\u064A\u0643\u0644\u064A\u0629",
        collapsed: false,
        items: [
          { text: "Adapter", link: "/ar/structural/adapter" },
          { text: "Bridge", link: "/ar/structural/bridge" },
          { text: "Composite", link: "/ar/structural/composite" },
          { text: "Decorator", link: "/ar/structural/decorator" },
          { text: "Facade", link: "/ar/structural/facade" },
          { text: "Flyweight", link: "/ar/structural/flyweight" },
          { text: "Proxy", link: "/ar/structural/proxy" }
        ]
      }
    ],
    footer: {
      message: '\u0635\u062F\u0631 \u062A\u062D\u062A <a href="https://github.com/otabekoff/design-patterns/blob/main/LICENSE">\u0631\u062E\u0635\u0629 MIT</a>.',
      copyright: '\u062D\u0642\u0648\u0642 \u0627\u0644\u0646\u0634\u0631 \xA9 2025-\u0627\u0644\u062D\u0627\u0636\u0631 <a href="https://github.com/otabekoff">\u0623\u0648\u062A\u0627\u0628\u064A\u0643 \u0633\u0627\u062F\u064A\u0631\u064A\u062F\u064A\u0646\u0648\u0641</a>'
    }
  }
};

// .vitepress/config/icon-injector.ts
import fs from "fs";
import path from "path";
import * as lucide from "file:///D:/vitepress/design-patterns/node_modules/lucide/dist/cjs/lucide.js";
function getSvgString(iconName) {
  const children = lucide.icons[iconName];
  if (!children) return "";
  const childTags = children.map((child) => {
    const [tag, attrs] = child;
    const attrString = Object.entries(attrs).map(([k, v]) => `${k}="${v}"`).join(" ");
    return `<${tag} ${attrString}></${tag}>`;
  }).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: inline-block; margin-right: 6px; margin-bottom: -3px; color: inherit;">${childTags}</svg>`;
}
var iconCache = {};
function getIconForLink(link) {
  if (!link) return "";
  const rootLink = link.replace(/^\/(uz|ru|tr|de|es|ar)\//, "/");
  if (iconCache[rootLink] !== void 0) {
    return iconCache[rootLink];
  }
  try {
    const filePath = path.join(process.cwd(), `${rootLink}.md`);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf8");
      const match = content.match(/^icon:\s*(.+)$/m);
      if (match) {
        const iconName = match[1].trim();
        const svg = getSvgString(iconName);
        iconCache[rootLink] = svg;
        return svg;
      }
    }
  } catch (e) {
    console.error("Error reading icon for", link, e);
  }
  iconCache[rootLink] = "";
  return "";
}
function injectSidebarIcons(sidebar) {
  return sidebar.map((section) => {
    if (section.items) {
      return {
        ...section,
        items: section.items.map((item) => {
          if (item.link) {
            const svg = getIconForLink(item.link);
            if (svg && !item.text.includes("<svg")) {
              return { ...item, text: `${svg}${item.text}` };
            }
          }
          return item;
        })
      };
    }
    return section;
  });
}

// .vitepress/config/index.ts
var __vite_injected_original_dirname = "D:\\vitepress\\design-patterns\\.vitepress\\config";
function processLocale(localeObj) {
  if (localeObj.themeConfig && localeObj.themeConfig.sidebar) {
    localeObj.themeConfig.sidebar = injectSidebarIcons(localeObj.themeConfig.sidebar);
  }
  return localeObj;
}
var config_default = defineConfig({
  srcDir: "src",
  base: "/design-patterns/",
  title: "Design Patterns",
  description: "Complete Reference Guide",
  sitemap: {
    hostname: "https://otabekoff.github.io/design-patterns/"
  },
  lastUpdated: true,
  head: [
    ["link", { rel: "icon", type: "image/png", href: "/design-patterns/favicon/favicon-96x96.png?v=20260516", sizes: "96x96" }],
    ["link", { rel: "icon", type: "image/svg+xml", href: "/design-patterns/favicon/favicon.svg?v=20260516" }],
    ["link", { rel: "shortcut icon", href: "/design-patterns/favicon/favicon.ico?v=20260516" }],
    ["link", { rel: "apple-touch-icon", sizes: "180x180", href: "/design-patterns/favicon/apple-touch-icon.png?v=20260516" }],
    ["meta", { name: "apple-mobile-web-app-title", content: "Design Patterns" }],
    ["link", { rel: "manifest", href: "/design-patterns/favicon/site.webmanifest?v=20260516" }],
    ["meta", { name: "twitter:site", content: "@otabekoff" }],
    ["meta", { name: "twitter:card", content: "summary_large_image" }],
    ["meta", { property: "og:image:width", content: "1200" }],
    ["meta", { property: "og:image:height", content: "630" }],
    ["meta", { property: "og:image:type", content: "image/png" }],
    ["meta", { property: "og:site_name", content: "Design Patterns" }],
    ["meta", { property: "og:type", content: "website" }]
  ],
  markdown: {
    config(md) {
      md.use(groupIconMdPlugin);
    }
  },
  transformPageData: async (pageData, context) => {
    const { siteConfig } = context;
    pageData.frontmatter.head ??= [];
    pageData.frontmatter.head.push(
      [
        "meta",
        {
          property: "og:title",
          content: pageData.frontmatter.title || pageData.title || siteConfig.site.title
        }
      ],
      [
        "meta",
        {
          name: "twitter:title",
          content: pageData.frontmatter.title || pageData.title || siteConfig.site.title
        }
      ],
      [
        "meta",
        {
          property: "og:description",
          content: pageData.frontmatter.description || pageData.description || siteConfig.site.description
        }
      ],
      [
        "meta",
        {
          name: "twitter:description",
          content: pageData.frontmatter.description || pageData.description || siteConfig.site.description
        }
      ],
      [
        "link",
        {
          rel: "canonical",
          href: joinURL(
            "https://otabekoff.github.io/design-patterns/",
            withoutTrailingSlash(pageData.filePath.replace(/(index)?\.md$/, ""))
          )
        }
      ],
      [
        "meta",
        {
          property: "og:url",
          content: joinURL(
            "https://otabekoff.github.io/design-patterns/",
            withoutTrailingSlash(pageData.filePath.replace(/(index)?\.md$/, ""))
          )
        }
      ]
    );
    await addOgImage(pageData, context, {
      domain: "https://otabekoff.github.io/design-patterns",
      outDir: "og",
      ogTemplate: ".vitepress/og-template.svg",
      maxTitleSizePerLine: 20
    });
  },
  locales: {
    root: processLocale(en),
    uz: processLocale(uz),
    ru: processLocale(ru),
    tr: processLocale(tr),
    de: processLocale(de),
    es: processLocale(es),
    ar: processLocale(ar)
  },
  cleanUrls: true,
  themeConfig: {
    logo: { light: "/logo-light.svg", dark: "/logo-dark.svg" },
    externalLinkIcon: true,
    i18nRouting: false,
    search: {
      provider: "local",
      options: {
        locales: {
          root: en.search || {},
          uz: uz.search || {},
          ru: ru.search || {},
          tr: tr.search || {},
          de: de.search || {},
          es: es.search || {},
          ar: ar.search || {}
        }
      }
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" }
    ]
  },
  vite: {
    publicDir: path2.resolve(__vite_injected_original_dirname, "../../public"),
    plugins: [
      groupIconVitePlugin({
        customIcon: {
          "ts": "vscode-icons:file-type-typescript-official",
          "py": "vscode-icons:file-type-python",
          "typescript": "vscode-icons:file-type-typescript-official",
          "python": "vscode-icons:file-type-python",
          "sh": "vscode-icons:file-type-shell",
          "bash": "vscode-icons:file-type-shell"
        }
      })
    ]
  }
});
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLnZpdGVwcmVzcy9jb25maWcvaW5kZXgudHMiLCAiLnZpdGVwcmVzcy9jb25maWcvbGFuZ3MvZW4udHMiLCAiLnZpdGVwcmVzcy9jb25maWcvbGFuZ3MvdXoudHMiLCAiLnZpdGVwcmVzcy9jb25maWcvbGFuZ3MvcnUudHMiLCAiLnZpdGVwcmVzcy9jb25maWcvbGFuZ3MvdHIudHMiLCAiLnZpdGVwcmVzcy9jb25maWcvbGFuZ3MvZGUudHMiLCAiLnZpdGVwcmVzcy9jb25maWcvbGFuZ3MvZXMudHMiLCAiLnZpdGVwcmVzcy9jb25maWcvbGFuZ3MvYXIudHMiLCAiLnZpdGVwcmVzcy9jb25maWcvaWNvbi1pbmplY3Rvci50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXHZpdGVwcmVzc1xcXFxkZXNpZ24tcGF0dGVybnNcXFxcLnZpdGVwcmVzc1xcXFxjb25maWdcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXHZpdGVwcmVzc1xcXFxkZXNpZ24tcGF0dGVybnNcXFxcLnZpdGVwcmVzc1xcXFxjb25maWdcXFxcaW5kZXgudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L3ZpdGVwcmVzcy9kZXNpZ24tcGF0dGVybnMvLnZpdGVwcmVzcy9jb25maWcvaW5kZXgudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlcHJlc3MnXHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXHJcbmltcG9ydCB7IGpvaW5VUkwsIHdpdGhvdXRUcmFpbGluZ1NsYXNoIH0gZnJvbSAndWZvJ1xyXG5pbXBvcnQgeyBhZGRPZ0ltYWdlIH0gZnJvbSAndml0ZXByZXNzLXBsdWdpbi1vZydcclxuaW1wb3J0IHsgZ3JvdXBJY29uTWRQbHVnaW4sIGdyb3VwSWNvblZpdGVQbHVnaW4gfSBmcm9tICd2aXRlcHJlc3MtcGx1Z2luLWdyb3VwLWljb25zJ1xyXG5pbXBvcnQgeyBlbiB9IGZyb20gJy4vbGFuZ3MvZW4nXHJcbmltcG9ydCB7IHV6IH0gZnJvbSAnLi9sYW5ncy91eidcclxuaW1wb3J0IHsgcnUgfSBmcm9tICcuL2xhbmdzL3J1J1xyXG5pbXBvcnQgeyB0ciB9IGZyb20gJy4vbGFuZ3MvdHInXHJcbmltcG9ydCB7IGRlIH0gZnJvbSAnLi9sYW5ncy9kZSdcclxuaW1wb3J0IHsgZXMgfSBmcm9tICcuL2xhbmdzL2VzJ1xyXG5pbXBvcnQgeyBhciB9IGZyb20gJy4vbGFuZ3MvYXInXHJcbmltcG9ydCB7IGluamVjdFNpZGViYXJJY29ucyB9IGZyb20gJy4vaWNvbi1pbmplY3RvcidcclxuXHJcbmZ1bmN0aW9uIHByb2Nlc3NMb2NhbGUobG9jYWxlT2JqOiBhbnkpIHtcclxuICBpZiAobG9jYWxlT2JqLnRoZW1lQ29uZmlnICYmIGxvY2FsZU9iai50aGVtZUNvbmZpZy5zaWRlYmFyKSB7XHJcbiAgICBsb2NhbGVPYmoudGhlbWVDb25maWcuc2lkZWJhciA9IGluamVjdFNpZGViYXJJY29ucyhsb2NhbGVPYmoudGhlbWVDb25maWcuc2lkZWJhcilcclxuICB9XHJcbiAgcmV0dXJuIGxvY2FsZU9ialxyXG59XHJcblxyXG4vLyBodHRwczovL3ZpdGVwcmVzcy5kZXYvcmVmZXJlbmNlL3NpdGUtY29uZmlnXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgc3JjRGlyOiAnc3JjJyxcclxuICBiYXNlOiAnL2Rlc2lnbi1wYXR0ZXJucy8nLFxyXG4gIHRpdGxlOiBcIkRlc2lnbiBQYXR0ZXJuc1wiLFxyXG4gIGRlc2NyaXB0aW9uOiBcIkNvbXBsZXRlIFJlZmVyZW5jZSBHdWlkZVwiLFxyXG4gIHNpdGVtYXA6IHtcclxuICAgIGhvc3RuYW1lOiAnaHR0cHM6Ly9vdGFiZWtvZmYuZ2l0aHViLmlvL2Rlc2lnbi1wYXR0ZXJucy8nXHJcbiAgfSxcclxuICBsYXN0VXBkYXRlZDogdHJ1ZSxcclxuICBoZWFkOiBbXHJcbiAgICBbJ2xpbmsnLCB7IHJlbDogJ2ljb24nLCB0eXBlOiAnaW1hZ2UvcG5nJywgaHJlZjogJy9kZXNpZ24tcGF0dGVybnMvZmF2aWNvbi9mYXZpY29uLTk2eDk2LnBuZz92PTIwMjYwNTE2Jywgc2l6ZXM6ICc5Nng5NicgfV0sXHJcbiAgICBbJ2xpbmsnLCB7IHJlbDogJ2ljb24nLCB0eXBlOiAnaW1hZ2Uvc3ZnK3htbCcsIGhyZWY6ICcvZGVzaWduLXBhdHRlcm5zL2Zhdmljb24vZmF2aWNvbi5zdmc/dj0yMDI2MDUxNicgfV0sXHJcbiAgICBbJ2xpbmsnLCB7IHJlbDogJ3Nob3J0Y3V0IGljb24nLCBocmVmOiAnL2Rlc2lnbi1wYXR0ZXJucy9mYXZpY29uL2Zhdmljb24uaWNvP3Y9MjAyNjA1MTYnIH1dLFxyXG4gICAgWydsaW5rJywgeyByZWw6ICdhcHBsZS10b3VjaC1pY29uJywgc2l6ZXM6ICcxODB4MTgwJywgaHJlZjogJy9kZXNpZ24tcGF0dGVybnMvZmF2aWNvbi9hcHBsZS10b3VjaC1pY29uLnBuZz92PTIwMjYwNTE2JyB9XSxcclxuICAgIFsnbWV0YScsIHsgbmFtZTogJ2FwcGxlLW1vYmlsZS13ZWItYXBwLXRpdGxlJywgY29udGVudDogJ0Rlc2lnbiBQYXR0ZXJucycgfV0sXHJcbiAgICBbJ2xpbmsnLCB7IHJlbDogJ21hbmlmZXN0JywgaHJlZjogJy9kZXNpZ24tcGF0dGVybnMvZmF2aWNvbi9zaXRlLndlYm1hbmlmZXN0P3Y9MjAyNjA1MTYnIH1dLFxyXG4gICAgWydtZXRhJywgeyBuYW1lOiAndHdpdHRlcjpzaXRlJywgY29udGVudDogJ0BvdGFiZWtvZmYnIH1dLFxyXG4gICAgWydtZXRhJywgeyBuYW1lOiAndHdpdHRlcjpjYXJkJywgY29udGVudDogJ3N1bW1hcnlfbGFyZ2VfaW1hZ2UnIH1dLFxyXG4gICAgWydtZXRhJywgeyBwcm9wZXJ0eTogJ29nOmltYWdlOndpZHRoJywgY29udGVudDogJzEyMDAnIH1dLFxyXG4gICAgWydtZXRhJywgeyBwcm9wZXJ0eTogJ29nOmltYWdlOmhlaWdodCcsIGNvbnRlbnQ6ICc2MzAnIH1dLFxyXG4gICAgWydtZXRhJywgeyBwcm9wZXJ0eTogJ29nOmltYWdlOnR5cGUnLCBjb250ZW50OiAnaW1hZ2UvcG5nJyB9XSxcclxuICAgIFsnbWV0YScsIHsgcHJvcGVydHk6ICdvZzpzaXRlX25hbWUnLCBjb250ZW50OiAnRGVzaWduIFBhdHRlcm5zJyB9XSxcclxuICAgIFsnbWV0YScsIHsgcHJvcGVydHk6ICdvZzp0eXBlJywgY29udGVudDogJ3dlYnNpdGUnIH1dXHJcbiAgXSxcclxuICBtYXJrZG93bjoge1xyXG4gICAgY29uZmlnKG1kKSB7XHJcbiAgICAgIG1kLnVzZShncm91cEljb25NZFBsdWdpbilcclxuICAgIH0sXHJcbiAgfSxcclxuICB0cmFuc2Zvcm1QYWdlRGF0YTogYXN5bmMgKHBhZ2VEYXRhLCBjb250ZXh0KSA9PiB7XHJcbiAgICBjb25zdCB7IHNpdGVDb25maWcgfSA9IGNvbnRleHRcclxuICAgIHBhZ2VEYXRhLmZyb250bWF0dGVyLmhlYWQgPz89IFtdXHJcblxyXG4gICAgcGFnZURhdGEuZnJvbnRtYXR0ZXIuaGVhZC5wdXNoKFxyXG4gICAgICBbXHJcbiAgICAgICAgJ21ldGEnLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHByb3BlcnR5OiAnb2c6dGl0bGUnLFxyXG4gICAgICAgICAgY29udGVudDogcGFnZURhdGEuZnJvbnRtYXR0ZXIudGl0bGUgfHwgcGFnZURhdGEudGl0bGUgfHwgc2l0ZUNvbmZpZy5zaXRlLnRpdGxlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIF0sXHJcbiAgICAgIFtcclxuICAgICAgICAnbWV0YScsXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgbmFtZTogJ3R3aXR0ZXI6dGl0bGUnLFxyXG4gICAgICAgICAgY29udGVudDogcGFnZURhdGEuZnJvbnRtYXR0ZXIudGl0bGUgfHwgcGFnZURhdGEudGl0bGUgfHwgc2l0ZUNvbmZpZy5zaXRlLnRpdGxlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIF0sXHJcbiAgICAgIFtcclxuICAgICAgICAnbWV0YScsXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgcHJvcGVydHk6ICdvZzpkZXNjcmlwdGlvbicsXHJcbiAgICAgICAgICBjb250ZW50OiBwYWdlRGF0YS5mcm9udG1hdHRlci5kZXNjcmlwdGlvbiB8fCBwYWdlRGF0YS5kZXNjcmlwdGlvbiB8fCBzaXRlQ29uZmlnLnNpdGUuZGVzY3JpcHRpb24sXHJcbiAgICAgICAgfSxcclxuICAgICAgXSxcclxuICAgICAgW1xyXG4gICAgICAgICdtZXRhJyxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBuYW1lOiAndHdpdHRlcjpkZXNjcmlwdGlvbicsXHJcbiAgICAgICAgICBjb250ZW50OiBwYWdlRGF0YS5mcm9udG1hdHRlci5kZXNjcmlwdGlvbiB8fCBwYWdlRGF0YS5kZXNjcmlwdGlvbiB8fCBzaXRlQ29uZmlnLnNpdGUuZGVzY3JpcHRpb24sXHJcbiAgICAgICAgfSxcclxuICAgICAgXSxcclxuICAgICAgW1xyXG4gICAgICAgICdsaW5rJyxcclxuICAgICAgICB7XHJcbiAgICAgICAgICByZWw6ICdjYW5vbmljYWwnLFxyXG4gICAgICAgICAgaHJlZjogam9pblVSTChcclxuICAgICAgICAgICAgJ2h0dHBzOi8vb3RhYmVrb2ZmLmdpdGh1Yi5pby9kZXNpZ24tcGF0dGVybnMvJyxcclxuICAgICAgICAgICAgd2l0aG91dFRyYWlsaW5nU2xhc2gocGFnZURhdGEuZmlsZVBhdGgucmVwbGFjZSgvKGluZGV4KT9cXC5tZCQvLCAnJykpLFxyXG4gICAgICAgICAgKSxcclxuICAgICAgICB9LFxyXG4gICAgICBdLFxyXG4gICAgICBbXHJcbiAgICAgICAgJ21ldGEnLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHByb3BlcnR5OiAnb2c6dXJsJyxcclxuICAgICAgICAgIGNvbnRlbnQ6IGpvaW5VUkwoXHJcbiAgICAgICAgICAgICdodHRwczovL290YWJla29mZi5naXRodWIuaW8vZGVzaWduLXBhdHRlcm5zLycsXHJcbiAgICAgICAgICAgIHdpdGhvdXRUcmFpbGluZ1NsYXNoKHBhZ2VEYXRhLmZpbGVQYXRoLnJlcGxhY2UoLyhpbmRleCk/XFwubWQkLywgJycpKSxcclxuICAgICAgICAgICksXHJcbiAgICAgICAgfSxcclxuICAgICAgXVxyXG4gICAgKVxyXG5cclxuICAgIGF3YWl0IGFkZE9nSW1hZ2UocGFnZURhdGEsIGNvbnRleHQsIHtcclxuICAgICAgZG9tYWluOiAnaHR0cHM6Ly9vdGFiZWtvZmYuZ2l0aHViLmlvL2Rlc2lnbi1wYXR0ZXJucycsXHJcbiAgICAgIG91dERpcjogJ29nJyxcclxuICAgICAgb2dUZW1wbGF0ZTogJy52aXRlcHJlc3Mvb2ctdGVtcGxhdGUuc3ZnJyxcclxuICAgICAgbWF4VGl0bGVTaXplUGVyTGluZTogMjAsXHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgbG9jYWxlczoge1xyXG4gICAgcm9vdDogcHJvY2Vzc0xvY2FsZShlbiksXHJcbiAgICB1ejogcHJvY2Vzc0xvY2FsZSh1eiksXHJcbiAgICBydTogcHJvY2Vzc0xvY2FsZShydSksXHJcbiAgICB0cjogcHJvY2Vzc0xvY2FsZSh0ciksXHJcbiAgICBkZTogcHJvY2Vzc0xvY2FsZShkZSksXHJcbiAgICBlczogcHJvY2Vzc0xvY2FsZShlcyksXHJcbiAgICBhcjogcHJvY2Vzc0xvY2FsZShhcilcclxuICB9LFxyXG4gIGNsZWFuVXJsczogdHJ1ZSxcclxuICB0aGVtZUNvbmZpZzoge1xyXG4gICAgbG9nbzogeyBsaWdodDogJy9sb2dvLWxpZ2h0LnN2ZycsIGRhcms6ICcvbG9nby1kYXJrLnN2ZycgfSxcclxuICAgIGV4dGVybmFsTGlua0ljb246IHRydWUsXHJcbiAgICBpMThuUm91dGluZzogZmFsc2UsXHJcbiAgICBzZWFyY2g6IHtcclxuICAgICAgcHJvdmlkZXI6ICdsb2NhbCcsXHJcbiAgICAgIG9wdGlvbnM6IHtcclxuICAgICAgICBsb2NhbGVzOiB7XHJcbiAgICAgICAgICByb290OiAoZW4gYXMgYW55KS5zZWFyY2ggfHwge30sXHJcbiAgICAgICAgICB1ejogKHV6IGFzIGFueSkuc2VhcmNoIHx8IHt9LFxyXG4gICAgICAgICAgcnU6IChydSBhcyBhbnkpLnNlYXJjaCB8fCB7fSxcclxuICAgICAgICAgIHRyOiAodHIgYXMgYW55KS5zZWFyY2ggfHwge30sXHJcbiAgICAgICAgICBkZTogKGRlIGFzIGFueSkuc2VhcmNoIHx8IHt9LFxyXG4gICAgICAgICAgZXM6IChlcyBhcyBhbnkpLnNlYXJjaCB8fCB7fSxcclxuICAgICAgICAgIGFyOiAoYXIgYXMgYW55KS5zZWFyY2ggfHwge31cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBzb2NpYWxMaW5rczogW1xyXG4gICAgICB7IGljb246ICdnaXRodWInLCBsaW5rOiAnaHR0cHM6Ly9naXRodWIuY29tL3Z1ZWpzL3ZpdGVwcmVzcycgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgdml0ZToge1xyXG4gICAgcHVibGljRGlyOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vLi4vcHVibGljJyksXHJcbiAgICBwbHVnaW5zOiBbXHJcbiAgICAgIGdyb3VwSWNvblZpdGVQbHVnaW4oe1xyXG4gICAgICAgIGN1c3RvbUljb246IHtcclxuICAgICAgICAgICd0cyc6ICd2c2NvZGUtaWNvbnM6ZmlsZS10eXBlLXR5cGVzY3JpcHQtb2ZmaWNpYWwnLFxyXG4gICAgICAgICAgJ3B5JzogJ3ZzY29kZS1pY29uczpmaWxlLXR5cGUtcHl0aG9uJyxcclxuICAgICAgICAgICd0eXBlc2NyaXB0JzogJ3ZzY29kZS1pY29uczpmaWxlLXR5cGUtdHlwZXNjcmlwdC1vZmZpY2lhbCcsXHJcbiAgICAgICAgICAncHl0aG9uJzogJ3ZzY29kZS1pY29uczpmaWxlLXR5cGUtcHl0aG9uJyxcclxuICAgICAgICAgICdzaCc6ICd2c2NvZGUtaWNvbnM6ZmlsZS10eXBlLXNoZWxsJyxcclxuICAgICAgICAgICdiYXNoJzogJ3ZzY29kZS1pY29uczpmaWxlLXR5cGUtc2hlbGwnXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgXSxcclxuICB9XHJcbn0pXHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcdml0ZXByZXNzXFxcXGRlc2lnbi1wYXR0ZXJuc1xcXFwudml0ZXByZXNzXFxcXGNvbmZpZ1xcXFxsYW5nc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcdml0ZXByZXNzXFxcXGRlc2lnbi1wYXR0ZXJuc1xcXFwudml0ZXByZXNzXFxcXGNvbmZpZ1xcXFxsYW5nc1xcXFxlbi50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovdml0ZXByZXNzL2Rlc2lnbi1wYXR0ZXJucy8udml0ZXByZXNzL2NvbmZpZy9sYW5ncy9lbi50c1wiO2V4cG9ydCBjb25zdCBlbiA9IHtcbiAgdGl0bGU6IFwiRGVzaWduIFBhdHRlcm5zXCIsXG4gIGRlc2NyaXB0aW9uOiBcIkNvbXBsZXRlIFJlZmVyZW5jZSBHdWlkZVwiLFxuICBsYWJlbDogJ0VuZ2xpc2gnLFxuICBsYW5nOiAnZW4nLFxuICBzZWFyY2g6IHtcbiAgICB0cmFuc2xhdGlvbnM6IHtcbiAgICAgIGJ1dHRvbjogeyBidXR0b25UZXh0OiAnU2VhcmNoJywgYnV0dG9uQXJpYUxhYmVsOiAnU2VhcmNoJyB9LFxuICAgICAgbW9kYWw6IHtcbiAgICAgICAgZGlzcGxheURldGFpbHM6ICdEaXNwbGF5IGRldGFpbGVkIGxpc3QnLFxuICAgICAgICByZXNldEJ1dHRvblRpdGxlOiAnUmVzZXQgc2VhcmNoJyxcbiAgICAgICAgYmFja0J1dHRvblRpdGxlOiAnQ2xvc2Ugc2VhcmNoJyxcbiAgICAgICAgbm9SZXN1bHRzVGV4dDogJ05vIHJlc3VsdHMgZm91bmQnLFxuICAgICAgICBmb290ZXI6IHtcbiAgICAgICAgICBzZWxlY3RUZXh0OiAndG8gc2VsZWN0JyxcbiAgICAgICAgICBzZWxlY3RLZXlBcmlhTGFiZWw6ICdlbnRlcicsXG4gICAgICAgICAgbmF2aWdhdGVUZXh0OiAndG8gbmF2aWdhdGUnLFxuICAgICAgICAgIG5hdmlnYXRlVXBLZXlBcmlhTGFiZWw6ICd1cCBhcnJvdycsXG4gICAgICAgICAgbmF2aWdhdGVEb3duS2V5QXJpYUxhYmVsOiAnZG93biBhcnJvdycsXG4gICAgICAgICAgY2xvc2VUZXh0OiAndG8gY2xvc2UnLFxuICAgICAgICAgIGNsb3NlS2V5QXJpYUxhYmVsOiAnZXNjYXBlJ1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LFxuICB0aGVtZUNvbmZpZzoge1xuICAgIGxhc3RVcGRhdGVkOiB7XG4gICAgICB0ZXh0OiAnTGFzdCB1cGRhdGVkJyxcbiAgICAgIGZvcm1hdE9wdGlvbnM6IHtcbiAgICAgICAgZGF0ZVN0eWxlOiAnbG9uZycsXG4gICAgICAgIHRpbWVTdHlsZTogJ3Nob3J0JyxcbiAgICAgICAgZm9yY2VMb2NhbGU6IHRydWVcbiAgICAgIH1cbiAgICB9LFxuICAgIG91dGxpbmU6IHtcbiAgICAgIGxldmVsOiAnZGVlcCcsXG4gICAgICBsYWJlbDogJ09uIHRoaXMgcGFnZSdcbiAgICB9LFxuICAgIGRvY0Zvb3Rlcjoge1xuICAgICAgcHJldjogJ1ByZXZpb3VzIHBhZ2UnLFxuICAgICAgbmV4dDogJ05leHQgcGFnZSdcbiAgICB9LFxuICAgIGRhcmtNb2RlU3dpdGNoTGFiZWw6ICdBcHBlYXJhbmNlJyxcbiAgICBsaWdodE1vZGVTd2l0Y2hUaXRsZTogJ1N3aXRjaCB0byBsaWdodCB0aGVtZScsXG4gICAgZGFya01vZGVTd2l0Y2hUaXRsZTogJ1N3aXRjaCB0byBkYXJrIHRoZW1lJyxcbiAgICBzaWRlYmFyTWVudUxhYmVsOiAnTWVudScsXG4gICAgcmV0dXJuVG9Ub3BMYWJlbDogJ1JldHVybiB0byB0b3AnLFxuICAgIGxhbmdNZW51TGFiZWw6ICdDaGFuZ2UgbGFuZ3VhZ2UnLFxuICAgIHNraXBUb0NvbnRlbnRMYWJlbDogJ1NraXAgdG8gY29udGVudCcsXG4gICAgZWRpdExpbms6IHtcbiAgICAgIHBhdHRlcm46ICdodHRwczovL2dpdGh1Yi5jb20vb3RhYmVrb2ZmL2Rlc2lnbi1wYXR0ZXJucy9lZGl0L21haW4vOnBhdGgnLFxuICAgICAgdGV4dDogJ0VkaXQgdGhpcyBwYWdlIG9uIEdpdEh1YidcbiAgICB9LFxuICAgIG5hdjogW1xuICAgICAgeyB0ZXh0OiAnSG9tZScsIGxpbms6ICcvJyB9LFxuICAgICAgeyB0ZXh0OiAnUXVpY2sgUmVmZXJlbmNlJywgbGluazogJy9xdWljay1yZWZlcmVuY2UnIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICdNb3JlJyxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICB7IHRleHQ6ICdPdGhlciBwcm9qZWN0cycsIGxpbms6ICdodHRwczovL2dpdGh1Yi5jb20vb3RhYmVrb2ZmJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ1N1cHBvcnQgVXMnLCBsaW5rOiAnaHR0cHM6Ly90aXJpa2NoaWxpay51ei91emhhbmR5JyB9XG4gICAgICAgIF1cbiAgICAgIH1cbiAgICBdLFxuICAgIHNpZGViYXI6IFtcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJ0dldHRpbmcgU3RhcnRlZCcsXG4gICAgICAgIGNvbGxhcHNlZDogZmFsc2UsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgeyB0ZXh0OiAnSW50cm9kdWN0aW9uJywgbGluazogJy9pbnRyb2R1Y3Rpb24nIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnVG91cicsIGxpbms6ICcvdG91cicgfSxcbiAgICAgICAgICB7IHRleHQ6ICdRdWljayBSZWZlcmVuY2UnLCBsaW5rOiAnL3F1aWNrLXJlZmVyZW5jZScgfVxuICAgICAgICBdXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiAnQXJjaGl0ZWN0dXJhbCBQYXR0ZXJucycsXG4gICAgICAgIGNvbGxhcHNlZDogZmFsc2UsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgeyB0ZXh0OiAnQWN0aXZlIFJlY29yZCcsIGxpbms6ICcvYXJjaGl0ZWN0dXJhbC9hY3RpdmUtcmVjb3JkJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ0NRUlMnLCBsaW5rOiAnL2FyY2hpdGVjdHVyYWwvY3FycycgfSxcbiAgICAgICAgICB7IHRleHQ6ICdEYXRhIE1hcHBlcicsIGxpbms6ICcvYXJjaGl0ZWN0dXJhbC9kYXRhLW1hcHBlcicgfSxcbiAgICAgICAgICB7IHRleHQ6ICdEZXBlbmRlbmN5IEluamVjdGlvbicsIGxpbms6ICcvYXJjaGl0ZWN0dXJhbC9kZXBlbmRlbmN5LWluamVjdGlvbicgfSxcbiAgICAgICAgICB7IHRleHQ6ICdFdmVudCBTb3VyY2luZycsIGxpbms6ICcvYXJjaGl0ZWN0dXJhbC9ldmVudC1zb3VyY2luZycgfSxcbiAgICAgICAgICB7IHRleHQ6ICdNVkMnLCBsaW5rOiAnL2FyY2hpdGVjdHVyYWwvbXZjJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ01WUCcsIGxpbms6ICcvYXJjaGl0ZWN0dXJhbC9tdnAnIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnTVZWTScsIGxpbms6ICcvYXJjaGl0ZWN0dXJhbC9tdnZtJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ1Byb2R1Y2VyIENvbnN1bWVyJywgbGluazogJy9hcmNoaXRlY3R1cmFsL3Byb2R1Y2VyLWNvbnN1bWVyJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ1JlYWQgV3JpdGUgTG9jaycsIGxpbms6ICcvYXJjaGl0ZWN0dXJhbC9yZWFkLXdyaXRlLWxvY2snIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnUmVwb3NpdG9yeScsIGxpbms6ICcvYXJjaGl0ZWN0dXJhbC9yZXBvc2l0b3J5JyB9LFxuICAgICAgICAgIHsgdGV4dDogJ1NjaGVkdWxlcicsIGxpbms6ICcvYXJjaGl0ZWN0dXJhbC9zY2hlZHVsZXInIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnU2VydmljZSBMb2NhdG9yJywgbGluazogJy9hcmNoaXRlY3R1cmFsL3NlcnZpY2UtbG9jYXRvcicgfVxuICAgICAgICBdXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiAnQmVoYXZpb3JhbCBQYXR0ZXJucycsXG4gICAgICAgIGNvbGxhcHNlZDogZmFsc2UsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgeyB0ZXh0OiAnQ2hhaW4gb2YgUmVzcG9uc2liaWxpdHknLCBsaW5rOiAnL2JlaGF2aW9yYWwvY2hhaW4tb2YtcmVzcG9uc2liaWxpdHknIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnQ29tbWFuZCcsIGxpbms6ICcvYmVoYXZpb3JhbC9jb21tYW5kJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ0ludGVycHJldGVyJywgbGluazogJy9iZWhhdmlvcmFsL2ludGVycHJldGVyJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ0l0ZXJhdG9yJywgbGluazogJy9iZWhhdmlvcmFsL2l0ZXJhdG9yJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ01lZGlhdG9yJywgbGluazogJy9iZWhhdmlvcmFsL21lZGlhdG9yJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ01lbWVudG8nLCBsaW5rOiAnL2JlaGF2aW9yYWwvbWVtZW50bycgfSxcbiAgICAgICAgICB7IHRleHQ6ICdOdWxsIE9iamVjdCcsIGxpbms6ICcvYmVoYXZpb3JhbC9udWxsLW9iamVjdCcgfSxcbiAgICAgICAgICB7IHRleHQ6ICdPYnNlcnZlcicsIGxpbms6ICcvYmVoYXZpb3JhbC9vYnNlcnZlcicgfSxcbiAgICAgICAgICB7IHRleHQ6ICdTdGF0ZScsIGxpbms6ICcvYmVoYXZpb3JhbC9zdGF0ZScgfSxcbiAgICAgICAgICB7IHRleHQ6ICdTdHJhdGVneScsIGxpbms6ICcvYmVoYXZpb3JhbC9zdHJhdGVneScgfSxcbiAgICAgICAgICB7IHRleHQ6ICdUZW1wbGF0ZSBNZXRob2QnLCBsaW5rOiAnL2JlaGF2aW9yYWwvdGVtcGxhdGUtbWV0aG9kJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ1Zpc2l0b3InLCBsaW5rOiAnL2JlaGF2aW9yYWwvdmlzaXRvcicgfVxuICAgICAgICBdXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiAnQ3JlYXRpb25hbCBQYXR0ZXJucycsXG4gICAgICAgIGNvbGxhcHNlZDogZmFsc2UsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgeyB0ZXh0OiAnU2luZ2xldG9uJywgbGluazogJy9jcmVhdGlvbmFsL3NpbmdsZXRvbicgfSxcbiAgICAgICAgICB7IHRleHQ6ICdGYWN0b3J5IE1ldGhvZCcsIGxpbms6ICcvY3JlYXRpb25hbC9mYWN0b3J5LW1ldGhvZCcgfSxcbiAgICAgICAgICB7IHRleHQ6ICdBYnN0cmFjdCBGYWN0b3J5JywgbGluazogJy9jcmVhdGlvbmFsL2Fic3RyYWN0LWZhY3RvcnknIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnQnVpbGRlcicsIGxpbms6ICcvY3JlYXRpb25hbC9idWlsZGVyJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ1Byb3RvdHlwZScsIGxpbms6ICcvY3JlYXRpb25hbC9wcm90b3R5cGUnIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnT2JqZWN0IFBvb2wnLCBsaW5rOiAnL2NyZWF0aW9uYWwvb2JqZWN0LXBvb2wnIH1cbiAgICAgICAgXVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJ1N0cnVjdHVyYWwgUGF0dGVybnMnLFxuICAgICAgICBjb2xsYXBzZWQ6IGZhbHNlLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgIHsgdGV4dDogJ0FkYXB0ZXInLCBsaW5rOiAnL3N0cnVjdHVyYWwvYWRhcHRlcicgfSxcbiAgICAgICAgICB7IHRleHQ6ICdCcmlkZ2UnLCBsaW5rOiAnL3N0cnVjdHVyYWwvYnJpZGdlJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ0NvbXBvc2l0ZScsIGxpbms6ICcvc3RydWN0dXJhbC9jb21wb3NpdGUnIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnRGVjb3JhdG9yJywgbGluazogJy9zdHJ1Y3R1cmFsL2RlY29yYXRvcicgfSxcbiAgICAgICAgICB7IHRleHQ6ICdGYWNhZGUnLCBsaW5rOiAnL3N0cnVjdHVyYWwvZmFjYWRlJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ0ZseXdlaWdodCcsIGxpbms6ICcvc3RydWN0dXJhbC9mbHl3ZWlnaHQnIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnUHJveHknLCBsaW5rOiAnL3N0cnVjdHVyYWwvcHJveHknIH1cbiAgICAgICAgXVxuICAgICAgfVxuICAgIF0sXG4gICAgZm9vdGVyOiB7XG4gICAgICBtZXNzYWdlOiAnUmVsZWFzZWQgdW5kZXIgdGhlIDxhIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vb3RhYmVrb2ZmL2Rlc2lnbi1wYXR0ZXJucy9ibG9iL21haW4vTElDRU5TRVwiPk1JVCBMaWNlbnNlPC9hPi4nLFxuICAgICAgY29weXJpZ2h0OiAnQ29weXJpZ2h0IFx1MDBBOSAyMDI1LXByZXNlbnQgPGEgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9vdGFiZWtvZmZcIj5PdGFiZWsgU2FkaXJpZGlub3Y8L2E+J1xuICAgIH1cbiAgfVxufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFx2aXRlcHJlc3NcXFxcZGVzaWduLXBhdHRlcm5zXFxcXC52aXRlcHJlc3NcXFxcY29uZmlnXFxcXGxhbmdzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFx2aXRlcHJlc3NcXFxcZGVzaWduLXBhdHRlcm5zXFxcXC52aXRlcHJlc3NcXFxcY29uZmlnXFxcXGxhbmdzXFxcXHV6LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi92aXRlcHJlc3MvZGVzaWduLXBhdHRlcm5zLy52aXRlcHJlc3MvY29uZmlnL2xhbmdzL3V6LnRzXCI7ZXhwb3J0IGNvbnN0IHV6ID0ge1xuICB0aXRsZTogXCJEaXpheW4gTmFxc2hsYXJpXCIsXG4gIGRlc2NyaXB0aW9uOiBcIlRvJ2xpcSBxbydsbGFubWFcIixcbiAgbGFiZWw6ICdPXFwnemJlaycsXG4gIGxhbmc6ICd1eicsXG4gIHNlYXJjaDoge1xuICAgIHRyYW5zbGF0aW9uczoge1xuICAgICAgYnV0dG9uOiB7IGJ1dHRvblRleHQ6ICdRaWRpcnV2JywgYnV0dG9uQXJpYUxhYmVsOiAnUWlkaXJ1dicgfSxcbiAgICAgIG1vZGFsOiB7XG4gICAgICAgIGRpc3BsYXlEZXRhaWxzOiAnQmF0YWZzaWwgcm9cXCd5eGF0bmkga29cXCdyc2F0aXNoJyxcbiAgICAgICAgcmVzZXRCdXR0b25UaXRsZTogJ1FpZGlydXZuaSB0b3phbGFzaCcsXG4gICAgICAgIGJhY2tCdXR0b25UaXRsZTogJ1FpZGlydXZuaSB5b3Bpc2gnLFxuICAgICAgICBub1Jlc3VsdHNUZXh0OiAnTmF0aWphIHRvcGlsbWFkaScsXG4gICAgICAgIGZvb3Rlcjoge1xuICAgICAgICAgIHNlbGVjdFRleHQ6ICd0YW5sYXNoIHVjaHVuJyxcbiAgICAgICAgICBzZWxlY3RLZXlBcmlhTGFiZWw6ICdraXJpc2gnLFxuICAgICAgICAgIG5hdmlnYXRlVGV4dDogJ25hdmlnYXRzaXlhIHFpbGlzaCB1Y2h1bicsXG4gICAgICAgICAgbmF2aWdhdGVVcEtleUFyaWFMYWJlbDogJ3l1cW9yaWdhJyxcbiAgICAgICAgICBuYXZpZ2F0ZURvd25LZXlBcmlhTGFiZWw6ICdwYXN0Z2EnLFxuICAgICAgICAgIGNsb3NlVGV4dDogJ3lvcGlzaCB1Y2h1bicsXG4gICAgICAgICAgY2xvc2VLZXlBcmlhTGFiZWw6ICdjaGlxaXNoJ1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LFxuICB0aGVtZUNvbmZpZzoge1xuICAgIGxhc3RVcGRhdGVkOiB7XG4gICAgICB0ZXh0OiAnT3hpcmdpIHlhbmdpbGFuaXNoJyxcbiAgICAgIGZvcm1hdE9wdGlvbnM6IHtcbiAgICAgICAgZGF0ZVN0eWxlOiAnbG9uZycsXG4gICAgICAgIHRpbWVTdHlsZTogJ3Nob3J0JyxcbiAgICAgICAgZm9yY2VMb2NhbGU6IHRydWVcbiAgICAgIH1cbiAgICB9LFxuICAgIG91dGxpbmU6IHtcbiAgICAgIGxldmVsOiAnZGVlcCcsXG4gICAgICBsYWJlbDogJ1VzaGJ1IHNhaGlmYWRhJ1xuICAgIH0sXG4gICAgZG9jRm9vdGVyOiB7XG4gICAgICBwcmV2OiAnT2xkaW5naSBzYWhpZmEnLFxuICAgICAgbmV4dDogJ0tleWluZ2kgc2FoaWZhJ1xuICAgIH0sXG4gICAgZGFya01vZGVTd2l0Y2hMYWJlbDogJ0tvXFwncmluaXNoJyxcbiAgICBsaWdodE1vZGVTd2l0Y2hUaXRsZTogJ1lvcnVnXFwnIHJlamltZ2Egb1xcJ3Rpc2gnLFxuICAgIGRhcmtNb2RlU3dpdGNoVGl0bGU6ICdRb3JvbmdcXCd1IHJlamltZ2Egb1xcJ3Rpc2gnLFxuICAgIHNpZGViYXJNZW51TGFiZWw6ICdNZW55dScsXG4gICAgcmV0dXJuVG9Ub3BMYWJlbDogJ1l1cW9yaWdhIHFheXRpc2gnLFxuICAgIGxhbmdNZW51TGFiZWw6ICdUaWxuaSBvXFwnemdhcnRpcmlzaCcsXG4gICAgc2tpcFRvQ29udGVudExhYmVsOiAnQXNvc2l5IGtvbnRlbnRnYSBvXFwndGlzaCcsXG4gICAgZWRpdExpbms6IHtcbiAgICAgIHBhdHRlcm46ICdodHRwczovL2dpdGh1Yi5jb20vb3RhYmVrb2ZmL2Rlc2lnbi1wYXR0ZXJucy9lZGl0L21haW4vc3JjLzpwYXRoJyxcbiAgICAgIHRleHQ6ICdVc2hidSBzYWhpZmFuaSBHaXRIdWJkYSB0YWhyaXJsYXNoJ1xuICAgIH0sXG4gICAgbmF2OiBbXG4gICAgICB7IHRleHQ6ICdCb3NoIHNhaGlmYScsIGxpbms6ICcvdXovJyB9LFxuICAgICAgeyB0ZXh0OiAnVGV6a29yIG1hXFwnbHVtb3Rub21hJywgbGluazogJy91ei9xdWljay1yZWZlcmVuY2UnIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICdLb1xcJ3Byb3EnLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgIHsgdGV4dDogJ0Jvc2hxYSBsb3lpaGFsYXInLCBsaW5rOiAnaHR0cHM6Ly9naXRodWIuY29tL290YWJla29mZicgfSxcbiAgICAgICAgICB7IHRleHQ6ICdRb1xcJ2xsYWItcXV2dmF0bGFzaCcsIGxpbms6ICdodHRwczovL3RpcmlrY2hpbGlrLnV6L3V6aGFuZHknIH1cbiAgICAgICAgXVxuICAgICAgfVxuICAgIF0sXG4gICAgc2lkZWJhcjogW1xuICAgICAge1xuICAgICAgICB0ZXh0OiAnQm9zaGxhc2gnLFxuICAgICAgICBjb2xsYXBzZWQ6IGZhbHNlLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgIHsgdGV4dDogJ0tpcmlzaCcsIGxpbms6ICcvdXovaW50cm9kdWN0aW9uJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ1NheW9oYXQnLCBsaW5rOiAnL3V6L3RvdXInIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnVGV6a29yIG1hXFwnbHVtb3Rub21hJywgbGluazogJy91ei9xdWljay1yZWZlcmVuY2UnIH1cbiAgICAgICAgXVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJ0FyeGl0ZWt0dXJhIE5hcXNobGFyaScsXG4gICAgICAgIGNvbGxhcHNlZDogZmFsc2UsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgeyB0ZXh0OiAnQWN0aXZlIFJlY29yZCcsIGxpbms6ICcvdXovYXJjaGl0ZWN0dXJhbC9hY3RpdmUtcmVjb3JkJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ0NRUlMnLCBsaW5rOiAnL3V6L2FyY2hpdGVjdHVyYWwvY3FycycgfSxcbiAgICAgICAgICB7IHRleHQ6ICdEYXRhIE1hcHBlcicsIGxpbms6ICcvdXovYXJjaGl0ZWN0dXJhbC9kYXRhLW1hcHBlcicgfSxcbiAgICAgICAgICB7IHRleHQ6ICdEZXBlbmRlbmN5IEluamVjdGlvbicsIGxpbms6ICcvdXovYXJjaGl0ZWN0dXJhbC9kZXBlbmRlbmN5LWluamVjdGlvbicgfSxcbiAgICAgICAgICB7IHRleHQ6ICdFdmVudCBTb3VyY2luZycsIGxpbms6ICcvdXovYXJjaGl0ZWN0dXJhbC9ldmVudC1zb3VyY2luZycgfSxcbiAgICAgICAgICB7IHRleHQ6ICdNVkMnLCBsaW5rOiAnL3V6L2FyY2hpdGVjdHVyYWwvbXZjJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ01WUCcsIGxpbms6ICcvdXovYXJjaGl0ZWN0dXJhbC9tdnAnIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnTVZWTScsIGxpbms6ICcvdXovYXJjaGl0ZWN0dXJhbC9tdnZtJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ1Byb2R1Y2VyIENvbnN1bWVyJywgbGluazogJy91ei9hcmNoaXRlY3R1cmFsL3Byb2R1Y2VyLWNvbnN1bWVyJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ1JlYWQgV3JpdGUgTG9jaycsIGxpbms6ICcvdXovYXJjaGl0ZWN0dXJhbC9yZWFkLXdyaXRlLWxvY2snIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnUmVwb3NpdG9yeScsIGxpbms6ICcvdXovYXJjaGl0ZWN0dXJhbC9yZXBvc2l0b3J5JyB9LFxuICAgICAgICAgIHsgdGV4dDogJ1NjaGVkdWxlcicsIGxpbms6ICcvdXovYXJjaGl0ZWN0dXJhbC9zY2hlZHVsZXInIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnU2VydmljZSBMb2NhdG9yJywgbGluazogJy91ei9hcmNoaXRlY3R1cmFsL3NlcnZpY2UtbG9jYXRvcicgfVxuICAgICAgICBdXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiAnQmVoYXZpb3JhbCBQYXR0ZXJucycsXG4gICAgICAgIGNvbGxhcHNlZDogZmFsc2UsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgeyB0ZXh0OiAnQ2hhaW4gb2YgUmVzcG9uc2liaWxpdHknLCBsaW5rOiAnL3V6L2JlaGF2aW9yYWwvY2hhaW4tb2YtcmVzcG9uc2liaWxpdHknIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnQ29tbWFuZCcsIGxpbms6ICcvdXovYmVoYXZpb3JhbC9jb21tYW5kJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ0ludGVycHJldGVyJywgbGluazogJy91ei9iZWhhdmlvcmFsL2ludGVycHJldGVyJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ0l0ZXJhdG9yJywgbGluazogJy91ei9iZWhhdmlvcmFsL2l0ZXJhdG9yJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ01lZGlhdG9yJywgbGluazogJy91ei9iZWhhdmlvcmFsL21lZGlhdG9yJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ01lbWVudG8nLCBsaW5rOiAnL3V6L2JlaGF2aW9yYWwvbWVtZW50bycgfSxcbiAgICAgICAgICB7IHRleHQ6ICdOdWxsIE9iamVjdCcsIGxpbms6ICcvdXovYmVoYXZpb3JhbC9udWxsLW9iamVjdCcgfSxcbiAgICAgICAgICB7IHRleHQ6ICdPYnNlcnZlcicsIGxpbms6ICcvdXovYmVoYXZpb3JhbC9vYnNlcnZlcicgfSxcbiAgICAgICAgICB7IHRleHQ6ICdTdGF0ZScsIGxpbms6ICcvdXovYmVoYXZpb3JhbC9zdGF0ZScgfSxcbiAgICAgICAgICB7IHRleHQ6ICdTdHJhdGVneScsIGxpbms6ICcvdXovYmVoYXZpb3JhbC9zdHJhdGVneScgfSxcbiAgICAgICAgICB7IHRleHQ6ICdUZW1wbGF0ZSBNZXRob2QnLCBsaW5rOiAnL3V6L2JlaGF2aW9yYWwvdGVtcGxhdGUtbWV0aG9kJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ1Zpc2l0b3InLCBsaW5rOiAnL3V6L2JlaGF2aW9yYWwvdmlzaXRvcicgfVxuICAgICAgICBdXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiAnQ3JlYXRpb25hbCBQYXR0ZXJucycsXG4gICAgICAgIGNvbGxhcHNlZDogZmFsc2UsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgeyB0ZXh0OiAnU2luZ2xldG9uJywgbGluazogJy91ei9jcmVhdGlvbmFsL3NpbmdsZXRvbicgfSxcbiAgICAgICAgICB7IHRleHQ6ICdGYWN0b3J5IE1ldGhvZCcsIGxpbms6ICcvdXovY3JlYXRpb25hbC9mYWN0b3J5LW1ldGhvZCcgfSxcbiAgICAgICAgICB7IHRleHQ6ICdBYnN0cmFjdCBGYWN0b3J5JywgbGluazogJy91ei9jcmVhdGlvbmFsL2Fic3RyYWN0LWZhY3RvcnknIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnQnVpbGRlcicsIGxpbms6ICcvdXovY3JlYXRpb25hbC9idWlsZGVyJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ1Byb3RvdHlwZScsIGxpbms6ICcvdXovY3JlYXRpb25hbC9wcm90b3R5cGUnIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnT2JqZWN0IFBvb2wnLCBsaW5rOiAnL3V6L2NyZWF0aW9uYWwvb2JqZWN0LXBvb2wnIH1cbiAgICAgICAgXVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJ1N0cnVjdHVyYWwgUGF0dGVybnMnLFxuICAgICAgICBjb2xsYXBzZWQ6IGZhbHNlLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgIHsgdGV4dDogJ0FkYXB0ZXInLCBsaW5rOiAnL3V6L3N0cnVjdHVyYWwvYWRhcHRlcicgfSxcbiAgICAgICAgICB7IHRleHQ6ICdCcmlkZ2UnLCBsaW5rOiAnL3V6L3N0cnVjdHVyYWwvYnJpZGdlJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ0NvbXBvc2l0ZScsIGxpbms6ICcvdXovc3RydWN0dXJhbC9jb21wb3NpdGUnIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnRGVjb3JhdG9yJywgbGluazogJy91ei9zdHJ1Y3R1cmFsL2RlY29yYXRvcicgfSxcbiAgICAgICAgICB7IHRleHQ6ICdGYWNhZGUnLCBsaW5rOiAnL3V6L3N0cnVjdHVyYWwvZmFjYWRlJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ0ZseXdlaWdodCcsIGxpbms6ICcvdXovc3RydWN0dXJhbC9mbHl3ZWlnaHQnIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnUHJveHknLCBsaW5rOiAnL3V6L3N0cnVjdHVyYWwvcHJveHknIH1cbiAgICAgICAgXVxuICAgICAgfVxuICAgIF0sXG4gICAgZm9vdGVyOiB7XG4gICAgICBtZXNzYWdlOiAnPGEgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9vdGFiZWtvZmYvZGVzaWduLXBhdHRlcm5zL2Jsb2IvbWFpbi9MSUNFTlNFXCI+TUlUIExpdHNlbnppeWFzaTwvYT4gb3N0aWRhIHRhcnFhdGlsZ2FuLicsXG4gICAgICBjb3B5cmlnaHQ6ICdNdWFsbGlmbGlrIGh1cXVxaSBcdTAwQTkgMjAyNS1ob3ppcmdhIHFhZGFyIDxhIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vb3RhYmVrb2ZmXCI+T3RhYmVrIFNhZGlyaWRpbm92PC9hPidcbiAgICB9XG4gIH1cbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcdml0ZXByZXNzXFxcXGRlc2lnbi1wYXR0ZXJuc1xcXFwudml0ZXByZXNzXFxcXGNvbmZpZ1xcXFxsYW5nc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcdml0ZXByZXNzXFxcXGRlc2lnbi1wYXR0ZXJuc1xcXFwudml0ZXByZXNzXFxcXGNvbmZpZ1xcXFxsYW5nc1xcXFxydS50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovdml0ZXByZXNzL2Rlc2lnbi1wYXR0ZXJucy8udml0ZXByZXNzL2NvbmZpZy9sYW5ncy9ydS50c1wiO2V4cG9ydCBjb25zdCBydSA9IHtcbiAgdGl0bGU6IFwiXHUwNDFGXHUwNDMwXHUwNDQyXHUwNDQyXHUwNDM1XHUwNDQwXHUwNDNEXHUwNDRCIFx1MDQzRlx1MDQ0MFx1MDQzRVx1MDQzNVx1MDQzQVx1MDQ0Mlx1MDQzOFx1MDQ0MFx1MDQzRVx1MDQzMlx1MDQzMFx1MDQzRFx1MDQzOFx1MDQ0RlwiLFxuICBkZXNjcmlwdGlvbjogXCJcdTA0MUZcdTA0M0VcdTA0M0JcdTA0M0RcdTA0M0VcdTA0MzUgXHUwNDQwXHUwNDQzXHUwNDNBXHUwNDNFXHUwNDMyXHUwNDNFXHUwNDM0XHUwNDQxXHUwNDQyXHUwNDMyXHUwNDNFXCIsXG4gIGxhYmVsOiAnXHUwNDIwXHUwNDQzXHUwNDQxXHUwNDQxXHUwNDNBXHUwNDM4XHUwNDM5JyxcbiAgbGFuZzogJ3J1JyxcbiAgbGluazogJy9ydS8nLFxuICBzZWFyY2g6IHtcbiAgICB0cmFuc2xhdGlvbnM6IHtcbiAgICAgIGJ1dHRvbjogeyBidXR0b25UZXh0OiAnXHUwNDFGXHUwNDNFXHUwNDM4XHUwNDQxXHUwNDNBJywgYnV0dG9uQXJpYUxhYmVsOiAnXHUwNDFGXHUwNDNFXHUwNDM4XHUwNDQxXHUwNDNBJyB9LFxuICAgICAgbW9kYWw6IHtcbiAgICAgICAgZGlzcGxheURldGFpbHM6ICdcdTA0MUZcdTA0M0VcdTA0M0FcdTA0MzBcdTA0MzdcdTA0MzBcdTA0NDJcdTA0NEMgXHUwNDNGXHUwNDNFXHUwNDM0XHUwNDQwXHUwNDNFXHUwNDMxXHUwNDNEXHUwNDRCXHUwNDM5IFx1MDQ0MVx1MDQzRlx1MDQzOFx1MDQ0MVx1MDQzRVx1MDQzQScsXG4gICAgICAgIHJlc2V0QnV0dG9uVGl0bGU6ICdcdTA0MjFcdTA0MzFcdTA0NDBcdTA0M0VcdTA0NDFcdTA0MzhcdTA0NDJcdTA0NEMgXHUwNDNGXHUwNDNFXHUwNDM4XHUwNDQxXHUwNDNBJyxcbiAgICAgICAgYmFja0J1dHRvblRpdGxlOiAnXHUwNDE3XHUwNDMwXHUwNDNBXHUwNDQwXHUwNDRCXHUwNDQyXHUwNDRDIFx1MDQzRlx1MDQzRVx1MDQzOFx1MDQ0MVx1MDQzQScsXG4gICAgICAgIG5vUmVzdWx0c1RleHQ6ICdcdTA0MjBcdTA0MzVcdTA0MzdcdTA0NDNcdTA0M0JcdTA0NENcdTA0NDJcdTA0MzBcdTA0NDJcdTA0M0VcdTA0MzIgXHUwNDNEXHUwNDM1IFx1MDQzRFx1MDQzMFx1MDQzOVx1MDQzNFx1MDQzNVx1MDQzRFx1MDQzRScsXG4gICAgICAgIGZvb3Rlcjoge1xuICAgICAgICAgIHNlbGVjdFRleHQ6ICdcdTA0MzJcdTA0NEJcdTA0MzFcdTA0NDBcdTA0MzBcdTA0NDJcdTA0NEMnLFxuICAgICAgICAgIHNlbGVjdEtleUFyaWFMYWJlbDogJ1x1MDQzMlx1MDQzMlx1MDQzRVx1MDQzNCcsXG4gICAgICAgICAgbmF2aWdhdGVUZXh0OiAnXHUwNDNEXHUwNDMwXHUwNDMyXHUwNDM4XHUwNDMzXHUwNDMwXHUwNDQ2XHUwNDM4XHUwNDRGJyxcbiAgICAgICAgICBuYXZpZ2F0ZVVwS2V5QXJpYUxhYmVsOiAnXHUwNDQxXHUwNDQyXHUwNDQwXHUwNDM1XHUwNDNCXHUwNDNBXHUwNDMwIFx1MDQzMlx1MDQzMlx1MDQzNVx1MDQ0MFx1MDQ0NScsXG4gICAgICAgICAgbmF2aWdhdGVEb3duS2V5QXJpYUxhYmVsOiAnXHUwNDQxXHUwNDQyXHUwNDQwXHUwNDM1XHUwNDNCXHUwNDNBXHUwNDMwIFx1MDQzMlx1MDQzRFx1MDQzOFx1MDQzNycsXG4gICAgICAgICAgY2xvc2VUZXh0OiAnXHUwNDM3XHUwNDMwXHUwNDNBXHUwNDQwXHUwNDRCXHUwNDQyXHUwNDRDJyxcbiAgICAgICAgICBjbG9zZUtleUFyaWFMYWJlbDogJ2VzY2FwZSdcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgdGhlbWVDb25maWc6IHtcbiAgICBsYXN0VXBkYXRlZDoge1xuICAgICAgdGV4dDogJ1x1MDQxRlx1MDQzRVx1MDQ0MVx1MDQzQlx1MDQzNVx1MDQzNFx1MDQzRFx1MDQzNVx1MDQzNSBcdTA0M0VcdTA0MzFcdTA0M0RcdTA0M0VcdTA0MzJcdTA0M0JcdTA0MzVcdTA0M0RcdTA0MzhcdTA0MzUnLFxuICAgICAgZm9ybWF0T3B0aW9uczoge1xuICAgICAgICBkYXRlU3R5bGU6ICdsb25nJyxcbiAgICAgICAgdGltZVN0eWxlOiAnc2hvcnQnLFxuICAgICAgICBmb3JjZUxvY2FsZTogdHJ1ZVxuICAgICAgfVxuICAgIH0sXG4gICAgb3V0bGluZToge1xuICAgICAgbGV2ZWw6ICdkZWVwJyxcbiAgICAgIGxhYmVsOiAnXHUwNDFEXHUwNDMwIFx1MDQ0RFx1MDQ0Mlx1MDQzRVx1MDQzOSBcdTA0NDFcdTA0NDJcdTA0NDBcdTA0MzBcdTA0M0RcdTA0MzhcdTA0NDZcdTA0MzUnXG4gICAgfSxcbiAgICBkb2NGb290ZXI6IHtcbiAgICAgIHByZXY6ICdcdTA0MUZcdTA0NDBcdTA0MzVcdTA0MzRcdTA0NEJcdTA0MzRcdTA0NDNcdTA0NDlcdTA0MzBcdTA0NEYgXHUwNDQxXHUwNDQyXHUwNDQwXHUwNDMwXHUwNDNEXHUwNDM4XHUwNDQ2XHUwNDMwJyxcbiAgICAgIG5leHQ6ICdcdTA0MjFcdTA0M0JcdTA0MzVcdTA0MzRcdTA0NDNcdTA0NEVcdTA0NDlcdTA0MzBcdTA0NEYgXHUwNDQxXHUwNDQyXHUwNDQwXHUwNDMwXHUwNDNEXHUwNDM4XHUwNDQ2XHUwNDMwJ1xuICAgIH0sXG4gICAgZGFya01vZGVTd2l0Y2hMYWJlbDogJ1x1MDQxRVx1MDQ0NFx1MDQzRVx1MDQ0MFx1MDQzQ1x1MDQzQlx1MDQzNVx1MDQzRFx1MDQzOFx1MDQzNScsXG4gICAgbGlnaHRNb2RlU3dpdGNoVGl0bGU6ICdcdTA0MUZcdTA0MzVcdTA0NDBcdTA0MzVcdTA0M0FcdTA0M0JcdTA0NEVcdTA0NDdcdTA0MzhcdTA0NDJcdTA0NENcdTA0NDFcdTA0NEYgXHUwNDNEXHUwNDMwIFx1MDQ0MVx1MDQzMlx1MDQzNVx1MDQ0Mlx1MDQzQlx1MDQ0M1x1MDQ0RSBcdTA0NDJcdTA0MzVcdTA0M0NcdTA0NDMnLFxuICAgIGRhcmtNb2RlU3dpdGNoVGl0bGU6ICdcdTA0MUZcdTA0MzVcdTA0NDBcdTA0MzVcdTA0M0FcdTA0M0JcdTA0NEVcdTA0NDdcdTA0MzhcdTA0NDJcdTA0NENcdTA0NDFcdTA0NEYgXHUwNDNEXHUwNDMwIFx1MDQ0Mlx1MDQzNVx1MDQzQ1x1MDQzRFx1MDQ0M1x1MDQ0RSBcdTA0NDJcdTA0MzVcdTA0M0NcdTA0NDMnLFxuICAgIHNpZGViYXJNZW51TGFiZWw6ICdcdTA0MUNcdTA0MzVcdTA0M0RcdTA0NEUnLFxuICAgIHJldHVyblRvVG9wTGFiZWw6ICdcdTA0MTJcdTA0MzVcdTA0NDBcdTA0M0RcdTA0NDNcdTA0NDJcdTA0NENcdTA0NDFcdTA0NEYgXHUwNDNBIFx1MDQzRFx1MDQzMFx1MDQ0N1x1MDQzMFx1MDQzQlx1MDQ0MycsXG4gICAgbGFuZ01lbnVMYWJlbDogJ1x1MDQxOFx1MDQzN1x1MDQzQ1x1MDQzNVx1MDQzRFx1MDQzOFx1MDQ0Mlx1MDQ0QyBcdTA0NEZcdTA0MzdcdTA0NEJcdTA0M0EnLFxuICAgIHNraXBUb0NvbnRlbnRMYWJlbDogJ1x1MDQxRlx1MDQzNVx1MDQ0MFx1MDQzNVx1MDQzOVx1MDQ0Mlx1MDQzOCBcdTA0M0EgXHUwNDQxXHUwNDNFXHUwNDM0XHUwNDM1XHUwNDQwXHUwNDM2XHUwNDMwXHUwNDNEXHUwNDM4XHUwNDRFJyxcbiAgICBlZGl0TGluazoge1xuICAgICAgcGF0dGVybjogJ2h0dHBzOi8vZ2l0aHViLmNvbS9vdGFiZWtvZmYvZGVzaWduLXBhdHRlcm5zL2VkaXQvbWFpbi86cGF0aCcsXG4gICAgICB0ZXh0OiAnXHUwNDIwXHUwNDM1XHUwNDM0XHUwNDMwXHUwNDNBXHUwNDQyXHUwNDM4XHUwNDQwXHUwNDNFXHUwNDMyXHUwNDMwXHUwNDQyXHUwNDRDIFx1MDQ0RFx1MDQ0Mlx1MDQ0MyBcdTA0NDFcdTA0NDJcdTA0NDBcdTA0MzBcdTA0M0RcdTA0MzhcdTA0NDZcdTA0NDMgXHUwNDNEXHUwNDMwIEdpdEh1YidcbiAgICB9LFxuICAgIG5hdjogW1xuICAgICAgeyB0ZXh0OiAnXHUwNDEzXHUwNDNCXHUwNDMwXHUwNDMyXHUwNDNEXHUwNDMwXHUwNDRGJywgbGluazogJy9ydS8nIH0sXG4gICAgICB7IHRleHQ6ICdcdTA0MUFcdTA0NDBcdTA0MzBcdTA0NDJcdTA0M0FcdTA0MzhcdTA0MzkgXHUwNDQxXHUwNDNGXHUwNDQwXHUwNDMwXHUwNDMyXHUwNDNFXHUwNDQ3XHUwNDNEXHUwNDM4XHUwNDNBJywgbGluazogJy9ydS9xdWljay1yZWZlcmVuY2UnIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICdcdTA0MTVcdTA0NDlcdTA0NTEnLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgIHsgdGV4dDogJ1x1MDQxNFx1MDQ0MFx1MDQ0M1x1MDQzM1x1MDQzOFx1MDQzNSBcdTA0M0ZcdTA0NDBcdTA0M0VcdTA0MzVcdTA0M0FcdTA0NDJcdTA0NEInLCBsaW5rOiAnaHR0cHM6Ly9naXRodWIuY29tL290YWJla29mZicgfSxcbiAgICAgICAgICB7IHRleHQ6ICdcdTA0MUZcdTA0M0VcdTA0MzRcdTA0MzRcdTA0MzVcdTA0NDBcdTA0MzZcdTA0MzBcdTA0NDJcdTA0NEMgXHUwNDNEXHUwNDMwXHUwNDQxJywgbGluazogJ2h0dHBzOi8vdGlyaWtjaGlsaWsudXovdXpoYW5keScgfVxuICAgICAgICBdXG4gICAgICB9XG4gICAgXSxcbiAgICBzaWRlYmFyOiBbXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICdcdTA0MURcdTA0MzBcdTA0NDdcdTA0MzBcdTA0M0JcdTA0M0UgXHUwNDQwXHUwNDMwXHUwNDMxXHUwNDNFXHUwNDQyXHUwNDRCJyxcbiAgICAgICAgY29sbGFwc2VkOiBmYWxzZSxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICB7IHRleHQ6ICdcdTA0MTJcdTA0MzJcdTA0MzVcdTA0MzRcdTA0MzVcdTA0M0RcdTA0MzhcdTA0MzUnLCBsaW5rOiAnL3J1L2ludHJvZHVjdGlvbicgfSxcbiAgICAgICAgICB7IHRleHQ6ICdcdTA0MjJcdTA0NDNcdTA0NDAnLCBsaW5rOiAnL3J1L3RvdXInIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnXHUwNDFBXHUwNDQwXHUwNDMwXHUwNDQyXHUwNDNBXHUwNDM4XHUwNDM5IFx1MDQ0MVx1MDQzRlx1MDQ0MFx1MDQzMFx1MDQzMlx1MDQzRVx1MDQ0N1x1MDQzRFx1MDQzOFx1MDQzQScsIGxpbms6ICcvcnUvcXVpY2stcmVmZXJlbmNlJyB9XG4gICAgICAgIF1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICdcdTA0MTBcdTA0NDBcdTA0NDVcdTA0MzhcdTA0NDJcdTA0MzVcdTA0M0FcdTA0NDJcdTA0NDNcdTA0NDBcdTA0M0RcdTA0NEJcdTA0MzUgXHUwNDNGXHUwNDMwXHUwNDQyXHUwNDQyXHUwNDM1XHUwNDQwXHUwNDNEXHUwNDRCJyxcbiAgICAgICAgY29sbGFwc2VkOiBmYWxzZSxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICB7IHRleHQ6ICdBY3RpdmUgUmVjb3JkJywgbGluazogJy9ydS9hcmNoaXRlY3R1cmFsL2FjdGl2ZS1yZWNvcmQnIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnQ1FSUycsIGxpbms6ICcvcnUvYXJjaGl0ZWN0dXJhbC9jcXJzJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ0RhdGEgTWFwcGVyJywgbGluazogJy9ydS9hcmNoaXRlY3R1cmFsL2RhdGEtbWFwcGVyJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ0RlcGVuZGVuY3kgSW5qZWN0aW9uJywgbGluazogJy9ydS9hcmNoaXRlY3R1cmFsL2RlcGVuZGVuY3ktaW5qZWN0aW9uJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ0V2ZW50IFNvdXJjaW5nJywgbGluazogJy9ydS9hcmNoaXRlY3R1cmFsL2V2ZW50LXNvdXJjaW5nJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ01WQycsIGxpbms6ICcvcnUvYXJjaGl0ZWN0dXJhbC9tdmMnIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnTVZQJywgbGluazogJy9ydS9hcmNoaXRlY3R1cmFsL212cCcgfSxcbiAgICAgICAgICB7IHRleHQ6ICdNVlZNJywgbGluazogJy9ydS9hcmNoaXRlY3R1cmFsL212dm0nIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnUHJvZHVjZXIgQ29uc3VtZXInLCBsaW5rOiAnL3J1L2FyY2hpdGVjdHVyYWwvcHJvZHVjZXItY29uc3VtZXInIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnUmVhZCBXcml0ZSBMb2NrJywgbGluazogJy9ydS9hcmNoaXRlY3R1cmFsL3JlYWQtd3JpdGUtbG9jaycgfSxcbiAgICAgICAgICB7IHRleHQ6ICdSZXBvc2l0b3J5JywgbGluazogJy9ydS9hcmNoaXRlY3R1cmFsL3JlcG9zaXRvcnknIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnU2NoZWR1bGVyJywgbGluazogJy9ydS9hcmNoaXRlY3R1cmFsL3NjaGVkdWxlcicgfSxcbiAgICAgICAgICB7IHRleHQ6ICdTZXJ2aWNlIExvY2F0b3InLCBsaW5rOiAnL3J1L2FyY2hpdGVjdHVyYWwvc2VydmljZS1sb2NhdG9yJyB9XG4gICAgICAgIF1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICdcdTA0MUZcdTA0M0VcdTA0MzJcdTA0MzVcdTA0MzRcdTA0MzVcdTA0M0RcdTA0NDdcdTA0MzVcdTA0NDFcdTA0M0FcdTA0MzhcdTA0MzUgXHUwNDNGXHUwNDMwXHUwNDQyXHUwNDQyXHUwNDM1XHUwNDQwXHUwNDNEXHUwNDRCJyxcbiAgICAgICAgY29sbGFwc2VkOiBmYWxzZSxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICB7IHRleHQ6ICdDaGFpbiBvZiBSZXNwb25zaWJpbGl0eScsIGxpbms6ICcvcnUvYmVoYXZpb3JhbC9jaGFpbi1vZi1yZXNwb25zaWJpbGl0eScgfSxcbiAgICAgICAgICB7IHRleHQ6ICdDb21tYW5kJywgbGluazogJy9ydS9iZWhhdmlvcmFsL2NvbW1hbmQnIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnSW50ZXJwcmV0ZXInLCBsaW5rOiAnL3J1L2JlaGF2aW9yYWwvaW50ZXJwcmV0ZXInIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnSXRlcmF0b3InLCBsaW5rOiAnL3J1L2JlaGF2aW9yYWwvaXRlcmF0b3InIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnTWVkaWF0b3InLCBsaW5rOiAnL3J1L2JlaGF2aW9yYWwvbWVkaWF0b3InIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnTWVtZW50bycsIGxpbms6ICcvcnUvYmVoYXZpb3JhbC9tZW1lbnRvJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ051bGwgT2JqZWN0JywgbGluazogJy9ydS9iZWhhdmlvcmFsL251bGwtb2JqZWN0JyB9LFxuICAgICAgICAgIHsgdGV4dDogJ09ic2VydmVyJywgbGluazogJy9ydS9iZWhhdmlvcmFsL29ic2VydmVyJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ1N0YXRlJywgbGluazogJy9ydS9iZWhhdmlvcmFsL3N0YXRlJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ1N0cmF0ZWd5JywgbGluazogJy9ydS9iZWhhdmlvcmFsL3N0cmF0ZWd5JyB9LFxuICAgICAgICAgIHsgdGV4dDogJ1RlbXBsYXRlIE1ldGhvZCcsIGxpbms6ICcvcnUvYmVoYXZpb3JhbC90ZW1wbGF0ZS1tZXRob2QnIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnVmlzaXRvcicsIGxpbms6ICcvcnUvYmVoYXZpb3JhbC92aXNpdG9yJyB9XG4gICAgICAgIF1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICdcdTA0MUZcdTA0M0VcdTA0NDBcdTA0M0VcdTA0MzZcdTA0MzRcdTA0MzBcdTA0NEVcdTA0NDlcdTA0MzhcdTA0MzUgXHUwNDNGXHUwNDMwXHUwNDQyXHUwNDQyXHUwNDM1XHUwNDQwXHUwNDNEXHUwNDRCJyxcbiAgICAgICAgY29sbGFwc2VkOiBmYWxzZSxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICB7IHRleHQ6ICdTaW5nbGV0b24nLCBsaW5rOiAnL3J1L2NyZWF0aW9uYWwvc2luZ2xldG9uJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ0ZhY3RvcnkgTWV0aG9kJywgbGluazogJy9ydS9jcmVhdGlvbmFsL2ZhY3RvcnktbWV0aG9kJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ0Fic3RyYWN0IEZhY3RvcnknLCBsaW5rOiAnL3J1L2NyZWF0aW9uYWwvYWJzdHJhY3QtZmFjdG9yeScgfSxcbiAgICAgICAgICB7IHRleHQ6ICdCdWlsZGVyJywgbGluazogJy9ydS9jcmVhdGlvbmFsL2J1aWxkZXInIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnUHJvdG90eXBlJywgbGluazogJy9ydS9jcmVhdGlvbmFsL3Byb3RvdHlwZScgfSxcbiAgICAgICAgICB7IHRleHQ6ICdPYmplY3QgUG9vbCcsIGxpbms6ICcvcnUvY3JlYXRpb25hbC9vYmplY3QtcG9vbCcgfVxuICAgICAgICBdXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiAnXHUwNDIxXHUwNDQyXHUwNDQwXHUwNDQzXHUwNDNBXHUwNDQyXHUwNDQzXHUwNDQwXHUwNDNEXHUwNDRCXHUwNDM1IFx1MDQzRlx1MDQzMFx1MDQ0Mlx1MDQ0Mlx1MDQzNVx1MDQ0MFx1MDQzRFx1MDQ0QicsXG4gICAgICAgIGNvbGxhcHNlZDogZmFsc2UsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgeyB0ZXh0OiAnQWRhcHRlcicsIGxpbms6ICcvcnUvc3RydWN0dXJhbC9hZGFwdGVyJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ0JyaWRnZScsIGxpbms6ICcvcnUvc3RydWN0dXJhbC9icmlkZ2UnIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnQ29tcG9zaXRlJywgbGluazogJy9ydS9zdHJ1Y3R1cmFsL2NvbXBvc2l0ZScgfSxcbiAgICAgICAgICB7IHRleHQ6ICdEZWNvcmF0b3InLCBsaW5rOiAnL3J1L3N0cnVjdHVyYWwvZGVjb3JhdG9yJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ0ZhY2FkZScsIGxpbms6ICcvcnUvc3RydWN0dXJhbC9mYWNhZGUnIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnRmx5d2VpZ2h0JywgbGluazogJy9ydS9zdHJ1Y3R1cmFsL2ZseXdlaWdodCcgfSxcbiAgICAgICAgICB7IHRleHQ6ICdQcm94eScsIGxpbms6ICcvcnUvc3RydWN0dXJhbC9wcm94eScgfVxuICAgICAgICBdXG4gICAgICB9XG4gICAgXSxcbiAgICBmb290ZXI6IHtcbiAgICAgIG1lc3NhZ2U6ICdcdTA0MjBcdTA0MzBcdTA0NDFcdTA0M0ZcdTA0NDBcdTA0M0VcdTA0NDFcdTA0NDJcdTA0NDBcdTA0MzBcdTA0M0RcdTA0NEZcdTA0MzVcdTA0NDJcdTA0NDFcdTA0NEYgXHUwNDNGXHUwNDNFXHUwNDM0IDxhIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vb3RhYmVrb2ZmL2Rlc2lnbi1wYXR0ZXJucy9ibG9iL21haW4vTElDRU5TRVwiPlx1MDQzQlx1MDQzOFx1MDQ0Nlx1MDQzNVx1MDQzRFx1MDQzN1x1MDQzOFx1MDQzNVx1MDQzOSBNSVQ8L2E+LicsXG4gICAgICBjb3B5cmlnaHQ6ICdcdTA0MTBcdTA0MzJcdTA0NDJcdTA0M0VcdTA0NDBcdTA0NDFcdTA0M0FcdTA0M0VcdTA0MzUgXHUwNDNGXHUwNDQwXHUwNDMwXHUwNDMyXHUwNDNFIFx1MDBBOSAyMDI1LVx1MDQzRFx1MDQzMFx1MDQ0MVx1MDQ0Mlx1MDQzRVx1MDQ0Rlx1MDQ0OVx1MDQzNVx1MDQzNSBcdTA0MzJcdTA0NDBcdTA0MzVcdTA0M0NcdTA0NEYgPGEgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9vdGFiZWtvZmZcIj5cdTA0MUVcdTA0NDJcdTA0MzBcdTA0MzFcdTA0MzVcdTA0M0EgXHUwNDIxXHUwNDMwXHUwNDM0XHUwNDM4XHUwNDQwXHUwNDM4XHUwNDM0XHUwNDM0XHUwNDM4XHUwNDNEXHUwNDNFXHUwNDMyPC9hPidcbiAgICB9XG4gIH1cbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcdml0ZXByZXNzXFxcXGRlc2lnbi1wYXR0ZXJuc1xcXFwudml0ZXByZXNzXFxcXGNvbmZpZ1xcXFxsYW5nc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcdml0ZXByZXNzXFxcXGRlc2lnbi1wYXR0ZXJuc1xcXFwudml0ZXByZXNzXFxcXGNvbmZpZ1xcXFxsYW5nc1xcXFx0ci50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovdml0ZXByZXNzL2Rlc2lnbi1wYXR0ZXJucy8udml0ZXByZXNzL2NvbmZpZy9sYW5ncy90ci50c1wiO2V4cG9ydCBjb25zdCB0ciA9IHtcbiAgdGl0bGU6IFwiVGFzYXJcdTAxMzFtIEthbFx1MDEzMXBsYXJcdTAxMzFcIixcbiAgZGVzY3JpcHRpb246IFwiVGFtIFJlZmVyYW5zIEtcdTAxMzFsYXZ1enVcIixcbiAgbGFiZWw6ICdUXHUwMEZDcmtcdTAwRTdlJyxcbiAgbGFuZzogJ3RyJyxcbiAgbGluazogJy90ci8nLFxuICBzZWFyY2g6IHtcbiAgICB0cmFuc2xhdGlvbnM6IHtcbiAgICAgIGJ1dHRvbjogeyBidXR0b25UZXh0OiAnQXJhJywgYnV0dG9uQXJpYUxhYmVsOiAnQXJhJyB9LFxuICAgICAgbW9kYWw6IHtcbiAgICAgICAgZGlzcGxheURldGFpbHM6ICdEZXRheWxcdTAxMzEgbGlzdGV5aSBnXHUwMEY2c3RlcicsXG4gICAgICAgIHJlc2V0QnV0dG9uVGl0bGU6ICdBcmFtYXlcdTAxMzEgc1x1MDEzMWZcdTAxMzFybGEnLFxuICAgICAgICBiYWNrQnV0dG9uVGl0bGU6ICdBcmFtYXlcdTAxMzEga2FwYXQnLFxuICAgICAgICBub1Jlc3VsdHNUZXh0OiAnU29udVx1MDBFNyBidWx1bmFtYWRcdTAxMzEnLFxuICAgICAgICBmb290ZXI6IHtcbiAgICAgICAgICBzZWxlY3RUZXh0OiAnc2VcdTAwRTdtZWsgaVx1MDBFN2luJyxcbiAgICAgICAgICBzZWxlY3RLZXlBcmlhTGFiZWw6ICdnaXJpXHUwMTVGJyxcbiAgICAgICAgICBuYXZpZ2F0ZVRleHQ6ICdnZXppbm1layBpXHUwMEU3aW4nLFxuICAgICAgICAgIG5hdmlnYXRlVXBLZXlBcmlhTGFiZWw6ICd5dWthclx1MDEzMSBvaycsXG4gICAgICAgICAgbmF2aWdhdGVEb3duS2V5QXJpYUxhYmVsOiAnYVx1MDE1RmFcdTAxMUZcdTAxMzEgb2snLFxuICAgICAgICAgIGNsb3NlVGV4dDogJ2thcGF0bWFrIGlcdTAwRTdpbicsXG4gICAgICAgICAgY2xvc2VLZXlBcmlhTGFiZWw6ICdrYVx1MDBFN1x1MDEzMVx1MDE1RidcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgdGhlbWVDb25maWc6IHtcbiAgICBsYXN0VXBkYXRlZDoge1xuICAgICAgdGV4dDogJ1NvbiBnXHUwMEZDbmNlbGxlbWUnLFxuICAgICAgZm9ybWF0T3B0aW9uczoge1xuICAgICAgICBkYXRlU3R5bGU6ICdsb25nJyxcbiAgICAgICAgdGltZVN0eWxlOiAnc2hvcnQnLFxuICAgICAgICBmb3JjZUxvY2FsZTogdHJ1ZVxuICAgICAgfVxuICAgIH0sXG4gICAgb3V0bGluZToge1xuICAgICAgbGV2ZWw6ICdkZWVwJyxcbiAgICAgIGxhYmVsOiAnQnUgc2F5ZmFkYSdcbiAgICB9LFxuICAgIGRvY0Zvb3Rlcjoge1xuICAgICAgcHJldjogJ1x1MDBENm5jZWtpIHNheWZhJyxcbiAgICAgIG5leHQ6ICdTb25yYWtpIHNheWZhJ1xuICAgIH0sXG4gICAgZGFya01vZGVTd2l0Y2hMYWJlbDogJ0dcdTAwRjZyXHUwMEZDblx1MDBGQ20nLFxuICAgIGxpZ2h0TW9kZVN3aXRjaFRpdGxlOiAnQVx1MDBFN1x1MDEzMWsgdGVtYXlhIGdlXHUwMEU3JyxcbiAgICBkYXJrTW9kZVN3aXRjaFRpdGxlOiAnS295dSB0ZW1heWEgZ2VcdTAwRTcnLFxuICAgIHNpZGViYXJNZW51TGFiZWw6ICdNZW5cdTAwRkMnLFxuICAgIHJldHVyblRvVG9wTGFiZWw6ICdZdWthclx1MDEzMSBkXHUwMEY2bicsXG4gICAgbGFuZ01lbnVMYWJlbDogJ0RpbGkgZGVcdTAxMUZpXHUwMTVGdGlyJyxcbiAgICBza2lwVG9Db250ZW50TGFiZWw6ICdcdTAxMzBcdTAwRTdlcmlcdTAxMUZlIGF0bGEnLFxuICAgIGVkaXRMaW5rOiB7XG4gICAgICBwYXR0ZXJuOiAnaHR0cHM6Ly9naXRodWIuY29tL290YWJla29mZi9kZXNpZ24tcGF0dGVybnMvZWRpdC9tYWluLzpwYXRoJyxcbiAgICAgIHRleHQ6IFwiQnUgc2F5ZmF5XHUwMTMxIEdpdEh1YidkYSBkXHUwMEZDemVubGV5aW5cIlxuICAgIH0sXG4gICAgbmF2OiBbXG4gICAgICB7IHRleHQ6ICdBbmEgU2F5ZmEnLCBsaW5rOiAnL3RyLycgfSxcbiAgICAgIHsgdGV4dDogJ0hcdTAxMzF6bFx1MDEzMSBCYVx1MDE1RnZ1cnUnLCBsaW5rOiAnL3RyL3F1aWNrLXJlZmVyZW5jZScgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJ0RhaGEgZmF6bGEnLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgIHsgdGV4dDogJ0RpXHUwMTFGZXIgcHJvamVsZXInLCBsaW5rOiAnaHR0cHM6Ly9naXRodWIuY29tL290YWJla29mZicgfSxcbiAgICAgICAgICB7IHRleHQ6ICdCaXppIERlc3Rla2xleWluJywgbGluazogJ2h0dHBzOi8vdGlyaWtjaGlsaWsudXovdXpoYW5keScgfVxuICAgICAgICBdXG4gICAgICB9XG4gICAgXSxcbiAgICBzaWRlYmFyOiBbXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICdCYVx1MDE1RmxhcmtlbicsXG4gICAgICAgIGNvbGxhcHNlZDogZmFsc2UsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgeyB0ZXh0OiAnR2lyaVx1MDE1RicsIGxpbms6ICcvdHIvaW50cm9kdWN0aW9uJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ1R1cicsIGxpbms6ICcvdHIvdG91cicgfSxcbiAgICAgICAgICB7IHRleHQ6ICdIXHUwMTMxemxcdTAxMzEgQmFcdTAxNUZ2dXJ1JywgbGluazogJy90ci9xdWljay1yZWZlcmVuY2UnIH1cbiAgICAgICAgXVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJ01pbWFyaSBLYWxcdTAxMzFwbGFyJyxcbiAgICAgICAgY29sbGFwc2VkOiBmYWxzZSxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICB7IHRleHQ6ICdBY3RpdmUgUmVjb3JkJywgbGluazogJy90ci9hcmNoaXRlY3R1cmFsL2FjdGl2ZS1yZWNvcmQnIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnQ1FSUycsIGxpbms6ICcvdHIvYXJjaGl0ZWN0dXJhbC9jcXJzJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ0RhdGEgTWFwcGVyJywgbGluazogJy90ci9hcmNoaXRlY3R1cmFsL2RhdGEtbWFwcGVyJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ0RlcGVuZGVuY3kgSW5qZWN0aW9uJywgbGluazogJy90ci9hcmNoaXRlY3R1cmFsL2RlcGVuZGVuY3ktaW5qZWN0aW9uJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ0V2ZW50IFNvdXJjaW5nJywgbGluazogJy90ci9hcmNoaXRlY3R1cmFsL2V2ZW50LXNvdXJjaW5nJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ01WQycsIGxpbms6ICcvdHIvYXJjaGl0ZWN0dXJhbC9tdmMnIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnTVZQJywgbGluazogJy90ci9hcmNoaXRlY3R1cmFsL212cCcgfSxcbiAgICAgICAgICB7IHRleHQ6ICdNVlZNJywgbGluazogJy90ci9hcmNoaXRlY3R1cmFsL212dm0nIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnUHJvZHVjZXIgQ29uc3VtZXInLCBsaW5rOiAnL3RyL2FyY2hpdGVjdHVyYWwvcHJvZHVjZXItY29uc3VtZXInIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnUmVhZCBXcml0ZSBMb2NrJywgbGluazogJy90ci9hcmNoaXRlY3R1cmFsL3JlYWQtd3JpdGUtbG9jaycgfSxcbiAgICAgICAgICB7IHRleHQ6ICdSZXBvc2l0b3J5JywgbGluazogJy90ci9hcmNoaXRlY3R1cmFsL3JlcG9zaXRvcnknIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnU2NoZWR1bGVyJywgbGluazogJy90ci9hcmNoaXRlY3R1cmFsL3NjaGVkdWxlcicgfSxcbiAgICAgICAgICB7IHRleHQ6ICdTZXJ2aWNlIExvY2F0b3InLCBsaW5rOiAnL3RyL2FyY2hpdGVjdHVyYWwvc2VydmljZS1sb2NhdG9yJyB9XG4gICAgICAgIF1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICdEYXZyYW5cdTAxMzFcdTAxNUZzYWwgS2FsXHUwMTMxcGxhcicsXG4gICAgICAgIGNvbGxhcHNlZDogZmFsc2UsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgeyB0ZXh0OiAnQ2hhaW4gb2YgUmVzcG9uc2liaWxpdHknLCBsaW5rOiAnL3RyL2JlaGF2aW9yYWwvY2hhaW4tb2YtcmVzcG9uc2liaWxpdHknIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnQ29tbWFuZCcsIGxpbms6ICcvdHIvYmVoYXZpb3JhbC9jb21tYW5kJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ0ludGVycHJldGVyJywgbGluazogJy90ci9iZWhhdmlvcmFsL2ludGVycHJldGVyJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ0l0ZXJhdG9yJywgbGluazogJy90ci9iZWhhdmlvcmFsL2l0ZXJhdG9yJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ01lZGlhdG9yJywgbGluazogJy90ci9iZWhhdmlvcmFsL21lZGlhdG9yJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ01lbWVudG8nLCBsaW5rOiAnL3RyL2JlaGF2aW9yYWwvbWVtZW50bycgfSxcbiAgICAgICAgICB7IHRleHQ6ICdOdWxsIE9iamVjdCcsIGxpbms6ICcvdHIvYmVoYXZpb3JhbC9udWxsLW9iamVjdCcgfSxcbiAgICAgICAgICB7IHRleHQ6ICdPYnNlcnZlcicsIGxpbms6ICcvdHIvYmVoYXZpb3JhbC9vYnNlcnZlcicgfSxcbiAgICAgICAgICB7IHRleHQ6ICdTdGF0ZScsIGxpbms6ICcvdHIvYmVoYXZpb3JhbC9zdGF0ZScgfSxcbiAgICAgICAgICB7IHRleHQ6ICdTdHJhdGVneScsIGxpbms6ICcvdHIvYmVoYXZpb3JhbC9zdHJhdGVneScgfSxcbiAgICAgICAgICB7IHRleHQ6ICdUZW1wbGF0ZSBNZXRob2QnLCBsaW5rOiAnL3RyL2JlaGF2aW9yYWwvdGVtcGxhdGUtbWV0aG9kJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ1Zpc2l0b3InLCBsaW5rOiAnL3RyL2JlaGF2aW9yYWwvdmlzaXRvcicgfVxuICAgICAgICBdXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiAnWWFyYXRcdTAxMzFtc2FsIEthbFx1MDEzMXBsYXInLFxuICAgICAgICBjb2xsYXBzZWQ6IGZhbHNlLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgIHsgdGV4dDogJ1NpbmdsZXRvbicsIGxpbms6ICcvdHIvY3JlYXRpb25hbC9zaW5nbGV0b24nIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnRmFjdG9yeSBNZXRob2QnLCBsaW5rOiAnL3RyL2NyZWF0aW9uYWwvZmFjdG9yeS1tZXRob2QnIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnQWJzdHJhY3QgRmFjdG9yeScsIGxpbms6ICcvdHIvY3JlYXRpb25hbC9hYnN0cmFjdC1mYWN0b3J5JyB9LFxuICAgICAgICAgIHsgdGV4dDogJ0J1aWxkZXInLCBsaW5rOiAnL3RyL2NyZWF0aW9uYWwvYnVpbGRlcicgfSxcbiAgICAgICAgICB7IHRleHQ6ICdQcm90b3R5cGUnLCBsaW5rOiAnL3RyL2NyZWF0aW9uYWwvcHJvdG90eXBlJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ09iamVjdCBQb29sJywgbGluazogJy90ci9jcmVhdGlvbmFsL29iamVjdC1wb29sJyB9XG4gICAgICAgIF1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICdZYXBcdTAxMzFzYWwgS2FsXHUwMTMxcGxhcicsXG4gICAgICAgIGNvbGxhcHNlZDogZmFsc2UsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgeyB0ZXh0OiAnQWRhcHRlcicsIGxpbms6ICcvdHIvc3RydWN0dXJhbC9hZGFwdGVyJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ0JyaWRnZScsIGxpbms6ICcvdHIvc3RydWN0dXJhbC9icmlkZ2UnIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnQ29tcG9zaXRlJywgbGluazogJy90ci9zdHJ1Y3R1cmFsL2NvbXBvc2l0ZScgfSxcbiAgICAgICAgICB7IHRleHQ6ICdEZWNvcmF0b3InLCBsaW5rOiAnL3RyL3N0cnVjdHVyYWwvZGVjb3JhdG9yJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ0ZhY2FkZScsIGxpbms6ICcvdHIvc3RydWN0dXJhbC9mYWNhZGUnIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnRmx5d2VpZ2h0JywgbGluazogJy90ci9zdHJ1Y3R1cmFsL2ZseXdlaWdodCcgfSxcbiAgICAgICAgICB7IHRleHQ6ICdQcm94eScsIGxpbms6ICcvdHIvc3RydWN0dXJhbC9wcm94eScgfVxuICAgICAgICBdXG4gICAgICB9XG4gICAgXSxcbiAgICBmb290ZXI6IHtcbiAgICAgIG1lc3NhZ2U6ICc8YSBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL290YWJla29mZi9kZXNpZ24tcGF0dGVybnMvYmxvYi9tYWluL0xJQ0VOU0VcIj5NSVQgTGlzYW5zXHUwMTMxPC9hPiBhbHRcdTAxMzFuZGEgeWF5XHUwMTMxbmxhbm1cdTAxMzFcdTAxNUZ0XHUwMTMxci4nLFxuICAgICAgY29weXJpZ2h0OiAnVGVsaWYgSGFra1x1MDEzMSBcdTAwQTkgMjAyNS1nXHUwMEZDblx1MDBGQ21cdTAwRkN6IDxhIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vb3RhYmVrb2ZmXCI+T3RhYmVrIFNhZGlyaWRpbm92PC9hPidcbiAgICB9XG4gIH1cbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcdml0ZXByZXNzXFxcXGRlc2lnbi1wYXR0ZXJuc1xcXFwudml0ZXByZXNzXFxcXGNvbmZpZ1xcXFxsYW5nc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcdml0ZXByZXNzXFxcXGRlc2lnbi1wYXR0ZXJuc1xcXFwudml0ZXByZXNzXFxcXGNvbmZpZ1xcXFxsYW5nc1xcXFxkZS50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovdml0ZXByZXNzL2Rlc2lnbi1wYXR0ZXJucy8udml0ZXByZXNzL2NvbmZpZy9sYW5ncy9kZS50c1wiO2V4cG9ydCBjb25zdCBkZSA9IHtcbiAgdGl0bGU6IFwiRW50d3VyZnNtdXN0ZXJcIixcbiAgZGVzY3JpcHRpb246IFwiVm9sbHN0XHUwMEU0bmRpZ2VzIFJlZmVyZW56aGFuZGJ1Y2hcIixcbiAgbGFiZWw6ICdEZXV0c2NoJyxcbiAgbGFuZzogJ2RlJyxcbiAgbGluazogJy9kZS8nLFxuICBzZWFyY2g6IHtcbiAgICB0cmFuc2xhdGlvbnM6IHtcbiAgICAgIGJ1dHRvbjogeyBidXR0b25UZXh0OiAnU3VjaGUnLCBidXR0b25BcmlhTGFiZWw6ICdTdWNoZScgfSxcbiAgICAgIG1vZGFsOiB7XG4gICAgICAgIGRpc3BsYXlEZXRhaWxzOiAnRGV0YWlsbGllcnRlIExpc3RlIGFuemVpZ2VuJyxcbiAgICAgICAgcmVzZXRCdXR0b25UaXRsZTogJ1N1Y2hlIHp1clx1MDBGQ2Nrc2V0emVuJyxcbiAgICAgICAgYmFja0J1dHRvblRpdGxlOiAnU3VjaGUgc2NobGllXHUwMERGZW4nLFxuICAgICAgICBub1Jlc3VsdHNUZXh0OiAnS2VpbmUgRXJnZWJuaXNzZSBnZWZ1bmRlbicsXG4gICAgICAgIGZvb3Rlcjoge1xuICAgICAgICAgIHNlbGVjdFRleHQ6ICdhdXN3XHUwMEU0aGxlbicsXG4gICAgICAgICAgc2VsZWN0S2V5QXJpYUxhYmVsOiAnRWluZ2FiZScsXG4gICAgICAgICAgbmF2aWdhdGVUZXh0OiAnbmF2aWdpZXJlbicsXG4gICAgICAgICAgbmF2aWdhdGVVcEtleUFyaWFMYWJlbDogJ1BmZWlsIG5hY2ggb2JlbicsXG4gICAgICAgICAgbmF2aWdhdGVEb3duS2V5QXJpYUxhYmVsOiAnUGZlaWwgbmFjaCB1bnRlbicsXG4gICAgICAgICAgY2xvc2VUZXh0OiAnc2NobGllXHUwMERGZW4nLFxuICAgICAgICAgIGNsb3NlS2V5QXJpYUxhYmVsOiAnRXNjYXBlJ1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LFxuICB0aGVtZUNvbmZpZzoge1xuICAgIGxhc3RVcGRhdGVkOiB7XG4gICAgICB0ZXh0OiAnWnVsZXR6dCBha3R1YWxpc2llcnQnLFxuICAgICAgZm9ybWF0T3B0aW9uczoge1xuICAgICAgICBkYXRlU3R5bGU6ICdsb25nJyxcbiAgICAgICAgdGltZVN0eWxlOiAnc2hvcnQnLFxuICAgICAgICBmb3JjZUxvY2FsZTogdHJ1ZVxuICAgICAgfVxuICAgIH0sXG4gICAgb3V0bGluZToge1xuICAgICAgbGV2ZWw6ICdkZWVwJyxcbiAgICAgIGxhYmVsOiAnQXVmIGRpZXNlciBTZWl0ZSdcbiAgICB9LFxuICAgIGRvY0Zvb3Rlcjoge1xuICAgICAgcHJldjogJ1ZvcmhlcmlnZSBTZWl0ZScsXG4gICAgICBuZXh0OiAnTlx1MDBFNGNoc3RlIFNlaXRlJ1xuICAgIH0sXG4gICAgZGFya01vZGVTd2l0Y2hMYWJlbDogJ0Vyc2NoZWludW5nc2JpbGQnLFxuICAgIGxpZ2h0TW9kZVN3aXRjaFRpdGxlOiAnWnVtIGhlbGxlbiBEZXNpZ24gd2VjaHNlbG4nLFxuICAgIGRhcmtNb2RlU3dpdGNoVGl0bGU6ICdadW0gZHVua2xlbiBEZXNpZ24gd2VjaHNlbG4nLFxuICAgIHNpZGViYXJNZW51TGFiZWw6ICdNZW5cdTAwRkMnLFxuICAgIHJldHVyblRvVG9wTGFiZWw6ICdadXJcdTAwRkNjayB6dW0gU2VpdGVuYW5mYW5nJyxcbiAgICBsYW5nTWVudUxhYmVsOiAnU3ByYWNoZSBcdTAwRTRuZGVybicsXG4gICAgc2tpcFRvQ29udGVudExhYmVsOiAnWnVtIEluaGFsdCBzcHJpbmdlbicsXG4gICAgZWRpdExpbms6IHtcbiAgICAgIHBhdHRlcm46ICdodHRwczovL2dpdGh1Yi5jb20vb3RhYmVrb2ZmL2Rlc2lnbi1wYXR0ZXJucy9lZGl0L21haW4vOnBhdGgnLFxuICAgICAgdGV4dDogJ0RpZXNlIFNlaXRlIGF1ZiBHaXRIdWIgYmVhcmJlaXRlbidcbiAgICB9LFxuICAgIG5hdjogW1xuICAgICAgeyB0ZXh0OiAnU3RhcnRzZWl0ZScsIGxpbms6ICcvZGUvJyB9LFxuICAgICAgeyB0ZXh0OiAnS3VyenJlZmVyZW56JywgbGluazogJy9kZS9xdWljay1yZWZlcmVuY2UnIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICdNZWhyJyxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICB7IHRleHQ6ICdBbmRlcmUgUHJvamVrdGUnLCBsaW5rOiAnaHR0cHM6Ly9naXRodWIuY29tL290YWJla29mZicgfSxcbiAgICAgICAgICB7IHRleHQ6ICdVbnRlcnN0XHUwMEZDdHplbiBTaWUgdW5zJywgbGluazogJ2h0dHBzOi8vdGlyaWtjaGlsaWsudXovdXpoYW5keScgfVxuICAgICAgICBdXG4gICAgICB9XG4gICAgXSxcbiAgICBzaWRlYmFyOiBbXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICdFcnN0ZSBTY2hyaXR0ZScsXG4gICAgICAgIGNvbGxhcHNlZDogZmFsc2UsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgeyB0ZXh0OiAnRWluZlx1MDBGQ2hydW5nJywgbGluazogJy9kZS9pbnRyb2R1Y3Rpb24nIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnVG91cicsIGxpbms6ICcvZGUvdG91cicgfSxcbiAgICAgICAgICB7IHRleHQ6ICdLdXJ6cmVmZXJlbnonLCBsaW5rOiAnL2RlL3F1aWNrLXJlZmVyZW5jZScgfVxuICAgICAgICBdXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiAnQXJjaGl0ZWt0dXJtdXN0ZXInLFxuICAgICAgICBjb2xsYXBzZWQ6IGZhbHNlLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgIHsgdGV4dDogJ0FjdGl2ZSBSZWNvcmQnLCBsaW5rOiAnL2RlL2FyY2hpdGVjdHVyYWwvYWN0aXZlLXJlY29yZCcgfSxcbiAgICAgICAgICB7IHRleHQ6ICdDUVJTJywgbGluazogJy9kZS9hcmNoaXRlY3R1cmFsL2NxcnMnIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnRGF0YSBNYXBwZXInLCBsaW5rOiAnL2RlL2FyY2hpdGVjdHVyYWwvZGF0YS1tYXBwZXInIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnRGVwZW5kZW5jeSBJbmplY3Rpb24nLCBsaW5rOiAnL2RlL2FyY2hpdGVjdHVyYWwvZGVwZW5kZW5jeS1pbmplY3Rpb24nIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnRXZlbnQgU291cmNpbmcnLCBsaW5rOiAnL2RlL2FyY2hpdGVjdHVyYWwvZXZlbnQtc291cmNpbmcnIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnTVZDJywgbGluazogJy9kZS9hcmNoaXRlY3R1cmFsL212YycgfSxcbiAgICAgICAgICB7IHRleHQ6ICdNVlAnLCBsaW5rOiAnL2RlL2FyY2hpdGVjdHVyYWwvbXZwJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ01WVk0nLCBsaW5rOiAnL2RlL2FyY2hpdGVjdHVyYWwvbXZ2bScgfSxcbiAgICAgICAgICB7IHRleHQ6ICdQcm9kdWNlciBDb25zdW1lcicsIGxpbms6ICcvZGUvYXJjaGl0ZWN0dXJhbC9wcm9kdWNlci1jb25zdW1lcicgfSxcbiAgICAgICAgICB7IHRleHQ6ICdSZWFkIFdyaXRlIExvY2snLCBsaW5rOiAnL2RlL2FyY2hpdGVjdHVyYWwvcmVhZC13cml0ZS1sb2NrJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ1JlcG9zaXRvcnknLCBsaW5rOiAnL2RlL2FyY2hpdGVjdHVyYWwvcmVwb3NpdG9yeScgfSxcbiAgICAgICAgICB7IHRleHQ6ICdTY2hlZHVsZXInLCBsaW5rOiAnL2RlL2FyY2hpdGVjdHVyYWwvc2NoZWR1bGVyJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ1NlcnZpY2UgTG9jYXRvcicsIGxpbms6ICcvZGUvYXJjaGl0ZWN0dXJhbC9zZXJ2aWNlLWxvY2F0b3InIH1cbiAgICAgICAgXVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJ1ZlcmhhbHRlbnNtdXN0ZXInLFxuICAgICAgICBjb2xsYXBzZWQ6IGZhbHNlLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgIHsgdGV4dDogJ0NoYWluIG9mIFJlc3BvbnNpYmlsaXR5JywgbGluazogJy9kZS9iZWhhdmlvcmFsL2NoYWluLW9mLXJlc3BvbnNpYmlsaXR5JyB9LFxuICAgICAgICAgIHsgdGV4dDogJ0NvbW1hbmQnLCBsaW5rOiAnL2RlL2JlaGF2aW9yYWwvY29tbWFuZCcgfSxcbiAgICAgICAgICB7IHRleHQ6ICdJbnRlcnByZXRlcicsIGxpbms6ICcvZGUvYmVoYXZpb3JhbC9pbnRlcnByZXRlcicgfSxcbiAgICAgICAgICB7IHRleHQ6ICdJdGVyYXRvcicsIGxpbms6ICcvZGUvYmVoYXZpb3JhbC9pdGVyYXRvcicgfSxcbiAgICAgICAgICB7IHRleHQ6ICdNZWRpYXRvcicsIGxpbms6ICcvZGUvYmVoYXZpb3JhbC9tZWRpYXRvcicgfSxcbiAgICAgICAgICB7IHRleHQ6ICdNZW1lbnRvJywgbGluazogJy9kZS9iZWhhdmlvcmFsL21lbWVudG8nIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnTnVsbCBPYmplY3QnLCBsaW5rOiAnL2RlL2JlaGF2aW9yYWwvbnVsbC1vYmplY3QnIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnT2JzZXJ2ZXInLCBsaW5rOiAnL2RlL2JlaGF2aW9yYWwvb2JzZXJ2ZXInIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnU3RhdGUnLCBsaW5rOiAnL2RlL2JlaGF2aW9yYWwvc3RhdGUnIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnU3RyYXRlZ3knLCBsaW5rOiAnL2RlL2JlaGF2aW9yYWwvc3RyYXRlZ3knIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnVGVtcGxhdGUgTWV0aG9kJywgbGluazogJy9kZS9iZWhhdmlvcmFsL3RlbXBsYXRlLW1ldGhvZCcgfSxcbiAgICAgICAgICB7IHRleHQ6ICdWaXNpdG9yJywgbGluazogJy9kZS9iZWhhdmlvcmFsL3Zpc2l0b3InIH1cbiAgICAgICAgXVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJ0VyemV1Z3VuZ3NtdXN0ZXInLFxuICAgICAgICBjb2xsYXBzZWQ6IGZhbHNlLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgIHsgdGV4dDogJ1NpbmdsZXRvbicsIGxpbms6ICcvZGUvY3JlYXRpb25hbC9zaW5nbGV0b24nIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnRmFjdG9yeSBNZXRob2QnLCBsaW5rOiAnL2RlL2NyZWF0aW9uYWwvZmFjdG9yeS1tZXRob2QnIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnQWJzdHJhY3QgRmFjdG9yeScsIGxpbms6ICcvZGUvY3JlYXRpb25hbC9hYnN0cmFjdC1mYWN0b3J5JyB9LFxuICAgICAgICAgIHsgdGV4dDogJ0J1aWxkZXInLCBsaW5rOiAnL2RlL2NyZWF0aW9uYWwvYnVpbGRlcicgfSxcbiAgICAgICAgICB7IHRleHQ6ICdQcm90b3R5cGUnLCBsaW5rOiAnL2RlL2NyZWF0aW9uYWwvcHJvdG90eXBlJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ09iamVjdCBQb29sJywgbGluazogJy9kZS9jcmVhdGlvbmFsL29iamVjdC1wb29sJyB9XG4gICAgICAgIF1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICdTdHJ1a3R1cm11c3RlcicsXG4gICAgICAgIGNvbGxhcHNlZDogZmFsc2UsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgeyB0ZXh0OiAnQWRhcHRlcicsIGxpbms6ICcvZGUvc3RydWN0dXJhbC9hZGFwdGVyJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ0JyaWRnZScsIGxpbms6ICcvZGUvc3RydWN0dXJhbC9icmlkZ2UnIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnQ29tcG9zaXRlJywgbGluazogJy9kZS9zdHJ1Y3R1cmFsL2NvbXBvc2l0ZScgfSxcbiAgICAgICAgICB7IHRleHQ6ICdEZWNvcmF0b3InLCBsaW5rOiAnL2RlL3N0cnVjdHVyYWwvZGVjb3JhdG9yJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ0ZhY2FkZScsIGxpbms6ICcvZGUvc3RydWN0dXJhbC9mYWNhZGUnIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnRmx5d2VpZ2h0JywgbGluazogJy9kZS9zdHJ1Y3R1cmFsL2ZseXdlaWdodCcgfSxcbiAgICAgICAgICB7IHRleHQ6ICdQcm94eScsIGxpbms6ICcvZGUvc3RydWN0dXJhbC9wcm94eScgfVxuICAgICAgICBdXG4gICAgICB9XG4gICAgXSxcbiAgICBmb290ZXI6IHtcbiAgICAgIG1lc3NhZ2U6ICdWZXJcdTAwRjZmZmVudGxpY2h0IHVudGVyIGRlciA8YSBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL290YWJla29mZi9kZXNpZ24tcGF0dGVybnMvYmxvYi9tYWluL0xJQ0VOU0VcIj5NSVQtTGl6ZW56PC9hPi4nLFxuICAgICAgY29weXJpZ2h0OiAnVXJoZWJlcnJlY2h0IFx1MDBBOSAyMDI1LWhldXRlIDxhIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vb3RhYmVrb2ZmXCI+T3RhYmVrIFNhZGlyaWRpbm92PC9hPidcbiAgICB9XG4gIH1cbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcdml0ZXByZXNzXFxcXGRlc2lnbi1wYXR0ZXJuc1xcXFwudml0ZXByZXNzXFxcXGNvbmZpZ1xcXFxsYW5nc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcdml0ZXByZXNzXFxcXGRlc2lnbi1wYXR0ZXJuc1xcXFwudml0ZXByZXNzXFxcXGNvbmZpZ1xcXFxsYW5nc1xcXFxlcy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovdml0ZXByZXNzL2Rlc2lnbi1wYXR0ZXJucy8udml0ZXByZXNzL2NvbmZpZy9sYW5ncy9lcy50c1wiO2V4cG9ydCBjb25zdCBlcyA9IHtcbiAgdGl0bGU6IFwiUGF0cm9uZXMgZGUgRGlzZVx1MDBGMW9cIixcbiAgZGVzY3JpcHRpb246IFwiR3VcdTAwRURhIGRlIFJlZmVyZW5jaWEgQ29tcGxldGFcIixcbiAgbGFiZWw6ICdFc3BhXHUwMEYxb2wnLFxuICBsYW5nOiAnZXMnLFxuICBsaW5rOiAnL2VzLycsXG4gIHNlYXJjaDoge1xuICAgIHRyYW5zbGF0aW9uczoge1xuICAgICAgYnV0dG9uOiB7IGJ1dHRvblRleHQ6ICdCdXNjYXInLCBidXR0b25BcmlhTGFiZWw6ICdCdXNjYXInIH0sXG4gICAgICBtb2RhbDoge1xuICAgICAgICBkaXNwbGF5RGV0YWlsczogJ01vc3RyYXIgbGlzdGEgZGV0YWxsYWRhJyxcbiAgICAgICAgcmVzZXRCdXR0b25UaXRsZTogJ1Jlc3RhYmxlY2VyIGJcdTAwRkFzcXVlZGEnLFxuICAgICAgICBiYWNrQnV0dG9uVGl0bGU6ICdDZXJyYXIgYlx1MDBGQXNxdWVkYScsXG4gICAgICAgIG5vUmVzdWx0c1RleHQ6ICdObyBzZSBlbmNvbnRyYXJvbiByZXN1bHRhZG9zJyxcbiAgICAgICAgZm9vdGVyOiB7XG4gICAgICAgICAgc2VsZWN0VGV4dDogJ3BhcmEgc2VsZWNjaW9uYXInLFxuICAgICAgICAgIHNlbGVjdEtleUFyaWFMYWJlbDogJ2VudHJhZGEnLFxuICAgICAgICAgIG5hdmlnYXRlVGV4dDogJ3BhcmEgbmF2ZWdhcicsXG4gICAgICAgICAgbmF2aWdhdGVVcEtleUFyaWFMYWJlbDogJ2ZsZWNoYSBhcnJpYmEnLFxuICAgICAgICAgIG5hdmlnYXRlRG93bktleUFyaWFMYWJlbDogJ2ZsZWNoYSBhYmFqbycsXG4gICAgICAgICAgY2xvc2VUZXh0OiAncGFyYSBjZXJyYXInLFxuICAgICAgICAgIGNsb3NlS2V5QXJpYUxhYmVsOiAnZXNjYXBlJ1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LFxuICB0aGVtZUNvbmZpZzoge1xuICAgIGxhc3RVcGRhdGVkOiB7XG4gICAgICB0ZXh0OiAnXHUwMERBbHRpbWEgYWN0dWFsaXphY2lcdTAwRjNuJyxcbiAgICAgIGZvcm1hdE9wdGlvbnM6IHtcbiAgICAgICAgZGF0ZVN0eWxlOiAnbG9uZycsXG4gICAgICAgIHRpbWVTdHlsZTogJ3Nob3J0JyxcbiAgICAgICAgZm9yY2VMb2NhbGU6IHRydWVcbiAgICAgIH1cbiAgICB9LFxuICAgIG91dGxpbmU6IHtcbiAgICAgIGxldmVsOiAnZGVlcCcsXG4gICAgICBsYWJlbDogJ0VuIGVzdGEgcFx1MDBFMWdpbmEnXG4gICAgfSxcbiAgICBkb2NGb290ZXI6IHtcbiAgICAgIHByZXY6ICdQXHUwMEUxZ2luYSBhbnRlcmlvcicsXG4gICAgICBuZXh0OiAnUFx1MDBFMWdpbmEgc2lndWllbnRlJ1xuICAgIH0sXG4gICAgZGFya01vZGVTd2l0Y2hMYWJlbDogJ0FwYXJpZW5jaWEnLFxuICAgIGxpZ2h0TW9kZVN3aXRjaFRpdGxlOiAnQ2FtYmlhciBhbCB0ZW1hIGNsYXJvJyxcbiAgICBkYXJrTW9kZVN3aXRjaFRpdGxlOiAnQ2FtYmlhciBhbCB0ZW1hIG9zY3VybycsXG4gICAgc2lkZWJhck1lbnVMYWJlbDogJ01lblx1MDBGQScsXG4gICAgcmV0dXJuVG9Ub3BMYWJlbDogJ1ZvbHZlciBhcnJpYmEnLFxuICAgIGxhbmdNZW51TGFiZWw6ICdDYW1iaWFyIGlkaW9tYScsXG4gICAgc2tpcFRvQ29udGVudExhYmVsOiAnU2FsdGFyIGFsIGNvbnRlbmlkbycsXG4gICAgZWRpdExpbms6IHtcbiAgICAgIHBhdHRlcm46ICdodHRwczovL2dpdGh1Yi5jb20vb3RhYmVrb2ZmL2Rlc2lnbi1wYXR0ZXJucy9lZGl0L21haW4vOnBhdGgnLFxuICAgICAgdGV4dDogJ0VkaXRhciBlc3RhIHBcdTAwRTFnaW5hIGVuIEdpdEh1YidcbiAgICB9LFxuICAgIG5hdjogW1xuICAgICAgeyB0ZXh0OiAnSW5pY2lvJywgbGluazogJy9lcy8nIH0sXG4gICAgICB7IHRleHQ6ICdSZWZlcmVuY2lhIFJcdTAwRTFwaWRhJywgbGluazogJy9lcy9xdWljay1yZWZlcmVuY2UnIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICdNXHUwMEUxcycsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgeyB0ZXh0OiAnT3Ryb3MgcHJveWVjdG9zJywgbGluazogJ2h0dHBzOi8vZ2l0aHViLmNvbS9vdGFiZWtvZmYnIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnQXBcdTAwRjN5YW5vcycsIGxpbms6ICdodHRwczovL3RpcmlrY2hpbGlrLnV6L3V6aGFuZHknIH1cbiAgICAgICAgXVxuICAgICAgfVxuICAgIF0sXG4gICAgc2lkZWJhcjogW1xuICAgICAge1xuICAgICAgICB0ZXh0OiAnRW1wZXphbmRvJyxcbiAgICAgICAgY29sbGFwc2VkOiBmYWxzZSxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICB7IHRleHQ6ICdJbnRyb2R1Y2NpXHUwMEYzbicsIGxpbms6ICcvZXMvaW50cm9kdWN0aW9uJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ1RvdXInLCBsaW5rOiAnL2VzL3RvdXInIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnUmVmZXJlbmNpYSBSXHUwMEUxcGlkYScsIGxpbms6ICcvZXMvcXVpY2stcmVmZXJlbmNlJyB9XG4gICAgICAgIF1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICdQYXRyb25lcyBBcnF1aXRlY3RcdTAwRjNuaWNvcycsXG4gICAgICAgIGNvbGxhcHNlZDogZmFsc2UsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgeyB0ZXh0OiAnQWN0aXZlIFJlY29yZCcsIGxpbms6ICcvZXMvYXJjaGl0ZWN0dXJhbC9hY3RpdmUtcmVjb3JkJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ0NRUlMnLCBsaW5rOiAnL2VzL2FyY2hpdGVjdHVyYWwvY3FycycgfSxcbiAgICAgICAgICB7IHRleHQ6ICdEYXRhIE1hcHBlcicsIGxpbms6ICcvZXMvYXJjaGl0ZWN0dXJhbC9kYXRhLW1hcHBlcicgfSxcbiAgICAgICAgICB7IHRleHQ6ICdEZXBlbmRlbmN5IEluamVjdGlvbicsIGxpbms6ICcvZXMvYXJjaGl0ZWN0dXJhbC9kZXBlbmRlbmN5LWluamVjdGlvbicgfSxcbiAgICAgICAgICB7IHRleHQ6ICdFdmVudCBTb3VyY2luZycsIGxpbms6ICcvZXMvYXJjaGl0ZWN0dXJhbC9ldmVudC1zb3VyY2luZycgfSxcbiAgICAgICAgICB7IHRleHQ6ICdNVkMnLCBsaW5rOiAnL2VzL2FyY2hpdGVjdHVyYWwvbXZjJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ01WUCcsIGxpbms6ICcvZXMvYXJjaGl0ZWN0dXJhbC9tdnAnIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnTVZWTScsIGxpbms6ICcvZXMvYXJjaGl0ZWN0dXJhbC9tdnZtJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ1Byb2R1Y2VyIENvbnN1bWVyJywgbGluazogJy9lcy9hcmNoaXRlY3R1cmFsL3Byb2R1Y2VyLWNvbnN1bWVyJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ1JlYWQgV3JpdGUgTG9jaycsIGxpbms6ICcvZXMvYXJjaGl0ZWN0dXJhbC9yZWFkLXdyaXRlLWxvY2snIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnUmVwb3NpdG9yeScsIGxpbms6ICcvZXMvYXJjaGl0ZWN0dXJhbC9yZXBvc2l0b3J5JyB9LFxuICAgICAgICAgIHsgdGV4dDogJ1NjaGVkdWxlcicsIGxpbms6ICcvZXMvYXJjaGl0ZWN0dXJhbC9zY2hlZHVsZXInIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnU2VydmljZSBMb2NhdG9yJywgbGluazogJy9lcy9hcmNoaXRlY3R1cmFsL3NlcnZpY2UtbG9jYXRvcicgfVxuICAgICAgICBdXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiAnUGF0cm9uZXMgZGUgQ29tcG9ydGFtaWVudG8nLFxuICAgICAgICBjb2xsYXBzZWQ6IGZhbHNlLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgIHsgdGV4dDogJ0NoYWluIG9mIFJlc3BvbnNpYmlsaXR5JywgbGluazogJy9lcy9iZWhhdmlvcmFsL2NoYWluLW9mLXJlc3BvbnNpYmlsaXR5JyB9LFxuICAgICAgICAgIHsgdGV4dDogJ0NvbW1hbmQnLCBsaW5rOiAnL2VzL2JlaGF2aW9yYWwvY29tbWFuZCcgfSxcbiAgICAgICAgICB7IHRleHQ6ICdJbnRlcnByZXRlcicsIGxpbms6ICcvZXMvYmVoYXZpb3JhbC9pbnRlcnByZXRlcicgfSxcbiAgICAgICAgICB7IHRleHQ6ICdJdGVyYXRvcicsIGxpbms6ICcvZXMvYmVoYXZpb3JhbC9pdGVyYXRvcicgfSxcbiAgICAgICAgICB7IHRleHQ6ICdNZWRpYXRvcicsIGxpbms6ICcvZXMvYmVoYXZpb3JhbC9tZWRpYXRvcicgfSxcbiAgICAgICAgICB7IHRleHQ6ICdNZW1lbnRvJywgbGluazogJy9lcy9iZWhhdmlvcmFsL21lbWVudG8nIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnTnVsbCBPYmplY3QnLCBsaW5rOiAnL2VzL2JlaGF2aW9yYWwvbnVsbC1vYmplY3QnIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnT2JzZXJ2ZXInLCBsaW5rOiAnL2VzL2JlaGF2aW9yYWwvb2JzZXJ2ZXInIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnU3RhdGUnLCBsaW5rOiAnL2VzL2JlaGF2aW9yYWwvc3RhdGUnIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnU3RyYXRlZ3knLCBsaW5rOiAnL2VzL2JlaGF2aW9yYWwvc3RyYXRlZ3knIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnVGVtcGxhdGUgTWV0aG9kJywgbGluazogJy9lcy9iZWhhdmlvcmFsL3RlbXBsYXRlLW1ldGhvZCcgfSxcbiAgICAgICAgICB7IHRleHQ6ICdWaXNpdG9yJywgbGluazogJy9lcy9iZWhhdmlvcmFsL3Zpc2l0b3InIH1cbiAgICAgICAgXVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJ1BhdHJvbmVzIENyZWFjaW9uYWxlcycsXG4gICAgICAgIGNvbGxhcHNlZDogZmFsc2UsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgeyB0ZXh0OiAnU2luZ2xldG9uJywgbGluazogJy9lcy9jcmVhdGlvbmFsL3NpbmdsZXRvbicgfSxcbiAgICAgICAgICB7IHRleHQ6ICdGYWN0b3J5IE1ldGhvZCcsIGxpbms6ICcvZXMvY3JlYXRpb25hbC9mYWN0b3J5LW1ldGhvZCcgfSxcbiAgICAgICAgICB7IHRleHQ6ICdBYnN0cmFjdCBGYWN0b3J5JywgbGluazogJy9lcy9jcmVhdGlvbmFsL2Fic3RyYWN0LWZhY3RvcnknIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnQnVpbGRlcicsIGxpbms6ICcvZXMvY3JlYXRpb25hbC9idWlsZGVyJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ1Byb3RvdHlwZScsIGxpbms6ICcvZXMvY3JlYXRpb25hbC9wcm90b3R5cGUnIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnT2JqZWN0IFBvb2wnLCBsaW5rOiAnL2VzL2NyZWF0aW9uYWwvb2JqZWN0LXBvb2wnIH1cbiAgICAgICAgXVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJ1BhdHJvbmVzIEVzdHJ1Y3R1cmFsZXMnLFxuICAgICAgICBjb2xsYXBzZWQ6IGZhbHNlLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgIHsgdGV4dDogJ0FkYXB0ZXInLCBsaW5rOiAnL2VzL3N0cnVjdHVyYWwvYWRhcHRlcicgfSxcbiAgICAgICAgICB7IHRleHQ6ICdCcmlkZ2UnLCBsaW5rOiAnL2VzL3N0cnVjdHVyYWwvYnJpZGdlJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ0NvbXBvc2l0ZScsIGxpbms6ICcvZXMvc3RydWN0dXJhbC9jb21wb3NpdGUnIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnRGVjb3JhdG9yJywgbGluazogJy9lcy9zdHJ1Y3R1cmFsL2RlY29yYXRvcicgfSxcbiAgICAgICAgICB7IHRleHQ6ICdGYWNhZGUnLCBsaW5rOiAnL2VzL3N0cnVjdHVyYWwvZmFjYWRlJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ0ZseXdlaWdodCcsIGxpbms6ICcvZXMvc3RydWN0dXJhbC9mbHl3ZWlnaHQnIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnUHJveHknLCBsaW5rOiAnL2VzL3N0cnVjdHVyYWwvcHJveHknIH1cbiAgICAgICAgXVxuICAgICAgfVxuICAgIF0sXG4gICAgZm9vdGVyOiB7XG4gICAgICBtZXNzYWdlOiAnUHVibGljYWRvIGJham8gbGEgPGEgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9vdGFiZWtvZmYvZGVzaWduLXBhdHRlcm5zL2Jsb2IvbWFpbi9MSUNFTlNFXCI+TGljZW5jaWEgTUlUPC9hPi4nLFxuICAgICAgY29weXJpZ2h0OiAnRGVyZWNob3MgZGUgYXV0b3IgXHUwMEE5IDIwMjUtcHJlc2VudGUgPGEgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9vdGFiZWtvZmZcIj5PdGFiZWsgU2FkaXJpZGlub3Y8L2E+J1xuICAgIH1cbiAgfVxufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFx2aXRlcHJlc3NcXFxcZGVzaWduLXBhdHRlcm5zXFxcXC52aXRlcHJlc3NcXFxcY29uZmlnXFxcXGxhbmdzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFx2aXRlcHJlc3NcXFxcZGVzaWduLXBhdHRlcm5zXFxcXC52aXRlcHJlc3NcXFxcY29uZmlnXFxcXGxhbmdzXFxcXGFyLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi92aXRlcHJlc3MvZGVzaWduLXBhdHRlcm5zLy52aXRlcHJlc3MvY29uZmlnL2xhbmdzL2FyLnRzXCI7ZXhwb3J0IGNvbnN0IGFyID0ge1xuICB0aXRsZTogXCJcdTA2MjNcdTA2NDZcdTA2NDVcdTA2MjdcdTA2MzcgXHUwNjI3XHUwNjQ0XHUwNjJBXHUwNjM1XHUwNjQ1XHUwNjRBXHUwNjQ1XCIsXG4gIGRlc2NyaXB0aW9uOiBcIlx1MDYyN1x1MDY0NFx1MDYyRlx1MDY0NFx1MDY0QVx1MDY0NCBcdTA2MjdcdTA2NDRcdTA2NDVcdTA2MzFcdTA2MkNcdTA2MzlcdTA2NEEgXHUwNjI3XHUwNjQ0XHUwNjM0XHUwNjI3XHUwNjQ1XHUwNjQ0XCIsXG4gIGxhYmVsOiAnXHUwNjI3XHUwNjQ0XHUwNjM5XHUwNjMxXHUwNjI4XHUwNjRBXHUwNjI5JyxcbiAgbGFuZzogJ2FyJyxcbiAgbGluazogJy9hci8nLFxuICBkaXI6ICdydGwnLFxuICBzZWFyY2g6IHtcbiAgICB0cmFuc2xhdGlvbnM6IHtcbiAgICAgIGJ1dHRvbjogeyBidXR0b25UZXh0OiAnXHUwNjI4XHUwNjJEXHUwNjJCJywgYnV0dG9uQXJpYUxhYmVsOiAnXHUwNjI4XHUwNjJEXHUwNjJCJyB9LFxuICAgICAgbW9kYWw6IHtcbiAgICAgICAgZGlzcGxheURldGFpbHM6ICdcdTA2MzlcdTA2MzFcdTA2MzYgXHUwNjQyXHUwNjI3XHUwNjI2XHUwNjQ1XHUwNjI5IFx1MDY0NVx1MDY0MVx1MDYzNVx1MDY0NFx1MDYyOScsXG4gICAgICAgIHJlc2V0QnV0dG9uVGl0bGU6ICdcdTA2MjVcdTA2MzlcdTA2MjdcdTA2MkZcdTA2MjkgXHUwNjM2XHUwNjI4XHUwNjM3IFx1MDYyN1x1MDY0NFx1MDYyOFx1MDYyRFx1MDYyQicsXG4gICAgICAgIGJhY2tCdXR0b25UaXRsZTogJ1x1MDYyNVx1MDYzQVx1MDY0NFx1MDYyN1x1MDY0MiBcdTA2MjdcdTA2NDRcdTA2MjhcdTA2MkRcdTA2MkInLFxuICAgICAgICBub1Jlc3VsdHNUZXh0OiAnXHUwNjQ0XHUwNjQ1IFx1MDY0QVx1MDYyQVx1MDY0NSBcdTA2MjdcdTA2NDRcdTA2MzlcdTA2MkJcdTA2NDhcdTA2MzEgXHUwNjM5XHUwNjQ0XHUwNjQ5IFx1MDY0Nlx1MDYyQVx1MDYyN1x1MDYyNlx1MDYyQycsXG4gICAgICAgIGZvb3Rlcjoge1xuICAgICAgICAgIHNlbGVjdFRleHQ6ICdcdTA2NDRcdTA2NDRcdTA2MjdcdTA2MkVcdTA2MkFcdTA2NEFcdTA2MjdcdTA2MzEnLFxuICAgICAgICAgIHNlbGVjdEtleUFyaWFMYWJlbDogJ1x1MDYyNVx1MDYyRlx1MDYyRVx1MDYyN1x1MDY0NCcsXG4gICAgICAgICAgbmF2aWdhdGVUZXh0OiAnXHUwNjQ0XHUwNjQ0XHUwNjJBXHUwNjQ2XHUwNjQyXHUwNjQ0JyxcbiAgICAgICAgICBuYXZpZ2F0ZVVwS2V5QXJpYUxhYmVsOiAnXHUwNjI3XHUwNjQ0XHUwNjMzXHUwNjQ3XHUwNjQ1IFx1MDY0NFx1MDYyM1x1MDYzOVx1MDY0NFx1MDY0OScsXG4gICAgICAgICAgbmF2aWdhdGVEb3duS2V5QXJpYUxhYmVsOiAnXHUwNjI3XHUwNjQ0XHUwNjMzXHUwNjQ3XHUwNjQ1IFx1MDY0NFx1MDYyM1x1MDYzM1x1MDY0MVx1MDY0NCcsXG4gICAgICAgICAgY2xvc2VUZXh0OiAnXHUwNjQ0XHUwNjQ0XHUwNjI1XHUwNjNBXHUwNjQ0XHUwNjI3XHUwNjQyJyxcbiAgICAgICAgICBjbG9zZUtleUFyaWFMYWJlbDogJ1x1MDYyNVx1MDYzQVx1MDY0NFx1MDYyN1x1MDY0MidcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgdGhlbWVDb25maWc6IHtcbiAgICBsYXN0VXBkYXRlZDoge1xuICAgICAgdGV4dDogJ1x1MDYyMlx1MDYyRVx1MDYzMSBcdTA2MkFcdTA2MkRcdTA2MkZcdTA2NEFcdTA2MkInLFxuICAgICAgZm9ybWF0T3B0aW9uczoge1xuICAgICAgICBkYXRlU3R5bGU6ICdsb25nJyxcbiAgICAgICAgdGltZVN0eWxlOiAnc2hvcnQnLFxuICAgICAgICBmb3JjZUxvY2FsZTogdHJ1ZVxuICAgICAgfVxuICAgIH0sXG4gICAgb3V0bGluZToge1xuICAgICAgbGV2ZWw6ICdkZWVwJyxcbiAgICAgIGxhYmVsOiAnXHUwNjQxXHUwNjRBIFx1MDY0N1x1MDYzMFx1MDY0NyBcdTA2MjdcdTA2NDRcdTA2MzVcdTA2NDFcdTA2MkRcdTA2MjknXG4gICAgfSxcbiAgICBkb2NGb290ZXI6IHtcbiAgICAgIHByZXY6ICdcdTA2MjdcdTA2NDRcdTA2MzVcdTA2NDFcdTA2MkRcdTA2MjkgXHUwNjI3XHUwNjQ0XHUwNjMzXHUwNjI3XHUwNjI4XHUwNjQyXHUwNjI5JyxcbiAgICAgIG5leHQ6ICdcdTA2MjdcdTA2NDRcdTA2MzVcdTA2NDFcdTA2MkRcdTA2MjkgXHUwNjI3XHUwNjQ0XHUwNjJBXHUwNjI3XHUwNjQ0XHUwNjRBXHUwNjI5J1xuICAgIH0sXG4gICAgZGFya01vZGVTd2l0Y2hMYWJlbDogJ1x1MDYyN1x1MDY0NFx1MDY0NVx1MDYzOFx1MDY0N1x1MDYzMScsXG4gICAgbGlnaHRNb2RlU3dpdGNoVGl0bGU6ICdcdTA2MjdcdTA2NDRcdTA2MkFcdTA2MjhcdTA2MkZcdTA2NEFcdTA2NDQgXHUwNjI1XHUwNjQ0XHUwNjQ5IFx1MDYyN1x1MDY0NFx1MDY0NVx1MDYzOFx1MDY0N1x1MDYzMSBcdTA2MjdcdTA2NDRcdTA2NDFcdTA2MjdcdTA2MkFcdTA2MkQnLFxuICAgIGRhcmtNb2RlU3dpdGNoVGl0bGU6ICdcdTA2MjdcdTA2NDRcdTA2MkFcdTA2MjhcdTA2MkZcdTA2NEFcdTA2NDQgXHUwNjI1XHUwNjQ0XHUwNjQ5IFx1MDYyN1x1MDY0NFx1MDY0NVx1MDYzOFx1MDY0N1x1MDYzMSBcdTA2MjdcdTA2NDRcdTA2MkZcdTA2MjdcdTA2NDNcdTA2NDYnLFxuICAgIHNpZGViYXJNZW51TGFiZWw6ICdcdTA2MjdcdTA2NDRcdTA2NDJcdTA2MjdcdTA2MjZcdTA2NDVcdTA2MjknLFxuICAgIHJldHVyblRvVG9wTGFiZWw6ICdcdTA2MjdcdTA2NDRcdTA2MzlcdTA2NDhcdTA2MkZcdTA2MjkgXHUwNjI1XHUwNjQ0XHUwNjQ5IFx1MDYyN1x1MDY0NFx1MDYyM1x1MDYzOVx1MDY0NFx1MDY0OScsXG4gICAgbGFuZ01lbnVMYWJlbDogJ1x1MDYyQVx1MDYzQVx1MDY0QVx1MDY0QVx1MDYzMSBcdTA2MjdcdTA2NDRcdTA2NDRcdTA2M0FcdTA2MjknLFxuICAgIHNraXBUb0NvbnRlbnRMYWJlbDogJ1x1MDYyQVx1MDYyRVx1MDYzN1x1MDY0QSBcdTA2MjVcdTA2NDRcdTA2NDkgXHUwNjI3XHUwNjQ0XHUwNjQ1XHUwNjJEXHUwNjJBXHUwNjQ4XHUwNjQ5JyxcbiAgICBlZGl0TGluazoge1xuICAgICAgcGF0dGVybjogJ2h0dHBzOi8vZ2l0aHViLmNvbS9vdGFiZWtvZmYvZGVzaWduLXBhdHRlcm5zL2VkaXQvbWFpbi86cGF0aCcsXG4gICAgICB0ZXh0OiAnXHUwNjJBXHUwNjM5XHUwNjJGXHUwNjRBXHUwNjQ0IFx1MDY0N1x1MDYzMFx1MDY0NyBcdTA2MjdcdTA2NDRcdTA2MzVcdTA2NDFcdTA2MkRcdTA2MjkgXHUwNjM5XHUwNjQ0XHUwNjQ5IEdpdEh1YidcbiAgICB9LFxuICAgIG5hdjogW1xuICAgICAgeyB0ZXh0OiAnXHUwNjI3XHUwNjQ0XHUwNjMxXHUwNjI2XHUwNjRBXHUwNjMzXHUwNjRBXHUwNjI5JywgbGluazogJy9hci8nIH0sXG4gICAgICB7IHRleHQ6ICdcdTA2NDVcdTA2MzFcdTA2MkNcdTA2MzkgXHUwNjMzXHUwNjMxXHUwNjRBXHUwNjM5JywgbGluazogJy9hci9xdWljay1yZWZlcmVuY2UnIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICdcdTA2MjdcdTA2NDRcdTA2NDVcdTA2MzJcdTA2NEFcdTA2MkYnLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgIHsgdGV4dDogJ1x1MDY0NVx1MDYzNFx1MDYyN1x1MDYzMVx1MDY0QVx1MDYzOSBcdTA2MjNcdTA2MkVcdTA2MzFcdTA2NDknLCBsaW5rOiAnaHR0cHM6Ly9naXRodWIuY29tL290YWJla29mZicgfSxcbiAgICAgICAgICB7IHRleHQ6ICdcdTA2MjdcdTA2MkZcdTA2MzlcdTA2NDVcdTA2NDZcdTA2MjcnLCBsaW5rOiAnaHR0cHM6Ly90aXJpa2NoaWxpay51ei91emhhbmR5JyB9XG4gICAgICAgIF1cbiAgICAgIH1cbiAgICBdLFxuICAgIHNpZGViYXI6IFtcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJ1x1MDYyN1x1MDY0NFx1MDYyOFx1MDYyRlx1MDYyMScsXG4gICAgICAgIGNvbGxhcHNlZDogZmFsc2UsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgeyB0ZXh0OiAnXHUwNjQ1XHUwNjQyXHUwNjJGXHUwNjQ1XHUwNjI5JywgbGluazogJy9hci9pbnRyb2R1Y3Rpb24nIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnXHUwNjJDXHUwNjQ4XHUwNjQ0XHUwNjI5JywgbGluazogJy9hci90b3VyJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ1x1MDY0NVx1MDYzMVx1MDYyQ1x1MDYzOSBcdTA2MzNcdTA2MzFcdTA2NEFcdTA2MzknLCBsaW5rOiAnL2FyL3F1aWNrLXJlZmVyZW5jZScgfVxuICAgICAgICBdXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiAnXHUwNjI3XHUwNjQ0XHUwNjIzXHUwNjQ2XHUwNjQ1XHUwNjI3XHUwNjM3IFx1MDYyN1x1MDY0NFx1MDY0NVx1MDYzOVx1MDY0NVx1MDYyN1x1MDYzMVx1MDY0QVx1MDYyOScsXG4gICAgICAgIGNvbGxhcHNlZDogZmFsc2UsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgeyB0ZXh0OiAnQWN0aXZlIFJlY29yZCcsIGxpbms6ICcvYXIvYXJjaGl0ZWN0dXJhbC9hY3RpdmUtcmVjb3JkJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ0NRUlMnLCBsaW5rOiAnL2FyL2FyY2hpdGVjdHVyYWwvY3FycycgfSxcbiAgICAgICAgICB7IHRleHQ6ICdEYXRhIE1hcHBlcicsIGxpbms6ICcvYXIvYXJjaGl0ZWN0dXJhbC9kYXRhLW1hcHBlcicgfSxcbiAgICAgICAgICB7IHRleHQ6ICdEZXBlbmRlbmN5IEluamVjdGlvbicsIGxpbms6ICcvYXIvYXJjaGl0ZWN0dXJhbC9kZXBlbmRlbmN5LWluamVjdGlvbicgfSxcbiAgICAgICAgICB7IHRleHQ6ICdFdmVudCBTb3VyY2luZycsIGxpbms6ICcvYXIvYXJjaGl0ZWN0dXJhbC9ldmVudC1zb3VyY2luZycgfSxcbiAgICAgICAgICB7IHRleHQ6ICdNVkMnLCBsaW5rOiAnL2FyL2FyY2hpdGVjdHVyYWwvbXZjJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ01WUCcsIGxpbms6ICcvYXIvYXJjaGl0ZWN0dXJhbC9tdnAnIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnTVZWTScsIGxpbms6ICcvYXIvYXJjaGl0ZWN0dXJhbC9tdnZtJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ1Byb2R1Y2VyIENvbnN1bWVyJywgbGluazogJy9hci9hcmNoaXRlY3R1cmFsL3Byb2R1Y2VyLWNvbnN1bWVyJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ1JlYWQgV3JpdGUgTG9jaycsIGxpbms6ICcvYXIvYXJjaGl0ZWN0dXJhbC9yZWFkLXdyaXRlLWxvY2snIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnUmVwb3NpdG9yeScsIGxpbms6ICcvYXIvYXJjaGl0ZWN0dXJhbC9yZXBvc2l0b3J5JyB9LFxuICAgICAgICAgIHsgdGV4dDogJ1NjaGVkdWxlcicsIGxpbms6ICcvYXIvYXJjaGl0ZWN0dXJhbC9zY2hlZHVsZXInIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnU2VydmljZSBMb2NhdG9yJywgbGluazogJy9hci9hcmNoaXRlY3R1cmFsL3NlcnZpY2UtbG9jYXRvcicgfVxuICAgICAgICBdXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiAnXHUwNjI3XHUwNjQ0XHUwNjIzXHUwNjQ2XHUwNjQ1XHUwNjI3XHUwNjM3IFx1MDYyN1x1MDY0NFx1MDYzM1x1MDY0NFx1MDY0OFx1MDY0M1x1MDY0QVx1MDYyOScsXG4gICAgICAgIGNvbGxhcHNlZDogZmFsc2UsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgeyB0ZXh0OiAnQ2hhaW4gb2YgUmVzcG9uc2liaWxpdHknLCBsaW5rOiAnL2FyL2JlaGF2aW9yYWwvY2hhaW4tb2YtcmVzcG9uc2liaWxpdHknIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnQ29tbWFuZCcsIGxpbms6ICcvYXIvYmVoYXZpb3JhbC9jb21tYW5kJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ0ludGVycHJldGVyJywgbGluazogJy9hci9iZWhhdmlvcmFsL2ludGVycHJldGVyJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ0l0ZXJhdG9yJywgbGluazogJy9hci9iZWhhdmlvcmFsL2l0ZXJhdG9yJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ01lZGlhdG9yJywgbGluazogJy9hci9iZWhhdmlvcmFsL21lZGlhdG9yJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ01lbWVudG8nLCBsaW5rOiAnL2FyL2JlaGF2aW9yYWwvbWVtZW50bycgfSxcbiAgICAgICAgICB7IHRleHQ6ICdOdWxsIE9iamVjdCcsIGxpbms6ICcvYXIvYmVoYXZpb3JhbC9udWxsLW9iamVjdCcgfSxcbiAgICAgICAgICB7IHRleHQ6ICdPYnNlcnZlcicsIGxpbms6ICcvYXIvYmVoYXZpb3JhbC9vYnNlcnZlcicgfSxcbiAgICAgICAgICB7IHRleHQ6ICdTdGF0ZScsIGxpbms6ICcvYXIvYmVoYXZpb3JhbC9zdGF0ZScgfSxcbiAgICAgICAgICB7IHRleHQ6ICdTdHJhdGVneScsIGxpbms6ICcvYXIvYmVoYXZpb3JhbC9zdHJhdGVneScgfSxcbiAgICAgICAgICB7IHRleHQ6ICdUZW1wbGF0ZSBNZXRob2QnLCBsaW5rOiAnL2FyL2JlaGF2aW9yYWwvdGVtcGxhdGUtbWV0aG9kJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ1Zpc2l0b3InLCBsaW5rOiAnL2FyL2JlaGF2aW9yYWwvdmlzaXRvcicgfVxuICAgICAgICBdXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiAnXHUwNjI3XHUwNjQ0XHUwNjIzXHUwNjQ2XHUwNjQ1XHUwNjI3XHUwNjM3IFx1MDYyN1x1MDY0NFx1MDYyNVx1MDY0Nlx1MDYzNFx1MDYyN1x1MDYyNlx1MDY0QVx1MDYyOScsXG4gICAgICAgIGNvbGxhcHNlZDogZmFsc2UsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgeyB0ZXh0OiAnU2luZ2xldG9uJywgbGluazogJy9hci9jcmVhdGlvbmFsL3NpbmdsZXRvbicgfSxcbiAgICAgICAgICB7IHRleHQ6ICdGYWN0b3J5IE1ldGhvZCcsIGxpbms6ICcvYXIvY3JlYXRpb25hbC9mYWN0b3J5LW1ldGhvZCcgfSxcbiAgICAgICAgICB7IHRleHQ6ICdBYnN0cmFjdCBGYWN0b3J5JywgbGluazogJy9hci9jcmVhdGlvbmFsL2Fic3RyYWN0LWZhY3RvcnknIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnQnVpbGRlcicsIGxpbms6ICcvYXIvY3JlYXRpb25hbC9idWlsZGVyJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ1Byb3RvdHlwZScsIGxpbms6ICcvYXIvY3JlYXRpb25hbC9wcm90b3R5cGUnIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnT2JqZWN0IFBvb2wnLCBsaW5rOiAnL2FyL2NyZWF0aW9uYWwvb2JqZWN0LXBvb2wnIH1cbiAgICAgICAgXVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJ1x1MDYyN1x1MDY0NFx1MDYyM1x1MDY0Nlx1MDY0NVx1MDYyN1x1MDYzNyBcdTA2MjdcdTA2NDRcdTA2NDdcdTA2NEFcdTA2NDNcdTA2NDRcdTA2NEFcdTA2MjknLFxuICAgICAgICBjb2xsYXBzZWQ6IGZhbHNlLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgIHsgdGV4dDogJ0FkYXB0ZXInLCBsaW5rOiAnL2FyL3N0cnVjdHVyYWwvYWRhcHRlcicgfSxcbiAgICAgICAgICB7IHRleHQ6ICdCcmlkZ2UnLCBsaW5rOiAnL2FyL3N0cnVjdHVyYWwvYnJpZGdlJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ0NvbXBvc2l0ZScsIGxpbms6ICcvYXIvc3RydWN0dXJhbC9jb21wb3NpdGUnIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnRGVjb3JhdG9yJywgbGluazogJy9hci9zdHJ1Y3R1cmFsL2RlY29yYXRvcicgfSxcbiAgICAgICAgICB7IHRleHQ6ICdGYWNhZGUnLCBsaW5rOiAnL2FyL3N0cnVjdHVyYWwvZmFjYWRlJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ0ZseXdlaWdodCcsIGxpbms6ICcvYXIvc3RydWN0dXJhbC9mbHl3ZWlnaHQnIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnUHJveHknLCBsaW5rOiAnL2FyL3N0cnVjdHVyYWwvcHJveHknIH1cbiAgICAgICAgXVxuICAgICAgfVxuICAgIF0sXG4gICAgZm9vdGVyOiB7XG4gICAgICBtZXNzYWdlOiAnXHUwNjM1XHUwNjJGXHUwNjMxIFx1MDYyQVx1MDYyRFx1MDYyQSA8YSBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL290YWJla29mZi9kZXNpZ24tcGF0dGVybnMvYmxvYi9tYWluL0xJQ0VOU0VcIj5cdTA2MzFcdTA2MkVcdTA2MzVcdTA2MjkgTUlUPC9hPi4nLFxuICAgICAgY29weXJpZ2h0OiAnXHUwNjJEXHUwNjQyXHUwNjQ4XHUwNjQyIFx1MDYyN1x1MDY0NFx1MDY0Nlx1MDYzNFx1MDYzMSBcdTAwQTkgMjAyNS1cdTA2MjdcdTA2NDRcdTA2MkRcdTA2MjdcdTA2MzZcdTA2MzEgPGEgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9vdGFiZWtvZmZcIj5cdTA2MjNcdTA2NDhcdTA2MkFcdTA2MjdcdTA2MjhcdTA2NEFcdTA2NDMgXHUwNjMzXHUwNjI3XHUwNjJGXHUwNjRBXHUwNjMxXHUwNjRBXHUwNjJGXHUwNjRBXHUwNjQ2XHUwNjQ4XHUwNjQxPC9hPidcbiAgICB9XG4gIH1cbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcdml0ZXByZXNzXFxcXGRlc2lnbi1wYXR0ZXJuc1xcXFwudml0ZXByZXNzXFxcXGNvbmZpZ1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcdml0ZXByZXNzXFxcXGRlc2lnbi1wYXR0ZXJuc1xcXFwudml0ZXByZXNzXFxcXGNvbmZpZ1xcXFxpY29uLWluamVjdG9yLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi92aXRlcHJlc3MvZGVzaWduLXBhdHRlcm5zLy52aXRlcHJlc3MvY29uZmlnL2ljb24taW5qZWN0b3IudHNcIjtpbXBvcnQgZnMgZnJvbSAnZnMnXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0ICogYXMgbHVjaWRlIGZyb20gJ2x1Y2lkZSdcblxuZnVuY3Rpb24gZ2V0U3ZnU3RyaW5nKGljb25OYW1lOiBzdHJpbmcpIHtcbiAgLy8gVHJ5IHRvIGZpbmQgdGhlIGljb24gaW4gbHVjaWRlXG4gIGNvbnN0IGNoaWxkcmVuID0gKGx1Y2lkZS5pY29ucyBhcyBhbnkpW2ljb25OYW1lXTtcbiAgaWYgKCFjaGlsZHJlbikgcmV0dXJuICcnO1xuICBcbiAgY29uc3QgY2hpbGRUYWdzID0gY2hpbGRyZW4ubWFwKChjaGlsZDogYW55KSA9PiB7XG4gICAgY29uc3QgW3RhZywgYXR0cnNdID0gY2hpbGQ7XG4gICAgY29uc3QgYXR0clN0cmluZyA9IE9iamVjdC5lbnRyaWVzKGF0dHJzKS5tYXAoKFtrLCB2XSkgPT4gYCR7a309XCIke3Z9XCJgKS5qb2luKCcgJyk7XG4gICAgcmV0dXJuIGA8JHt0YWd9ICR7YXR0clN0cmluZ30+PC8ke3RhZ30+YDtcbiAgfSkuam9pbignJyk7XG4gIFxuICByZXR1cm4gYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMTZcIiBoZWlnaHQ9XCIxNlwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZS13aWR0aD1cIjJcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIiBzdHlsZT1cImRpc3BsYXk6IGlubGluZS1ibG9jazsgbWFyZ2luLXJpZ2h0OiA2cHg7IG1hcmdpbi1ib3R0b206IC0zcHg7IGNvbG9yOiBpbmhlcml0O1wiPiR7Y2hpbGRUYWdzfTwvc3ZnPmA7XG59XG5cbmNvbnN0IGljb25DYWNoZTogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHt9O1xuXG5mdW5jdGlvbiBnZXRJY29uRm9yTGluayhsaW5rOiBzdHJpbmcpOiBzdHJpbmcge1xuICBpZiAoIWxpbmspIHJldHVybiAnJztcbiAgXG4gIC8vIFN0cmlwIG9mZiByb290IGxhbmd1YWdlIHByZWZpeCAoZS5nLiAvdXovc3RydWN0dXJhbC9hZGFwdGVyIC0+IC9zdHJ1Y3R1cmFsL2FkYXB0ZXIpXG4gIC8vIGJlY2F1c2UgdGhlIHNvdXJjZSBvZiB0cnV0aCBmb3IgaWNvbnMgaXMgdGhlIHJvb3QgRW5nbGlzaCBtYXJrZG93biBmaWxlc1xuICBjb25zdCByb290TGluayA9IGxpbmsucmVwbGFjZSgvXlxcLyh1enxydXx0cnxkZXxlc3xhcilcXC8vLCAnLycpO1xuICBcbiAgaWYgKGljb25DYWNoZVtyb290TGlua10gIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBpY29uQ2FjaGVbcm9vdExpbmtdO1xuICB9XG4gIFxuICB0cnkge1xuICAgIGNvbnN0IGZpbGVQYXRoID0gcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksIGAke3Jvb3RMaW5rfS5tZGApO1xuICAgIGlmIChmcy5leGlzdHNTeW5jKGZpbGVQYXRoKSkge1xuICAgICAgY29uc3QgY29udGVudCA9IGZzLnJlYWRGaWxlU3luYyhmaWxlUGF0aCwgJ3V0ZjgnKTtcbiAgICAgIGNvbnN0IG1hdGNoID0gY29udGVudC5tYXRjaCgvXmljb246XFxzKiguKykkL20pO1xuICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgIGNvbnN0IGljb25OYW1lID0gbWF0Y2hbMV0udHJpbSgpO1xuICAgICAgICBjb25zdCBzdmcgPSBnZXRTdmdTdHJpbmcoaWNvbk5hbWUpO1xuICAgICAgICBpY29uQ2FjaGVbcm9vdExpbmtdID0gc3ZnO1xuICAgICAgICByZXR1cm4gc3ZnO1xuICAgICAgfVxuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHJlYWRpbmcgaWNvbiBmb3InLCBsaW5rLCBlKTtcbiAgfVxuICBcbiAgaWNvbkNhY2hlW3Jvb3RMaW5rXSA9ICcnO1xuICByZXR1cm4gJyc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbmplY3RTaWRlYmFySWNvbnMoc2lkZWJhcjogYW55W10pOiBhbnlbXSB7XG4gIHJldHVybiBzaWRlYmFyLm1hcChzZWN0aW9uID0+IHtcbiAgICBpZiAoc2VjdGlvbi5pdGVtcykge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc2VjdGlvbixcbiAgICAgICAgaXRlbXM6IHNlY3Rpb24uaXRlbXMubWFwKChpdGVtOiBhbnkpID0+IHtcbiAgICAgICAgICBpZiAoaXRlbS5saW5rKSB7XG4gICAgICAgICAgICBjb25zdCBzdmcgPSBnZXRJY29uRm9yTGluayhpdGVtLmxpbmspO1xuICAgICAgICAgICAgaWYgKHN2ZyAmJiAhaXRlbS50ZXh0LmluY2x1ZGVzKCc8c3ZnJykpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHsgLi4uaXRlbSwgdGV4dDogYCR7c3ZnfSR7aXRlbS50ZXh0fWAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzZWN0aW9uO1xuICB9KTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBMFQsU0FBUyxvQkFBb0I7QUFDdlYsT0FBT0EsV0FBVTtBQUNqQixTQUFTLFNBQVMsNEJBQTRCO0FBQzlDLFNBQVMsa0JBQWtCO0FBQzNCLFNBQVMsbUJBQW1CLDJCQUEyQjs7O0FDSndSLElBQU0sS0FBSztBQUFBLEVBQ3hWLE9BQU87QUFBQSxFQUNQLGFBQWE7QUFBQSxFQUNiLE9BQU87QUFBQSxFQUNQLE1BQU07QUFBQSxFQUNOLFFBQVE7QUFBQSxJQUNOLGNBQWM7QUFBQSxNQUNaLFFBQVEsRUFBRSxZQUFZLFVBQVUs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
