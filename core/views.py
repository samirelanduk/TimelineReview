from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse
from .models import Paper, Tag
from .forms import PaperForm

def home(request):
    return render(request, "home.html", {"papers": Paper.objects.all()})


def tags(request):
    return render(request, "tags.html", {"tags": Tag.objects.all()})


def new_paper(request):
    form = PaperForm()
    if request.method == "POST":
        form = PaperForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect("/")
    return render(request, "new-paper.html", {"form": form})


def edit_paper(request, id):
    paper = get_object_or_404(Paper, id=id)
    form = PaperForm(instance=paper)
    if request.method == "POST":
        form = PaperForm(request.POST, request.FILES, instance=paper)
        if form.is_valid():
            form.save()
            return redirect("/")
    return render(request, "edit-paper.html", {"form": form})


def delete_paper(request, id):
    if request.method == "POST":
        paper = get_object_or_404(Paper, id=id)
        paper.delete()
    return redirect("/")


def tag(request, tag):
    return render(request, "tag.html", {
     "tag": tag,
     "papers": Paper.objects.filter(tags__name=tag)
    })


def bibtex_download(request):

    filebody = "\n\n".join([p.bibtex for p in Paper.objects.all() if p.bibtex])
    response = HttpResponse(
     filebody, content_type="application/plain-text"
    )
    response["Content-Disposition"] = 'attachment; filename="{}"'.format(
     "bibliograpy.bib"
    )
    return response