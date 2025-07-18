// Función de ejemplo para pruebas unitarias
function sumar(a, b) {
    return a + b;
}

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Obtener referencias a los elementos del DOM
    const botonSaludo = document.getElementById('saludo');
    const mensaje = document.getElementById('mensaje');
    const versionSpan = document.getElementById('version');
    
    // Configurar versión desde las variables de entorno o usar la versión por defecto
    const version = process.env.APP_VERSION || '1.0.0';
    if (versionSpan) {
        versionSpan.textContent = version;
    }
    
    // Manejador de evento para el botón
    if (botonSaludo && mensaje) {
        botonSaludo.addEventListener('click', function() {
            mensaje.textContent = '¡Hola! Gracias por visitar nuestra aplicación web.';
            mensaje.style.color = '#27ae60';
            mensaje.style.fontWeight = 'bold';
        });
    }
});

// Exportar para pruebas
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { sumar };
} else {
    // Para el navegador
    window.sumar = sumar;
}
