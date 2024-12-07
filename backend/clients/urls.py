from django.urls import path
from .views import ClientAPIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('api/v1/token/', TokenObtainPairView.as_view()),
    path('api/v1/token/refresh/', TokenRefreshView.as_view()),
    path('api/v1/client-data/', ClientAPIView.as_view()),    
    path('api/v1/client-data/<int:client_id>/', ClientAPIView.as_view()),
]
