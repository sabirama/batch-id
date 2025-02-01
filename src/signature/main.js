const mainCanvas = document.getElementById("drawingCanvas");
const mainCtx = mainCanvas.getContext("2d");

let layers = [];
let removedLayers = [];
let currentLayer = null;

// MARK: CANVAS SCALING
function setCanvasSize() {
  const ratio = window.devicePixelRatio || 1;
  const width = mainCanvas.offsetWidth;
  const height = mainCanvas.offsetHeight;

  mainCanvas.width = width * ratio;
  mainCanvas.height = height * ratio;
  mainCtx.scale(ratio, ratio);
}

setCanvasSize();

// Create a new layer
function createLayer() {
  const layer = document.createElement('canvas');
  layer.width = mainCanvas.width;
  layer.height = mainCanvas.height;
  const ctx = layer.getContext('2d');
  ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
  return { canvas: layer, ctx: ctx };
}

// Composite all layers onto main canvas
function renderLayers() {
  mainCtx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
  layers.forEach(layer => {
    mainCtx.drawImage(layer.canvas, 0, 0);
  });
}

// MARK: UNDO/REDO FUNCTIONALITY
document.addEventListener('keydown', (event) => {
  // Undo - Control+Z
  if (event.ctrlKey && event.key === 'z') {
    event.preventDefault();
    if (layers.length > 0) {
      const removedLayer = layers.pop();
      removedLayers.push(removedLayer);
      renderLayers();
    }
  }
  
  // Redo - Control+Y
  if (event.ctrlKey && event.key === 'y') {
    event.preventDefault();
    if (removedLayers.length > 0) {
      const restoredLayer = removedLayers.pop();
      layers.push(restoredLayer);
      renderLayers();
    }
  }
});

// Disable right-click context menu
mainCanvas.addEventListener("contextmenu", (event) => {
  event.preventDefault();
});

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let lastTime = 0;
let lastVelocity = 0;
let startWidth = 5;
let points = [];

// MARK: MOUSE POSITION
function getPosition(event) {
  const rect = mainCanvas.getBoundingClientRect();
  const x = (event.clientX - rect.left) * (mainCanvas.width / rect.width);
  const y = (event.clientY - rect.top) * (mainCanvas.height / rect.height);
  return { x, y };
}

// MARK: PEN VELOCITY
function calculateVelocity(x, y) {
  const now = Date.now();
  const timeDiff = now - lastTime;

  if (timeDiff === 0) return lastVelocity;

  const distance = Math.sqrt(Math.pow(x - lastX, 2) + Math.pow(y - lastY, 2));
  const currentVelocity = distance / timeDiff;

  const velocitySmoothingFactor = .25;
  const smoothedVelocity =
    lastVelocity + (currentVelocity - lastVelocity) * velocitySmoothingFactor;

  lastVelocity = smoothedVelocity;
  lastTime = now;

  return smoothedVelocity;
}

// MARK: SMOOTH STROKE WIDTH
function smoothStrokeWidth(velocity) {
  const minWidth = Math.max(1, startWidth * .5);
  const maxWidth = startWidth * 4;
  const velocityFactor = Math.exp(-velocity * .5);
  const targetWidth = Math.min(
    maxWidth,
    Math.max(minWidth, startWidth * velocityFactor * 4)
  );

  const smoothingFactor = .5;
  let width = points.length > 0 ? points[points.length - 1].width : startWidth;
  width += (targetWidth - width) * smoothingFactor;

  return width;
}

function getMiddlePoint(p1, p2) {
  return {
    x: (p1.x + p2.x) / 2,
    y: (p1.y + p2.y) / 2,
    width: (p1.width + p2.width) / 2,
  };
}

