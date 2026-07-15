const posterContainer = document.querySelector('.poster-container');
const registerSection = document.querySelector('.games-and-register');
const registerFormOverlay = document.getElementById('register-form-overlay');
const closeFormBtn = document.getElementById('close-form');
const registerForm = document.getElementById('register-form');

function makePosterResponsive() {
    if (!posterContainer) return;

    // Si la pantalla es de PC (más de 1024px de ancho), desactivamos el escalado de JS
    if (window.innerWidth > 1024) {
        posterContainer.style.transform = 'none';
        return;
    }

    // Dimensiones nativas de móvil para el cálculo
    const targetWidth = 380;
    const targetHeight = 660;

    const paddingSafety = 20;
    const availableWidth = window.innerWidth - paddingSafety;
    const availableHeight = window.innerHeight - paddingSafety;

    const scaleX = availableWidth / targetWidth;
    const scaleY = availableHeight / targetHeight;

    let currentScale = Math.min(scaleX, scaleY);

    if (currentScale > 1.3) {
        currentScale = 1.3;
    }

    posterContainer.style.transform = `scale(${currentScale})`;
}

// CONTROL DEL MODAL
const showModalForm = () => {
    registerFormOverlay?.classList.remove('hidden');
};

const hideModalForm = () => {
    registerFormOverlay?.classList.add('hidden');
};

if (registerSection) {
    registerSection.addEventListener('click', () => {
        showModalForm();
    });
}

if (closeFormBtn) {
    closeFormBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        hideModalForm();
    });
}

if (registerForm) {
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
            alert(`¡Registro Exitoso!\nEquipo: ${teamName}\nJuego: ${chosenGame}`);
            registerForm.reset();
            hideModalForm();
        }
    });
}

window.addEventListener('load', makePosterResponsive);
window.addEventListener('resize', makePosterResponsive);
makePosterResponsive();
