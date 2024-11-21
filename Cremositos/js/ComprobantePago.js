document.getElementById('guardarComprobante').addEventListener('click', function () {
    const fileInput = document.getElementById('comprobante');
    const file = fileInput.files[0];

    if (!file) {
        alert('Por favor, selecciona un comprobante para guardar.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        const blob = new Blob([e.target.result], { type: file.type });
        const url = URL.createObjectURL(blob);

        // Crear enlace para descargar
        const a = document.createElement('a');
        a.href = url;
        a.download = file.name; // Mantiene el nombre original del archivo
        a.click();

        // Limpiar memoria
        URL.revokeObjectURL(url);
    };
    reader.readAsArrayBuffer(file);
});