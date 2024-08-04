import {
  ChildAdd,
  DragElement,
  SessionData,
  ResizeAbleElement,
  RotateElement,
} from "../../../modules/lib/lib.js";

const Card = (text = "card") => {
  const container = document.createElement("div");
  container.className = "card";

  const head = document.createElement("p");
  head.textContent = text;
  head.className = "card-head";

  const img = document.createElement("img");
  img.className = "card-background-image";

  const backgroundSelect = document.createElement("input");
  backgroundSelect.type = "file";
  backgroundSelect.accept = "image/jpeg, image/png";
  backgroundSelect.style.display = "none";
  backgroundSelect.addEventListener("change", (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      const background = URL.createObjectURL(file);
      // Set the background image of the card
      img.src = background;
    }
  });

  const button = document.createElement("button");
  button.className = "background-select";
  button.textContent = "change background";
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

  function updateUI() {
    let fields = SessionData.get("fields") || [];
    const startObject =
      SessionData.get("properties") || SessionData.get("current_object") || {};

    const image = document.createElement("div");
    image.className = "layout-image draggable-field";
    image.textContent = "IMAGE";
    image.style.width = startObject?.image?.width || 50;
    image.style.height = startObject?.image?.height || 50;
    image.style.transform = startObject?.image?.transform || "rotate(0deg)";

    fieldContainer.innerHTML = "";
    ChildAdd(fieldContainer, [image]);

    // Set initial position for the image
    image.style.left = `${startObject?.image?.x}px`;
    image.style.top = `${startObject?.image?.y}px`;

    DragElement(
      image,
      container,
      { x: startObject?.image?.x, y: startObject?.image?.y },
      (newPosition) => {
        startObject.image = newPosition;
        SessionData.set("properties", startObject);
      }
    );
    RotateElement(image, (transform) => {
      startObject.image.transform = transform;
      SessionData.set("properties", startObject);
    });
    ResizeAbleElement(image, 20, 20, (size) => {
      startObject.image.width = size.width;
      startObject.image.height = size.height;
      SessionData.set("properties", startObject);
    });

    fields.forEach((field, i) => {
      const element = document.createElement("span");
      element.className = "draggable-field";
      element.textContent = field;
      element.style.zIndex = 4;
      // Initialize field position if not set
      element.style.width = startObject[field]?.width || "max-content";
      element.style.height = startObject[field]?.height || "max-content";
      element.style.left = `${startObject[field]?.x}px`;
      element.style.top = `${startObject[field]?.y}px` || 20 * i;
      element.style.transform = startObject[field]?.transform || "";

      if (!startObject[field]) {
        startObject[field] = {
          x: 0,
          y: (i + 6) * 16,
          width: 50,
          height: 50,
          transform: "rotate(0deg)",
        }; // Convert rem to pixels
      }

      DragElement(
        element,
        container,
        { x: startObject[field].x, y: startObject[field].y },
        (newPosition) => {
          startObject[field] = newPosition;
          SessionData.set("properties", startObject);
        }
      );
      RotateElement(element, (transform) => {
        startObject[field].transform = transform;
        SessionData.set("properties", startObject);
      });
      ResizeAbleElement(element, 20, 20, (size) => {
        startObject[field].width = size.width;
        startObject[field].height = size.height;
        SessionData.set("properties", startObject);
      });

      ChildAdd(fieldContainer, [element]);
    });
  }

  window.addEventListener("removefield", updateUI);
  window.addEventListener("newfield", updateUI);
  window.addEventListener("newsession", updateUI);

  updateUI();

  return ChildAdd(container, [front, back, fieldContainer]);
};

export default CardLayout;
