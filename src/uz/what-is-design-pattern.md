---
title: Dizayn namunasi nima?
description: Dizayn namunalari nima ekanligi, qayerdan kelib chiqqani va nima uchun muhimligi haqida aniq tushuntirish.
icon: Shapes
---

# Dizayn namunasi nima?

<CoverImage src="/covers/getting-started/what-is-design-pattern.webp" alt="Cover">
  <h1>Dizayn namunasi nima?</h1>
  <p>Sehrgar qalpoqli robot suzib yuruvchi kutubxonada o'tirib, sehrli tayoqchasini yaltirab turgan shaffof 3D chizmalar (ko'prik, qal'a darvozasi, qalqon) javoniga qaratmoqda — chizmalar tartibsiz uyulgan o'yinchoq kubiklar ustiga aynan mos tushadi.</p>
</CoverImage>

**Dizayn namunasi** (design pattern) — dasturiy ta'minotni loyihalashda tez-tez takrorlanadigan muammoning umumiy, qayta ishlatiladigan yechimi. Bu loyihangizga ko'chirib qo'yiladigan tayyor kod emas — bu yondashuvning tavsifi, o'zingizning aniq vaziyatingizga moslashtirishingiz mumkin bo'lgan nomlangan tushunchadir.

Oshpazlik retsepti bilan me'moriy chizmalar o'rtasidagi farqni tasavvur qiling. Retsept sizga aniq qadamlar va miqdorlarni beradi; ularga amal qilsangiz, oldindan ma'lum natijaga erishasiz. Chizma esa tuzilmani va uning qismlari o'rtasidagi munosabatlarni — yuk ko'taruvchi devorlarni, xonalar orasidagi harakatni — ko'rsatadi, ammo materiallar, o'lcham va pardozlash tafsilotlarini o'zingiz hal qilasiz. Algoritmlar — retseptlar. Namunalar — chizmalar.

## Namuna tavsifi nimalardan iborat

Yaxshi namuna hujjatlari g'oyani turli vaziyatlarda tushunish va qayta qo'llash mumkin bo'lishi uchun izchil tuzilishga amal qiladi:

- **Maqsad (Intent)** — muammo va yechimning bir-ikki jumlalik qisqacha mazmuni.
- **Motivatsiya (Motivation)** — namunaga bo'lgan ehtiyojni aniq his qildiradigan konkret ssenariy.
- **Tuzilma (Structure)** — ishtirokchilar va ular o'rtasidagi munosabatlarni ko'rsatadigan klass yoki komponent diagrammasi.
- **Implementatsiya (Implementation)** — namunaning real dasturlash tilida qo'llanilishini ko'rsatadigan kod misollari.

Ko'plab manbalarda qo'llanish shartlari, ma'lum qo'llanilish holatlari va boshqa namunalar bilan bog'liqliklar ham keltiriladi.

## Namunalar qayerdan kelib chiqqan

Bu tushuncha umuman dasturlashdan tashqarida paydo bo'lgan. 1977-yilda me'mor Christopher Alexander _A Pattern Language_ kitobini nashr etdi. Unda shaharsozlik va bino loyihalashdagi takrorlanuvchi yechimlar — deraza tokchasining eng maqbul balandligi, jamoat maydonining nisbatlari kabilar — tasvirlangan edi. Asosiy g'oya shundaki, tajribali mutaxassislar bir-biridan mustaqil ravishda bir xil yechimlarga kelishadi va bu yechimlar o'z nomiga ega bo'lishga loyiq.

1994-yilda Erich Gamma, Richard Helm, Ralph Johnson va John Vlissides bu g'oyani _Design Patterns: Elements of Reusable Object-Oriented Software_ kitobida obyektga yo'naltirilgan dasturlashga tatbiq etishdi. Kitobda 23 ta namuna jamlangan bo'lib, u sohadagi eng ta'sirli asarlardan biriga aylandi. U hanuzgacha _GoF kitobi_ deb ataladi — "Gang of Four" ("To'rtlik to'dasi") so'zlarining qisqartmasi.

O'shandan beri namunalar katalogi sezilarli darajada kengaydi. Bu yondashuv obyektga yo'naltirilgan dizayndan tashqariga chiqib, servis arxitekturalari, taqsimlangan tizimlar, parallellik va frontend ishlanmalariga ham tarqaldi.

## Namunalar va algoritmlar

Bu farqni aniq tushunib olish kerak. Algoritm to'liq va bir ma'noli jarayonni belgilaydi: ushbu kirish ma'lumoti berilganda, shu qadamlarni bajar va shu natijani chiqar. Saralash algoritmi qayerda ishlatilishidan qat'i nazar, bir xil algoritm bo'lib qoladi.

