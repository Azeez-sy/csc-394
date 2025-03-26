from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token
from django.conf import settings
from rest_framework import generics, permissions
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
import os
import re
from .permissions import IsFaculty  # Import the permission from permissions.py
from .models import AllowedEmail

@api_view(['GET', 'POST', 'DELETE'])
@permission_classes([IsAuthenticated, IsFaculty])  # Use IsFaculty instead of IsAdmin
def manage_faculty_emails(request):
    """Endpoint to get, add, or remove faculty emails"""
    User = get_user_model()
    
    # Get current faculty emails
    if request.method == 'GET':
        return Response({'faculty_emails': settings.FACULTY_EMAILS})
    
    # Add a new faculty email
    elif request.method == 'POST':
        email = request.data.get('email')
        
        if not email:
            return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Validate email format
        try:
            validate_email(email)
        except ValidationError:
            return Response({'error': 'Invalid email format'}, status=status.HTTP_400_BAD_REQUEST)
            
        # Store the updated list (this approach requires server restart to take effect)
        try:
            # Read the settings file
            settings_path = os.path.join(settings.BASE_DIR, 'backend_gostem', 'settings.py')
            with open(settings_path, 'r') as f:
                settings_content = f.read()
                
            # Check if email already exists
            if email in settings.FACULTY_EMAILS:
                return Response({'error': 'Email already in faculty list'}, 
                               status=status.HTTP_400_BAD_REQUEST)
            
            # Update the FACULTY_EMAILS list in settings.py
            faculty_emails = settings.FACULTY_EMAILS.copy()
            faculty_emails.append(email)
            
            # Format the new list as a Python list string
            faculty_str = "FACULTY_EMAILS = [\n"
            for e in faculty_emails:
                faculty_str += f'    "{e}",\n'
            faculty_str += "]"
            
            # Replace the old list with the new one
            pattern = r"FACULTY_EMAILS = \[.*?\]"
            new_content = re.sub(pattern, faculty_str, settings_content, flags=re.DOTALL)
            
            # Write back to settings file
            with open(settings_path, 'w') as f:
                f.write(new_content)
                
            # Update in-memory setting for immediate effect
            settings.FACULTY_EMAILS = faculty_emails
                
            return Response({'message': 'Faculty email added successfully',
                           'faculty_emails': faculty_emails})
            
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    # Delete a faculty email
    elif request.method == 'DELETE':
        email = request.data.get('email')
        
        if not email:
            return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Prevent users from removing their own email
        if request.user.email.lower() == email.lower():
            return Response(
                {'error': 'You cannot remove your own email from the faculty list'}, 
                status=status.HTTP_403_FORBIDDEN
            )
            
        if not hasattr(settings, 'FACULTY_EMAILS') or email not in settings.FACULTY_EMAILS:
            return Response({'error': 'Email not found in faculty list'}, 
                           status=status.HTTP_404_NOT_FOUND)
        
        try:
            # 1. Update settings.py file
            settings_path = os.path.join(settings.BASE_DIR, 'backend_gostem', 'settings.py')
            with open(settings_path, 'r') as f:
                settings_content = f.read()
            
            faculty_emails = list(settings.FACULTY_EMAILS)
            faculty_emails.remove(email)
            
            faculty_str = "FACULTY_EMAILS = [\n"
            for e in faculty_emails:
                faculty_str += f'    "{e}",\n'
            faculty_str += "]"
            
            pattern = r"FACULTY_EMAILS\s*=\s*\[.*?\]"
            new_content = re.sub(pattern, faculty_str, settings_content, flags=re.DOTALL)
            
            with open(settings_path, 'w') as f:
                f.write(new_content)
                
            # Update in-memory settings
            settings.FACULTY_EMAILS = faculty_emails
            
            # 2. IMPORTANT: Also update the user's role in the database
            try:
                user = User.objects.filter(email=email).first()
                if user and user.role == 'faculty':
                    user.role = 'tutor'  # or whatever your default role is
                    user.save()
                    print(f"Updated user {email} role from faculty to tutor")
            except Exception as user_error:
                print(f"Error updating user role: {str(user_error)}")
            
            return Response({
                'message': 'Faculty email removed successfully and user role updated',
                'faculty_emails': faculty_emails
            })
            
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET', 'POST', 'DELETE'])
@permission_classes([IsAuthenticated, IsFaculty])
def manage_allowed_emails(request):
    """Endpoint to get, add, or remove allowed emails"""
    
    # Get current allowed emails
    if request.method == 'GET':
        emails = AllowedEmail.objects.all().values_list('email', flat=True)
        return Response({'allowed_emails': list(emails)})
    
    # Add a new allowed email
    elif request.method == 'POST':
        email = request.data.get('email')
        
        if not email:
            return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Validate email format
        try:
            validate_email(email)
        except ValidationError:
            return Response({'error': 'Invalid email format'}, status=status.HTTP_400_BAD_REQUEST)
            
        # Add to allowed emails
        try:
            allowed_email, created = AllowedEmail.objects.get_or_create(
                email=email,
                defaults={'added_by': request.user}
            )
            
            if not created:
                return Response({'error': 'Email already in allowed list'}, 
                               status=status.HTTP_400_BAD_REQUEST)
                
            emails = AllowedEmail.objects.all().values_list('email', flat=True)
            return Response({
                'message': 'Email added to allowed list successfully',
                'allowed_emails': list(emails)
            })
            
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    # Delete an allowed email
    elif request.method == 'DELETE':
        email = request.data.get('email')
        
        if not email:
            return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
            
        try:
            allowed_email = AllowedEmail.objects.filter(email=email).first()
            if not allowed_email:
                return Response({'error': 'Email not found in allowed list'}, 
                               status=status.HTTP_404_NOT_FOUND)
            
            allowed_email.delete()
            
            emails = AllowedEmail.objects.all().values_list('email', flat=True)
            return Response({
                'message': 'Email removed from allowed list successfully',
                'allowed_emails': list(emails)
            })
            
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class GoogleLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("email")
        name = request.data.get("name")
        profile_picture = request.data.get("profile_picture")

        if not email:
            return Response({"error": "Email is required"}, status=400)

        # Check if user exists or create a new one
        User = get_user_model()
        user, created = User.objects.get_or_create(email=email, defaults={
            "username": email,
            "first_name": name,
            "profile_picture": profile_picture
        })
        
        # Update profile picture if user exists and picture has changed
        if not created and profile_picture and user.profile_picture != profile_picture:
            user.profile_picture = profile_picture
            user.save(update_fields=['profile_picture'])

        # Automatically assign faculty role if email is in FACULTY_EMAILS
        if email in settings.FACULTY_EMAILS:
            user.role = "faculty"
            user.save()

        token, _ = Token.objects.get_or_create(user=user)

        # Check if email is allowed (faculty emails are automatically allowed)
        is_allowed = (
            email in settings.FACULTY_EMAILS or
            AllowedEmail.objects.filter(email=email).exists()
        )
        
        if not is_allowed:
            return Response(
                {"error": "Your email is not authorized to use this application."}, 
                status=status.HTTP_403_FORBIDDEN
            )

        return Response({
            "key": token.key,
            "user": {
                "email": user.email,
                "name": user.first_name,
                "role": user.role,
                "photoURL": user.profile_picture  # Include profile picture in response
            }
        })

class TutorListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer
    
    def get_queryset(self):
        User = get_user_model()
        return User.objects.filter(role='tutor')

class UserListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer
    
    def get_queryset(self):
        User = get_user_model()
        # Return all users (no filter by role)
        return User.objects.all()