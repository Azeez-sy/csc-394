from django.shortcuts import render, redirect
from .models import Schedule
from .forms import ScheduleForm

# Create your views here.

def schedule_list(request):
    """display schduled tutoting sessions"""

    schedules = Schedule.objects.all().order_by('date', 'start_time')
    return render(request, 'schedule/schedule_list.html', {'schedules': schedules})

def schedule_create(request):
    """View to allow admins to create a new schedule"""
    if request.method == 'POST':
        form = ScheduleForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('schedule_list')
    else:
        form = ScheduleForm()
    return render(request, 'schedule/schedule_form.html', {'form': form})