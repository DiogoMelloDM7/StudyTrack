// Função para exibir a mensagem de erro
function showErrorMessage() {
    var errorMessage = document.getElementById("error-message");
    errorMessage.style.display = "block";

    setTimeout(function() {
        errorMessage.style.display = "none";
    }, 4000);
}

// Função para exibir o formulário de evento
function showEventForm() {
    var eventForm = document.getElementById('event-form-container');
    if (eventForm.style.display === "none" || eventForm.style.display === "") {
        eventForm.style.display = "block";
    } else {
        eventForm.style.display = "none";
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Verificar se o FullCalendar está disponível
    if (typeof FullCalendar !== 'undefined') {
        console.log('FullCalendar está carregado corretamente.');
        
        var calendarEl = document.getElementById('calendar');
        
        if (calendarEl) {
            // Inicializar o calendário
            var calendar = new FullCalendar.Calendar(calendarEl, {
                initialView: 'dayGridMonth',
                events: eventsData, // Usa a variável definida no template HTML
                headerToolbar: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                },
                eventMouseEnter: function(info) {
                    var tooltip = document.createElement('div');
                    tooltip.classList.add('tooltip');
                    tooltip.innerHTML = `
                        <strong>Título:</strong> ${info.event.title} <br>
                        <strong>Data:</strong> ${info.event.start.toLocaleString()} <br>
                        <strong>Descrição:</strong> ${info.event.extendedProps.description} <br>
                        <strong>Localização:</strong> ${info.event.extendedProps.location} <br>
                        <strong>Categoria:</strong> ${info.event.extendedProps.category}
                    `;
                    document.body.appendChild(tooltip);

                    tooltip.style.left = info.jsEvent.pageX + 'px';
                    tooltip.style.top = info.jsEvent.pageY + 'px';
                },
                eventMouseLeave: function() {
                    var tooltips = document.getElementsByClassName('tooltip');
                    while (tooltips.length) {
                        tooltips[0].remove();
                    }
                }
            });

            // Renderizar o calendário
            calendar.render();
        } else {
            console.error('Elemento #calendar não encontrado.');
        }
    } else {
        console.error('FullCalendar não está definido.');
    }

    // Função para exibir o formulário de evento
    var btnAddEvent = document.getElementById('btn-add-event');
    if (btnAddEvent) {
        btnAddEvent.addEventListener('click', showEventForm);
    }
});


