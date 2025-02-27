from django.shortcuts import render, redirect, get_object_or_404
from django.http import JsonResponse
from .models import Schedule
from .forms import ScheduleForm
from django.views.decorators.csrf import csrf_exempt
import json

# Create your views here.

def schedule_list(request):
    """API endpoint to get scheduled tutoring sessions"""
    schedules = Schedule.objects.all().order_by('date', 'start_time')
    schedule_data = list(schedules.values('id', 'date', 'start_time', 'end_time', 'tutor_id', 'subject'))
    return JsonResponse({'schedules': schedule_data})

@csrf_exempt
def schedule_create(request):
    """API endpoint to create a new schedule"""
    if request.method == 'POST':
        data = json.loads(request.body)
        form = ScheduleForm(data)
        if form.is_valid():
            schedule = form.save()
            return JsonResponse({'success': True, 'id': schedule.id}, status=201)
        return JsonResponse({'success': False, 'errors': form.errors}, status=400)
    return JsonResponse({'error': 'Only POST method allowed'}, status=405)