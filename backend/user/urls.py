from django.urls import path, re_path
from . import views
from user.views import dashboard, get_user_profile

urlpatterns = [
    #path("", views.home),
    path("logout", views.logout_view, name='logout'),
    path("dashboard", dashboard, name="dashboard"),
    path("api/profile/", get_user_profile, name="get_user_profile"),
]