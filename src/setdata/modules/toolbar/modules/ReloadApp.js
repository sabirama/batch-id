const ReloadApp = () => {
  const button = document.createElement("button");
  button.textContent = "refresh";
  button.className = "button"
  button.addEventListener("click", () => window.location.reload());
  return button;
};

export default ReloadApp;
