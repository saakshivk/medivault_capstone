from django.contrib import admin
from .models import Appointment, HealthInfo, MedicalRecord, Patient, TabletRecord

admin.site.register(Patient)
admin.site.register(MedicalRecord)
admin.site.register(HealthInfo)
admin.site.register(TabletRecord)
admin.site.register(Appointment)
