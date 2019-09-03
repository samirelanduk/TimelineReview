from django import forms
from .models import Paper, Tag

class PaperForm(forms.ModelForm):

    class Meta:
        model = Paper
        exclude = []
    
    tags = forms.CharField(required=False)

    def save(self, *args, **kwargs):
        model = forms.ModelForm.save(self, *args, **kwargs)
        tags = [t.strip() for t in self.cleaned_data["tags"].split(",")]
        for tag in tags:
            try:
                tag_object = Tag.objects.get(name=tag)
            except: tag_object = Tag.objects.create(name=tag)
            model.tags.add(tag_object)
        model.save()