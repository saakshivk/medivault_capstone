from django.db import models


class Patient(models.Model):
    fullname = models.CharField(max_length=200)
    email = models.EmailField(unique=True)
    patient_id = models.CharField(max_length=30, unique=True)


class MedicalRecord(models.Model):
    RECORD_TYPES = [
        ("lab", "Lab"),
        ("prescription", "Prescription"),
        ("scan", "Scan"),
        ("discharge", "Discharge Summary"),
    ]
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    file_name = models.CharField(max_length=255)
    file_type = models.CharField(max_length=20, choices=RECORD_TYPES)
    file_url = models.URLField(blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)


class HealthInfo(models.Model):
    patient = models.OneToOneField(Patient, on_delete=models.CASCADE)
    blood_group = models.CharField(max_length=10, blank=True)
    allergies = models.TextField(blank=True)
    chronic_disease = models.TextField(blank=True)
    current_medication = models.TextField(blank=True)
    other_info = models.TextField(blank=True)
    emergency_contact = models.CharField(max_length=100, blank=True)


class TabletRecord(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    tablet_name = models.CharField(max_length=150)
    tablets_available = models.PositiveIntegerField(default=0)
    tablets_per_day = models.PositiveIntegerField(default=0)
    updated_at = models.DateField(auto_now=True)


class Appointment(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    appointment_at = models.DateTimeField()
    place = models.CharField(max_length=200, blank=True)
