from .base import *

DEBUG = True

ALLOWED_HOSTS = ['localhost', '127.0.0.1']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'RajDiamonds',
        'USER': 'admin',
        'PASSWORD': 'admin123',
        'HOST': 'db',
        'PORT': '5432',
    }
}

""" INSTALLED_APPS += ['debug_toolbar']

MIDDLEWARE += ['debug_toolbar.middleware.DebugToolbarMiddleware'] """

# Internal IPs for Debug Toolbar
INTERNAL_IPS = [
    "127.0.0.1",
]

# Static files for development
STATICFILES_DIRS = [BASE_DIR / 'static']
