import {
  ChildAdd,
  LocalData,
  SessionData,
  WorkSession,
} from "../../../../../modules/lib/lib.js";

const LoadLocalFile = () => {
  const button = document.createElement("button");
  button.className = "button";
  button.textContent = "local";
  button.addEventListener("click", getLocalFiles);

  const itemList = document.createElement("div");
  itemList.className = "file-list";

  let open = false;

  itemList.addEventListener("click", () => {
    if (open === true) {
      open = false;
      itemList.style.display = "none";
    }
  });

  function updateSession(key, items) {
    SessionData.set("file_name", JSON.parse(key));

    const objects = WorkSession.get();
    if (objects.length > 1 && objects[0]) {
      const fields = Object.keys(objects[0]);
      SessionData.set("fields", fields);
      SessionData.set("current_object", objects[0]);
      WorkSession.set(items[key]);
    } else {
      SessionData.set("fields", []);
      SessionData.set("current_object", []);
      WorkSession.set([]);
    }

    itemList.style.display = "none";
    open = false;
    window.dispatchEvent(new Event("newsession"));
  }

  function getLocalFiles() {
    open = true;
    itemList.innerHTML = "";
    itemList.style.display = "block";

    const items = {};

    const header = document.createElement("p");
    header.textContent = "Select File";
    header.style.backgroundColor = "whitesmoke";
    ChildAdd(itemList, [header]);

    // Loop through all items in localStorage
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const itemObject = document.createElement("p");
      itemObject.zIndex = 200;
      itemObject.addEventListener("click", () => updateSession(key, items));

      if (key) {
        items[key] = LocalData.get(key);
        itemObject.textContent = JSON.parse(key);
        ChildAdd(itemList, [itemObject]);
      }
    }
  }

  return [button, itemList];
};

export default LoadLocalFile;
