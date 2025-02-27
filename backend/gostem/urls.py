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
from django.urls import path, include, re_path
from user.views import landing_page, dashboard



urlpatterns = [

    path("chats/", include("chats.urls")),
    path("admin/", admin.site.urls),
    path('api/', include('chats.urls')),
    # path('', include('chats.urls')),
    path('api/', include('notes.urls')),

    path('notes/', include('notes.urls')),

    path("accounts/", include("allauth.urls")),
    path("", include("user.urls")),
    path("dashboard/", dashboard, name="dashboard"),  # Ensure this route is defined
    re_path(r'^.*$', landing_page),  # Catch-all pattern to serve index.html for all routes

]
