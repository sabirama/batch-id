import { ChildAdd, SessionData } from "../../../../../modules/lib/lib.js";
const Headers = ({
  cellContainer = "button",
  cellSpan = 1,
  cellWidth = 100,
}) => {
  const container = document.createElement("div");
  container.className = "list-header";

  // Create a span for each key and add it to the container
  const updateHeader = () => {
    container.innerHTML = "";
    const keys = SessionData.get("fields");
    // Calculate the grid template rows based on the number of keys
    const templatecolumns =
      keys.map(() => `${cellSpan}fr`).join(" ") +
      ` ${cellSpan}fr ${cellSpan}fr`;
    // Set up the grid layout
    container.style.gridTemplateColumns = templatecolumns;

    const indexer = document.createElement("input");
    indexer.className = "cell cell-index";
    indexer.disabled = true;
    indexer.value = "";

    ChildAdd(container, [indexer]);

    keys.forEach((key, i) => {
      const field = document.createElement(cellContainer);
      const minus = document.createElement("button");
      const plus = document.createElement("button");
      field.className = `list-header-field cell  col-${key.replace(" ", "-")}`;
      field.style.width = `${cellWidth}px`;
      field.textContent = key;
      field.disabled = true;
      let width = 100;
      minus.className = "list-header-minus";
      plus.className = "list-header-plus";

      function updateWidth(operator) {
        const list = document.querySelectorAll(`.col-${key.replace(" ", "-")}`);
        if (width > 50) {
          operator === "+"
            ? (width += 20)
            : operator === "-"
            ? (width -= 20)
            : null;
        } else width = 55;
        list.forEach((l) => {
          l.style.width = `${width}px`;
        });
      }

      minus.addEventListener("mousedown", () => {
        updateWidth("-");
      });

      plus.addEventListener("mousedown", () => {
        updateWidth("+");
      });

      field.insertAdjacentElement("afterbegin", minus);
      ChildAdd(field, [plus]);
      ChildAdd(container, [field]);
    });
  };

  window.addEventListener("newfield", updateHeader);
  window.addEventListener("removefield", updateHeader);
  window.addEventListener("newsession", updateHeader);
  updateHeader();

  return container;
};

export default Headers;
