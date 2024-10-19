function enviarForm(){
    document.forms[0].submit();  // Envía el primer formulario de la página
}

function validarFormulario() {
    // Obtener los valores de los campos del formulario
    var nombre = document.getElementById("nombre").value;
    var celular = document.getElementById("celular").value;
    var direccion = document.getElementById("direccion").value;
    var ubicacion = document.getElementById("ubicacion").value;

        // Verificar si alguno de los campos está vacío
        if (nombre === "" || celular === "" || direccion === "" || ubicacion === "") {
            alert("Todos los campos son obligatorios.");
            return false;
        }

    
    window.location.href = "catalogo.html";
    return false;
}

function AggProducto(nombreProducto, cantidad, precio) {
    const producto = {
        nombre: nombreProducto,
        cantidad: cantidad,
        precio: precio
    };
    
    let carrito = JSON.parse(sessionStorage.getItem('carrito')) || [];
    carrito.push(producto);
    sessionStorage.setItem('carrito', JSON.stringify(carrito));

    alert('Producto añadido al carrito ' + nombreProducto+' '+ precio+ ' '+cantidad);
}

function siguiente() {
    window.location.href = "Pedido.html";
}

function irCatalogo() {
    window.location.href = "catalogo.html";
}
