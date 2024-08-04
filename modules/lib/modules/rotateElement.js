const RotateElement = (element, callback = () => {}) => {
  // const handleContainer = document.createElement("div");
  // handleContainer.style.position = "relative";

  const handle = document.createElement("div");
  handle.style.width = "4px";  // Size for usability
  handle.style.height = "4px";
  handle.style.background = "red";
  handle.style.cursor = "pointer";
  handle.style.borderRadius = "50%";
  handle.style.position = "absolute";
  handle.style.top = "-10px";  
  handle.style.transform = "translateY(-50%)"; // Center the handle vertically
  handle.className = "rotator";
  // handleContainer.appendChild(handle);

  element.insertAdjacentElement("afterbegin", handle);

  let isDragging = false;
  let initialAngle = 0;
  let initialCursorX = 0;
  let handleRect = handle.getBoundingClientRect();

  function rotate(e) {
    if (!isDragging) return;
    window.dispatchEvent(new Event("resizing"));

    const handleCenterX = handleRect.left + handleRect.width / 2;
    const cursorX = e.clientX;
    const deltaX = cursorX - handleCenterX;

    const newAngle = initialAngle + deltaX;
    element.style.transform = `rotate(${newAngle}deg)`;

    // Update handleRect for accurate rotation
    handleRect = handle.getBoundingClientRect();
  }

  function stopRotate() {
    isDragging = false;
    callback(element.style.transform);
  }

  handle.addEventListener("mousedown", (e) => {
    isDragging = true;
    initialCursorX = e.clientX;
    const handleCenterX = handleRect.left + handleRect.width / 2;
    initialAngle = parseFloat(element.style.transform.replace("rotate(", "").replace("deg)", "")) || 0;
    e.preventDefault();
  });

  document.addEventListener("mousemove", rotate);
  document.addEventListener("mouseup", stopRotate);

  // Cleanup event listeners if necessary
  return () => {
    document.removeEventListener("mousemove", rotate);
    document.removeEventListener("mouseup", stopRotate);
  };
};

export default RotateElement;