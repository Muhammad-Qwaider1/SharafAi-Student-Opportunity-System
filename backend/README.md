Student Opportunity API

مشروع Laravel API لإدارة اختبارات التوجيه المهني والـ OTP Authentication.

Technologies
Laravel
Sanctum Authentication
Queue & Jobs
Mail (SMTP)
MySQL
REST API
Installation

1. Clone Project
   git clone https://github.com/Mostafa-Yazbek/Student-Opportunity.git
   cd Student-Opportunity
2. Install Dependencies
   composer install
3. Create Environment File
   cp .env.example .env
4. Generate App Key
   php artisan key:generate
   Database Setup

عدّل معلومات قاعدة البيانات داخل .env

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=student_opportunity
DB_USERNAME=root
DB_PASSWORD=
Sanctum Setup

ثبت Sanctum:

composer require laravel/sanctum

انشر ملفات Sanctum:

php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"

نفذ migrations:

php artisan migrate
Queue Setup

داخل .env

QUEUE_CONNECTION=database

أنشئ جدول الـ jobs:

php artisan queue:table

أنشئ جدول failed jobs:

php artisan queue:failed-table

نفذ migration:

php artisan migrate

شغّل الـ queue worker:

php artisan queue:work
Mail Setup

داخل .env

مثال Gmail SMTP:

MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=YOUR_EMAIL@gmail.com
MAIL_PASSWORD=YOUR_APP_PASSWORD
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=YOUR_EMAIL@gmail.com
MAIL_FROM_NAME="Student Opportunity"
Seed Database
php artisan db:seed
Run Server
الطريقة الأفضل:
php artisan serve

إذا عندك مشكلة Windows مع artisan serve استخدم:

php -S 127.0.0.1:8000 -t public
API Base URL
http://127.0.0.1:8000/api/V1
Important Commands
Clear Cache
php artisan optimize:clear
Restart Queue
php artisan queue:restart
Authentication

المشروع يستخدم Laravel Sanctum.

ضع التوكن داخل الهيدر:

Authorization: Bearer TOKEN
OTP System
يتم إرسال OTP عبر Email
مدة صلاحية OTP = 15 دقيقة
إعادة الإرسال بعد 3 دقائق
OTP يتم تخزينه داخل جدول verification_codes
يتم تعطيل OTP بعد الاستخدام
Main Features
Register/Login
Email OTP Verification
Forgot Password
Reset Password
Assessment System
Questions & Options
User Attempts
Result Mapping

Postman Collection

استخدم Postman Collection لاختبار جميع الـ APIs.
