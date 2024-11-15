var acc = document.getElementsByClassName("accordion");
var rightAside = document.querySelector(".right"); // Selecciona el aside derecho

for (var i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        var panel = this.nextElementSibling; // El div .panel correspondiente al botón

        // Muestra el contenido del panel en el aside derecho
        rightAside.innerHTML = panel.innerHTML;

        // Opcional: si quieres añadir una clase activa al botón seleccionado
        for (var j = 0; j < acc.length; j++) {
            acc[j].classList.remove("active");
        }
        this.classList.add("active");
    });
}