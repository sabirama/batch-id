import { ChildAdd, SessionData } from "../../../modules/lib/lib.js";

const EditElements = () => {
  const container = document.createElement("div");
  container.className = "edit-elements";
  const fields = SessionData.get("fields");
  const head = document.createElement("h3");
  head.textContent = "Fields";

  ChildAdd(container, [head]);

  fields.forEach((field) => {
    const fieldElement = document.createElement("p");
    fieldElement.className = "edit-field";
    fieldElement.textContent = field;
    ChildAdd(container, [fieldElement]);
  });
  return container;
};

export default EditElements;
