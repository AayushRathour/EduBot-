# EduBot: AI Powered Student Assistance Chatbot - Project Presentation Guide

This document provides a comprehensive overview of the **EduBot** project, designed for presentation purposes. It details the frontend, backend, database architecture, authentication flows, and instructions for accessing and running the project.

## 1. Project Overview
**EduBot** is a full-stack web application built to provide 24/7 academic assistance to students using NLP techniques. It features a real-time conversational interface, secure user authentication, a personalized student dashboard, and a dedicated admin portal for user management and global announcements.

---

## 2. Frontend Architecture
The frontend is designed to be lightweight, responsive, and visually appealing, ensuring a seamless user experience across devices.

*   **Technology Stack**: HTML5, CSS3, JavaScript, and **Tailwind CSS** for rapid and modern UI styling.
*   **Template Structure**: Utilizes Django's templating engine. The UI is built on a modular template system where child pages (e.g., login, dashboard, home) inherit from a master `base.html` template.
*   **Static Assets**: Custom stylesheets (`edubot.css`), JavaScript logic for the conversational interface (`edubot.js`), and images are organized in the `static/` directory.
*   **Key UI Components**:
    *   **Landing Pages (`core`)**: Home, Features, Roadmap, Courses, FAQ, Contact, and Demo pages.
    *   **Authentication Pages (`accounts`)**: Modern login and registration forms with validation feedback.
    *   **Student Dashboard (`userpanel`)**: A personalized space for students to view their profile, access the AI chatbot, and manage their details.
    *   **Admin Dashboard (`adminpanel`)**: A secure interface for administrators to manage users and broadcast notifications.

---

## 3. Backend Architecture
The backend is powered by **Django (v4.2)**, a high-level Python web framework that encourages rapid development and clean, pragmatic design.

### Application Structure
The project follows a modular structure, divided into four main Django apps:
1.  **`core`**: Handles all the public-facing static pages (Home, FAQ, Contact) and global system notifications.
2.  **`accounts`**: Manages all authentication logic, including User/Admin login, registration, and logout, utilizing Django's built-in authentication system.
3.  **`userpanel`**: Contains views and logic specific to logged-in students, such as viewing and updating their profiles.
4.  **`adminpanel`**: A custom-built, secure portal exclusive to superusers for managing the platform.

### Authentication & Authorization Flow
*   **Standard Users (Students)**:
    *   Users sign up via `/accounts/signup/`.
    *   They log in at `/accounts/login/`.
    *   Upon successful login, they are redirected to the homepage (`/`) and can access their private dashboard (`/dashboard/`).
    *   A `UserProfile` is automatically generated for them via Django Signals upon registration.
*   **Administrators**:
    *   Admins have a dedicated secure login portal at `/edu-admin/login/`.
    *   The system strictly verifies the `is_superuser` flag. Standard users attempting to log in here are denied access.
    *   Upon successful admin login, they are routed to `/edu-admin/` (the admin dashboard).
*   **Session Management**: Handled securely by Django's SessionMiddleware, ensuring users remain logged in securely across pages.

---

## 4. Database Schema
The project uses **SQLite3** (`db.sqlite3`) as the default database, which is lightweight and perfect for development and moderate production loads.

### Key Models (Tables)
1.  **`User` (Django Built-in)**:
    *   Handles core authentication details: `username`, `password`, `email`, `first_name`, `last_name`, `is_active`, `is_superuser`, `date_joined`.
2.  **`UserProfile` (`accounts` app)**:
    *   Linked to the `User` model via a One-to-One relationship.
    *   **Fields**: `role` (user/admin), `bio`, `avatar`, `phone`, `joined_at`, `last_updated`.
    *   *Note: This profile is automatically created when a new user registers using Django's `post_save` signals.*
3.  **`Notification` (`core` app)**:
    *   Used by admins to broadcast messages to all users.
    *   **Fields**: `title`, `message`, `created_at`, `is_active`.

---

## 5. Endpoints & Routing Guide

### Public Endpoints (Accessible to all)
*   `GET /` - Homepage
*   `GET /features/` - Features Page
*   `GET /courses/` - Courses List
*   `GET /demo/` - Chatbot Demo
*   `GET /faq/` - Frequently Asked Questions
*   `GET /contact/` - Contact Us

### Authentication Endpoints
*   `GET/POST /accounts/login/` - User login page
*   `GET/POST /accounts/signup/` - User registration page
*   `GET /accounts/logout/` - Logs the user out

### Student Endpoints (Requires Login)
*   `GET /dashboard/` - Student Dashboard
*   `GET/POST /dashboard/profile/` - View and update student profile

### Admin Endpoints (Requires Superuser Privileges)
*   `GET/POST /edu-admin/login/` - Dedicated Admin Login
*   `GET /edu-admin/logout/` - Admin Logout
*   `GET /edu-admin/` - Admin Dashboard (Overview & Stats)
*   `GET /edu-admin/users/` - List and search all students
*   `GET /edu-admin/users/<id>/` - View specific student details
*   `POST /edu-admin/users/<id>/toggle/` - Activate/Deactivate a student account
*   `POST /edu-admin/users/<id>/delete/` - Permanently delete a student account
*   `GET/POST /edu-admin/register-admin/` - Register a new administrator
*   `GET /edu-admin/notifications/` - Manage global system notifications
*   `POST /edu-admin/notifications/create/` - Broadcast a new notification

---

## 6. How to Run & Access the Project Locally

To run the project on a local machine for the presentation or development:

### Prerequisites
*   Python 3.x installed
*   Virtual environment (recommended)

### Steps to Run
1.  **Open Terminal/Command Prompt** and navigate to the project root directory (`c:\All Programing\My personal\Vivek`).
2.  **Activate Virtual Environment** (if you have one setup).
3.  **Install Dependencies**: Ensure Django is installed (`pip install django`).
4.  **Run Migrations**: Ensure the database is up to date:
    ```bash
    python manage.py makemigrations
    python manage.py migrate
    ```
5.  **Start the Server**:
    ```bash
    python manage.py runserver
    ```
6.  **Access the Application**:
    *   Open a web browser and go to: `http://127.0.0.1:8000/`

### Creating an Admin Account (If needed)
If you need to create a fresh admin account for the presentation:
```bash
python manage.py createsuperuser
```
Follow the prompts to set a username, email, and password. You can then log in at `http://127.0.0.1:8000/edu-admin/login/`.

---

> [!TIP]
> **Presentation Tip**: Start the presentation by showing the seamless user registration and login flow, transition into the student dashboard to demonstrate the personalized experience, and conclude by logging into the secure Admin Portal to showcase user management and broadcasting notifications.
