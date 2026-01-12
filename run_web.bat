@echo off
cd backend
start "Laravel Server" php artisan serve
start "Vite Server" npm run dev
echo .
echo Web application started successfully!
echo .
echo Visit http://127.0.0.1:8000 in your browser.
echo .
pause
