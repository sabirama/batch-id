const Minimize = (element, height, callback = () => {}) => {
  const button = document.createElement("button");
  button.textContent = "--";
  button.className = "minimize";
  let toggle = true;
  button.addEventListener("click", () => {
    if (toggle === true) {
      element.style.height = "10px";
      element.style.overflow = "hidden";
      button.style.width = "100vw";
      button.style.height = "100%";
      toggle = false;
      callback(toggle);
    } else {
      element.style.height = height;
      toggle = true;
      button.style.width = "auto";
      button.style.height = "auto";
      callback(toggle);
    }
  });
  return button;
};

export default Minimize;
