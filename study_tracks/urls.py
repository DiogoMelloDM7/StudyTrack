from django.urls import path
from .views import homepage, login

app_name = "study_tracks"

urlpatterns = [
    path('', homepage, name='homepage'),
    path('login', login, name='login'),
]
