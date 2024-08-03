import { ChildAdd } from "../../../modules/lib/lib.js";

const FieldProperties = () => {
  const container = document.createElement("div");
  container.className = "field-properties";
  const head = document.createElement("h4");
  head.textContent = "Field Proerties";
  return ChildAdd(container, [head]);
};

export default FieldProperties;
