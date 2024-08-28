function showErrorMessage() {
    var errorMessage = document.getElementById("error-message");
    errorMessage.style.display = "block";

    setTimeout(function() {
        errorMessage.style.display = "none";
    }, 4000);
}
document.addEventListener("DOMContentLoaded", function() {
    showErrorMessage();
});