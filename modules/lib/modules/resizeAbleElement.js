function resizeAbleElement(
  element,
  width,
  height,
  minWidth = 20,
  minHeight = 20,
  callback = () => {}
) {
  element.style.width = `${width}px`;
  element.style.height = `${height}px`;
  element.style.position = "absolute";

  const resizer = document.createElement("div");
  resizer.className = "resizer";
  resizer.style.width = "4px";
  resizer.style.height = "4px";
  resizer.style.background = "red";
  resizer.style.position = "absolute";
  resizer.style.right = "0";
  resizer.style.bottom = "0";
  resizer.style.cursor = "se-resize";
  resizer.style.zIndex = "1000";
  element.appendChild(resizer);

  let original_width = 0;
  let original_height = 0;
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
    window.removeEventListener("mouseup", stopResize);
    callback({
      width: parseFloat(element.style.width),
      height: parseFloat(element.style.height),
    });
  }

  resizer.addEventListener("mousedown", function (e) {
    e.preventDefault();
    original_width = parseFloat(getComputedStyle(element).width);
    original_height = parseFloat(getComputedStyle(element).height);
    original_mouse_x = e.pageX;
    original_mouse_y = e.pageY;
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResize);
  });

  return element;
}

export default resizeAbleElement;
