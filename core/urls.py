from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from core.views import *

urlpatterns = [
 path("tags/<slug:tag>/", tag),
 path("tags/", tags),
 path("", home)
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)