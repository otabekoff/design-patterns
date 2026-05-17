---
title: MVT (Model-View-Template)
description: Django kabi veb-freymvorklar tomonidan mantiq, ma'lumotlar va taqdimotni ajratish uchun ishlatiladigan dasturiy ta'minot arxitektura namunasi.
icon: Layout
---

# MVT (Model-View-Template)

<CoverImage src="/covers/architectural/mvt.png" alt="Cover">
  <h1>MVT</h1>
  <p>A professional chef robot (View) taking a raw food package from a pantry (Model) and baking it perfectly into a beautiful heart-shaped geometric cake mold (Template).</p>
</CoverImage>

## Umumiy Tavsif

**MVT (Model-View-Template)** — bu mashhur **MVC (Model-View-Controller)** namunasining biroz o'zgartirilgan varianti bo'lgan dasturiy ta'minot arxitektura namunasidir. U asosan **Django** veb-freymvorki tomonidan ishlatilishi bilan mashhur.

Asosiy farq "Controller" (Nazoratchi) mantiqini kim boshqarishida:
- **Model**: Ma'lumotlar va biznes mantiqini boshqaradi.
- **View**: So'rovni qayta ishlash va javob qaytarish uchun biznes mantiqini boshqaradi (MVC'dagi Controller vazifasini bajaradi).
- **Template**: Taqdimot mantiqini boshqaradi (MVC'dagi View vazifasini bajaradi).
- **Framework**: Freymvorkning o'zi (Django) so'rovlarni tegishli View'ga yo'naltiruvchi Controller vazifasini bajaradi.

## Komponentlar

### 1. Model
Ma'lumotlar tuzilmasini belgilaydi va ma'lumotlar bazasi bilan o'zaro ishlash usullarini taqdim etadi.

### 2. View
Modeldan ma'lumotlarni olish va ularni Template'ga uzatish mantiqini o'z ichiga oladi. U foydalanuvchi so'rovi va yakuniy HTML javobi o'rtasidagi ko'prikdir.

### 3. Template
Taqdimot qatlami. U HTML va ma'lumotlarni dinamik ravishage ko'rsatish uchun shablon tilidan (masalan, Django Template Language yoki Jinja2) iborat bo'ladi.

## Ma'lumotlar Oqimi

1. **So'rov (Request)**: Foydalanuvchi URL'ga so'rov yuboradi.
2. **URL Resolver**: Freymvork URL'ni aniq bir **View** bilan moslashtiradi.
3. **View Mantig'i**: View ma'lumotlar uchun **Model**ga murojaat qiladi.
4. **Ma'lumot Qaytishi**: Model ma'lumotlar bazasidan ma'lumotlarni qaytaradi.
5. **Shablonni Render Qilish**: View ma'lumotlarni **Template**ga uzatadi.
6. **Javob (Response)**: Template HTML holatiga keltiriladi (render) va foydalanuvchiga **Javob** sifatida yuboriladi.

## Amalga Oshirish Misoli (Django uslubida)

::: code-group

```python [python]
# models.py
class Article(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()

# views.py
def article_detail(request, id):
    # Model bilan ishlash
    article = Article.objects.get(id=id)
    # Template uchun kontekst
    context = {'article': article}
    # Template'ni render qilish
    return render(request, 'article_detail.html', context)

# article_detail.html (Template)
# <h1>{{ article.title }}</h1>
# <p>{{ article.content }}</p>
```

```typescript [typescript]
// TypeScript'da MVT tushunchasi
interface Model {
  id: number;
  title: string;
}

const Template = (data: Model) => `
  <h1>${data.title}</h1>
  <p>ID uchun kontent: ${data.id}</p>
`;

const View = (id: number) => {
  // Model bilan ishlash
  const data: Model = { id, title: "MVT Namunasi Tushuntirildi" };
  // Template'ni render qilish
  return Template(data);
};

// So'rovni boshqarish
console.log(View(1));
```

:::

## MVT va MVC Solishtiruvi

| Komponent | MVC | MVT |
| :--- | :--- | :--- |
| **Ma'lumotlar Qatlami** | Model | Model |
| **Mantiq Qatlami** | Controller | View |
| **Taqdimot Qatlami** | View | Template |
| **Birlashtiruvchi** | Controller | Framework |

## Afzalliklari ✅

- **Tezkor Ishlanma**: Yuqori darajadagi abstraktsiyalar funksiyalarni tezda yaratishga imkon beradi.
- **Mas'uliyatlarning Ajratilishi**: Ma'lumotlar, mantiq va taqdimot o'rtasidagi aniq chegara.
- **Moslashuvchanlik**: Shablonlarni osonlikcha almashtirish yoki qayta ishlatish mumkin.

## Kamchiliklari ❌

- **O'rganish Murakkabligi**: Freymvorkning o'ziga xos ishlash usullarini tushunishni talab qiladi.
- **"Sehr" (Magic)**: Ba'zi mantiqiy jarayonlar freymvork ichida yashirin bo'ladi, bu esa debug qilishni qiyinlashtirishi mumkin.

## Qachon Ishlatish Kerak ✅

- **Django bilan ishlaganda**: Bu freymvorkning asosiy arxitekturasidir.
- **Kontentga boy saytlar**: Shablonlar murakkab va ma'lumotlar tuzilmali bo'lganda.
- **Tezkor prototiplash**: Yetkazib berish tezligi muhim bo'lganda.

## Bog'liq Namunalar

- **MVC (Model-View-Controller)**: Asosiy namuna.
- **MVP (Model-View-Presenter)**: Yana bir MVC varianti.
- **MVVM (Model-View-ViewModel)**: Odatda frontend freymvorklarida qo'llaniladi.
