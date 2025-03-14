from allauth.account.signals import user_logged_in
from django.dispatch import receiver

@receiver(user_logged_in)
def update_admin_status(request, user, **kwargs):
    admin_emails = ['flysyed134@gmail.com', 'admin2@example.com']
    if user.email in admin_emails and not user.is_staff:
        user.is_staff = True
        user.is_superuser = True  # if desired
        user.save()
