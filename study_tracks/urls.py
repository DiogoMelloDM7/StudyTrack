from django.urls import path
from .views import homepage, login, cadastro

app_name = "study_tracks"

urlpatterns = [
    path('', homepage, name='homepage'),
    path('login', login, name='login'),
    path('cadastro', cadastro, name='cadastro')
]
