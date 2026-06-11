from .models import Notification

def global_notifications(request):
    """
    Context processor to make active notifications available to all templates.
    """
    # We could restrict this to authenticated users if needed, 
    # but global announcements might be for everyone.
    notifications = Notification.objects.filter(is_active=True)
    return {
        'global_notifications': notifications,
        'global_notification_count': notifications.count()
    }
