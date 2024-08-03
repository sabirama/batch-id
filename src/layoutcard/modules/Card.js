import {
  ChildAdd,
  DragElement,
  SessionData,
} from "../../../modules/lib/lib.js";

const Card = (text = "card") => {
  const container = document.createElement("div");
  container.className = "card";
  const head = document.createElement("p");
  head.textContent = text;
  head.className = "card-head";
  const img = document.createElement("img");
  img.className = "card-background-image";
  const button = document.createElement("button");
  button.className = "background-select";
  button.textContent = "change background";
  const backgroundSelect = document.createElement("input");
  backgroundSelect.type = "file";
  backgroundSelect.accept = "image/jpeg, image/png"; // Corrected accept attribute
  backgroundSelect.style.display = "none";

  backgroundSelect.addEventListener("change", (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      const background = URL.createObjectURL(file);
      // Set the background image of the card
      img.src = background;
    }
  });

  button.addEventListener("click", () => backgroundSelect.click());
  // Append head and backgroundSelect to container
  ChildAdd(container, [head, img, button, backgroundSelect]);

  return container;
};

const CardLayout = () => {
  const container = document.createElement("div");
  container.className = "card-editor";
  const front = Card("front");
  front.classList.add("front");
  const back = Card("back");
  back.classList.add("back");

  const fields = SessionData.get("fields");
  fields.forEach((field, i) => {
    const element = document.createElement("span");
    element.className = "draggable-field";
    element.textContent = field;
    element.style.zIndex = 4;
    element.style.top = `${i + 6}rem`;
    ChildAdd(container, [element]);
    DragElement(element, container);
  });
  return ChildAdd(container, [front, back]);
};

export default CardLayout;
