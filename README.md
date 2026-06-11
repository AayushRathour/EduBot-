# EduBot — AI Powered Student Assistance Chatbot

A full-stack Django web application providing 24/7 AI-powered academic assistance to students.

## 🚀 Deploy to Replit (One-Click)

[![Run on Replit](https://replit.com/badge/github/AayushRathour/EduBot-)](https://replit.com/github/AayushRathour/EduBot-)

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Backend | Python 3.11 + Django 4.2 |
| Frontend | HTML5 + Tailwind CSS + Vanilla JS |
| Database | SQLite3 (development / Replit) |
| Server | Gunicorn |
| Static Files | WhiteNoise |

## ✨ Features

- 🤖 Conversational AI chatbot interface
- 🔐 Secure user registration & login
- 📊 Personalized student dashboard
- 🛡️ Admin portal (user management, notifications)
- 🔔 Global broadcast notification system
- 📱 Fully responsive UI

## 🔧 Replit Deployment Steps

### 1. Import from GitHub
Go to [Replit](https://replit.com) → **Create Repl** → **Import from GitHub** → paste `https://github.com/AayushRathour/EduBot-`

### 2. Add Secrets
In Replit's left sidebar → **Secrets** → add:

| Key | Value |
|---|---|
| `SECRET_KEY` | Generate one: `python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"` |
| `DEBUG` | `False` |

### 3. Run the Build Script
Open the **Shell** tab in Replit and run:
```bash
bash build.sh
```

### 4. Click Run ▶
Replit will start the server automatically using Gunicorn.

## 🔑 Default Admin Credentials

| Field | Value |
|---|---|
| URL | `/edu-admin/login/` |
| Username | `admin` |
| Password | `Admin@123` |

> ⚠️ Change the password immediately after first login in production!

## 💻 Local Development

```bash
# 1. Clone
git clone https://github.com/AayushRathour/EduBot-.git
cd EduBot-

# 2. Create virtual environment
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Run migrations
python manage.py migrate

# 5. Create superuser
python manage.py createsuperuser

# 6. Start server
python manage.py runserver
```

## 📄 License
MIT
