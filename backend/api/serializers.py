from rest_framework import serializers
from .models import Car, City, Trip

class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = '__all__'

class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = '__all__'

class TripSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trip
        fields = '__all__'

    def validate_hours(self, value):
        if value <= 0:
            raise serializers.ValidationError("Las horas del viaje deben ser mayores a 0.")
        return value

    def validate(self, data):
        if data['origin_city'] == data['destination_city']:
            raise serializers.ValidationError("Las ciudades de origen y destino deben ser diferentes.")
        return data
