import { ChildAdd } from "../../../../modules/lib/lib.js";
import AddField from "./modules/AddField.js";
import DeleteFile from "./modules/DeleteFile.js";
import ExportFile from "./modules/ExportFile.js";
import FileName from "./modules/FileName.js";
import LoadLocalFile from "./modules/LoadLocalFile.js";
import OpenFile from "./modules/OpenFile.js";
import ReloadApp from "./modules/ReloadApp.js";
import SaveItem from "./modules/SaveItem.js";

const ToolBar = (properties = {}) => {
  const container = document.createElement("div");
  container.className = "toolbar";
  const fileToolContainer = document.createElement("span");
  fileToolContainer.textContent = "file: ";
  const itemToolContainer = document.createElement("span");
  itemToolContainer.textContent = "item: ";

  ChildAdd(fileToolContainer, [
    OpenFile(),
    ...LoadLocalFile(),
    DeleteFile(),
    ExportFile(),
    ReloadApp(),
  ]);

  ChildAdd(itemToolContainer, [SaveItem(properties.object), AddField()]);

  return ChildAdd(container, [
    FileName(),
    fileToolContainer,
    itemToolContainer,
  ]);
};

export default ToolBar;
