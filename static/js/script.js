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

document.addEventListener("DOMContentLoaded", function() {
    showErrorMessage();

    // Inicializar o FullCalendar
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',  // Exibe o calendário como grid de dias
        events: '/calendar_diary/events/',  // URL para buscar eventos do banco de dados (API)
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
    });
    calendar.render();

    // Mostrar/ocultar o formulário de evento ao clicar no botão
    var addEventButton = document.getElementById('addEventButton');
    addEventButton.addEventListener('click', function() {
        showEventForm();
    });
});
