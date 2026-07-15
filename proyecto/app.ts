// Selección segura de elementos del DOM utilizando Tipado de TS
const posterContainer = document.querySelector('.poster-container') as HTMLElement | null;
const registerSection = document.querySelector('.games-and-register') as HTMLElement | null;
const registerFormOverlay = document.getElementById('register-form-overlay') as HTMLElement | null;
const closeFormBtn = document.getElementById('close-form') as HTMLButtonElement | null;
const registerForm = document.getElementById('register-form') as HTMLFormElement | null;

/**
 * Ajusta la escala del póster dinámicamente según la resolución actual del viewport.
 * Logra que en PC se vea grande y nítido, y en móviles se auto-ajuste al tamaño de pantalla.
 */
function makePosterResponsive(): void {
    if (!posterContainer) return;

    // Dimensiones nativas del contenedor definidas en el CSS
    const targetWidth: number = 380;
    const targetHeight: number = 680;

    // Margen de seguridad para que el cartel no toque los bordes físicos de la pantalla
    const paddingSafety: number = 24;
    const availableWidth: number = window.innerWidth - paddingSafety;
    const availableHeight: number = window.innerHeight - paddingSafety;

    // Calculamos el factor de escala necesario para el ancho y el alto
    const scaleX: number = availableWidth / targetWidth;
    const scaleY: number = availableHeight / targetHeight;

    // Elegimos el menor multiplicador para asegurar que el póster quepa en cualquier proporción de pantalla
    let currentScale: number = Math.min(scaleX, scaleY);

    // Límite superior opcional: para evitar que en pantallas gigantescas (como 4K) se sobre-dimensione
    if (currentScale > 2.0) {
        currentScale = 2.0;
    }

    // Aplicamos la escala matricial de transformación
    posterContainer.style.transform = `scale(${currentScale})`;
}

// ==========================================
// CONTROL DEL FORMULARIO INTERACTIVO (Modal)
// ==========================================

const showModalForm = (): void => {
    registerFormOverlay?.classList.remove('hidden');
};

const hideModalForm = (): void => {
    registerFormOverlay?.classList.add('hidden');
};

// Event Listeners con prevención de burbujeo para un comportamiento limpio
if (registerSection) {
    registerSection.addEventListener('click', (event: MouseEvent) => {
        showModalForm();
    });
}

if (closeFormBtn) {
    closeFormBtn.addEventListener('click', (event: MouseEvent) => {
        event.stopPropagation(); // Evita re-activar el click del contenedor padre
        hideModalForm();
    });
}

if (registerForm) {
    // Evitamos que al dar click dentro del form se intente cerrar el overlay
    registerForm.addEventListener('click', (event: MouseEvent) => {
        event.stopPropagation();
    });

    registerForm.addEventListener('submit', (event: SubmitEvent) => {
        event.preventDefault();

        const teamInput = document.getElementById('team-name') as HTMLInputElement | null;
        const emailInput = document.getElementById('contact-email') as HTMLInputElement | null;
        const gameSelect = document.getElementById('game-select') as HTMLSelectElement | null;

        if (teamInput && emailInput && gameSelect) {
            const teamName: string = teamInput.value;
            const chosenGame: string = gameSelect.options[gameSelect.selectedIndex].text;

            alert(`¡Registro Exitoso!\nEquipo: ${teamName}\nJuego: ${chosenGame}\n\nLos detalles fueron enviados a su correo.`);
            
            registerForm.reset();
            hideModalForm();
        }
    });
}

// ==========================================
// DISPARADORES DEL EVENTO DE ESCALADO
// ==========================================

// Ajuste inicial al cargar el DOM y al cambiar el tamaño de ventana
window.addEventListener('resize', makePosterResponsive);
window.addEventListener('DOMContentLoaded', makePosterResponsive);

// Ejecución inmediata de respaldo
makePosterResponsive();