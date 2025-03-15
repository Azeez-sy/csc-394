from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token
from django.conf import settings

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
            "first_name": name
        })

        # Automatically assign faculty role if email is in FACULTY_EMAILS
        if email in settings.FACULTY_EMAILS:
            user.role = "faculty"
            user.save()

        token, _ = Token.objects.get_or_create(user=user)

        return Response({
            "key": token.key,
            "user": {
                "email": user.email,
                "name": user.first_name,
                "role": user.role
            }
        })
