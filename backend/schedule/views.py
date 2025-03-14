from django.shortcuts import render, redirect, get_object_or_404
from django.http import JsonResponse
from .models import Schedule
from .forms import ScheduleForm
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
import json


def get_user_info(request):
    user = request.user
    return JsonResponse({
        'email': user.email,
        'is_staff': user.is_staff,
        'is_superuser': user.is_superuser,
        # ... any other fields you need
    })

def schedule_page(request):
    """
    New view to render the schedule page.
    It passes an 'is_admin' flag to the template so that the frontend can show
    an extra button for adding events only to admin users.
    """
    # Use Django's built-in is_staff attribute as the admin flag.
    is_admin = request.user.is_staff if request.user.is_authenticated else False
    return render(request, 'schedule.html', {'is_admin': is_admin})


def schedule_list(request):
    """API endpoint to get scheduled tutoring sessions"""
    schedules = Schedule.objects.all().order_by('date', 'start_time')
    schedule_data = list(schedules.values('id', 'date', 'start_time', 'end_time', 'tutor_id', 'subject'))
    return JsonResponse({'schedules': schedule_data})

# @csrf_exempt
# def schedule_create(request):
#     """API endpoint to create a new schedule (admin only)"""
#     if request.method == 'POST':
#         # Only allow event creation if the user is authenticated and is an admin (is_staff)
#         if not (request.user.is_authenticated and request.user.is_staff):
#             return JsonResponse({'error': 'Unauthorized'}, status=403)
#         data = json.loads(request.body)
#         form = ScheduleForm(data)
#         if form.is_valid():
#             schedule = form.save()
#             return JsonResponse({'success': True, 'id': schedule.id}, status=201)
#         return JsonResponse({'success': False, 'errors': form.errors}, status=400)
#     return JsonResponse({'error': 'Only POST method allowed'}, status=405)


def schedule_create(request):
    if request.method == 'POST':
        if not request.user.is_authenticated:
            return JsonResponse({'error': 'Unauthorized'}, status=403)

        data = json.loads(request.body)
        print("Received event data:", data)  # Debugging log

        form = ScheduleForm(data)
        if form.is_valid():
            schedule = form.save()
            print("Event saved successfully:", schedule)
            return JsonResponse({'success': True, 'id': schedule.id}, status=201)

        print("Form errors:", form.errors)
        return JsonResponse({'success': False, 'errors': form.errors}, status=400)


def get_csrf_token(request):
    """Send CSRF token and ensure cookie is set"""
    response = JsonResponse({'csrfToken': get_token(request)})
    response["Access-Control-Allow-Credentials"] = "true"
    response.set_cookie("csrftoken", get_token(request), samesite='Lax', secure=False)
    return response

