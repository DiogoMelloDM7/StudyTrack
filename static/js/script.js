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
    var btnEdit = document.getElementById('btn-edit-event')
    var btnDelete = document.getElementById('btn-delete-event')
    if (eventForm.style.display === "none" || eventForm.style.display === "") {
        eventForm.style.display = "block";
        btnEdit.style.display = "none";
        btnDelete.style.display = "none";

    } else {
        eventForm.style.display = "none";
        btnEdit.style.display = "block";
        btnDelete.style.display = "block";
    }
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('Eventos Data:', eventsData); // Verifique os dados dos eventos no console

    var calendarEl = document.getElementById('calendar');

    if (calendarEl) {
        var calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            events: eventsData,
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay,list'
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

        calendar.render();
    } else {
        console.error('Elemento #calendar não encontrado.');
    }

    // Função para exibir o formulário de adição de evento
    var btnAddEvent = document.getElementById('btn-add-event');
    if (btnAddEvent) {
        btnAddEvent.addEventListener('click', showEventForm);
    }

    
});

document.addEventListener('DOMContentLoaded', function() {
    // Verifica se o campo de data existe
    var dateEventField = document.getElementById('dateEvent');
    
    if (dateEventField) {
        // Obtém a data atual no fuso horário local do navegador
        var localDate = new Date();

        // Formata a data para o formato 'YYYY-MM-DDTHH:MM' compatível com datetime-local
        var year = localDate.getFullYear();
        var month = ('0' + (localDate.getMonth() + 1)).slice(-2);
        var day = ('0' + localDate.getDate()).slice(-2);
        var hours = ('0' + localDate.getHours()).slice(-2);
        var minutes = ('0' + localDate.getMinutes()).slice(-2);

        var formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;
        
        // Preenche o campo de data com a data formatada
        dateEventField.value = formattedDate;
    }
});

