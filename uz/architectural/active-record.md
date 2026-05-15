---
title: Active Record Pattern
description: Ma'lumotlar bazasi qatorini ma'lumot va xatti-harakatga ega obyekt bilan o'raydi
icon: Table
---

import { Callout } from "fumadocs-ui/components/callout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "fumadocs-ui/components/tabs";

## Umumiy ko'rinish (Overview)

**Active Record** (Faol yozuv) patterni bu arxitektura yondashuvi bo'lib, unda obyekt o'zida ham ma'lumotlarni, ham xatti-harakatlarni tashiydi va bevosita ma'lumotlar bazasidagi bitta qatorni ifodalaydi. Obyekt o'zini ma'lumotlar bazasidan qanday yuklash, saqlash va o'chirishni biladi.

Asosiy tushunchalar:

- **Yagona Obyekt (Single Object)**: Ma'lumotlar va saqlash mantiqini o'z ichiga oladi
- **O'z-o'zini anglash (Self-Aware)**: Obyekt o'zini qanday saqlashni biladi
- **To'g'ridan-to'g'ri (Straightforward)**: Ma'lumotlar bazasi jadvaliga bevosita moslashish
- **Minimal ajratish (Minimal Separation)**: Ma'lumotlarga kirish biznes mantiq bilan aralashgan

## Maqsad (Purpose)

Active Record quyidagilarni maqsad qiladi:

- To'g'ridan-to'g'ri modellar uchun ma'lumotlar bazasiga xaritalashni (mapping) soddalashtirish
- CRUD operatsiyalari uchun shablon (boilerplate) kodlarni kamaytirish
- Dasturchilar uchun intuitiv interfeys taqdim etish
- Tezkor prototiplash (prototyping) imkonini berish
- Oddiy domen modellari uchun yaxshi ishlash
- Abstraksiya xarajatlarini minimallashtirish

## Muammo (Problem)

Patternlarsiz ma'lumotlar bazasi bilan ishlash tartibsiz bo'lib qoladi:

- SQL so'rovlari kod bo'ylab tarqalib ketadi
- Ma'lumotlarni yuklash nomuvofiq bo'ladi
- Ma'lumotlar bazasi sxemasini refaktor qilish qiyinlashadi
- Ma'lumotlar bazasiga bog'liq kodni sinovdan o'tkazish (test) qiyinlashadi
- Saqlash (persistence) mantig'i tarqalib ketadi

```
❌ Tarqalgan ma'lumotlarga kirish
const user = database.query('SELECT * FROM users WHERE id = ?', id);
user.name = 'John';
database.execute('UPDATE users SET name = ? WHERE id = ?', user.name, id);
```

## Yechim (Solution)

Active Record ma'lumotlar bazasi operatsiyalarini inkapsulyatsiya qiladi:

```
✅ Active Record
class User {
  id: number
  name: string
  email: string

  save() { /* ma'lumotlar bazasiga saqlash */ }
  delete() { /* ma'lumotlar bazasidan o'chirish */ }
  static find(id) { /* ma'lumotlar bazasidan qidirish */ }
}
```

## Amalga oshirish (Implementation)

::: code-group
<TabsList>
<TabsTrigger value="typescript">TypeScript</TabsTrigger>
<TabsTrigger value="python">Python</TabsTrigger>
</TabsList>


