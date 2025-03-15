from django.urls import path, re_path
from . import views
from user.views import dashboard, get_user_profile

urlpatterns = [
    path("", views.home),  # Keep your home view
    path("logout", views.logout_view, name='logout'),  # Use Daniel's named URL pattern
    path("dashboard", dashboard, name="dashboard"),
    path("api/profile/", get_user_profile, name="get_user_profile"),
    path("user-list", views.user_list)
]