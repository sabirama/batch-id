// Get the canvas element and its context
const canvas = document.getElementById('signatureCanvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions (high quality)
const canvasWidth = 800; // Example width
const canvasHeight = 400; // Example height

canvas.width = canvasWidth;
canvas.height = canvasHeight;

// Set up drawing variables
let drawing = false;

// Get the pen size input
const penSizeInput = document.getElementById('penSize');
let penSize = parseInt(penSizeInput.value, 10);

// Function to start drawing
function startDrawing(event) {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(event.offsetX, event.offsetY);
}

// Function to draw on the canvas
function draw(event) {
    if (!drawing) return;

    // Calculate the pen size based on pressure
    const pressure = event.pressure || 1; // Default to 1 if pressure is not available
    ctx.lineWidth = penSize * pressure;

    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
}

// Function to stop drawing
function stopDrawing() {
    drawing = false;
    ctx.closePath();
}

// Add event listeners for pointer actions
canvas.addEventListener('pointerdown', startDrawing);
canvas.addEventListener('pointermove', draw);
canvas.addEventListener('pointerup', stopDrawing);
canvas.addEventListener('pointerout', stopDrawing);

// Clear canvas function
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Save canvas function
function saveCanvas() {
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'signature.png';
    link.click();
}

// Update pen size when slider changes
penSizeInput.addEventListener('input', (event) => {
    penSize = parseInt(event.target.value, 10);
});

// Initialize pen size
ctx.lineWidth = penSize;