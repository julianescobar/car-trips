from django.db import models

class Car(models.Model):
    # Vehículo con placa, color y fecha de ingreso
    plate = models.CharField(max_length=10, unique=True)
    color = models.CharField(max_length=20)
    entry_date = models.DateField()

    def __str__(self):
        return self.plate


class City(models.Model):
    # Ciudad disponible en el sistema
    name = models.CharField(max_length=50, unique=True)
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class Trip(models.Model):
    # Viaje de un coche de una ciudad a otra
    car = models.ForeignKey(Car, on_delete=models.CASCADE, related_name="trips")
    origin_city = models.ForeignKey(City, on_delete=models.CASCADE, related_name="origin_trips")
    destination_city = models.ForeignKey(City, on_delete=models.CASCADE, related_name="destination_trips")
    hours = models.PositiveIntegerField()
    date = models.DateField()

    def __str__(self):
        return f"{self.car.plate} - {self.origin_city.name} to {self.destination_city.name}"
