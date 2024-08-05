import { ChildAdd, SessionData } from "../../../../modules/lib/lib.js";

const EditElements = () => {
  const container = document.createElement("div");
  container.className = "edit-elements";

  let currentActive;

  function updateUI() {
    const fields = SessionData.get("fields") || [];

    fields.unshift("image");
    // Clear existing elements
    container.innerHTML = "";

    fields.forEach((field) => {
      const fieldElement = document.createElement("button");
      fieldElement.className = `edit-field ${
        currentActive === field ? "active" : ""
      }`;
      fieldElement.textContent = field;

      // Handle click events
      fieldElement.addEventListener("click", () => {
        currentActive = field;
        SessionData.set("current_field", field);
        window.dispatchEvent(new Event("updatefield"));
      });

      ChildAdd(container, [fieldElement]);
    });
  }

  window.addEventListener("removefield", updateUI);
  window.addEventListener("newfield", updateUI);
  window.addEventListener("updatefield", updateUI);
  window.addEventListener("newsession", updateUI);
  // Initial UI update
  updateUI();

  return container;
};

export default EditElements;
