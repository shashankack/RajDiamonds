from django.contrib import admin
from django.urls import include, path
from .views import ClientAPIView

urlpatterns = [
    path('api/v1/client-data/', ClientAPIView.as_view()),    
    path('api/v1/client-data/<int:client_id>/', ClientAPIView.as_view()),
]
