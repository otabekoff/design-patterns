---
title: Programlamada Tasarım Desenleri
description: Yazılım geliştirmede kullanılan tasarım desenleri için kapsamlı bir rehber.
icon: Palette
---

# Programlamada Tasarım Desenleri

Tasarım desenleri, yazılım tasarımında sıkça karşılaşılan sorunlara yönelik yeniden kullanılabilir çözümlerdir. En iyi uygulamaları temsil ederler ve test edilmiş, kanıtlanmış geliştirme paradigmaları sağlayarak geliştirme sürecini hızlandırabilirler.

Tasarım desenleri genellikle amaçlarına göre **üç ana kategoriye** ayrılır:

## 🏗️ Oluşturucu (Creational) Desenler

Nesne oluşturma mekanizmalarıyla ilgilenirler. Sistemleri, nesnelerinin nasıl oluşturulduğundan, kompoze edildiğinden ve temsil edildiğinden bağımsız hale getirmek için örnekleme sürecini soyutlarlar.

<Cards>
  <Card
    title="Singleton"
    description="Bir sınıfın yalnızca bir örneğinin olmasını ve küresel bir erişim noktası sağlanmasını garanti eder"
    href="/creational/singleton"
  />
  <Card
    title="Factory Method"
    description="Tam sınıfları belirtmeden nesneler oluşturur"
    href="/creational/factory-method"
  />
  <Card
    title="Abstract Factory"
    description="İlişkili nesne aileleri oluşturur"
    href="/creational/abstract-factory"
  />
  <Card
    title="Builder"
    description="Karmaşık nesneleri adım adım inşa eder"
    href="/creational/builder"
  />
  <Card
    title="Prototype"
    description="Mevcut nesneleri kopyalayarak yeni nesneler oluşturur"
    href="/creational/prototype"
  />
  <Card
    title="Object Pool"
    description="Başlatılmış nesneleri verimli bir şekilde yeniden kullanır"
    href="/creational/object-pool"
  />
</Cards>

## 🔧 Yapısal (Structural) Desenler

Nesne bileşimi ve aralarındaki ilişkilerle ilgilenirler. Nesneleri daha büyük yapılar halinde birleştirmeye yardımcı olurken, bu yapıları esnek ve verimli tutarlar.

<Cards>
  <Card
    title="Adapter"
    description="Uyumsuz nesnelerin birlikte çalışmasını sağlamak için arayüzleri dönüştürür"
    href="/structural/adapter"
  />
  <Card
    title="Bridge"
    description="Soyutlamayı uygulamadan ayırır"
    href="/structural/bridge"
  />
  <Card
    title="Composite"
    description="Nesneleri ağaç yapıları şeklinde birleştirir"
    href="/structural/composite"
  />
  <Card
    title="Decorator"
    description="Nesnelere dinamik olarak yeni sorumluluklar ekler"
    href="/structural/decorator"
  />
  <Card
    title="Facade"
    description="Karmaşık alt sisteme basitleştirilmiş bir arayüz sunar"
    href="/structural/facade"
  />
  <Card
    title="Flyweight"
    description="Bellek tasarrufu için nesneleri verimli bir şekilde paylaşır"
    href="/structural/flyweight"
  />
  <Card
    title="Proxy"
    description="Erişimi kontrol etmek için bir vekil sağlar"
    href="/structural/proxy"
  />
</Cards>

## 🔄 Davranışsal (Behavioral) Desenler

Nesneler arasındaki iletişim ve sorumluluklarla ilgilenirler. Nesnelerin nasıl etkileşim kurduğunu ve sorumluluğu aralarında nasıl dağıttığını tanımlarlar.

