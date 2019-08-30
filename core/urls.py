from django.urls import path
from django.conf import settings
from core.views import *

urlpatterns = [
 path("", home)
]