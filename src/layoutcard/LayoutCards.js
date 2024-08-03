import { ChildAdd } from "../../modules/lib/lib.js";
import EditElements from "./modules/EditElements.js";
import { Minimize } from "../../modules/utils/utils.js";
import CardLayout from "./modules/Card.js";
import FieldProperties from "./modules/FieldProperties.js";

const LayOutCards = () => {
  const container = document.createElement("main");
  container.className = "layout";
  const head = document.createElement("h2");
  head.textContent = "Edit Layout";
  const editContainer = document.createElement("div");
  editContainer.className = "edit-layout";

  ChildAdd(editContainer, [EditElements(), FieldProperties(), CardLayout()]);

  return ChildAdd(container, [
    Minimize(container, "auto", true),
    head,
    editContainer,
  ]);
};

export default LayOutCards;
