from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import CarListCreateView, TripListCreateView, LoginView

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('carros/', CarListCreateView.as_view(), name='carros'),
    path('viajes/', TripListCreateView.as_view(), name='viajes'),
]
