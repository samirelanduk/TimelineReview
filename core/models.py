import docupy
from django.db import models

class Paper(models.Model):

    class Meta:
        db_table = "papers"
        ordering = ["date"]

    
    def __str__(self):
        return f"({self.date}) {self.title}"

    
    def create_filename(self, filename):
        extension = "." + filename.split(".")[-1] if "." in filename else ""
        name = self.title.replace(" ", "_")
        return f"{self.date}_{name.lower()}{extension}"


    title = models.CharField(max_length=512)
    date = models.DateField()
    authors = models.CharField(max_length=512)
    summary = models.TextField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    details = models.TextField(null=True, blank=True)
    bibtex = models.TextField()
    pdf = models.FileField(null=True, blank=True, upload_to=create_filename, max_length=500)


    @property
    def authors_list(self):
        return self.authors.replace(", ", ",").split(",")
    

    @property
    def summary_html(self):
        return docupy.markdown_to_html(self.summary)
    

    @property
    def description_html(self):
        return docupy.markdown_to_html(self.description)
    

    @property
    def details_html(self):
        return docupy.markdown_to_html(self.details)



class Tag(models.Model):

    class Meta:
        db_table = "tags"
        ordering = ["name"]

    
    def __str__(self):
        return self.name

    
    name = models.SlugField(max_length=64)
    papers = models.ManyToManyField(Paper, related_name="tags")