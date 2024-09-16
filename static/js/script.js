// Função para exibir a mensagem de erro
function showErrorMessage() {
    var errorMessage = document.getElementById("error-message");
    errorMessage.style.display = "block";

    setTimeout(function() {
        errorMessage.style.display = "none";
    }, 4000);
}

// Função para exibir o formulário de evento
function showAddEventForm() {
    var eventForm = document.getElementById('event-form-container');
    var btnEdit = document.getElementById('btn-edit-event');
    var btnDelete = document.getElementById('btn-delete-event');
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

function showEditEventForm() {
    var eventForm = document.getElementById('list-events-edit');
    var btnEdit = document.getElementById('btn-edit-event');
    var btnDelete = document.getElementById('btn-delete-event');
    var btnAddEvent = document.getElementById("btn-add-event");
    if (eventForm.style.display === "none" || eventForm.style.display === "") {
        eventForm.style.display = "block";
        btnEdit.style.display = "block";
        btnDelete.style.display = "none";
        btnAddEvent.style.display = "none";

    } else {
        eventForm.style.display = "none";
        btnEdit.style.display = "block";
        btnDelete.style.display = "block";
        btnAddEvent.style.display = "block";
    }
}

function showDeleteEventForm() {
    var eventForm = document.getElementById('list-events-delete');
    var btnEdit = document.getElementById('btn-edit-event');
    var btnDelete = document.getElementById('btn-delete-event');
    var btnAddEvent = document.getElementById("btn-add-event");
    if (eventForm.style.display === "none" || eventForm.style.display === "") {
        eventForm.style.display = "block";
        btnEdit.style.display = "none";
        btnDelete.style.display = "block";
        btnAddEvent.style.display = "none";

    } else {
        eventForm.style.display = "none";
        btnEdit.style.display = "block";
        btnDelete.style.display = "block";
        btnAddEvent.style.display = "block";
    }
}

function fillFormWithEventData(eventId) {
    fetch(`/event-data/${eventId}`)  // Requisição para buscar dados do evento
        .then(response => response.json())
        .then(data => {
            document.getElementById('title').value = data.title;
            document.getElementById('description').value = data.description;
            document.getElementById('dateEvent').value = data.dateEvent;
            document.getElementById('localization').value = data.localization;
            document.getElementById('category').value = data.category;
            document.getElementById('event-form-container').style.display = 'block';
        });
}

function deleteEvent(eventId) {
    fetch(`/delete-event/${eventId}`, {
        method: 'DELETE',
        headers: {
            'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value
        }
    }).then(response => {
        if (response.ok) {
            alert('Evento excluído com sucesso');
            window.location.reload();  // Recarregar a página para atualizar a lista
        } else {
            alert('Erro ao excluir o evento');
        }
    });
}

function showEditForm(eventId) {
    // Fazer requisição AJAX para obter os dados do evento
    fetch(`/evento/${eventId}/dados/`)
        .then(response => response.json())
        .then(eventData => {
            // Preencher o formulário com os dados do evento
            document.getElementById('edit-title').value = eventData.title;
            document.getElementById('edit-description').value = eventData.description;
            document.getElementById('edit-dateEvent').value = eventData.dateEvent;
            document.getElementById('edit-localization').value = eventData.localization;
            document.getElementById('edit-category').value = eventData.category;

            // Mostrar o formulário de edição
            document.getElementById('edit-event-form-container').style.display = 'block';
        })
        .catch(error => console.error('Erro ao obter dados do evento:', error));
}

// Função para adicionar eventos de clique aos botões de editar
function setupEditButtons() {
    const editButtons = document.querySelectorAll('.edit-event-button');
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const eventId = button.dataset.eventId;  // ID do evento a ser editado
            showEditForm(eventId);
        });
    });
}

// Chamar a função para configurar os botões ao carregar a página
document.addEventListener('DOMContentLoaded', setupEditButtons);


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
        btnAddEvent.addEventListener('click', showAddEventForm);
    }
    var btnEditEvent = document.getElementById('btn-edit-event');
    if (btnEditEvent) {
        btnEditEvent.addEventListener('click', showEditEventForm);
    }
    var btnDeleteEvent = document.getElementById('btn-delete-event');
    if (btnDeleteEvent) {
        btnDeleteEvent.addEventListener('click', showDeleteEventForm);
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

// Adicionar listeners aos botões de editar e excluir
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.btn-edit').forEach(button => {
        button.addEventListener('click', function() {
            const eventId = this.getAttribute('data-event-id');
            fillFormWithEventData(eventId);  // Preencher o formulário com dados do evento
        });
    });

    document.querySelectorAll('.btn-delete').forEach(button => {
        button.addEventListener('click', function() {
            const eventId = this.getAttribute('data-event-id');
            if (confirm('Tem certeza que deseja excluir este evento?')) {
                deleteEvent(eventId);  // Excluir o evento
            }
        });
    });
});

