
import { ChildAdd, SessionData} from '../../../../../../modules/lib/lib.js';

const Headers = ({
  cellContainer = "input",
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
      keys.map(() => `${cellSpan}fr`).join(" ") + ` ${cellSpan}fr ${cellSpan}fr`;
    // Set up the grid layout
    container.style.gridTemplateColumns = templatecolumns;

    const indexer = document.createElement("input");
    indexer.className = "cell cell-index";
    indexer.disabled = true;
    indexer.value = "No."
    ChildAdd(container, [indexer]);
    keys.forEach((key) => {
      const field = document.createElement(cellContainer);
      field.className = "list-header-field cell";
      field.style.width = `${cellWidth}px`;
      field.innerHTML = key;
      field.disabled = true;
      field.value = key;
      ChildAdd(container, [field]);
    });
  };

  window.addEventListener("newfield", updateHeader);
  window.addEventListener("removefield", updateHeader);
  window.addEventListener("newsession", updateHeader)
  updateHeader();

  return container;
};

export default Headers;
