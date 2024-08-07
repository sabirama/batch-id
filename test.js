// Get the canvas element and its context
const canvas = document.getElementById("signatureCanvas");
const ctx = canvas.getContext("2d");

// Set canvas dimensions (high quality)
const canvasWidth = document.body.clientWidth;
const canvasHeight = document.body.clientHeight;

canvas.width = canvasWidth;
canvas.height = canvasHeight;

// Set up drawing variables
let drawing = false;
let isEraser = false;
let filename = "signature";
let penSize = parseInt(document.getElementById("penSize").value, 10);
let startSize = penSize;

// Function to start drawing
function startDrawing(event) {
  drawing = true;
  ctx.beginPath();
  ctx.moveTo(event.offsetX, event.offsetY);
}

// Function to draw or erase on the canvas
function draw(event) {
  if (!drawing) return;

  if (isEraser) {
    // Erase
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = penSize; // Use penSize as eraser size
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    ctx.globalCompositeOperation = "source-over"; // Reset to default
  } else {
    // Draw
    const pressure = event.pressure || 1; // Default to 1 if pressure is not available
    ctx.lineWidth = startSize * pressure;
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
  }
}
// Function to stop drawing
function stopDrawing() {
  drawing = false;
  ctx.closePath();
  if (!isEraser) {
    ctx.lineWidth = startSize; // Reset lineWidth to default penSize
  }
}

// Add event listeners for pointer actions
canvas.addEventListener("pointerdown", startDrawing);
canvas.addEventListener("pointermove", draw);
canvas.addEventListener("pointerup", stopDrawing);
canvas.addEventListener("pointerout", stopDrawing);

// Clear canvas function
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Save canvas function
function saveCanvas() {
  const dataURL = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = dataURL;
  link.download = `${filename}.png`;
  link.click();
}

// Update pen size when slider changes
document.getElementById("penSize").addEventListener("input", (event) => {
  penSize = parseInt(event.target.value, 10);
  startSize = penSize; // Update startSize to new penSize
});

// Initialize pen size
ctx.lineWidth = penSize;

function changeFileName() {
  filename = e.target.value;
}

// Toggle eraser tool
function toggleEraser(e) {
  isEraser = !isEraser;
 
  if (isEraser) {
    e.target.style.backgroundColor = "grey";
  } else {
    e.target.style.backgroundColor = "lightgrey";
  }
}
