const DragElement = (
  draggable,
  extents = document,
  start = { x: 0, y: 0 },
  callback = () => {}
) => {
  let isDragging = false;
  let startX, startY;

  draggable.addEventListener("mousedown", startDragging);
  extents.addEventListener("mousemove", drag);
  document.addEventListener("mouseup", stopDragging);

  function startDragging(e) {
    isDragging = true;
    startX = e.clientX - (parseInt(draggable.style.left) || 0);
    startY = e.clientY - (parseInt(draggable.style.top) || 0);
    e.preventDefault();
  }

  function drag(e) {
    if (!isDragging) return;
    window.addEventListener("resizing", () => {
      isDragging = false
    });
    let x = e.clientX - startX;
    let y = e.clientY - startY;

    const extentsRect = extents.getBoundingClientRect();
    const draggableRect = draggable.getBoundingClientRect();

    x = Math.max(0, Math.min(x, extentsRect.width - draggableRect.width));
    y = Math.max(0, Math.min(y, extentsRect.height - draggableRect.height));

    draggable.style.left = `${x}px`;
    draggable.style.top = `${y}px`;
  }

  function stopDragging() {
    if (!isDragging) return;
    isDragging = false;
    const newX = parseInt(draggable.style.left) || 0;
    const newY = parseInt(draggable.style.top) || 0;
    callback({ x: newX, y: newY });
  }

  // Set initial position
  draggable.style.left = `${start.x}px`;
  draggable.style.top = `${start.y}px`;
};

export default DragElement;
