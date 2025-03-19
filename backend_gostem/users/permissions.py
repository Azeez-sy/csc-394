from rest_framework import permissions
from django.conf import settings

class IsFaculty(permissions.BasePermission):
    """Allow only faculty/admins to perform privileged actions."""
    def has_permission(self, request, view):
        return (request.user.is_authenticated and 
                (request.user.role == "faculty" or 
                 request.user.is_staff or 
                 request.user.email in settings.FACULTY_EMAILS))