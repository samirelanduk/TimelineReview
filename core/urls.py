from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from core.views import *

urlpatterns = [
 path("tags/<slug:tag>/", tag),
 path("tags/", tags),
 path("new/", new_paper),
 path("paper/<int:id>/edit/", edit_paper),
 path("bibtex/", bibtex_download),
 path("", home)
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)