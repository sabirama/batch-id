const DragElement = (draggable, extents = document) => {
  let isDragging = false;
  let startX, startY;

  draggable.addEventListener("mousedown", startDragging);
  extents.addEventListener("mousemove", drag);
  document.addEventListener("mouseup", stopDragging);

  function startDragging(e) {
    isDragging = true;
    startX = e.clientX - draggable.offsetLeft;
    startY = e.clientY - draggable.offsetTop;

    // Prevent text selection during drag
    e.preventDefault();
  }

  function drag(e) {
    if (!isDragging) return;

    const x = e.clientX - startX;
    const y = e.clientY - startY;

    if (x < 0) x = 0;
    if (x + draggable.width > extents.width) x = extents.width - draggable.width;

    // Constrain vertical movement
    if (y < 0) y = 0;
    if (y + draggable.height > extents.height) y = extents.height - draggable.height;
    

    draggable.style.left = `${x}px`;
    draggable.style.top = `${y}px`;
  }

  function stopDragging() {
    isDragging = false;
  }
};

export default DragElement;
