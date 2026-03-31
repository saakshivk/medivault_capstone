from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.http import require_GET
from .models import Patient


def index(request):
    return render(request, "index.html")


def login(request):
    return render(request, "login.html")


def register(request):
    return render(request, "register.html")


def admin_portal(request):
    return render(request, "admin.html")


def dashboard(request):
    return render(request, "dashboard.html")


def records_page(request):
    return render(request, "records.html")


def upload(request):
    return render(request, "upload.html")


def health_info(request):
    return render(request, "health-info.html")


def tablets(request):
    return render(request, "tablets.html")


def appointments(request):
    return render(request, "appointments.html")


def profile(request):
    return render(request, "profile.html")


def standalone(request):
    return render(request, "medivault-standalone.html")


@require_GET
def health(request):
    return JsonResponse({"status": "ok", "patients": Patient.objects.count()})
