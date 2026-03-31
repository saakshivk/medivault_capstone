from django.urls import path
from . import views

urlpatterns = [
    path("", views.index),
    path("index.html", views.index),
    path("login.html", views.login),
    path("register.html", views.register),
    path("admin.html", views.admin_portal),
    path("dashboard.html", views.dashboard),
    path("records.html", views.records_page),
    path("upload.html", views.upload),
    path("health-info.html", views.health_info),
    path("tablets.html", views.tablets),
    path("appointments.html", views.appointments),
    path("profile.html", views.profile),
    path("medivault-standalone.html", views.standalone),
    path("api/health/", views.health),
]
