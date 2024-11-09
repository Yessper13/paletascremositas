window.onload = function() {
    mostrarVentasGuardadas();
};

function mostrarVentasGuardadas() {
    let ventasGuardadas = JSON.parse(localStorage.getItem('ventasGuardadas')) || [];
    const ventasGuardadasDiv = document.getElementById('ventasGuardadas');
    
    if (ventasGuardadas.length === 0) {
        ventasGuardadasDiv.innerHTML = "<p>No hay ventas guardadas.</p>";
    } else {
        ventasGuardadasDiv.innerHTML = "";
        ventasGuardadas.forEach((venta, index) => {
            let ventaHTML = `<h3>Compra ${index + 1}</h3><ul>`;
            venta.forEach(producto => {
                ventaHTML += `<li>${producto.nombre} - Cantidad: ${producto.cantidad}, Precio Unitario: $${producto.precio}</li>`;
            });
            ventaHTML += "</ul><hr>";
            ventasGuardadasDiv.innerHTML += ventaHTML;
        });
    }
}