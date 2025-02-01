import { SessionData, WorkSession } from "../../../../../modules/lib/lib.js";

const SaveItem = (object) => {
  const button = document.createElement("button");
  button.className = "button";
  const fields = SessionData.get("fields");
  const empty = {};
  fields.forEach((key) => {
    empty[key] = "";
  });

  button.textContent = "new";
  button.addEventListener("click", () => {
    const currentFile = WorkSession.get();
    currentFile.push(object);
    WorkSession.set(currentFile);
    SessionData.set("current_object", empty);
    window.dispatchEvent(new Event("newsession"))
  });
  return button;
};

export default SaveItem;
