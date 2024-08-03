import { ChildAdd, SessionData } from "../../../modules/lib/lib.js";

const EditElements = () => {
  const container = document.createElement("div");
  container.className = "edit-elements";
  const head = document.createElement("h3");
  ChildAdd(container, [head]);

  function updateUI() {
    const fields = SessionData.get("fields");

    container.innerHTML = "";
    head.textContent = "Fields";
    fields.forEach((field) => {
      const fieldElement = document.createElement("p");
      fieldElement.className = "edit-field";
      fieldElement.textContent = field;
      ChildAdd(container, [fieldElement]);
    });
  }

  window.addEventListener("removefield", updateUI);
  window.addEventListener("newfield", updateUI);
  
  updateUI();
  
  return container;
};

export default EditElements;
