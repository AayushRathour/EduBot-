from django.urls import path

from . import views

app_name = "core"

urlpatterns = [
    path("", views.home, name="home"),
    path("features/", views.features, name="features"),
    path("roadmap/", views.roadmap, name="roadmap"),
    path("courses/", views.courses, name="courses"),
    path("demo/", views.demo, name="demo"),
    path("faq/", views.faq, name="faq"),
    path("contact/", views.contact, name="contact"),
]
