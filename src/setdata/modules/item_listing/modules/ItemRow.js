import {
  ChildAdd,
  SessionData,
  WorkSession,
} from "../../../../../modules/lib/lib.js";

const ItemRow = ({ objects, cellSpan = 1, rowSpan = 1, cellWidth = 100 }) => {
  const container = document.createElement("div");
  let keys = SessionData.get("fields") || [];

  const updateUI = () => {
    container.innerHTML = ""; // Clear container before re-rendering

    // Define grid template based on the number of keys
    const templateColumns =
      keys.map(() => `${cellSpan}fr`).join(" ") +
      ` ${cellSpan}fr ${cellSpan}fr`;
    container.className = "rows";
    container.style.gridTemplateColumns = templateColumns;

    if (typeof objects != "object" || objects[0] === null) {
      WorkSession.remove();
      objects = [];
    }

    objects.forEach((item, i) => {
      const itemContainer = document.createElement("div");
      const close = document.createElement("button");
      close.textContent = "x";
      close.className = "remove-row";
      close.addEventListener("click", () => removeRow(i));
      itemContainer.style.display = "contents";

      const indexer = document.createElement("input");
      indexer.className = "cell cell-index";
      indexer.value = i + 1;
      indexer.disabled = true;

      ChildAdd(itemContainer, [indexer]);

      keys.forEach((key) => {
        const field = document.createElement("input");
        field.className = `cell row-${i} col-${key.replace(" ", "-")}`;
        field.style.width = `${cellWidth}px`;
        field.value = item[key] || "";
        field.addEventListener("change", (e) => {
          objects[i][key] = e.target.value;
          WorkSession.set(objects); // Update the session data
          window.dispatchEvent(new Event("setlocal")); // Trigger re-render
        });
        ChildAdd(itemContainer, [field]);
      });
      ChildAdd(container, [itemContainer, close]);
    });

    // Update grid template rows based on the current list length
    container.style.gridTemplateRows = objects
      .map(() => `${rowSpan}fr`)
      .join(" ");
  };

  const removeRow = (index) => {
    objects.splice(index, 1);
    WorkSession.set(objects); // Update the session data
    updateUI(); // Re-render after removing a row
  };

  // Set up the event listener
  const handleSetLocal = () => {
    objects = WorkSession.get();
    updateUI();
  };

  const handleUpdateFields = () => {
    keys = SessionData.get("fields");
    updateUI();
  };

  window.addEventListener("setlocal", handleSetLocal);
  window.addEventListener("newfield", handleUpdateFields);
  window.addEventListener("removefield", handleUpdateFields);
  window.addEventListener("newsession", handleUpdateFields);

  // Initial render
  updateUI();
  // Return an object with the container and a cleanup function
  return container;
};

export default ItemRow;
