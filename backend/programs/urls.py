from django.urls import path
from .views import ProgramRetrieveDestroyView, ProgramCreateView, ProgramListView

urlpatterns = [
    path('programs/', ProgramListView.as_view(), name='program-list'),
    path('programs/create/', ProgramCreateView.as_view(), name='program-create'),
    path('programs/<int:pk>/', ProgramRetrieveDestroyView.as_view(), name='program-retrieve-destroy'),
]