// MARK: DRAW SMOOTH LINE
function drawSmoothLine() {
  if (points.length < 2 || !currentLayer) return;

  const ctx = currentLayer.ctx;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.strokeStyle = mainCtx.strokeStyle; // Match the current stroke style

  for (let i = 1; i < points.length; i++) {
    const p1 = points[i - 1];
    const p2 = points[i];

    ctx.beginPath();
    ctx.lineWidth = (p1.width + p2.width) / 2;
    ctx.moveTo(p1.x, p1.y);

    if (i < points.length - 1) {
      const midPoint = getMiddlePoint(p1, p2);
      ctx.quadraticCurveTo(p1.x, p1.y, midPoint.x, midPoint.y);
    } else {
      ctx.lineTo(p2.x, p2.y);
    }

    ctx.stroke();
  }
  
  renderLayers();
}

// MARK: DRAW MOUSE
function drawMouse(event) {
  if (isDrawing) {
    const { x, y } = getPosition(event);
    const velocity = calculateVelocity(x, y);
    const width = smoothStrokeWidth(velocity);

    points.push({ x, y, width });

    if (points.length > 8) {
      points = points.slice(-8);
    }

    lastX = x;
    lastY = y;

    drawSmoothLine();
  }
}

// Mouse Events
mainCanvas.addEventListener("mousedown", (event) => {
  isDrawing = true;
  const { x, y } = getPosition(event);
  lastX = x;
  lastY = y;
  lastTime = Date.now();
  lastVelocity = 0;
  points = [{ x, y, width: startWidth }];
  
  // Clear redo stack when starting a new stroke
  removedLayers = [];
  
  // Create new layer for this stroke
  currentLayer = createLayer();
  layers.push(currentLayer);
});

mainCanvas.addEventListener("mousemove", drawMouse);
mainCanvas.addEventListener("mouseup", () => {
  isDrawing = false;
  points = [];
  lastVelocity = 0;
  currentLayer = null;
});

mainCanvas.addEventListener("mouseout", () => {
  isDrawing = false;
  points = [];
  lastVelocity = 0;
  currentLayer = null;
});

// MARK: TOUCH DRAW
function drawTouch(event) {
  const touch = event.touches[0];
  if (touch && isDrawing) {
    const { x, y } = getPosition(touch);
    const velocity = calculateVelocity(x, y);
    const width = smoothStrokeWidth(velocity);

    points.push({ x, y, width });

    if (points.length > 8) {
      points = points.slice(-8);
    }

    lastX = x;
    lastY = y;

    drawSmoothLine();
  }
}

// Touch Events
mainCanvas.addEventListener("touchstart", (event) => {
  event.preventDefault();
  isDrawing = true;
  const { x, y } = getPosition(event.touches[0]);
  lastX = x;
  lastY = y;
  lastTime = Date.now();
  lastVelocity = 0;
  points = [{ x, y, width: startWidth }];
  
  // Clear redo stack when starting a new stroke
  removedLayers = [];
  
  // Create new layer for this stroke
  currentLayer = createLayer();
  layers.push(currentLayer);
  
  drawTouch(event);
});

mainCanvas.addEventListener("touchmove", (event) => {
  event.preventDefault();
  drawTouch(event);
});

mainCanvas.addEventListener("touchend", () => {
  isDrawing = false;
  points = [];
  lastVelocity = 0;
  currentLayer = null;
});

// MARK: BUTTONS
const save = document.getElementById("save");
const saveName = document.getElementById("name");
const clear = document.getElementById("clear");
const stroke = document.getElementById("stroke");
const eraser = document.getElementById("eraser");

// Save Canvas
save.addEventListener("click", () => {
  const imageUrl = mainCanvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = imageUrl;
  link.download = `${saveName.value}.png`;
  link.click();
});

// Clear Canvas
clear.addEventListener("click", () => {
  layers = [];
  removedLayers = [];
  mainCtx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
});

// Change Stroke Width
stroke.value = startWidth;
stroke.addEventListener("change", (event) => {
  startWidth = Number(event.target.value);
});

// Erase stroke
eraser.addEventListener("click", () => {
  if (eraser.classList.contains("eraser")) {
    mainCtx.strokeStyle = "black";
    eraser.classList.remove("eraser");
  } else {
    mainCtx.strokeStyle = "white";
    eraser.classList.add("eraser");
  }
});