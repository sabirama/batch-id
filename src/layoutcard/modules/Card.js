import { ChildAdd } from "../../../modules/lib/lib.js";

const Card = (text = "card") => {
  const container = document.createElement("div");
  container.className = "card";
  const head = document.createElement("p");
  head.textContent = text;
  head.className = "card-head";

  return ChildAdd(container, [head]);
};

const CardLayout = () => {
  const container = document.createElement("div");
  container.className = "card-editor";
  const front = Card("front");
  front.classList.add("front");
  const back = Card("back");
  back.classList.add("back");

  return ChildAdd(container, [front, back]);
};

export default CardLayout;
