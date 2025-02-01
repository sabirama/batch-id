import { SessionData, WorkSession, ChildAdd } from "../../modules/lib/lib.js";
import ToolBar from "./modules/toolbar/Toolbar.js";
import ManageKeys from "./modules/manage_keys/ManageKeys.js";
import ManageCapture from "./modules/manage_capture/ManageCapture.js";
import ItemListing from "./modules/item_listing/ItemListing.js";

const SetData = () => {
  const container = document.createElement("main");
  const fileName = SessionData.get("file_name");
  let fields = SessionData.get("fields");
  let objectArray = WorkSession.get();
  let object = SessionData.get("current_object");
  fields = SessionData.get("fields");

  container.className = "setdata";
  
  if (!fileName) {
    SessionData.set("file_name", "File Name");
  }

  if (!fields) {
    SessionData.set("fields", [
      "name",
      "address",
      "contact number",
      "contact person",
    ]);
  }

  if (!object) {
    SessionData.set("current_object", {
      name: "",
      address: "",
      "contact person": "",
      "contact number": "",
    });
  }

  return ChildAdd(container, [
    ToolBar({ objectArray, object }),
    ManageKeys({ fields, object }),
    ManageCapture(),
    ItemListing(),
  ]);
};

export default SetData;
