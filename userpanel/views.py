import logging
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.contrib import messages

logger = logging.getLogger(__name__)


@login_required(login_url='/accounts/login/')
def dashboard(request):
    # Admins should be in the admin panel
    if request.user.is_superuser:
        return redirect('adminpanel:dashboard')

    user = request.user
    context = {
        'user': user,
        'full_name': user.get_full_name() or user.username,
        'member_since': user.date_joined,
    }
    return render(request, 'userpanel/dashboard.html', context)


@login_required(login_url='/accounts/login/')
def profile(request):
    if request.user.is_superuser:
        return redirect('adminpanel:dashboard')

    if request.method == 'POST':
        user = request.user
        user.first_name = request.POST.get('first_name', user.first_name)
        user.last_name = request.POST.get('last_name', user.last_name)
        user.email = request.POST.get('email', user.email)
        user.save()

        # Update profile if it exists
        if hasattr(user, 'profile'):
            user.profile.bio = request.POST.get('bio', '')
            user.profile.phone = request.POST.get('phone', '')
            user.profile.save()

        messages.success(request, 'Profile updated successfully!')
        return redirect('userpanel:profile')

    return render(request, 'userpanel/profile.html', {'user': request.user})
