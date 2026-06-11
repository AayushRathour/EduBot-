from django.shortcuts import render


def home(request):
    return render(request, "core/home.html", {"active_page": "home"})

def features(request):
    return render(request, "core/features.html", {"active_page": "features"})

def roadmap(request):
    return render(request, "core/roadmap.html", {"active_page": "roadmap"})

def courses(request):
    return render(request, "core/courses.html", {"active_page": "courses"})

def demo(request):
    return render(request, "core/demo.html", {"active_page": "demo"})

def faq(request):
    return render(request, "core/faq.html", {"active_page": "faq"})

def contact(request):
    return render(request, "core/contact.html", {"active_page": "contact"})

# Create your views here.
