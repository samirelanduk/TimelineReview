from django import forms
from .models import Paper, Tag

class PaperForm(forms.ModelForm):

    class Meta:
        model = Paper
        exclude = []