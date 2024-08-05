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

// Function to start drawing
function startDrawing(event) {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(event.offsetX, event.offsetY);
}

// Function to draw on the canvas
function draw(event) {
    if (!drawing) return;
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
}

// Function to stop drawing
function stopDrawing() {
    drawing = false;
    ctx.closePath();
}

// Add event listeners for mouse actions
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

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