# Student Opportunity System (SOS)

The **Student Opportunity System** is a technology platform designed to guide students toward the most suitable academic paths based on an analysis of their interests. 

In its current phase, the platform utilizes a robust, rule-based logic engine to provide accurate and fast recommendations based on user responses. Artificial intelligence technologies were intentionally excluded at this stage to ensure the stability and reliability of the Minimum Viable Product (MVP).

---

## 🛠️ Tech Stack

### Frontend
* **React.js** (v18+)
* **TypeScript** (For type safety and scalable architecture)
* **Tailwind CSS** (For responsive and modern UI styling)

### Backend
* **Laravel** (PHP Framework for robust API development)
* **MySQL** (Database management)

---

## 🚀 Features
* **Rule-Based Recommendation Engine:** Fast and precise academic path suggestions.
* **Interactive Survey/Quiz:** User-friendly forms to capture student interests.
* **Modern Dashboard:** Clean and intuitive user interface.
* **Secure API:** Built with Laravel to handle frontend requests efficiently.

---

## 💻 Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites
* **Node.js** (v18 or higher) & **npm**
* **PHP** (v8.1 or higher) & **Composer**
* **MySQL**

### 1. Backend Setup (Laravel)
1. Navigate to the backend directory:
## cd backend
* Install PHP dependencies:
composer install
* Copy the environment file and configure your database:
cp .env.example .env
(Make sure to update DB_DATABASE, DB_USERNAME, and DB_PASSWORD inside the .env file)
* Generate the application key:
php artisan key:generate
* Run database migrations:
php artisan migrate
* Start the Laravel development server:
php artisan serve

### 2. Frontend Setup (React + TypeScript)
Navigate to the frontend directory:
## cd frontend
* Install npm packages:
npm install
* Start the React development server:
npm run dev
