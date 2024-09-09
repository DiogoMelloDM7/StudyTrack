from django.urls import path
from .views import calendario
from . import views

app_name = "calendar_diary"

urlpatterns = [
    path('calendario', calendario, name='calendario'),
    path('events/', views.event_list, name='event_list'),  # API para eventos
    path('add/', views.add_event, name='add_event'),  # Adicionar evento
]