Namuna esa abstraktroq. Bitta kod bazasida Observer namunasini amalga oshirayotgan ikki muhandis tuzilishi jihatidan turlicha kod yozishi mumkin — turli interfeyslar, turli nomlash qoidalari, hayot siklini turlicha boshqarish. Ularni birlashtiruvchi narsa — maqsad: o'zgarish manbasini unga javob berishi kerak bo'lgan obyektlardan ajratish.

## Nima uchun ularni o'rganish kerak

Namunalarni hech qachon rasman o'rganmagan dasturchilar ham ularni ko'pincha qaytadan ixtiro qilishadi. Bu qayta ixtironing narxi faqat sarflangan vaqt emas — bu aniq muloqot qilish imkoniyatining boy berilishidir. Namunaning nomi bo'lsa, "keling, bu yerda Observer ishlatamiz" degan bir jumla doskada o'n daqiqa tushuntirishni talab qilishi mumkin bo'lgan muhokamani yakunlaydi.

Muloqotdan tashqari, namunalar to'plangan tajriba va mulohazani ifodalaydi. Ular muayyan turdagi muammoga duch kelgan, turli yondashuvlarni sinab ko'rgan va moslashuvchanlik, aniqlik hamda qo'llab-quvvatlash qulayligi o'rtasida muvozanat saqlaydigan tuzilmaga kelgan muhandislarning saboqlarini o'zida jamlaydi. Ularni o'rganish yaxshi obyektga yo'naltirilgan dizayn qanday bo'lishi haqidagi tasavvuringizni charxlaydi — hatto hech bir darslikdagi namuna to'g'ridan-to'g'ri mos kelmaydigan vaziyatlarda ham.

## Keng tarqalgan tanqidlar

Namunalarning asosli tanqidchilari ham bor va bu tanqidlarga jiddiy yondashish kerak.

**"Ular zaif tillarning kamchiliklarini qoplaydi."** Ba'zi namunalar asosan til tegishli tushunchani to'g'ridan-to'g'ri qo'llab-quvvatlamagani uchun mavjud. Masalan, funksiyalarni qiymat sifatida ko'radigan tillarda Strategy namunasiga deyarli ehtiyoj qolmaydi — shunchaki funksiyani uzatasiz. Tillar rivojlangani sari ba'zi klassik namunalar til imkoniyatlariga singib ketdi.

**"Ular ortiqcha murakkablashtirishga undaydi."** Namunalar bilan endigina tanishgan dasturchi har bir muammoni mix deb ko'rishga moyil bo'ladi. Natijada kod ko'pincha keragidan murakkabroq, o'qish qiyinroq va u almashtirgan oddiy variantdan qo'llab-quvvatlash jihatidan hech qanday yaxshi bo'lmaydi. Namuna qiyinchilikni kamaytirishi kerak; agar u aniq foyda keltirmasdan bilvositalik qo'shsa, unga o'rin yo'q.

**"Ular aqidaga aylanadi."** Namunani o'z vaziyatingizga moslashtirmasdan "kitobdagidek" amalga oshirish — uni noto'g'ri qo'llashdir. Maqsad darslikka to'liq mos implementatsiya yaratish emas, balki muammoingizni yaxshi hal qilishdir.

## Namunalar qanday tasniflanadi

Namunalar **qamrovi** va **maqsadi** bo'yicha guruhlanadi.

Qamrov bo'yicha eng mayda namunalar _idiomalar_ — quyi darajadagi muammolarning ma'lum bir tilga xos yechimlari. Eng yirigi esa butun ilovaning tuzilmaviy tartibini belgilaydigan _arxitektura namunalari_ (MVC, Event Sourcing, CQRS). Ana shu ikki chegara o'rtasida komponent yoki modul darajasida ishlaydigan klassik dizayn namunalari joylashgan.

Maqsadiga ko'ra namunalar uchta toifaga bo'linadi:

- **Yaratuvchi (Creational)** — obyektlarning qanday paydo bo'lishi bilan bog'liq.
- **Strukturaviy (Structural)** — obyektlar va klasslarning kattaroq tuzilmalarga qanday birlashtirilishi bilan bog'liq.
- **Xulq-atvor (Behavioral)** — obyektlarning qanday muloqot qilishi va mas'uliyatni qanday taqsimlashi bilan bog'liq.

Har bir toifa obyektga yo'naltirilgan tizimlardagi murakkablikning turli o'lchamiga qaratilgan. Muammoingiz qaysi o'lchamga tegishli ekanini tushunish odatda to'g'ri namunani tanlash yo'lidagi birinchi qadam bo'ladi.