```typescript [typescript]
// Database Connection Mock
interface Database {
  execute(sql: string, params?: any[]): any[];
  query(sql: string, params?: any[]): any[];
}

const db: Database = {
  execute: (sql: string) => {
    console.log(`[DB] Execute: ${sql}`);
    return [{ affectedRows: 1 }];
  },
  query: (sql: string) => {
    console.log(`[DB] Query: ${sql}`);
    return [];
  },
};

// Active Record Pattern
class User {
  id?: number;
  name: string;
  email: string;
  createdAt?: Date;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }

  save(): void {
    if (this.id) {
      const sql = `UPDATE users SET name = '${this.name}', email = '${this.email}' WHERE id = ${this.id}`;
      db.execute(sql);
      console.log(`✅ User ${this.id} updated`);
    } else {
      const sql = `INSERT INTO users (name, email) VALUES ('${this.name}', '${this.email}')`;
      db.execute(sql);
      this.id = Date.now();
      console.log(`✅ User created with id ${this.id}`);
    }
  }

  delete(): void {
    if (this.id) {
      const sql = `DELETE FROM users WHERE id = ${this.id}`;
      db.execute(sql);
      console.log(`✅ User ${this.id} deleted`);
    }
  }

  getFullInfo(): string {
    return `User(${this.id}): ${this.name} <${this.email}>`;
  }

  static findById(id: number): User | null {
    const sql = `SELECT * FROM users WHERE id = ${id}`;
    const results = db.query(sql);
    if (results.length === 0) return null;

    const row = results[0];
    const user = new User(row.name, row.email);
    user.id = row.id;
    user.createdAt = row.created_at;
    return user;
  }

  static findByEmail(email: string): User | null {
    const sql = `SELECT * FROM users WHERE email = '${email}'`;
    const results = db.query(sql);
    if (results.length === 0) return null;

    const row = results[0];
    const user = new User(row.name, row.email);
    user.id = row.id;
    user.createdAt = row.created_at;
    return user;
  }

  static findAll(): User[] {
    const sql = "SELECT * FROM users";
    const results = db.query(sql);
    return results.map((row) => {
      const user = new User(row.name, row.email);
      user.id = row.id;
      user.createdAt = row.created_at;
      return user;
    });
  }

  static count(): number {
    const sql = "SELECT COUNT(*) as count FROM users";
    const results = db.query(sql);
    return results[0]?.count || 0;
  }
}

// Usage
const user = new User("John Doe", "john@example.com");
user.save();

if (user.id) {
  user.name = "John Updated";
  user.save();

  const loaded = User.findById(user.id);
  if (loaded) {
    console.log(`\nLoaded: ${loaded.getFullInfo()}`);
  }

  loaded?.delete();
}
```



```python [python]
# Database Connection Mock
class Database:
    @staticmethod
    def execute(sql: str) -> dict:
        print(f"[DB] Execute: {sql}")
        return {"affected_rows": 1}

    @staticmethod
    def query(sql: str) -> list:
        print(f"[DB] Query: {sql}")
        return []

db = Database()

# Active Record Pattern
class User:
    def __init__(self, name: str, email: str):
        self.id: int = None
        self.name = name
        self.email = email
        self.created_at = None

    def save(self) -> None:
        if self.id:
            sql = f"UPDATE users SET name = '{self.name}', email = '{self.email}' WHERE id = {self.id}"
            db.execute(sql)
            print(f"✅ User {self.id} updated")
        else:
            sql = f"INSERT INTO users (name, email) VALUES ('{self.name}', '{self.email}')"
            db.execute(sql)
            self.id = int(id(self))
            print(f"✅ User created with id {self.id}")

    def delete(self) -> None:
        if self.id:
            sql = f"DELETE FROM users WHERE id = {self.id}"
            db.execute(sql)
            print(f"✅ User {self.id} deleted")

    def get_full_info(self) -> str:
        return f"User({self.id}): {self.name} <{self.email}>"

    @staticmethod
    def find_by_id(user_id: int):
        sql = f"SELECT * FROM users WHERE id = {user_id}"
        results = db.query(sql)
        if not results:
            return None

        row = results[0]
        user = User(row["name"], row["email"])
        user.id = row["id"]
        user.created_at = row.get("created_at")
        return user

    @staticmethod
    def find_by_email(email: str):
        sql = f"SELECT * FROM users WHERE email = '{email}'"
        results = db.query(sql)
        if not results:
            return None

        row = results[0]
        user = User(row["name"], row["email"])
        user.id = row["id"]
        user.created_at = row.get("created_at")
        return user

    @staticmethod
    def find_all():
        sql = "SELECT * FROM users"
        results = db.query(sql)
        users = []
        for row in results:
            user = User(row["name"], row["email"])
            user.id = row["id"]
            user.created_at = row.get("created_at")
            users.append(user)
        return users

    @staticmethod
    def count() -> int:
        sql = "SELECT COUNT(*) as count FROM users"
        results = db.query(sql)
        return results[0].get("count", 0) if results else 0

# Usage
if __name__ == "__main__":
    user = User("John Doe", "john@example.com")
    user.save()

    if user.id:
        user.name = "John Updated"
        user.save()

        loaded = User.find_by_id(user.id)
        if loaded:
            print(f"\nLoaded: {loaded.get_full_info()}")

        if loaded:
            loaded.delete()
```

