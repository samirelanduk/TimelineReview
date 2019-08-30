from django.db import models

class Paper(models.Model):

    class Meta:
        db_table = "papers"
        ordering = ["date"]

    
    def __str__(self):
        return f"({self.date}) {self.title}"

    
    def create_filename(self, filename):
        extension = "." + filename.split(".")[-1] if "." in filename else ""
        name = instance.title.replace(" ", "_")
        return f"{name.lower()}{extension}"


    title = models.CharField(max_length=512)
    date = models.DateField()
    authors = models.CharField(max_length=512)
    pdf = models.FileField(null=True, blank=True, upload_to=create_filename)


    @property
    def authors_list(self):
        return self.authors.replace(", ", ",").split(",")



class Tag(models.Model):

    class Meta:
        db_table = "tags"
        ordering = ["name"]

    
    def __str__(self):
        return self.name

    
    name = models.CharField(max_length=64)
    papers = models.ManyToManyField(Paper, related_name="tags")