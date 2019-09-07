from django import forms
from .models import Paper, Tag

class PaperForm(forms.ModelForm):

    class Meta:
        model = Paper
        exclude = []
    
    tags = forms.CharField(required=False)

    def __init__(self, *args, **kwargs):
        forms.ModelForm.__init__(self, *args, **kwargs)
        if "instance" in kwargs and kwargs["instance"]:
            self.fields["tags"].initial = ",".join([
             t.name for t in kwargs["instance"].tags.all()
            ])


    def save(self, *args, **kwargs):
        model = forms.ModelForm.save(self, *args, **kwargs)
        tags = [t.strip() for t in self.cleaned_data["tags"].split(",") if t.strip()]
        print(tags)
        for tag in tags:
            try:
                tag_object = Tag.objects.get(name=tag)
            except: tag_object = Tag.objects.create(name=tag)
            model.tags.add(tag_object)
        for tag in model.tags.all():
            if tag.name not in tags:
                model.tags.remove(tag)
                if not tag.papers.count():
                    tag.delete()
        model.save()