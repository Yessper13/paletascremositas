window.onload = function() {
    mostrarVentasGuardadas();
};

function mostrarVentasGuardadas() {
    let ventasGuardadas = JSON.parse(localStorage.getItem('ventasGuardadas')) || [];
    const ventasGuardadasDiv = document.getElementById('ventasGuardadas');

    if (ventasGuardadas.length === 0) {
        ventasGuardadasDiv.innerHTML = "<p>No hay ventas guardadas.</p>";
    } else {
        // Limpiar el contenido actual
        ventasGuardadasDiv.innerHTML = "";

        // Ordenar las ventas por fecha de forma descendente (más nuevas primero)
        ventasGuardadas.sort((a, b) => {
            let fechaA = new Date(a[0]?.fechaCompra || 0);
            let fechaB = new Date(b[0]?.fechaCompra || 0);
            return fechaB - fechaA;
        });

        // Iterar sobre las ventas guardadas y crear una tabla separada y desplegable para cada venta
        ventasGuardadas.forEach((venta, index) => {
            let totalCompra = 0; // Variable para el total de la compra
            let fechaCompra = new Date(venta[0]?.fechaCompra || ""); // Tomar la fecha del primer producto
            let fechaHora;

            if (isNaN(fechaCompra.getTime())) {
                fechaHora = "Fecha no válida";
            } else {
                fechaHora = `${fechaCompra.toLocaleDateString()} ${fechaCompra.toLocaleTimeString()}`;
            }

            // Estructura para la sección desplegable
            let tablaHTML = `
                <div class="venta-seccion">
                    <button class="botonDespble" onclick="this.nextElementSibling.classList.toggle('verCompra')">Compra del ${fechaHora}</button>
                    <div class="hidden">
                        <table border="1" cellpadding="5" cellspacing="0">
                            <thead>
                                <tr>
                                    <th>Fecha y Hora</th>
                                    <th>Producto</th>
                                    <th>Cantidad</th>
                                    <th>Precio Unitario</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
            `;
            
            venta.forEach(producto => {
                let totalProducto = producto.cantidad * producto.precio;
                totalCompra += totalProducto; // Sumar al total de la compra
                
                tablaHTML += `
                    <tr>
                        <td>${fechaHora}</td>
                        <td>${producto.nombre}</td>
                        <td>${producto.cantidad}</td>
                        <td>$${producto.precio.toFixed(2)}</td>
                        <td>$${totalProducto.toFixed(2)}</td>
                    </tr>
                `;
            });

            // Agregar el total de la compra al pie de la sección de venta
            tablaHTML += `
                <tr>
                    <td colspan="4" style="text-align: right;"><strong>Total de la compra:</strong></td>
                    <td><strong>$${totalCompra.toFixed(2)}</strong></td>
                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <br>
            `;

            // Añadir la tabla al div
            ventasGuardadasDiv.innerHTML += tablaHTML;
        });

        // Agregar el botón para descargar el PDF
        const descargarBtn = document.createElement('button');
        descargarBtn.innerText = "Descargar PDF";
        descargarBtn.onclick = function () {
            generarPDF(ventasGuardadas);
        };
        ventasGuardadasDiv.appendChild(descargarBtn);
    }
}

function mostrarVentasGuardadas() {
    let ventasGuardadas = JSON.parse(localStorage.getItem('ventasGuardadas')) || [];
    const ventasGuardadasDiv = document.getElementById('ventasGuardadas');

    if (ventasGuardadas.length === 0) {
        ventasGuardadasDiv.innerHTML = "<p>No hay ventas guardadas.</p>";
    } else {
        // Limpiar el contenido actual
        ventasGuardadasDiv.innerHTML = "";

        // Ordenar las ventas por fecha de forma descendente (más nuevas primero)
        ventasGuardadas.sort((a, b) => {
            let fechaA = new Date(a[0]?.fechaCompra || 0);
            let fechaB = new Date(b[0]?.fechaCompra || 0);
            return fechaB - fechaA;
        });

        ventasGuardadas.forEach((venta, index) => {
            let totalCompra = 0; // Variable para el total de la compra
            let fechaCompra = new Date(venta[0]?.fechaCompra || ""); // Tomar la fecha del primer producto
            let fechaHora;

            if (isNaN(fechaCompra.getTime())) {
                fechaHora = "Fecha no válida";
            } else {
                fechaHora = `${fechaCompra.toLocaleDateString()} ${fechaCompra.toLocaleTimeString()}`;
            }

            let tablaHTML = `
                <div class="venta-seccion">
                    <button class="botonDespble" onclick="this.nextElementSibling.classList.toggle('verCompra')">Compra del ${fechaHora}</button>
                    
                    <div class="hidden">
                        <table>
                            <thead>
                                <tr>
                                    <th>Fecha y Hora</th>
                                    <th>Producto</th>
                                    <th>Cantidad</th>
                                    <th>Precio Unitario</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
            `;
            
            venta.forEach(producto => {
                let totalProducto = producto.cantidad * producto.precio;
                totalCompra += totalProducto; // Sumar al total de la compra
                
                tablaHTML += `
                    <tr>
                        <td>${fechaHora}</td>
                        <td>${producto.nombre}</td>
                        <td>${producto.cantidad}</td>
                        <td>$${producto.precio.toFixed(2)}</td>
                        <td>$${totalProducto.toFixed(2)}</td>
                    </tr>
                `;
            });

            tablaHTML += `
                <tr>
                    <td colspan="4" style="text-align: right;"><strong>Total de la compra:</strong></td>
                    <td><strong>$${totalCompra.toFixed(2)}</strong></td>
                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <br>
            `;
            ventasGuardadasDiv.innerHTML += tablaHTML;
        });
    }
}

function generarPDF() {
    const ventasGuardadasDiv = document.getElementById('ventasGuardadas');

    if (ventasGuardadasDiv.children.length > 0) {
        const primeraVenta = JSON.parse(localStorage.getItem('ventasGuardadas'))[0];
        let fechaCompra = new Date(primeraVenta[0]?.fechaCompra || ""); // Tomar la fecha del primer producto

        let nombreArchivo = "ventas_" + fechaCompra.toLocaleDateString('es-CO').replace(/\//g, '-');

        const opt = {
            margin:       1,
            filename:     `${nombreArchivo}.pdf`,
            html2canvas:  { scale: 2 },
            jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        html2pdf().from(ventasGuardadasDiv).set(opt).save();
    } else {
        alert("No hay ventas guardadas para generar el PDF.");
    }
}

window.onload = function() {
    mostrarVentasGuardadas();
};

document.addEventListener("DOMContentLoaded", function() {
    mostrarVentasGuardadas();
});