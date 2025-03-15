from rest_framework import permissions

class IsFaculty(permissions.BasePermission):
    """Allow only faculty/admins to create events."""
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == "faculty"