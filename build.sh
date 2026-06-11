#!/usr/bin/env bash
# build.sh — Run this before starting the server on Replit / any PaaS

set -o errexit   # exit on error

echo "=== Installing Python dependencies ==="
pip install -r requirements.txt

echo "=== Running database migrations ==="
python manage.py migrate --noinput

echo "=== Collecting static files ==="
python manage.py collectstatic --noinput --clear

echo "=== Creating superuser if missing ==="
python manage.py shell -c "
from django.contrib.auth import get_user_model
User = get_user_model()
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@edubot.com', 'Admin@123')
    print('Superuser created: admin / Admin@123')
else:
    print('Superuser already exists.')
"

echo "=== Build complete ==="
