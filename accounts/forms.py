from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm


class SignUpForm(UserCreationForm):
    email = forms.EmailField(
        max_length=254,
        required=True,
        widget=forms.EmailInput(attrs={'placeholder': 'Email Address'}),
        help_text='Required. Enter a valid email address.',
    )
    first_name = forms.CharField(
        max_length=50,
        required=False,
        widget=forms.TextInput(attrs={'placeholder': 'First Name'}),
    )
    last_name = forms.CharField(
        max_length=50,
        required=False,
        widget=forms.TextInput(attrs={'placeholder': 'Last Name'}),
    )

    class Meta(UserCreationForm.Meta):
        model = User
        # password1 and password2 are inherited from UserCreationForm
        fields = ('username', 'email', 'first_name', 'last_name', 'password1', 'password2')