<Cards>
  <Card
    title="Chain of Responsibility"
    description="İstekleri bir işleyici zinciri boyunca iletir"
    href="/behavioral/chain-of-responsibility"
  />
  <Card
    title="Command"
    description="İstekleri nesne olarak kapsüller"
    href="/behavioral/command"
  />
  <Card
    title="Interpreter"
    description="Dil dilbilgisini ve yorumlayıcıyı tanımlar"
    href="/behavioral/interpreter"
  />
  <Card
    title="Iterator"
    description="Koleksiyon öğelerine sırayla erişir"
    href="/behavioral/iterator"
  />
  <Card
    title="Mediator"
    description="Nesne etkileşimini kapsüller"
    href="/behavioral/mediator"
  />
  <Card
    title="Memento"
    description="Nesne durumunu yakalar ve geri yükler"
    href="/behavioral/memento"
  />
  <Card
    title="Observer"
    description="Durum değişikliklerinden birden fazla nesneyi haberdar eder"
    href="/behavioral/observer"
  />
  <Card
    title="State"
    description="İç duruma göre davranışı değiştirir"
    href="/behavioral/state"
  />
  <Card
    title="Strategy"
    description="Birbirinin yerine geçebilen algoritmaları kapsüller"
    href="/behavioral/strategy"
  />
  <Card
    title="Template Method"
    description="Algoritma iskeletini temel sınıfta tanımlar"
    href="/behavioral/template-method"
  />
  <Card
    title="Visitor"
    description="Nesneleri değiştirmeden onlara yeni operasyonlar ekler"
    href="/behavioral/visitor"
  />
  <Card
    title="Null Object"
    description="Varsayılan 'hiçbir şey yapma' davranışı sağlar"
    href="/behavioral/null-object"
  />
</Cards>

## 🏛️ Mimari ve Eşzamanlılık Desenleri

Sistem yapısı ve çoklu iş parçacığı için üst düzey desenler. Bu desenler daha büyük mimari sorunları ele alır.

<Cards>
  <Card
    title="MVC"
    description="Model, görünüm ve denetleyiciyi ayırır"
    href="/architectural/mvc"
  />
  <Card
    title="MVP"
    description="Sunucu tüm UI mantığını yönetir"
    href="/architectural/mvp"
  />
  <Card
    title="MVVM"
    description="UI'ı reaktif görünüm modeline bağlar"
    href="/architectural/mvvm"
  />
  <Card
    title="Repository"
    description="Veri erişim katmanını soyutlar"
    href="/architectural/repository"
  />
  <Card
    title="CQRS"
    description="Okuma ve yazma işlemlerini ayırır"
    href="/architectural/cqrs"
  />
  <Card
    title="Event Sourcing"
    description="Durumu olay dizisi olarak saklar"
    href="/architectural/event-sourcing"
  />
  <Card
    title="Active Record"
    description="Veritabanı satırını nesneyle sarar"
    href="/architectural/active-record"
  />
  <Card
    title="Data Mapper"
    description="Bellekteki nesneleri veritabanından ayırır"
    href="/architectural/data-mapper"
  />
  <Card
    title="Service Locator"
    description="Servisleri kayıt defterinden bulur"
    href="/architectural/service-locator"
  />
  <Card
    title="Dependency Injection"
    description="Bağımlılıkları nesnelere aktarır"
    href="/architectural/dependency-injection"
  />
  <Card
    title="Producer-Consumer"
    description="Üreticileri ve tüketicileri birbirinden ayırır"
    href="/architectural/producer-consumer"
  />
  <Card
    title="Scheduler"
    description="İş parçacığı kaynak erişimini kontrol eder"
    href="/architectural/scheduler"
  />
  <Card
    title="Read-Write Lock"
    description="Eşzamanlı okumaya ve özel yazmaya izin verir"
    href="/architectural/read-write-lock"
  />
</Cards>

---

## Tasarım Desenleri Hakkında

İlk 23 desen (Oluşturucu, Yapısal ve Davranışsal), Gamma, Helm, Johnson ve Vlissides'in 1994 tarihli ufuk açıcı kitabı *Design Patterns*'daki klasik **Gang of Four (GoF)** desenleridir. Kalan desenler, daha geniş yazılım mühendisliği topluluğundan gelen yaygın olarak tanınan uzantılardır.

### Neden Tasarım Desenlerini Öğrenmelisiniz?

- **Kanıtlanmış Çözümler**: Ortak sorunlara test edilmiş çözümler sunarlar
- **Daha İyi İletişim**: Geliştiriciler için ortak bir kelime dağarcığı sağlarlar
- **Daha Hızlı Geliştirme**: Tekerleği yeniden icat etmek yerine mevcut çözümleri kullanabilirsiniz
- **Kod Kalitesi**: Daha sürdürülebilir ve esnek kodlara yol açarlar
- **En İyi Uygulamalar**: Yazılım mühendisliğinin en iyi uygulamalarını bünyesinde barındırırlar

Yukarıdaki bir kategoriyi seçerek desenleri keşfetmeye başlayın!

