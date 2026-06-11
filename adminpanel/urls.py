from django.urls import path
from . import views

app_name = "adminpanel"

urlpatterns = [
    path("", views.dashboard, name="dashboard"),
    path("login/", views.admin_login, name="admin_login"),
    path("logout/", views.admin_logout, name="admin_logout"),
    path("users/", views.user_list, name="user_list"),
    path("users/<int:user_id>/", views.user_detail, name="user_detail"),
    path("users/<int:user_id>/delete/", views.user_delete, name="user_delete"),
    path("users/<int:user_id>/toggle/", views.toggle_user_status, name="toggle_user_status"),
    path("register-admin/", views.admin_register, name="admin_register"),
    path("notifications/", views.notification_list, name="notification_list"),
    path("notifications/create/", views.notification_create, name="notification_create"),
    path("notifications/<int:notif_id>/toggle/", views.notification_toggle, name="notification_toggle"),
    path("notifications/<int:notif_id>/delete/", views.notification_delete, name="notification_delete"),
]
