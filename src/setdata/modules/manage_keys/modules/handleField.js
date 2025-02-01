import updateFieldName from "./updateFields.js";

export default function handleField(i, container, label, input, close, fields) {
  const field = fields[i];

  label.value = field;
  label.addEventListener("dblclick", () => {
    const changeFieldKey = document.createElement("input");
    container.insertAdjacentElement("afterbegin", changeFieldKey);
    label.style.display = "none";

    changeFieldKey.value = field;
    changeFieldKey.addEventListener("change", (e) => {
      updateFieldName(e, label, i, fields);
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

  function handleInputChange(e, field) {
    object[field] = e.target.value;
    SessionData.set("current_object", object);
  }
}
