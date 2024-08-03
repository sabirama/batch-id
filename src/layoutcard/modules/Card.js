import {
  ChildAdd,
  DragElement,
  SessionData,
  ResizeAbleElement,
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
  const fieldContainer = document.createElement("div");
  fieldContainer.className = "container-edit-fields";
  container.className = "card-editor";
  const front = Card("front");
  front.classList.add("front");
  const back = Card("back");
  back.classList.add("back");

  const startObject =
    SessionData.get("start") || SessionData.get("current_object") || {};
  startObject.image = startObject.image || { x: 0, y: 0 };

  function updateUI() {
    const fields = SessionData.get("fields") || [];
    const image = document.createElement("div");
    image.className = "layout-image";
    image.textContent = "IMAGE";
    ResizeAbleElement(image);

    fieldContainer.innerHTML = "";
    ChildAdd(fieldContainer, [image]);

    // Set initial position for the image
    image.style.left = `${startObject.image.x}px`;
    image.style.top = `${startObject.image.y}px`;

    DragElement(
      image,
      container,
      { x: startObject.image.x, y: startObject.image.y },
      (newPosition) => {
        startObject.image = newPosition;
        SessionData.set("start", startObject);
      }
    );

    fields.forEach((field, i) => {
      const element = document.createElement("span");
      element.className = "draggable-field";
      element.textContent = field;
      element.style.zIndex = 4;
      ResizeAbleElement(element);
      // Initialize field position if not set
      if (!startObject[field]) {
        startObject[field] = { x: 0, y: (i + 6) * 16 }; // Convert rem to pixels
      }

      // Set initial position for the field
      element.style.left = `${startObject[field].x}px`;
      element.style.top = `${startObject[field].y}px`;

      ChildAdd(fieldContainer, [element]);

      DragElement(
        element,
        container,
        { x: startObject[field].x, y: startObject[field].y },
        (newPosition) => {
          startObject[field] = newPosition;
          SessionData.set("start", startObject);
        }
      );
    });
  }

  window.addEventListener("removefield", updateUI);
  window.addEventListener("newfield", updateUI);

  updateUI();

  return ChildAdd(container, [front, back, fieldContainer]);
};

export default CardLayout;
