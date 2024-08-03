const Minimize = (element, height, toggle, callback = () => {}) => {
  const button = document.createElement("button");
  button.textContent = "--";
  button.className = "minimize";

  const updateState = () => {
    if (toggle === true) {
      element.style.height = "20px";
      element.style.overflow = "hidden";
      button.style.height = "100%";
      toggle = false;
      callback(toggle);
    } else {
      element.style.height = height;
      element.style.overflow = "auto";
      toggle = true;
      button.style.height = "auto";
      callback(toggle);
    }
  };

  button.addEventListener("click", updateState);
  updateState();

  return button;
};

export default Minimize;
