import {
  ChildAdd,
  DragElement,
  SessionData,
  ResizeAbleElement,
  RotateElement,
} from "../../../../modules/lib/lib.js";

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
    const file = e.target.files[0];
    if (file) {
      const background = URL.createObjectURL(file);
      img.src = background;
    }
  });

  const button = document.createElement("button");
  button.className = "background-select";
  button.textContent = "change background";
  button.addEventListener("click", () => backgroundSelect.click());

  ChildAdd(container, [head, img, button, backgroundSelect]);

  return container;
};

const CardLayout = () => {
  const container = document.createElement("div");
  container.className = "card-editor";

  const fieldContainer = document.createElement("div");
  fieldContainer.className = "container-edit-fields";

  const front = Card("Front");
  front.classList.add("front");

  const back = Card("Back");
  back.classList.add("back");

  window.addEventListener("removefield", updateUI);
  window.addEventListener("newfield", updateUI);
  window.addEventListener("newsession", updateUI);

  function updateUI() {
    let fields = SessionData.get("fields") || [];
    let properties =
      SessionData.get("properties") || SessionData.get("current_object");

    if (!properties.image) {
      properties.image = {
        x: 0,
        y: 0,
        width: 50,
        height: 50,
        transform: "rotate(0deg)",
      };
    }

    fieldContainer.innerHTML = "";

    const image = document.createElement("div");
    image.className = "layout-image draggable-field";
    image.textContent = "IMAGE";
    image.style.width = `${properties.image.width}px`;
    image.style.height = `${properties.image.height}px`;
    image.style.transform = properties.image.transform;
    image.style.left = `${properties.image.x}px`;
    image.style.top = `${properties.image.y}px`;

    ChildAdd(fieldContainer, [image]);

    DragElement(
      image,
      container,
      { x: properties.image.x, y: properties.image.y },
      (newPosition) => {
        properties.image = { ...properties.image, ...newPosition };
        SessionData.set("properties", properties);
      }
    );
    RotateElement(image, (transform) => {
      properties.image.transform = transform;
      SessionData.set("properties", properties);
    });
    ResizeAbleElement(
      image,
      properties.image.width,
      properties.image.height,
      20,
      20,
      (size) => {
        properties.image.width = size.width;
        properties.image.height = size.height;
        SessionData.set("properties", properties);
      }
    );

    fields.forEach((field) => {
      const element = document.createElement("span");
      element.className = "draggable-field";
      element.textContent = field;
      element.style.zIndex = 4;
      element.style.width = `${properties[field].width}px`;
      element.style.height = `${properties[field].height}px`;
      element.style.left = `${properties[field].x}px`;
      element.style.top = `${properties[field].y}px`;
      element.style.transform = properties[field].transform;
      element.style.fontStyle = properties[field].font_style;
      element.style.fontFamily = properties[field].font_family;
      element.style.fontSize = `${properties[field].font_size}px`;
      element.style.color = properties[field].color;

      DragElement(
        element,
        container,
        { x: properties[field].x, y: properties[field].y },
        (newPosition) => {
          properties[field] = { ...properties[field], ...newPosition };
          SessionData.set("properties", properties);
        }
      );
      RotateElement(element, (transform) => {
        properties[field].transform = transform;
        SessionData.set("properties", properties);
      });
      ResizeAbleElement(
        element,
        properties[field].width,
        properties[field].height,
        20,
        20,
        (size) => {
          properties[field].width = size.width;
          properties[field].height = size.height;
          SessionData.set("properties", properties);
        }
      );

      ChildAdd(fieldContainer, [element]);
    });

    SessionData.set("properties", properties);
  }

  updateUI();

  ChildAdd(container, [front, back, fieldContainer]);

  return container;
};

export default CardLayout;
