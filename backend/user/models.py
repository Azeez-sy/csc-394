from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    pronouns    = models.CharField(max_length = 10)
    role        = models.CharField(max_length = 30) # roles: tutor, volunteer, admin (3), therapist 
    prof_desc   = models.CharField(max_length = 250)
    isAdmin     = models.BooleanField(default=False)
    
    def __str__(self):
        return (f"self.first_name, self.last_name, self.role, self.email")