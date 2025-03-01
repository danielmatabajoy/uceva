const canvas = document.getElementById('simulacionCanvas');
const ctx = canvas.getContext('2d');

// Parámetros iniciales
let x = 50; // Posición inicial en X
let y = 50; // Posición inicial en Y
let vx = 2; // Velocidad inicial en X
let vy = 0; // Velocidad inicial en Y
const g = 0.1; // Gravedad
let paused = false;

// Controles
document.getElementById('iniciar').addEventListener('click', () => paused = false);
document.getElementById('pausar').addEventListener('click', () => paused = true);
document.getElementById('reiniciar').addEventListener('click', reiniciar);

function reiniciar() {
    x = 50;
    y = 50;
    vx = 2;
    vy = 0;
    paused = true;
}

// Función para actualizar la simulación
function actualizar() {
    if (!paused) {
        // Actualizar posición
        x += vx;
        y += vy;

        // Aplicar gravedad
        vy += g;

        // Rebote en el suelo
        if (y + 10 > canvas.height) {
            y = canvas.height - 10;
            vy *= -0.8; // Rebote con pérdida de energía
        }
    }
}

// Función para dibujar la simulación
function dibujar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar el objeto
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fillStyle = 'blue';
    ctx.fill();

    // Dibujar vectores (opcional)
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + vx * 10, y + vy * 10);
    ctx.strokeStyle = 'red';
    ctx.stroke();
}

// Bucle principal
function bucle() {
    actualizar();
    dibujar();
    requestAnimationFrame(bucle);
}

bucle();