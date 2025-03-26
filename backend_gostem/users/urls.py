from django.urls import path
from .views import GoogleLoginView, TutorListView, UserListView
from . import views

urlpatterns = [
    path('tutors/', TutorListView.as_view(), name='tutor-list'),
    path('all-users/', UserListView.as_view(), name='user-list'),
    path('faculty-emails/', views.manage_faculty_emails, name='manage-faculty-emails'),
    path('allowed-emails/', views.manage_allowed_emails, name='manage-allowed-emails')
]