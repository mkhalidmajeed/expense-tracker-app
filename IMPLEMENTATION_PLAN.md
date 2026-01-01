# ExpenseTracker Implementation Plan

## 1. Database Design (MySQL)

**Users Table**
- id (PK)
- name
- email (unique)
- password
- timestamps

**Categories Table**
- id (PK)
- user_id (FK, nullable) -> If null, it's a default system category.
- name
- type (enum: 'expense', 'income') - *Focusing on expense mostly per req, but good for future.*
- icon (string) - name of icon for frontend
- color (string) - hex code
- timestamps

**Expenses Table**
- id (PK)
- user_id (FK)
- category_id (FK)
- amount (decimal 10, 2)
- description (text, nullable)
- date (date)
- image_path (string, nullable)
- timestamps

## 2. Backend Setup (Laravel)
- Install Laravel (In Progress)
- Configure `.env` for MySQL.
- Setup Sanctum for Authentication.

## 3. API Development
**Routes**
- `POST /register`
- `POST /login`
- `GET /user`
- `GET /categories` (System + User specific)
- `POST /categories`
- `GET /expenses` (Filter by month)
- `POST /expenses`
- `PUT /expenses/{id}`
- `DELETE /expenses/{id}`
- `GET /stats/monthly` (Aggregated data)

## 4. Mobile App Setup (React Native)
- Initialize CLI app (In Progress)
- Setup React Navigation (Native Stack + Bottom Tabs).
- Setup Axios for API calls.
- UI Libraries: React Native Paper or basic StyleSheet.

## 5. UI/UX Implementation
**Screens**
- Login/Register
- Dashboard (Home)
- Add/Edit Expense
- Stats/Reports
- Manage Categories

## 6. Integration
- Connect logical flows.
- Handle Auth tokens (AsyncStorage).
