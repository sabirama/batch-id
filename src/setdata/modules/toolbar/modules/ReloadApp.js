const ReloadApp = () => {
  const button = document.createElement("button");
  button.textContent = "refresh";
  button.className = "button";
  button.addEventListener("click", () => {
    window.dispatchEvent(new Event("refresh"));
  });
  return button;
};

export default ReloadApp;
