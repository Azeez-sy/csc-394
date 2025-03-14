from django.apps import AppConfig


class SchedulConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'schedule'

    def ready(self):
        # Import the signals module to ensure the signal handlers are connected.
        import schedule.signals

