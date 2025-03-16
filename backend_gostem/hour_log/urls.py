from django.urls import path
from .views import HourLogListCreateView, HourLogDetailView, FacultyHourLogListView
urlpatterns = [
    path('', HourLogListCreateView.as_view(), name='hourlog-list-create'),
    path('<int:pk>/', HourLogDetailView.as_view(), name='hourlog-detail'),
    path('faculty/all/', FacultyHourLogListView.as_view(), name='faculty-hourlog-list'),

]
