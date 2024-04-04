// Obtener referencias a los elementos de entrada y el botón de confirmar
const dateInput = document.getElementById('date-input');
const timeInput = document.getElementById('time-input');
const confirmBtn = document.getElementById('confirm-btn');

//? Inicializamos variable de fecha elegida para poder ser usada más tarde
let endDate = 0;
//? Variables para controlar el temporizador
let timerInterval;
// Manejar el evento de clic en el botón de confirmar
confirmBtn.addEventListener('click', () => {
    // Obtener la fecha y hora seleccionadas por el usuario
    const selectedDate = dateInput.value;
    const selectedTime = timeInput.value;

    // Validar que se haya seleccionado una fecha y hora válidas
    if (selectedDate && selectedTime) {
        // Ocultar la pantalla inicial y mostrar el contador con una pequeña demora para permitir la animación
        document.getElementById('initial-screen').classList.add('animation-next-initial-screen');
        setTimeout(() => {
            document.getElementById('initial-screen').style.display = 'none';
            document.getElementById('contador-container').style.display = 'flex';
        }, 500); // 500ms es el tiempo de duración de la animación

        // Calcular la fecha final basada en la selección del usuario
        endDate = new Date(selectedDate + 'T' + selectedTime);
        // Llamar a la función updateCountdown() con la nueva fecha final
        updateCountdown(endDate);

        // Llamar a la función updateCountdown() cada segundo después de confirmar la fecha y hora
        timerInterval = setInterval(() => {
            updateCountdown(endDate);
        }, 1000);
    } else {
        // Mostrar un mensaje de error si no se selecciona una fecha o una hora
        alert('Por favor selecciona una fecha y hora válidas.');
    }
});

// Función para actualizar la cuenta regresiva
function updateCountdown(endDate) {
    // Función para formatear los números menores a 10 con un cero delante
    function formatNumber(number) {
        return number < 10 ? '0' + number : number;
    }
    const now = new Date();
    let difference = endDate - now;

    if (difference <= 0) {
        // Si la cuenta regresiva ha llegado a cero o es negativa, ocultar la sección del temporizador
        document.getElementById('contador-container').style.display = 'none';
        // Mostrar la sección de la historia de JavaScript
        document.getElementById('carusel-container').style.display = 'flex';
        // Añadir animación
        document.getElementById('carusel-container').classList.add('slide-up-animation');
        // Detener el temporizador
        clearInterval(timerInterval);
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    // Función para formatear los números menores a 10 con un cero delante
    function formatNumber(number) {
        return number < 10 ? '0' + number : number;
    }

    document.getElementById('days').innerText = formatNumber(days);
    document.getElementById('hours').innerText = formatNumber(hours);
    document.getElementById('minutes').innerText = formatNumber(minutes);

    document.getElementById('seconds').style.transform = 'scale(1.1)';
    setTimeout(() => {
        document.getElementById('seconds').innerText = formatNumber(seconds);
        document.getElementById('seconds').style.transform = 'scale(1)';
    }, 250);
}

//!CARRUSEL
// Variables para controlar el carrusel
const contentSlide = document.getElementById('content-slide');
const images = contentSlide.querySelectorAll('img');
const pageNumbers = document.querySelectorAll('.page-number');
let currentIndex = 0;

// Funciones para navegar entre imágenes
function showImage(index) {
    // Ocultar todas las imágenes
    images.forEach((image) => (image.style.display = 'none'));
    // Mostrar la imagen en el índice especificado
    images[index].style.display = 'block';

    // Remover clase de "activo" de todos los números de página
    pageNumbers.forEach((number) => number.classList.remove('active'));
    // Agregar clase de "activo" al número de página correspondiente
    pageNumbers[index].classList.add('active');
}

function showNextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
}

function showPreviousImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
}

// Agregar event listeners para los botones de flecha
document.getElementById('prevBtn').addEventListener('click', showPreviousImage);
document.getElementById('nextBtn').addEventListener('click', showNextImage);

// Agregar event listeners para los números de página
pageNumbers.forEach((number, index) => {
    number.addEventListener('click', () => showImage(index));
});

// Mostrar la primera imagen al cargar la página
showImage(currentIndex);
