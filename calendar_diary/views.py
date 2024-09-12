from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from .models import Event
from .forms import EventForm
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
    return render(request, 'calendario.html', {'events': user_events, 'form': form})

@login_required
def event_list(request):
    events = Event.objects.filter(user=request.user).values('title', 'description', 'dateEvent', 'localization', 'category')
    events_list = list(events)  # Converte os eventos para lista de dicionários
    return JsonResponse(events_list, safe=False)

@login_required
def add_event(request):
    if request.method == 'POST':
        form = EventForm(request.POST)
        if form.is_valid():
            event = form.save(commit=False)
            event.user = request.user  # Associar o evento ao usuário logado
            event.save()
            return redirect('calendar_diary:calendario')  # Redirecionar para o calendário após salvar
    else:
        form = EventForm()

    return render(request, 'calendar_diary/add_event.html', {'form': form})


class EventEncoder(DjangoJSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.strftime('%Y-%m-%dT%H:%M:%S')
        return super().default(obj)