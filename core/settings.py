import os
from .secrets import SECRET_KEY, BASE_DIR, DATABASES

ALLOWED_HOSTS = []

DEBUG = True

ROOT_URLCONF = "core.urls"

INSTALLED_APPS = [
 "django.contrib.contenttypes",
 "django.contrib.staticfiles",
 "core",
]

MIDDLEWARE = [
 "django.middleware.common.CommonMiddleware",
]

STATIC_URL = "/static/"
