from django.contrib import admin
from .models import Tutor, Schedule
# Register your models here.

@admin.register(Tutor)
class TutorAdmin(admin.ModelAdmin):
    list_display = ('name', 'email')

@admin.register(Schedule)
class ScheduleAdmin(admin.ModelAdmin):
    list_display = ('tutor', 'date', 'start_time', 'end_time', 'subject')
    list_filter = ('date', 'tutor')
    