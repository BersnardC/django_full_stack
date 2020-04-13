#from django.contrib.auth.models import User, Group
from rest_framework import serializers
#from django.contrib.auth.models import User
from .models import User

class UserSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = User
		fields = ('id','email', 'password', 'country')

	def create(self, validated_data):
		return User.objects.create_user(**validated_data)

	def update(self, instance, validated_data):
		# instance = User.objects.filter(email = email)
		instance.email = validated_data.get('email', instance.email)
		instance.country = validated_data.get('country', instance.country)
		instance.set_password(validated_data.get('password'))
		instance.save()
		return instance

# Para crear usuarios
class RegistrationSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ('email', 'password', 'country')

	def create(self, validated_data):
		# instance = User
		# instance.email = validated_data.get('email')
		# instance.country = validated_data.get('country')
		# _password = validated_data.get('password')
		# instance.set_password(_password, _password)
		# instance.save()
		return User.objects.create_user(**validated_data)