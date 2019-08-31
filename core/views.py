from django.shortcuts import render
from .models import Paper, Tag

def home(request):
    return render(request, "home.html", {"papers": Paper.objects.all()})


def tags(request):
    return render(request, "tags.html", {"tags": Tag.objects.all()})


def tag(request, tag):
    return render(request, "tag.html", {
     "tag": tag,
     "papers": Paper.objects.filter(tags__name=tag)
    })