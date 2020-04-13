from django.http import HttpResponse;
from rest_framework import viewsets, status
from rest_framework.permissions import AllowAny
from usuarios.serializers import UserSerializer, RegistrationSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import User

class UserViewSet(viewsets.ModelViewSet):
	queryset = User.objects.all().order_by('id')
	serializer_class = UserSerializer

class RegistrationApiView(APIView):
	permission_classes = (AllowAny,)
	serializer_class = RegistrationSerializer

	def post(self, request):
		user = request.data.get('user', {})
		serializer = self.serializer_class(data = user)
		serializer.is_valid(raise_exception = True)
		serializer.save()
		return Response(serializer.data, status=status.HTTP_201_CREATED)

def register(req):
	return HttpResponse(req.method)

