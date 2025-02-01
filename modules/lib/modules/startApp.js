const startApp = (App) => {
  const root = document.getElementById("root");

  root.onloadstart = () => {
    root.innerHTML = "loading";
  };

  return root.appendChild(App());
};

export default startApp;
