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
    if(localStorage.getItem('ingresoComoInvitado')==='true'){
        window.location.href ="../Cremositos/formulario.html";  
    }
    else{
         window.location.href = "catalogo.html"; 
    }
    
}

function GuardarCompra() {
    let carrito = JSON.parse(sessionStorage.getItem('carrito')) || [];
    let ventasGuardadas = JSON.parse(localStorage.getItem('ventasGuardadas')) || [];

    // Agregar el carrito actual a las ventas guardadas
    ventasGuardadas.push(carrito);

    // Guardar las ventas en localStorage
    localStorage.setItem('ventasGuardadas', JSON.stringify(ventasGuardadas));

    // Limpiar el carrito después de guardar
    sessionStorage.removeItem('carrito');
    alert('Compra guardada exitosamente');
}


window.onload = function() {
    // Obtener el carrito de sessionStorage
    let carrito = JSON.parse(sessionStorage.getItem('carrito')) || [];

    // Crear un objeto para agrupar los productos por nombre
    let productosAgrupados = {};

    // Agrupar los productos por sabor
    carrito.forEach(producto => {
        if (productosAgrupados[producto.nombre]) {
            // Si ya existe el producto, sumamos la cantidad
            productosAgrupados[producto.nombre].cantidad += producto.cantidad;
        } else {
            // Si no existe, lo agregamos y nos aseguramos de que el precio sea numérico
            productosAgrupados[producto.nombre] = {
                ...producto,
                precioUnitario: parseFloat(producto.precio) || 0  // Asegurarse de que el precio sea numérico
            };
        }
    });

    // Seleccionar el cuerpo de la tabla y el costo total
    const carritoBody = document.getElementById('carritoBody');
    const costoTotalElem = document.getElementById('costoTotal');

    // Función para actualizar el costo total
    function actualizarCostoTotal() {
        let total = 0;
        for (let nombre in productosAgrupados) {
            total += productosAgrupados[nombre].cantidad * productosAgrupados[nombre].precioUnitario;
        }
        costoTotalElem.textContent = `$${total.toFixed(2)}`;
    }

    // Recorrer el objeto de productos agrupados y agregar cada producto como una fila en la tabla
    for (let nombre in productosAgrupados) {
        let producto = productosAgrupados[nombre];
        
        // Crear la fila con un campo de entrada para editar la cantidad
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>${producto.nombre}</td>
            <td><input type="number" value="${producto.cantidad}" min="1" class="cantidadInput" data-nombre="${producto.nombre}"></td>
            <td class="precioTotal">$${(producto.cantidad * producto.precioUnitario).toFixed(2)}</td>
        `;
        carritoBody.appendChild(row);
    }

    // Evento para actualizar la cantidad y el costo total
    carritoBody.addEventListener('input', function(event) {
        if (event.target.classList.contains('cantidadInput')) {
            const nombre = event.target.getAttribute('data-nombre');
            const nuevaCantidad = parseInt(event.target.value);
            
            // Actualizar la cantidad en el producto agrupado
            productosAgrupados[nombre].cantidad = nuevaCantidad;
            
            // Actualizar el precio total en la fila
            const precioTotalElem = event.target.closest('tr').querySelector('.precioTotal');
            precioTotalElem.textContent = `$${(nuevaCantidad * productosAgrupados[nombre].precioUnitario).toFixed(2)}`;
            
            // Actualizar el costo total
            actualizarCostoTotal();
        }
    });

    // Inicializar el costo total al cargar
    actualizarCostoTotal();
};



