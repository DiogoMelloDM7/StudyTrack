from django.urls import path
from . import views

app_name = "calendar_diary"

urlpatterns = [
    path('calendario/', views.calendario, name='calendario'),
    path('add/', views.add_event, name='add_event'),  # Adicionar evento
    path('editar_evento/<int:event_id>/', views.editar_evento, name='editar_evento'),
    path('delete_event/<int:event_id>/', views.delete_event, name='delete_event'),
    path('event-data/<int:event_id>/', views.get_event_data, name='get_event_data'),
]
