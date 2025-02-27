from django.shortcuts import render, redirect
from django.contrib.auth import logout
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse


# Create your views here.
def home(request): 
    return render(request, "home.html")

def logout_view(request):
    logout(request)
    return redirect("")

# @login_required
# def dashboard(request):
#     return render(request, "dashboard.html")

@login_required
def dashboard(request):
    return redirect("/landing-page")  # Redirect to the root URL which will be handled by React Router

def landing_page(request):
    return render(request, 'index.html')


@login_required
def get_user_profile(request):
    user = request.user
    user_data = {
        "name": user.get_full_name(),  # Full name from Google Login
        "email": user.email,  # Email from Google Login
        "profile_picture": user.socialaccount_set.filter(provider="google").first().extra_data.get("picture", "") if hasattr(user, "socialaccount_set") else "",
    }
    return JsonResponse(user_data)