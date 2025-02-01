import { ChildAdd } from "../../../../../modules/lib/lib.js";

const Field = ({ containerTag = "div", handler }) => {
  const container = document.createElement(containerTag);
  container.className = "field-container";
  const label = document.createElement("label");
  label.className = "field-label";
  const input = document.createElement("input");
  input.className = "field-input";
  const close = document.createElement("button");
  close.className = "remove-field";
  handler(container, label, input, close);
  return ChildAdd(container, [label, input, close]);
};

export default Field;
