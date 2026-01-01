# Expense Tracker System

A comprehensive Expense Management System featuring a **Laravel + Inertia.js Web App** and a **React Native Mobile App**.

## 🚀 Features

### Web Application
- **Framework**: Laravel 11 + React (Inertia.js) + TailwindCSS
- **Authentication**: Secure Login/Register
- **Dashboard**: Real-time spending overview and charts
- **Management**: Full CRUD for Expenses and Categories with color-coding
- **Reports**: Visual spending trends and category breakdown
- **Design**: Premium glassmorphism UI with Dark Mode aesthetic

### Mobile Application
- **Framework**: React Native (Expo)
- **Features**: Syncs with backend, Add Expenses on the go, view Dashboard stats.

## 🛠️ Installation

### Backend Setup
1. Navigate to `/backend`
2. Run `composer install`
3. Run `npm install`
4. Copy `.env.example` to `.env` and configure database
5. Run `php artisan migrate --seed`
6. Start server: `php artisan serve`

### Mobile Setup
1. Navigate to `/mobile`
2. Run `npm install`
3. Start app: `npx expo start`

## 📄 License
This project is open-source and available under the MIT license.
