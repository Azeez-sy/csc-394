from django.urls import path
from . import views
from user.views import dashboard


urlpatterns = [
    #path("", views.home),
    path("logout", views.logout_view),
    path("dashboard/", dashboard, name="dashboard"),
]