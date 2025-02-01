import { ChildAdd, SessionData } from "../../modules/lib/lib.js";
import EditElements from "./modules/edit_elements/EditElements.js";
import { Minimize } from "../../modules/utils/utils.js";
import CardLayout from "./modules/card/Card.js";
import FieldProperties from "./modules/field_properties/FieldProperties.js";

const LayOutCards = () => {
  const container = document.createElement("main");
  container.className = "layout";
  const head = document.createElement("h2");
  head.textContent = "Edit Layout";
  const editContainer = document.createElement("div");
  editContainer.className = "edit-layout";

  initializeProperties();
  window.addEventListener("newfield", initializeProperties);

  ChildAdd(editContainer, [EditElements(), FieldProperties(), CardLayout()]);

  return ChildAdd(container, [
    Minimize(container, "auto", true),
    head,
    editContainer,
  ]);
};

function initializeProperties() {
  const fields = SessionData.get("fields");
  const properties = SessionData.get("properties") || {};

  fields.forEach((field) => {
    if (!properties[field]) {
      properties[field] = {
        x: 0,
        y: 0,
        width: 80,
        height: 24,
        transform: "rotate(0deg)",
      };
    }
  });

  SessionData.set("properties", properties);
}

export default LayOutCards;
