from django.urls import path
from . import views
from .views import EntryList, EntryDetail, TotalHoursView, delete_hours


urlpatterns = [
    path('entries/', EntryList.as_view(), name='entry-list'),
    path('entries/<int:pk>/', EntryDetail.as_view(), name='entry-detail'),
    path('tutors/<int:tutor_id>/total-hours/', TotalHoursView.as_view(), name='total-hours'),
    path('entries/<int:entry_id>/delete/', delete_hours, name='delete-hours'),
]