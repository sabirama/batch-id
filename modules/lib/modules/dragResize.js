const DragResize = (element, parent) => {
  const handle = document.createElement("div");
  handle.className = "handle";

  document.addEventListener("DOMContentLoaded", () => {
    let isResizing = false;
    let startY, startHeight;

    // Dragging functionality
    handle.addEventListener("mousedown", (e) => {
      if (e.target === handle) {
        isResizing = true;
        startY = e.clientY;
        startHeight = element.offsetHeight;
      }
      e.preventDefault();
    });

    document.addEventListener("mousemove", (e) => {
      if (isResizing === true) {
        const newHeight = startHeight + (e.clientY - startY);
        element.style.height = `${newHeight}px`;
      }
    });

    document.addEventListener("mouseup", () => {
      isResizing = false;
    });
  });

  if (parent) {
    parent.appendChild(handle);
  } else {
    element.appendChild(handle);
  }
};

export default DragResize;
