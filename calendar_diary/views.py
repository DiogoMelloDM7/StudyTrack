from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse, HttpResponse
from .models import Event
from .forms import EventForm
from django.utils.timezone import localtime, make_aware
import pytz
from datetime import datetime
from django.core.serializers.json import DjangoJSONEncoder


@login_required
def calendario(request):
    if request.method == 'POST':
        form = EventForm(request.POST)
        if form.is_valid():
            event = form.save(commit=False)
            event.user = request.user  # Relaciona o evento ao usuário
            event.save()
            return redirect('calendar_diary:calendario')  # Recarrega a página para atualizar os eventos
    else:
        form = EventForm()

    user_events = Event.objects.filter(user=request.user)  # Filtra os eventos do usuário
    for event in user_events:
        event.dateEvent = localtime(event.dateEvent, pytz.timezone(request.user.timezone))
    
    return render(request, 'calendario.html', {'events': user_events, 'form': form})


@login_required
def add_event(request):
    if request.method == 'POST':
        form = EventForm(request.POST)
        if form.is_valid():
            event = form.save(commit=False)
            event.user = request.user  # Associar o evento ao usuário logado
            user_tz = pytz.timezone(request.user.timezone)
            event.dateEvent = make_aware(event.dateEvent, user_tz)
            event.save()
            return redirect('calendar_diary:calendario')  # Redirecionar para o calendário após salvar
    else:
        form = EventForm()

    return render(request, 'calendar_diary/add_event.html', {'form': form})


@login_required
def get_event_data(request, event_id):
    event = get_object_or_404(Event, pk=event_id, user=request.user)
    event_data = {
        'title': event.title,
        'description': event.description,
        'dateEvent': event.dateEvent.strftime('%Y-%m-%dT%H:%M'),  # Formato para o input datetime-local
        'localization': event.localization,
        'category': event.category
    }
    return JsonResponse(event_data)


@login_required
def editar_evento(request, event_id):
    event = get_object_or_404(Event, pk=event_id, user=request.user)

    if request.method == 'POST':
        form = EventForm(request.POST, instance=event)
        if form.is_valid():
            form.save()
            return redirect('calendar_diary:calendario')
    else:
        form = EventForm(instance=event)

    return render(request, 'calendar_diary/editar_evento.html', {'form': form, 'event': event})


@login_required
def delete_event(request, event_id):
    event = get_object_or_404(Event, pk=event_id, user=request.user)
    if request.method == 'DELETE':
        event.delete()
        return HttpResponse(status=204)
    return HttpResponse(status=405)  # Método não permitido


class EventEncoder(DjangoJSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.strftime('%Y-%m-%dT%H:%M:%S')
        return super().default(obj)
