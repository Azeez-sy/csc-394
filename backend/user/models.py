from django.db import models

class User(models.Model):
    user_id     = models.AutoField(primary_key=True)
    first_name  = models.CharField(max_length = 30)
    last_name   = models.CharField(max_length = 30)
    pronouns    = models.CharField(max_length = 10)
    role        = models.CharField(max_length = 30) # roles: tutor, volunteer, admin (3), therapist 
    prof_desc   = models.CharField(max_length = 250)
    email       = models.EmailField(max_length = 254, unique=True)
    isAdmin     = models.BooleanField(default=False)
    
    def __str__(self):
        return (f"self.first_name, self.last_name, self.role, self.email")