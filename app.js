// Selección segura de elementos del DOM
const posterContainer = document.querySelector('.poster-container');
const registerSection = document.querySelector('.games-and-register');
const registerFormOverlay = document.getElementById('register-form-overlay');
const closeFormBtn = document.getElementById('close-form');
const registerForm = document.getElementById('register-form');

/**
 * Ajusta la escala del póster dinámicamente según la resolución actual del viewport.
 * Logra que en PC se vea grande y nítido, y en móviles se auto-ajuste al tamaño de pantalla.
 */
function makePosterResponsive() {
    if (!posterContainer) return;

    // Dimensiones nativas del contenedor definidas en el CSS
    const targetWidth = 380;
    const targetHeight = 680;

    // Margen de seguridad para que el cartel no toque los bordes físicos de la pantalla
    const paddingSafety = 24;
    const availableWidth = window.innerWidth - paddingSafety;
    const availableHeight = window.innerHeight - paddingSafety;

    // Calculamos el factor de escala necesario para el ancho y el alto
    const scaleX = availableWidth / targetWidth;
    const scaleY = availableHeight / targetHeight;

    // Elegimos el menor multiplicador para asegurar que el póster quepa en cualquier proporción de pantalla
    let currentScale = Math.min(scaleX, scaleY);

    // Límite superior para evitar que en pantallas gigantescas se vea pixelado
    if (currentScale > 2.0) {
        currentScale = 2.0;
    }

    // Aplicamos la escala matricial de transformación para el auto-ajuste
    posterContainer.style.transform = `scale(${currentScale})`;
}

// ==========================================
// CONTROL DEL FORMULARIO INTERACTIVO (Modal)
// ==========================================

const showModalForm = () => {
    registerFormOverlay?.classList.remove('hidden');
};

const hideModalForm = () => {
    registerFormOverlay?.classList.add('hidden');
};

// Event Listeners con prevención de burbujeo para un comportamiento limpio
if (registerSection) {
    registerSection.addEventListener('click', () => {
        showModalForm();
    });
}

if (closeFormBtn) {
    closeFormBtn.addEventListener('click', (event) => {
        event.stopPropagation(); // Evita re-activar el click del contenedor padre
        hideModalForm();
    });
}

if (registerForm) {
    // Evitamos que al dar click dentro del form se intente cerrar el overlay
    registerForm.addEventListener('click', (event) => {
        event.stopPropagation();
    });

    registerForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const teamInput = document.getElementById('team-name');
        const emailInput = document.getElementById('contact-email');
        const gameSelect = document.getElementById('game-select');

        if (teamInput && emailInput && gameSelect) {
            const teamName = teamInput.value;
            const chosenGame = gameSelect.options[gameSelect.selectedIndex].text;

            alert(`¡Registro Exitoso!\nEquipo: ${teamName}\nJuego: ${chosenGame}\n\nLos detalles fueron enviados a su correo.`);
            
            registerForm.reset();
            hideModalForm();
        }
    });
}

// ==========================================
// DISPARADORES DEL EVENTO DE ESCALADO
// ==========================================

// Usamos 'load' para asegurar que lea las dimensiones reales tras cargar estilos e imágenes
window.addEventListener('load', makePosterResponsive);
window.addEventListener('resize', makePosterResponsive);

// Ejecución inmediata de respaldo
makePosterResponsive();
