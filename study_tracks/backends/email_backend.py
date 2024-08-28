from django.contrib.auth.backends import ModelBackend
from study_tracks.models import CustomUser

class EmailBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        try:
            user = CustomUser.objects.get(email=username)
        except CustomUser.DoesNotExist:
            return None
        if user.check_password(password):
            return user
        return None