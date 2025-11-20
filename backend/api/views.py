from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import Car, Trip
from .serializers import CarSerializer, TripSerializer

# Login 
class LoginView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == 200:
            return Response(response.data, status=200)
        return Response({"detail": "Invalid credentials"}, status=401)

# Cars
class CarListCreateView(generics.ListCreateAPIView):
    queryset = Car.objects.all()
    serializer_class = CarSerializer
    permission_classes = [IsAuthenticated]

# Trips
class TripListCreateView(generics.ListCreateAPIView):
    serializer_class = TripSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        plate = self.request.query_params.get('placa')
        if plate:
            return Trip.objects.filter(car__plate=plate)
        return Trip.objects.all()
