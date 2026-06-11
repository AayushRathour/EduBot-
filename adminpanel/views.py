import logging
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.models import User
from django.contrib import messages
from core.models import Notification
from django.db.models import Count
from django.utils import timezone
from datetime import timedelta

logger = logging.getLogger(__name__)


def admin_required(view_func):
    """Decorator: only allows logged-in superusers."""
    def wrapper(request, *args, **kwargs):
        if not request.user.is_authenticated:
            return redirect('adminpanel:admin_login')
        if not request.user.is_superuser:
            messages.error(request, 'Access denied. Admin privileges required.')
            return redirect('core:home')
        return view_func(request, *args, **kwargs)
    wrapper.__name__ = view_func.__name__
    return wrapper


def admin_login(request):
    if request.user.is_authenticated and request.user.is_superuser:
        return redirect('adminpanel:dashboard')

    error_message = None
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None and user.is_superuser:
                login(request, user)
                logger.info(f"Admin '{username}' logged in.")
                messages.success(request, f'Welcome back, {user.username}!')
                return redirect('adminpanel:dashboard')
            elif user is not None and not user.is_superuser:
                error_message = 'This account does not have admin privileges.'
                logger.warning(f"Non-admin user '{username}' attempted admin login.")
            else:
                error_message = 'Invalid username or password.'
        else:
            error_message = 'Invalid username or password.'
    else:
        form = AuthenticationForm()

    return render(request, 'adminpanel/login.html', {'form': form, 'error_message': error_message})


@admin_required
def admin_logout(request):
    username = request.user.username
    logout(request)
    logger.info(f"Admin '{username}' logged out.")
    messages.info(request, 'You have been logged out.')
    return redirect('adminpanel:admin_login')


@admin_required
def dashboard(request):
    total_users = User.objects.filter(is_superuser=False).count()
    total_admins = User.objects.filter(is_superuser=True).count()
    recent_users = User.objects.filter(is_superuser=False).order_by('-date_joined')[:5]
    # Users who joined in last 7 days
    week_ago = timezone.now() - timedelta(days=7)
    new_this_week = User.objects.filter(is_superuser=False, date_joined__gte=week_ago).count()

    context = {
        'total_users': total_users,
        'total_admins': total_admins,
        'recent_users': recent_users,
        'new_this_week': new_this_week,
    }
    return render(request, 'adminpanel/dashboard.html', context)


@admin_required
def user_list(request):
    search_query = request.GET.get('q', '')
    users = User.objects.filter(is_superuser=False).order_by('-date_joined')
    if search_query:
        users = users.filter(username__icontains=search_query) | users.filter(email__icontains=search_query)

    context = {
        'users': users,
        'search_query': search_query,
        'total': users.count(),
    }
    return render(request, 'adminpanel/user_list.html', context)


@admin_required
def user_detail(request, user_id):
    target_user = get_object_or_404(User, id=user_id, is_superuser=False)
    context = {'target_user': target_user}
    return render(request, 'adminpanel/user_detail.html', context)


@admin_required
def user_delete(request, user_id):
    target_user = get_object_or_404(User, id=user_id, is_superuser=False)
    if request.method == 'POST':
        username = target_user.username
        target_user.delete()
        messages.success(request, f'User "{username}" has been deleted.')
        logger.info(f"Admin '{request.user.username}' deleted user '{username}'.")
        return redirect('adminpanel:user_list')
    return render(request, 'adminpanel/user_confirm_delete.html', {'target_user': target_user})


@admin_required
def toggle_user_status(request, user_id):
    target_user = get_object_or_404(User, id=user_id, is_superuser=False)
    if request.method == 'POST':
        target_user.is_active = not target_user.is_active
        target_user.save()
        status = 'activated' if target_user.is_active else 'deactivated'
        messages.success(request, f'User "{target_user.username}" has been {status}.')
    return redirect('adminpanel:user_list')


@admin_required
def admin_register(request):
    """Allow existing admins to create new admin accounts."""
    from accounts.forms import SignUpForm
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            new_admin = form.save(commit=False)
            new_admin.is_superuser = True
            new_admin.is_staff = True
            new_admin.save()
            # Trigger signal to create profile — update role
            if hasattr(new_admin, 'profile'):
                new_admin.profile.role = 'admin'
                new_admin.profile.save()
            messages.success(request, f'Admin account "{new_admin.username}" created successfully.')
            logger.info(f"Admin '{request.user.username}' created new admin '{new_admin.username}'.")
            return redirect('adminpanel:user_list')
        else:
            messages.error(request, 'Please fix the errors below.')
    else:
        form = SignUpForm()

    return render(request, 'adminpanel/admin_register.html', {'form': form})

@admin_required
def notification_list(request):
    """List all global notifications."""
    notifications = Notification.objects.all()
    return render(request, 'adminpanel/notification_list.html', {'notifications': notifications})

@admin_required
def notification_create(request):
    """Create a new global notification."""
    if request.method == 'POST':
        title = request.POST.get('title')
        message = request.POST.get('message')
        if title and message:
            Notification.objects.create(title=title, message=message, is_active=True)
            messages.success(request, 'Notification created successfully.')
        else:
            messages.error(request, 'Title and Message are required.')
    return redirect('adminpanel:notification_list')

@admin_required
def notification_toggle(request, notif_id):
    """Toggle the active status of a notification."""
    notif = get_object_or_404(Notification, id=notif_id)
    if request.method == 'POST':
        notif.is_active = not notif.is_active
        notif.save()
        status = 'activated' if notif.is_active else 'deactivated'
        messages.success(request, f'Notification "{notif.title}" {status}.')
    return redirect('adminpanel:notification_list')

@admin_required
def notification_delete(request, notif_id):
    """Delete a notification."""
    notif = get_object_or_404(Notification, id=notif_id)
    if request.method == 'POST':
        title = notif.title
        notif.delete()
        messages.success(request, f'Notification "{title}" deleted.')
    return redirect('adminpanel:notification_list')
