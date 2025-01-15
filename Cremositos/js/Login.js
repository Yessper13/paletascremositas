// Asignación de eventos a los botones
document.getElementById("btn_registrarse").addEventListener("click", register);
document.getElementById("btn_iniciar_sesion").addEventListener("click", iniciarSesion);
window.addEventListener("resize", anchoPage);

// Declaración de variables
var contenedorLoginRegister = document.querySelector(".contenedor_login_register");
var formularioLogin = document.querySelector(".formulario_login");
var formularioRegister = document.querySelector(".formulario_register");
var cajaTraseraLogin = document.querySelector(".caja_trasera_login");
var cajaTraseraRegister = document.querySelector(".caja_trasera_register");

// Función para ajustar el diseño según el tamaño de la ventana
function anchoPage() {
    if (window.innerWidth > 850) {
        cajaTraseraLogin.style.display = "block";
        cajaTraseraRegister.style.display = "block";
    } else {
        cajaTraseraRegister.style.display = "block";
        cajaTraseraLogin.style.opacity = "1";
        cajaTraseraLogin.style.display = "block";
        formularioLogin.style.display = "block";
        formularioRegister.style.display = "none";
        contenedorLoginRegister.style.left = "0px";
    }
}

// Función para mostrar el formulario de registro
function register() {
    if (window.innerWidth > 850) {
        formularioRegister.style.display = "block";
        contenedorLoginRegister.style.left = "410px";
        formularioLogin.style.display = "none";
        cajaTraseraRegister.style.opacity = "0";
        cajaTraseraLogin.style.opacity = "1";
    } else {
        formularioRegister.style.display = "block";
        contenedorLoginRegister.style.left = "0px";
        formularioLogin.style.display = "none";
        cajaTraseraRegister.style.display = "none";
        cajaTraseraLogin.style.display = "block";
        cajaTraseraLogin.style.opacity = "1";
    }
}

// Función para mostrar el formulario de inicio de sesión
function iniciarSesion() {
    if (window.innerWidth > 850) {
        formularioRegister.style.display = "none";
        contenedorLoginRegister.style.left = "10px";
        formularioLogin.style.display = "block";
        cajaTraseraRegister.style.opacity = "1";
        cajaTraseraLogin.style.opacity = "0";
    } else {
        formularioLogin.style.display = "block";
        contenedorLoginRegister.style.left = "0px";
        formularioRegister.style.display = "none";
        cajaTraseraRegister.style.display = "block";
        cajaTraseraLogin.style.display = "none";
    }
}

function validarUsuario(usuario, contrasena) {
    // Limpiar el localStorage antes de hacer la validación, si es necesario
    localStorage.clear(); // Limpiar cualquier valor previo almacenado
    
    if (usuario === "prueba" && contrasena === "123") {
        localStorage.setItem('ingresoComoInvitado', 'false'); // Indica que es un usuario autenticado
        localStorage.setItem('formularioMostrado', 'false'); // Resetea el estado de formulario
        localStorage.setItem('MostrarPerfil', 'true');
        window.location.href = "../Cremositos/inicio.html";
    } else {
        alert("Usuario o contraseña incorrectos");
    }
}

function ingresarComoInvitado() {
    // Limpiar el localStorage antes de hacer el ingreso como invitado
    localStorage.clear(); // Limpiar cualquier valor previo almacenado
    
    localStorage.setItem('ingresoComoInvitado', 'true'); // Indica que es un invitado
    localStorage.setItem('formularioMostrado', 'false'); // Marca que el formulario aún no ha sido mostrado
    localStorage.setItem('MostrarPerfil', 'false');
    window.location.href = "../Cremositos/inicio.html";
}


