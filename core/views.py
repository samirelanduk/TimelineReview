from django.shortcuts import render, redirect
from .models import Paper, Tag
from .forms import PaperForm

def home(request):
    return render(request, "home.html", {"papers": Paper.objects.all()})


def tags(request):
    return render(request, "tags.html", {"tags": Tag.objects.all()})


def new_paper(request):
    form = PaperForm()
    if request.method == "POST":
        print(request.FILES)
        form = PaperForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect("/")
    return render(request, "new-paper.html", {"form": form})


def tag(request, tag):
    return render(request, "tag.html", {
     "tag": tag,
     "papers": Paper.objects.filter(tags__name=tag)
    })