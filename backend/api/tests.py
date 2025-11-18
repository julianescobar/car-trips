from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth.models import User
from .models import Car, City, Trip

class CarTripsAPITest(APITestCase):
    def setUp(self):        
        self.user = User.objects.create_user(username='admin', password='admin123')
        login_url = reverse('token_obtain_pair')
        response = self.client.post(login_url, {'username':'admin','password':'admin123'}, format='json')
        self.access_token = response.data['access']        
        self.city1 = City.objects.create(name='Bogota')
        self.city2 = City.objects.create(name='Medellin')        
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.access_token}')

    # Cars 
    def test_create_car(self):
        url = reverse('carros')
        data = {"plate":"ABC123","color":"Red","entry_date":"2025-11-18"}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Car.objects.count(), 1)

    def test_create_duplicate_car(self):
        Car.objects.create(plate='ABC123', color='Red', entry_date='2025-11-18')
        url = reverse('carros')
        data = {"plate":"ABC123","color":"Blue","entry_date":"2025-11-19"}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    # Trips
    def test_create_trip(self):
        car = Car.objects.create(plate='XYZ123', color='Blue', entry_date='2025-11-18')
        url = reverse('viajes')
        data = {
            "car": car.id,
            "origin_city": self.city1.id,
            "destination_city": self.city2.id,
            "hours": 5,
            "date": "2025-11-18"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Trip.objects.count(), 1)

    def test_trip_invalid_hours(self):
        car = Car.objects.create(plate='XYZ124', color='Blue', entry_date='2025-11-18')
        url = reverse('viajes')
        data = {
            "car": car.id,
            "origin_city": self.city1.id,
            "destination_city": self.city2.id,
            "hours": 0,
            "date": "2025-11-18"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_get_trips_by_plate(self):
        car = Car.objects.create(plate='TRIP123', color='Green', entry_date='2025-11-18')
        Trip.objects.create(car=car, origin_city=self.city1, destination_city=self.city2, hours=5, date='2025-11-18')
        url = reverse('viajes') + f'?placa={car.plate}'
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
