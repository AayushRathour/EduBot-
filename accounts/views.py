import logging
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.contrib.auth.forms import AuthenticationForm
from .forms import SignUpForm

logger = logging.getLogger(__name__)


def signup_page(request):
    if request.user.is_authenticated:
        return redirect('userpanel:dashboard')

    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            messages.success(request, f'Welcome to EduBot, {user.username}! Your account has been created.')
            return redirect('core:home')
        else:
            # Return to login page with register tab active and form errors
            messages.error(request, 'Please correct the errors below.')
            return render(request, 'accounts/login.html', {'form': form, 'register': True})
    else:
        form = SignUpForm()

    return render(request, 'accounts/login.html', {'form': form, 'register': True})


def login_page(request):
    if request.user.is_authenticated:
        if request.user.is_superuser:
            return redirect('adminpanel:dashboard')
        return redirect('userpanel:dashboard')

    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)

            if user is not None:
                login(request, user)
                logger.info(f"User '{username}' logged in successfully.")
                if user.is_superuser:
                    return redirect('adminpanel:dashboard')
                else:
                    messages.success(request, f'Welcome back, {user.username}! 👋')
                    return redirect('core:home')
            else:
                logger.warning(f"Failed login attempt for username: '{username}'.")
                messages.error(request, 'Invalid username or password.')
        else:
            messages.error(request, 'Invalid username or password.')
    else:
        form = AuthenticationForm()

    return render(request, 'accounts/login.html', {'form': form})


@login_required
def logout_page(request):
    username = request.user.username
    logout(request)
    logger.info(f"User '{username}' logged out.")
    messages.info(request, 'You have been logged out successfully.')
    return redirect('core:home')
