from django.contrib.auth.models import (BaseUserManager)
class UserManager(BaseUserManager):
	# Crea y guarda un usuario con el correo y clave dada
	def create_user(self, email, password = None, country = None):
		if not email:
			raise ValueError('usuario debe tener un correo válido')
		usuario = self.model(
			email = self.normalize_email(email)
		)
		usuario.country = country
		usuario.set_password(password)
		usuario.save(using = self._db)
		return usuario
	# Crea y guarda un usuario staff
	def create_staffuser(self, email, password):
		usuario = self.create_user(
			email = email,
			password = password
		)
		usuario.staff = True
		usuario.save(using = self._db)
		return usuario
	# Crea y guarda un super usuario
	def create_superuser(self, email, password):
		usuario = self.create_user(
			email = email,
			password = password
		)
		usuario.staff = True
		usuario.admin = True
		usuario.save(using = self._db)
		return usuario