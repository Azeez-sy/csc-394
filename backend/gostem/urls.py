"""
URL configuration for gostem project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("polls/", include("polls.urls")),  # Polls app URLs
    path("admin/", admin.site.urls),  # Admin panel

    path("api/polls/", include("polls.urls")),  # API route for polls
    path("api/notes/", include("notes.urls")),  # API route for notes
    path("api/hours/", include("HourLog.urls")),  # API route for hours -Bobbya

    path("", include("polls.urls")),  # root URL still mapped to polls
]


#fixed an issue where there were two admins was giving me issues when i ran the run server command - Bobby