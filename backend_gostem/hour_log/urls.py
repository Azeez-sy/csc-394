from django.urls import path
from .views import HourLogListCreateView, HourLogDetailView

urlpatterns = [
    path('', HourLogListCreateView.as_view(), name='hourlog-list-create'),
    path('<int:pk>/', HourLogDetailView.as_view(), name='hourlog-detail'),
]
