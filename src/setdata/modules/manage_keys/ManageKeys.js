import { ChildAdd, SessionData } from "../../../../modules/lib/lib.js";
import { HeadText, Minimize } from "../../../../modules/utils/utils.js";
import Field from "./modules/Field.js";

const ManageKeys = ({ fields, object }) => {
  const container = document.createElement("div");
  container.className = "fields-manager";
  const headerText = HeadText({ text: "Fields", tag: "h3" });
  const fieldsContainer = document.createElement("div");
  fieldsContainer.className = "fields-container";
  if (!object) {
    object = {};
  }
  fields?.forEach((key) => {
    object[key] = "";
  });
  SessionData.set("current_object", object);

  function updateFieldName(e, label, fieldIndex) {
    const newFieldName = e.target.value.trim();
    const oldFieldName = fields[fieldIndex];

    // Handle invalid or unchanged field names
    if (newFieldName === "" || newFieldName === oldFieldName) {
      label.style.display = "inline-block";
      e.target.remove(); // Remove the input element
      return;
    }

    // Ensure the new field name does not already exist in the fields array
    if (fields.includes(newFieldName)) {
      alert("Field name already exists.");
      e.target.value = oldFieldName; // Reset the input to the old value
      return;
    }

    // Update fields array
    fields[fieldIndex] = newFieldName;

    // Update object
    const { [oldFieldName]: oldValue, ...rest } = object; // Extract old value and rest of the object
    object = {
      ...rest,
      [newFieldName]: oldValue || "", // Set new field name
    };

    // Save changes
    SessionData.set("fields", fields);
    SessionData.set("current_object", object);

    // Update the label and cleanup
    label.textContent = newFieldName;
    label.style.display = "inline-block";
    window.dispatchEvent(new Event("newsession"));
    e.target.remove();
  }

  function handleInputChange(e, field) {
    object[field] = e.target.value;
    SessionData.set("current_object", object);
    e.target.blur();
  }

  function handleField(i, container, label, input, close) {
    const field = fields[i];

    label.textContent = field;
    label.addEventListener("dblclick", () => {
      const changeFieldKey = document.createElement("input");
      container.insertAdjacentElement("afterbegin", changeFieldKey);
      label.style.display = "none";

      changeFieldKey.value = field;
      changeFieldKey.addEventListener("change", (e) => {
        updateFieldName(e, label, i);
      });
      changeFieldKey.addEventListener("keydown", (e) => {
        if (e.key === "Enter") changeFieldKey.blur();
      });
      changeFieldKey.addEventListener("blur", () => {
        label.style.display = "inline-block";
        changeFieldKey.remove();
      });
    });

    close.textContent = "x";
    close.addEventListener("click", () => {
      const fieldIndex = fields.indexOf(field);
      fields.splice(fieldIndex, 1);
      SessionData.set("fields", fields);
      const newObject = {};
      fields.forEach((f) => {
        newObject[f] = object[f] || "";
      });
      SessionData.set("current_object", newObject);
      window.dispatchEvent(new Event("removefield"));
      close.parentNode.remove();
    });

    input.addEventListener("change", (e) => handleInputChange(e, field));
  }

  function renderFields() {
    fieldsContainer.innerHTML = ""; // Clear previous fields
    fields?.forEach((field, index) => {
      ChildAdd(fieldsContainer, [
        Field({
          containerTag: "div",
          handler: (container, label, input, close) =>
            handleField(index, container, label, input, close),
        }),
      ]);
    });
  }

  function setSessionFields() {
    fieldsContainer.innerHTML = "";
    fields = SessionData.get("fields");
    return renderFields();
  }

  function handleNewField() {
    const newField = `field ${fields.length + 1}`;
    fields.push(newField);
    const fieldIndex = fields.indexOf(newField);

    ChildAdd(fieldsContainer, [
      Field({
        containerTag: "div",
        handler: (container, label, input, close) =>
          handleField(fieldIndex, container, label, input, close),
      }),
    ]);
  }

  function handleMinimize(toggle) {
    if (toggle === false) {
      container.style.gridColumn = "1 / 5";
      window.dispatchEvent(new Event("minimize"));
    } else {
      container.style.gridColumn = "1 / 4";
      window.dispatchEvent(new Event("maximize"));
    }
  }

  window.addEventListener("newfield", handleNewField);

  window.addEventListener("setlocal", setSessionFields);

  window.addEventListener("newsession", setSessionFields);

  renderFields();

  return ChildAdd(container, [
    Minimize(container, "334px", false, (toggle) => handleMinimize(toggle)),
    headerText,
    fieldsContainer,
  ]);
};

export default ManageKeys;
