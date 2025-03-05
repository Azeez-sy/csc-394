from django.shortcuts import render, redirect
from django.contrib.auth import logout
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from .models import User
from django.views.decorators.csrf import csrf_exempt


# Create your views here.
def home(request): 
    return render(request, "home.html")

def logout_view(request):
        logout(request)
        return redirect('/')

@csrf_exempt
def user_list(request):
    if request.method == 'POST':
         first_name = request.POST['first_name']
         last_name = request.POST['last_name']
         email = request.POST['email']
         role = request.POST['role']
         if role == 'admin':
              isAdmin = True
         else:
              isAdmin = False

         new_user = User(first_name=first_name, last_name=last_name, email=email, role=role, isAdmin=isAdmin)
         new_user.save()
    return render(request, 'user_list.html')

def dashboard(request):
    return redirect("/landing-page")  # Redirect to the root URL which will be handled by React Router

def landing_page(request):
    return render(request, 'index.html')

def get_user_profile(request):
    user = request.user
    user_data = {
        "name": user.get_full_name(),  # Full name from Google Login
        "email": user.email,  # Email from Google Login
        "profile_picture": user.socialaccount_set.filter(provider="google").first().extra_data.get("picture", "") if hasattr(user, "socialaccount_set") else "",
    }
    return JsonResponse(user_data)