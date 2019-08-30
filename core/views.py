from django.shortcuts import render
from .models import Paper

def home(request):
    return render(request, "home.html", {"papers": Paper.objects.all()})