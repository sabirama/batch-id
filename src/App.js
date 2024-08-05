import { ChildAdd } from "../modules/lib/lib.js";
import LayOutCards from "./layoutcard/LayoutCards.js";
import SetData from "./setdata/SetData.js";

const App = () => {
  const app = document.createElement("div");

  function updateUI(app) {
    app.innerHTML = `
    <div class="refresh">
      <h1>Setting up</h1>
    </div>
    `;
    setTimeout(() => {
      app.innerHTML = "";
      ChildAdd(app, [SetData(), LayOutCards()]);
    }, 200);
  }

  window.addEventListener("refresh", () => {
    updateUI(app);
  });

  updateUI(app);
  return app;
};

export default App;