:::

## Haqiqiy hayotdagi misollar (Real-World Examples)

### Ruby on Rails

```ruby
user = User.new(name: 'John')
user.save!
user.update(name: 'Jane')
user.destroy
```

### Laravel Eloquent

```php
$user = new User(['name' => 'John']);
$user->save();
$user->update(['name' => 'Jane']);
$user->delete();
```

## Afzalliklari (Advantages) ✅

- **Soddalik (Simplicity)**: Tushunish va amalga oshirish oson
- **Tezkor ishlab chiqish (Quick Development)**: Asosiy CRUD operatsiyalarini yozish tez
- **Intuitivlik**: Tabiiy obyektga yo'naltirilgan yondashuv
- **Kamroq shablon kod (Less Boilerplate)**: Minimal kod talab qilinadi
- **Konfiguratsiyadan ko'ra kelishuv (Convention Over Configuration)**: Oqilona standartlar
- **Tanish**: Ko'plab mashhur freymvorklarda qo'llaniladi
- **To'g'ridan-to'g'ri xaritalash (Direct Mapping)**: Ma'lumotlar bazasi bilan aniq munosabat
- **Oddiy modellar uchun yaxshi**: To'g'ridan-to'g'ri bo'lgan subyektlar uchun mukammal

## Kamchiliklari (Disadvantages) ❌

- **Vazifalarning aralashuvi (Mixing Concerns)**: Ma'lumotlar va saqlash aralashtirilgan
- **Sinovdan o'tkazish qiyin**: Ma'lumotlar bazasiga qattiq bog'langan (Tightly coupled)
- **Kengaytirish qiyin (Not Scalable)**: Murakkab domenlar uchun yaxshi ishlamaydi
- **Cheklangan moslashuvchanlik**: Har bir klass uchun bitta jadval bo'lishini taxmin qiladi
- **Ishlash tezligi (Performance)**: N+1 so'rov muammolari tez-tez uchraydi
- **Ma'lumotlar bazasiga qaramlik**: Ma'lumotlar bazasini almashtirish qiyin
- **Murakkab mantiq**: Murakkab qoidalarni amalga oshirish qiyin
- **DDD uchun Anti-Pattern**: Domen-boshqaruvchi dizayn (domain-driven design) qoidalarini buzadi

## Qachon foydalanish kerak (When to Use) ✅

- **Oddiy CRUD ilovalari**: To'g'ridan-to'g'ri operatsiyalar
- **Tezkor prototiplash**: Tezkor MVP lar (Minimal Viable Product)
- **Kichik loyihalar**: Kichik ko'lamli va murakkab bo'lmagan
- **Oddiy domenlar**: To'g'ridan-to'g'ri biznes mantiq
- **Tanish jamoa**: Freymvork bilan tajribaga ega jamoa
- **Yagona ma'lumotlar bazasi**: Bitta asosiy ma'lumotlar manbasi
- **Kelishuvga asoslangan**: Freymvork qoidalariga rioya qilinganda
- **Vaqt chegaralangan**: Tezkor ishga tushirish kerak bo'lganda

## Qachon foydalanmaslik kerak (When NOT to Use) ❌

- **Murakkab domenlar**: Chalkash biznes mantiq
- **Sinov muhim bo'lganda (Testing-Critical)**: Kuchli unit testlar talab qilinganda
- **Bir nechta ma'lumot manbalari**: API lar, keshlar, bir nechta MB lardan foydalanilganda
- **Murakkab so'rovlar**: Ma'lumotlarga kirish tartibi murakkab bo'lganda
- **Ishlash tezligi muhim bo'lganda**: Aniq nazorat talab qilinganda
- **Jamoa xohishi**: Jamoa vazifalarni ajratishni (separation) afzal ko'rganda
- **Katta jamoalar**: Bir xil kod bazasida bir nechta dasturchilar ishlaganda
- **Uzoq muddatli xizmat ko'rsatish**: Moslashuvchanlik muhim bo'lgan joyda

## Aloqador Patternlar (Related Patterns)

- **Repository Pattern**: Murakkab ilovalar uchun yaxshiroq
- **Data Mapper**: Vazifalarni ajratish uchun alternativa
- **Unit of Work**: Bir nechta yozuvlarni boshqarish uchun
- **Identity Map**: Faol yozuvlar uchun keshlash patterni
