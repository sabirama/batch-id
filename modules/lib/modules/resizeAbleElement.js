function resizeAbleElement(element, minWidth = 20, minHeight = 20) {
  const resizer = document.createElement("div");
  resizer.className = "resizer";
  resizer.style.width = "2px";
  resizer.style.height = "2px";
  resizer.style.background = "red";
  resizer.style.position = "absolute";
  resizer.style.right = "0";
  resizer.style.bottom = "0";
  resizer.style.cursor = "se-resize";
  element.appendChild(resizer);

  // Set the element to be relatively positioned if it isn't already
  if (window.getComputedStyle(element).position === "static") {
    element.style.position = "relative";
  }

  // Variables to store the starting position and size
  let original_width = 0;
  let original_height = 0;
  let original_x = 0;
  let original_y = 0;
  let original_mouse_x = 0;
  let original_mouse_y = 0;

  function resize(e) {
    const width = original_width + (e.pageX - original_mouse_x);
    const height = original_height + (e.pageY - original_mouse_y);

    if (width > minWidth) {
      element.style.width = width + "px";
    }
    if (height > minHeight) {
      element.style.height = height + "px";
    }
    window.dispatchEvent(new Event("resizing"));
  }

  function stopResize() {
    window.removeEventListener("mousemove", resize);
  }

  resizer.addEventListener("mousedown", function (e) {
    e.preventDefault();
    original_width = parseFloat(
      getComputedStyle(element, null)
        .getPropertyValue("width")
        .replace("px", "")
    );
    original_height = parseFloat(
      getComputedStyle(element, null)
        .getPropertyValue("height")
        .replace("px", "")
    );
    original_x = element.getBoundingClientRect().left;
    original_y = element.getBoundingClientRect().top;
    original_mouse_x = e.pageX;
    original_mouse_y = e.pageY;
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResize);
  });

  return element;
}

export default resizeAbleElement;
