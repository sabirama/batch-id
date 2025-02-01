import { ChildAdd, SessionData } from "../../../../modules/lib/lib.js";

const FieldProperties = () => {
  let currentActive = "";

  const container = document.createElement("div");
  container.className = "field-properties";

  window.addEventListener("updatefield", updateUI);
  window.addEventListener("newfield", updateUI);
  window.addEventListener("removefield", updateUI);

  function updateUI() {
    const properties = SessionData.get("properties") || {};

    const head = document.createElement("h4");
    head.textContent = "Field Properties";

    const save = document.createElement("button");
    save.textContent = "apply changes";
    save.addEventListener("click", () => {
      SessionData.set("properties", properties);
      window.dispatchEvent(new Event("newsession"));
    });

    container.innerHTML = "getting properties";
    currentActive = SessionData.get("current_field");

    if (currentActive === "" || currentActive === "image") {
      return (container.innerHTML = "Select Field");
    }

    setTimeout(() => {
      container.innerHTML = "";
      ChildAdd(container, [
        head,
        changeFont(properties[currentActive]),
        changeFontStyle(properties[currentActive]),
        changeFontSize(properties[currentActive]),
        changeColor(properties[currentActive]),
        changeLeft(properties[currentActive]),
        changeTop(properties[currentActive]),
        changeWidth(properties[currentActive]),
        changeHeight(properties[currentActive]),
        changRotation(properties[currentActive]),
        save,
      ]);
    }, 200);
  }

  updateUI();

  return container;
};

function changeFont(field) {
  const container = document.createElement("div");
  container.className = "property-change";
  const label = document.createElement("label");
  label.textContent = "font:   ";
  const input = document.createElement("select");
  const normal = document.createElement("option");
  normal.textContent = "segou-ui";
  const italic = document.createElement("option");
  italic.textContent = "times new roman";
  const bold = document.createElement("option");
  bold.textContent = "tahoma";

  input.addEventListener("change", (e) => {
    field.font_family = e.target.value;
  });

  ChildAdd(input, [normal, italic, bold]);
  return ChildAdd(container, [label, input]);
}

function changeFontStyle(field) {
  const container = document.createElement("div");
  container.className = "property-change";
  const label = document.createElement("label");
  label.textContent = "font-style:   ";
  const input = document.createElement("select");
  const normal = document.createElement("option");
  normal.textContent = "normal";
  const italic = document.createElement("option");
  italic.textContent = "italic";
  const bold = document.createElement("option");
  bold.textContent = "bold";
  input.value = field.font_family;
  input.addEventListener("change", (e) => {
    field.font_style = e.target.value;
  });

  ChildAdd(input, [normal, italic, bold]);
  return ChildAdd(container, [label, input]);
}

function changeFontSize(field) {
  const container = document.createElement("div");
  container.className = "property-change";
  const label = document.createElement("label");
  label.textContent = "font-size:   ";
  const input = document.createElement("input");
  input.type = "number";
  input.value = field.font_size;
  input.addEventListener("change", (e) => {
    if (e.target.value < 4) {
      e.preventDefault();
      e.target.value = 4;
    }
    field.font_size = e.target.value;
  });
  return ChildAdd(container, [label, input]);
}

function changeColor(field) {
  const container = document.createElement("div");
  container.className = "property-change";
  const label = document.createElement("label");
  label.textContent = "color:   ";
  const input = document.createElement("input");
  input.type = "color";
  input.value = field.color;
  input.addEventListener("change", (e) => {
    field.color = e.target.value;
  });
  return ChildAdd(container, [label, input]);
}

function changeLeft(field) {
  const container = document.createElement("div");
  container.className = "property-change";
  const label = document.createElement("label");
  label.textContent = "X:   ";
  const input = document.createElement("input");
  input.type = "number";
  input.value = field.x || 20;
  input.addEventListener("change", (e) => {
    field.x = e.target.value;
  });

  return ChildAdd(container, [label, input]);
}

function changeTop(field) {
  const container = document.createElement("div");
  container.className = "property-change";
  const label = document.createElement("label");
  label.textContent = "Y:   ";
  const input = document.createElement("input");
  input.type = "number";
  input.value = field.y || 20;
  input.addEventListener("change", (e) => {
    field.y = e.target.value;
  });

  return ChildAdd(container, [label, input]);
}

function changeWidth(field) {
  const container = document.createElement("div");
  container.className = "property-change";
  const label = document.createElement("label");
  label.textContent = "width:   ";
  const input = document.createElement("input");
  input.type = "number";
  input.value = field.width || 20;
  input.addEventListener("change", (e) => {
    field.width = e.target.value;
  });

  return ChildAdd(container, [label, input]);
}

function changeHeight(field) {
  const container = document.createElement("div");
  container.className = "property-change";
  const label = document.createElement("label");
  label.textContent = "height:   ";
  const input = document.createElement("input");
  input.type = "number";
  input.value = field.height || 20;
  input.addEventListener("change", (e) => {
    field.height = e.target.value;
  });

  return ChildAdd(container, [label, input]);
}

function changRotation(field) {
  const container = document.createElement("div");
  container.className = "property-change";
  const label = document.createElement("label");
  label.textContent = "rotate:   ";
  const input = document.createElement("input");
  input.type = "number";
  const regex = /[a-zA-Z!@#$%^&*()_+{}\[\]:;"'<>,.?/\\|`~]/g;
  input.value = Number(field.transform.replace(regex, "")) || 0;
  input.addEventListener("change", (e) => {
    field.transform = `rotate(${e.target.value}deg)`;
  });

  return ChildAdd(container, [label, input]);
}

export default FieldProperties;
