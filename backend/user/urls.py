from django.urls import path
from . import views
from user.views import dashboard
from user.views import get_user_profile


urlpatterns = [
    #path("", views.home),
    path("logout", views.logout_view),
    path("dashboard/", dashboard, name="dashboard"),
    path("api/profile/", get_user_profile, name="get_user_profile"),
]