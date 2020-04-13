from django.db import models
from django.contrib.auth.models import (BaseUserManager, AbstractUser, AbstractBaseUser)
from .managers import UserManager
# Create your models here.
class User(AbstractBaseUser):
	email = models.EmailField(max_length = 50, unique = True)
	country = models.CharField(max_length = 50)

	active = models.BooleanField(default = True)
	staff = models.BooleanField(default = False)
	admin = models.BooleanField(default = False)
	#Establecer manejador del modelo
	objects = UserManager()

	USERNAME_FIELD = 'email'
	REQUIRED_FIELDS = []
	#Cambiar como aparece nombrado en la sección de administración django
	class Meta:
		verbose_name = 'usuario'
		verbose_name_plural = 'usuarios'

	def get_full_name(self):
		return self.email

	def get_short_name(self):
		return self.email

	def has_perm(self, perm, obj = None):
		"El usuario cuenta con un permiso especifico?"
		return True
	def has_module_perms(self, app_label):
		"El usuario cuenta con permisos para ver una app especifica?"
		return True

	@property
	def is_staff(self):
		"El usuario es staff"
		return self.staff
	@property
	def is_admin(self):
		"El usuario es admin"
		return self.admin
	@property
	def is_active(self):
		"El usuario está activo"
		return self.active

	def __str__(self):
		return self.email