import { SessionData } from "../../../../../modules/lib/lib.js";

const AddField = () => {
  const button = document.createElement("button");
  button.className = "button";
  button.textContent = "field";
  button.addEventListener("click", handleAddField);

  function handleAddField() {
    const object = {};
    const fields = SessionData.get("fields");
    fields.push(`field ${fields.length + 1}`);
    fields.forEach((field) => {
      object[field] = object[field] || "";
    });
    SessionData.set("fields", fields);
    SessionData.set("current_object", object);
    window.dispatchEvent(new Event("newfield"));
  }
  return button;
};

export default AddField;
