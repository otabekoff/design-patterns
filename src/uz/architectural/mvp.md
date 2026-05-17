---
title: Model-View-Presenter (MVP)
description: Taqdimot mantig'ini test qilish mumkin bo'lgan presenterlar yordamida viewlardan ajratadi
icon: Users
---

# Model-View-Presenter (MVP)

<CoverImage src="/covers/architectural/mvp.png" alt="Cover">
  <h1>MVP</h1>
  <p>A theatrical stage where a flashy Presenter robot stands in the middle, actively passing script sheets back and forth between a shy Model robot behind the curtain and a blank View canvas facing the audience.</p>
</CoverImage>

## Umumiy ko'rinish (Overview)

**Model-View-Presenter (MVP)** patterni taqdimot mantig'ini viewdan (ko'rinishdan) ajratish orqali test qilish qulayligini yaxshilash uchun MVC dan evolyutsiya qilgan arxitektura patternidir. U ilovani quyidagilarga ajratadi:

- **Model**: Ma'lumotlar va biznes mantig'ini o'z ichiga oladi
- **View (Ko'rinish)**: Hech qanday mantiqsiz passiv ko'rsatish komponenti
- **Presenter**: Taqdimot mantig'ini o'z ichiga oladi va foydalanuvchi interaksiyalarini (o'zaro harakatlarini) boshqaradi

MVC dan asosiy farqi shundaki, View o'rniga Presenter foydalanuvchining barcha o'zaro harakatlarini boshqaradi.

## Maqsad (Purpose)

MVP patterni quyidagilarni maqsad qiladi:

- Viewlarni test qilish mumkin bo'lishi uchun ulardan taqdimot mantig'ini olib tashlash
- Biznes va taqdimot mantig'i o'rtasida aniq ajratishni ta'minlash
- Viewlarni taqdimot mantig'idan ajratish orqali testlashni osonlashtirish
- Saqlash osonroq bo'lgan passiv viewlarni ta'minlash
- Kodni qayta ishlash va moslashuvchanlikni yaxshilash

## Muammo (Problem)

An'anaviy MVC quyidagi muammolardan aziyat chekishi mumkin:

- Viewlarda test qilish qiyin bo'lgan taqdimot mantig'i mavjudligi
- Model va View o'rtasidagi to'g'ridan-to'g'ri bog'liqlik sababli qattiq birikish (tight coupling)
- Viewga tegishli mantiqni testlash qiyinligi
- Viewlarning juda ko'p mas'uliyatni o'z bo'yniga oluvchi God object'larga aylanib qolishi
- Testlarga ta'sir qilmasdan taqdimot qismini o'zgartirish qiyinligi

```
❌ Mantig'i ko'p Viewga ega MVC
┌──────────────┐
│     View     │
├──────────────┤
│ • Renderlash │
│ • Mantiq     │  ← Test qilish qiyin
│ • Bog'lash   │
│ • Validatsiya│
└──────────────┘
```

## Yechim (Solution)

MVP taqdimot mantig'ini View va Modelni boshqaruvchi Presenterga ajratadi:

```
✅ MVP Arxitekturasi
┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│    Model     │      │    View      │      │  Presenter   │
├──────────────┤      ├──────────────┤      ├──────────────┤
│ • Ma'lumotlar│◄─────│ • Renderlash │◄─────│ • Mantiq     │
│ • Biznes     │      │ • Voqealar   │      │ • Validatsiya│
│   Mantig'i   │      │ (Passiv)     │      │ • Bog'lash   │
│ • Voqealar   │      │              │      │ • Buyruqlar  │
└──────────────┘      └──────────────┘      └──────────────┘
      ▲                      ▲                      │
      │                      │                      │
      └──────────────────────┴──────────────────────┘
            Presenter o'zaro harakatlarni muvofiqlashtiradi
```

**Jarayon (Flow):**

1. Foydalanuvchi View bilan o'zaro aloqada bo'ladi
2. View o'zaro harakat (interaction) haqida Presenterga xabar beradi
3. Presenter Modelni yangilaydi yoki ma'lumotlarni oladi
4. Presenter Viewga nimani ko'rsatish kerakligini aytadi
5. View ma'lumotlarni render qiladi (hech qanday mantiqsiz)

## Amalga oshirish (Implementation)

::: code-group

```typescript [typescript]
// Model - Contains data and business logic
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

class UserModel {
  private users: Map<number, User> = new Map();
  private nextId: number = 1;

  addUser(name: string, email: string, age: number): User {
    if (!name || !email || age < 0) {
      throw new Error("Invalid user data");
    }

    const user: User = {
      id: this.nextId++,
      name,
      email,
      age,
    };
    this.users.set(user.id, user);
    return user;
  }

  getUser(id: number): User | undefined {
    return this.users.get(id);
  }

  getAllUsers(): User[] {
    return Array.from(this.users.values());
  }

  updateUser(id: number, updates: Partial<User>): User | null {
    const user = this.users.get(id);
    if (!user) return null;

    const updated = { ...user, ...updates };
    this.users.set(id, updated);
    return updated;
  }

  deleteUser(id: number): boolean {
    return this.users.delete(id);
  }
}

// View - Passive view with no logic
interface IUserView {
  displayUsers(users: User[]): void;
  displayError(message: string): void;
  displaySuccess(message: string): void;
  displayUserForm(user?: User): void;
  onAddUserClick(callback: (name: string, email: string, age: number) => void): void;
  onUpdateUserClick(callback: (id: number, name: string, email: string, age: number) => void): void;
  onDeleteUserClick(callback: (id: number) => void): void;
  onViewUsersClick(callback: () => void): void;
}

class UserView implements IUserView {
  displayUsers(users: User[]): void {
    console.log("=== User List ===");
    users.forEach((user) => {
      console.log(`ID: ${user.id} | Name: ${user.name} | Email: ${user.email} | Age: ${user.age}`);
    });
  }

  displayError(message: string): void {
    console.error(`❌ Error: ${message}`);
  }

  displaySuccess(message: string): void {
    console.log(`✅ ${message}`);
  }

  displayUserForm(user?: User): void {
    if (user) {
      console.log(`Editing user: ${user.name}`);
    } else {
      console.log("Creating new user");
    }
  }

  onAddUserClick(callback: (name: string, email: string, age: number) => void): void {
    // In a real application, this would be connected to a button click event
    callback("New User", "newuser@example.com", 25);
  }

  onUpdateUserClick(
    callback: (id: number, name: string, email: string, age: number) => void,
  ): void {
    callback(1, "Updated User", "updated@example.com", 26);
  }

  onDeleteUserClick(callback: (id: number) => void): void {
    callback(1);
  }

  onViewUsersClick(callback: () => void): void {
    callback();
  }
}

// Presenter - Contains presentation logic
class UserPresenter {
  constructor(
    private model: UserModel,
    private view: IUserView,
  ) {
    this.setupViewCallbacks();
  }

  private setupViewCallbacks(): void {
    this.view.onAddUserClick((name, email, age) => this.handleAddUser(name, email, age));
    this.view.onUpdateUserClick((id, name, email, age) =>
      this.handleUpdateUser(id, name, email, age),
    );
    this.view.onDeleteUserClick((id) => this.handleDeleteUser(id));
    this.view.onViewUsersClick(() => this.handleViewUsers());
  }

  private handleAddUser(name: string, email: string, age: number): void {
    try {
      const user = this.model.addUser(name, email, age);
      this.view.displaySuccess(`User added with ID: ${user.id}`);
      this.handleViewUsers();
    } catch (error) {
      this.view.displayError((error as Error).message);
    }
  }

  private handleUpdateUser(id: number, name: string, email: string, age: number): void {
    try {
      const user = this.model.updateUser(id, { name, email, age });
      if (user) {
        this.view.displaySuccess(`User ${id} updated`);
        this.handleViewUsers();
      } else {
        this.view.displayError(`User ${id} not found`);
      }
    } catch (error) {
      this.view.displayError((error as Error).message);
    }
  }

  private handleDeleteUser(id: number): void {
    const deleted = this.model.deleteUser(id);
    if (deleted) {
      this.view.displaySuccess(`User ${id} deleted`);
      this.handleViewUsers();
    } else {
      this.view.displayError(`User ${id} not found`);
    }
  }

  private handleViewUsers(): void {
    const users = this.model.getAllUsers();
    this.view.displayUsers(users);
  }

  public start(): void {
    this.handleViewUsers();
  }
}

// Usage
const model = new UserModel();
const view = new UserView();
const presenter = new UserPresenter(model, view);

presenter.start();
view.onAddUserClick((name, email, age) => {
  const user = model.addUser(name, email, age);
  view.displaySuccess(`User ${user.id} added`);
  view.displayUsers(model.getAllUsers());
});
```

```python [python]
from typing import Dict, List, Optional, Callable
from dataclasses import dataclass

# Model - Contains data and business logic
@dataclass
class User:
    id: int
    name: str
    email: str
    age: int

class UserModel:
    def __init__(self):
        self.users: Dict[int, User] = {}
        self.next_id: int = 1

    def add_user(self, name: str, email: str, age: int) -> User:
        if not name or not email or age < 0:
            raise ValueError("Invalid user data")

        user = User(
            id=self.next_id,
            name=name,
            email=email,
            age=age
        )
        self.next_id += 1
        self.users[user.id] = user
        return user

    def get_user(self, user_id: int) -> Optional[User]:
        return self.users.get(user_id)

    def get_all_users(self) -> List[User]:
        return list(self.users.values())

    def update_user(self, user_id: int, **updates) -> Optional[User]:
        user = self.users.get(user_id)
        if not user:
            return None

        for key, value in updates.items():
            if hasattr(user, key):
                setattr(user, key, value)

        return user

    def delete_user(self, user_id: int) -> bool:
        if user_id in self.users:
            del self.users[user_id]
            return True
        return False

# View - Passive view with no logic
class UserView:
    def __init__(self):
        self.add_user_callbacks: List[Callable] = []
        self.update_user_callbacks: List[Callable] = []
        self.delete_user_callbacks: List[Callable] = []
        self.view_users_callbacks: List[Callable] = []

    def display_users(self, users: List[User]) -> None:
        print("=== User List ===")
        for user in users:
            print(f"ID: {user.id} | Name: {user.name} | Email: {user.email} | Age: {user.age}")

    def display_error(self, message: str) -> None:
        print(f"❌ Error: {message}")

    def display_success(self, message: str) -> None:
        print(f"✅ {message}")

    def display_user_form(self, user: Optional[User] = None) -> None:
        if user:
            print(f"Editing user: {user.name}")
        else:
            print("Creating new user")

    def on_add_user_click(self, callback: Callable[[str, str, int], None]) -> None:
        self.add_user_callbacks.append(callback)

    def on_update_user_click(self, callback: Callable[[int, str, str, int], None]) -> None:
        self.update_user_callbacks.append(callback)

    def on_delete_user_click(self, callback: Callable[[int], None]) -> None:
        self.delete_user_callbacks.append(callback)

    def on_view_users_click(self, callback: Callable[[], None]) -> None:
        self.view_users_callbacks.append(callback)

    def trigger_add_user(self, name: str, email: str, age: int) -> None:
        for callback in self.add_user_callbacks:
            callback(name, email, age)

    def trigger_update_user(self, user_id: int, name: str, email: str, age: int) -> None:
        for callback in self.update_user_callbacks:
            callback(user_id, name, email, age)

    def trigger_delete_user(self, user_id: int) -> None:
        for callback in self.delete_user_callbacks:
            callback(user_id)

    def trigger_view_users(self) -> None:
        for callback in self.view_users_callbacks:
            callback()

# Presenter - Contains presentation logic
class UserPresenter:
    def __init__(self, model: UserModel, view: UserView):
        self.model = model
        self.view = view
        self.setup_view_callbacks()

    def setup_view_callbacks(self) -> None:
        self.view.on_add_user_click(self.handle_add_user)
        self.view.on_update_user_click(self.handle_update_user)
        self.view.on_delete_user_click(self.handle_delete_user)
        self.view.on_view_users_click(self.handle_view_users)

    def handle_add_user(self, name: str, email: str, age: int) -> None:
        try:
            user = self.model.add_user(name, email, age)
            self.view.display_success(f"User added with ID: {user.id}")
            self.handle_view_users()
        except ValueError as e:
            self.view.display_error(str(e))

    def handle_update_user(self, user_id: int, name: str, email: str, age: int) -> None:
        try:
            user = self.model.update_user(user_id, name=name, email=email, age=age)
            if user:
                self.view.display_success(f"User {user_id} updated")
                self.handle_view_users()
            else:
                self.view.display_error(f"User {user_id} not found")
        except ValueError as e:
            self.view.display_error(str(e))

    def handle_delete_user(self, user_id: int) -> None:
        if self.model.delete_user(user_id):
            self.view.display_success(f"User {user_id} deleted")
            self.handle_view_users()
        else:
            self.view.display_error(f"User {user_id} not found")

    def handle_view_users(self) -> None:
        users = self.model.get_all_users()
        self.view.display_users(users)

    def start(self) -> None:
        self.handle_view_users()

# Usage
model = UserModel()
view = UserView()
presenter = UserPresenter(model, view)

presenter.start()
view.trigger_add_user("John Doe", "john@example.com", 30)
view.trigger_view_users()
```

:::

## Haqiqiy hayotdagi misollar (Real-World Examples)

### Android Ilovasi

Android MVP odatda mobil ilovalar ishlab chiqish uchun ishlatiladi:

- **Model**: Ma'lumotlar bazasi va API so'rovlari
- **View**: Activity yoki Fragment (Presenter'dan buyruqlarni qabul qiladi)
- **Presenter**: UI mantig'ini o'z ichiga oladi (test qilish mumkin)

### Desktop Ilovasi (WinForms/WPF)

Windows Forms ko'pincha MVP dan foydalanadi:

- Viewlar formalar yoki foydalanuvchi boshqaruvlaridir
- Presenterlar barcha biznes mantig'ini ko'rib chiqadi
- Modellar ma'lumotlarni taqdim etadi

## Afzalliklari (Advantages) ✅

- **Yaxshilangan test qilish qulayligi**: Presenter mantig'i UIsiz test qilinishi mumkin
- **Passiv Viewlar**: Viewlarda minimal kod, asosan faqat renderlash bo'ladi
- **Aniq ajratish**: Taqdimot va biznes mantig'i o'rtasidagi kuchli ajratish
- **Osonroq texnik xizmat ko'rsatish**: Biznes mantig'iga o'zgartirish kiritish UI o'zgarishini talab qilmaydi
- **Qayta ishlatiladigan Presenterlar**: Bitta presenter turli viewlar bilan ishlashi mumkin
- **Yaxshiroq hujjatlashtirish**: Har bir komponentning aniq mas'uliyati bor
- **Kamaytirilgan bog'liqlik (Reduced Coupling)**: Viewlar modellar haqida bilishi shart emas
- **Moslashuvchan View (View) amaliyoti**: Viewlarni osongina almashtirish mumkin

## Kamchiliklari (Disadvantages) ❌

- **Boilerplate Kod**: Oddiy ilovalar uchun ko'proq kod yozish talab etiladi
- **O'rganish vaqti**: Dasturchilar patternni tushunishlari kerak
- **Murakkablik**: Qo'shimcha abstraksiya qatlami
- **Callback boshqaruvi**: View va Presenter o'rtasidagi callbacklarni boshqarish murakkab bo'lishi mumkin
- **Ishlash tezligi**: Qo'shimcha qatlam biroz kechikish (overhead) qo'shishi mumkin
- **Ikki tomonlama bog'lanish (Two-Way Binding)**: View va Model holatini sinxronlashtirish qiyin bo'lishi mumkin
- **View-Presenter aloqasi**: Ehtiyotkor interfeys dizaynini talab qiladi
- **View ni test qilish**: Viewlarni (dizaynga ko'ra) haliyam test qilish qiyin

## Qachon foydalanish kerak (When to Use) ✅

- **Test qilinishi kerak bo'lgan UI Ilovalar**: Taqdimot mantig'ini unit test qilish muhim bo'lganda
- **Katta Desktop Ilovalar**: WinForms, WPF yoki Java Swing ilovalari
- **Mobil Ilovalar**: Android, iOS native dasturlash
- **Murakkab UI mantiqqa ega ilovalar**: Taqdimot mantig'i muhim bo'lganda
- **Har bir Model uchun bir nechta Viewlar**: Turli viewlarga bitta mantiq kerak bo'lganda
- **Uzoq muddatli loyihalar**: Texnik xizmat ko'rsatish (maintainability) juda muhim bo'lgan joylarda
- **Jamoaviy ishlash**: UIda bir nechta dasturchilar ishlaganda
- **Eski tizimlarni modernizatsiya qilish**: Mavjud ilovalarni yaxshilashda

## Qachon foydalanmaslik kerak (When NOT to Use) ❌

- **Oddiy Web Sahifalar**: Statik kontent yoki oddiy shablonlar
- **Real vaqt ilovalari**: Sinxronizatsiya kechikishi muhim bo'lgan joylarda
- **Tezkor prototiplash**: Tez isbotlanuvchi (proof-of-concepts) loyihalar
- **Ishlash tezligi kritik bo'lganda**: Har bir millisekund muhim bo'lganda
- **Oddiy skriptlar**: Buyruqlar qatori yordamchi dasturlari
- **SPA Frameworklari**: React, Vue, Angular o'zlarining patternlariga ega (MVVM)
- **Mikro-Ilovalar**: Minimal mantiqqa ega juda kichik ilovalar
- **Voqealarga asoslangan tizimlar**: Voqea patternlari (event patterns) allaqachon o'rnatilgan joylarda

## Aloqador Patternlar (Related Patterns)

- **Model-View-Controller (MVC)**: Undan oldingi pattern
- **Model-View-ViewModel (MVVM)**: Ma'lumotlarni bog'lash (data binding) bilan muqobil pattern
- **Observer Pattern**: View-presenter aloqasi uchun ishlatiladi
- **Command Pattern**: Presenter amallarini kapsulalash uchun ishlatiladi
- **Strategy Pattern**: Turli taqdimot strategiyalari uchun
- **Factory Pattern**: Viewlar va Presenterlarni yaratish uchun
