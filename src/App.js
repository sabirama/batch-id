import { ChildAdd } from "../modules/lib/lib.js";
import LayOutCards from "./layoutcard/LayoutCards.js";
import SetData from "./setdata/SetData.js";

const App = () => {
  const app = document.createElement("div");
  return ChildAdd(app, [SetData(), LayOutCards()]);
};

export default App;
