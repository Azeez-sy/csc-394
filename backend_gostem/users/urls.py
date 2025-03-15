from django.urls import path
from .views import GoogleLoginView, TutorListView, UserListView

urlpatterns = [
    path('tutors/', TutorListView.as_view(), name='tutor-list'),
    path('all-users/', UserListView.as_view(), name='user-list'),
]