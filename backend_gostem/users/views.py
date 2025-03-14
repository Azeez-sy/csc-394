from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token

User = get_user_model()

class GoogleLoginView(APIView):
    permission_classes = [AllowAny]  # Allow anyone to log in

    def post(self, request):
        email = request.data.get("email")
        name = request.data.get("name")
        profile_picture = request.data.get("profile_picture")

        if not email:
            return Response({"error": "Email is required"}, status=400)

        # Check if user exists or create a new one
        user, created = User.objects.get_or_create(email=email, defaults={"username": email, "first_name": name})

        # Check if user is an admin (replace with your admin logic)
        is_admin = user.is_staff  # For example, using is_staff flag

        # Assign or create an authentication token
        token, _ = Token.objects.get_or_create(user=user)

        return Response({
            "key": token.key, 
            "user": {"email": user.email, "name": user.first_name},
            "isAdmin": is_admin
        })
