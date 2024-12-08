import os
from django.core.exceptions import ImproperlyConfigured

ENVIRONMENT = os.environ.get('ENVIRONMENT', 'development').lower()

if ENVIRONMENT == 'development':
    from .development import *
elif ENVIRONMENT == 'production':
    from .production import *
else:
    raise ImproperlyConfigured(f"Unknown ENVIRONMENT: {ENVIRONMENT}")
