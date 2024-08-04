import { ChildAdd, SessionData } from "../../../modules/lib/lib.js";

const FieldProperties = () => {
  const container = document.createElement("div");
  container.className = "field-properties";

  const head = document.createElement("h4");
  head.textContent = "Field Proerties";

  let currentActive = "";
  const properties = SessionData.get("properties") || {};

  window.addEventListener("updatefield", () => {
    currentActive = SessionData.get("current_field");
    updateUI();
  });

  function updateUI() {
    container.innerHTML = "";
    ChildAdd(container, [
      head,
      changeFont(properties[currentActive]),
      changeFontStyle(properties[currentActive]),
      changeFontSize(properties[currentActive]),
      changeColor(properties[currentActive]),
    ]);
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
  console.log(field);

  input.addEventListener("change", (e) => {
    console.log(e.target.value);
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
  console.log(field);

  input.addEventListener("change", (e) => {
    console.log(e.target.value);
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
  input.addEventListener("change", (e) => {
    if (e.target.value < 4) {
      e.preventDefault();
      e.target.value = 4;
    }
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
  input.addEventListener("change", (e) => {});
  return ChildAdd(container, [label, input]);
}

export default FieldProperties;
