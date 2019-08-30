import os
from .secrets import SECRET_KEY, BASE_DIR, DATABASES

ALLOWED_HOSTS = []

DEBUG = True

ROOT_URLCONF = "core.urls"

INSTALLED_APPS = [
 "django.contrib.contenttypes",
 "django.contrib.staticfiles",
 "sass_processor",
 "core",
]

MIDDLEWARE = [
 "django.middleware.common.CommonMiddleware",
]

STATIC_URL = "/static/"
STATIC_ROOT = os.path.abspath(f"{BASE_DIR}/core/static")

TEMPLATES = [{
 "BACKEND": "django.template.backends.django.DjangoTemplates",
 "APP_DIRS": True,
 "OPTIONS": {
  "context_processors": [
   "django.template.context_processors.request",
  ],
 },
}]
