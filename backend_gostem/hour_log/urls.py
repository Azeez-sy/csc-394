from django.urls import path
from .views import HourLogListCreateView

urlpatterns = [
    path('', HourLogListCreateView.as_view(), name='hourlog-list-create'),
]
