from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    ROLE_CHOICES = [
        ('faculty', 'Faculty/Admin'),
        ('tutor', 'Tutor'),
    ]
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='tutor')
    
    # Add related_name attributes to avoid the clash
    groups = models.ManyToManyField(
        'auth.Group',
        verbose_name='groups',
        blank=True,
        related_name='custom_user_set',
        help_text='The groups this user belongs to.',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        verbose_name='user permissions',
        blank=True,
        related_name='custom_user_set',
        help_text='Specific permissions for this user.',
    )
