import {
  ChildAdd,
  LocalData,
  SessionData,
} from "../../../../../modules/lib/lib.js";
import Modal from "../../../../../modules/utils/modules/modal.js";

const DeleteFile = () => {
  const button = document.createElement("button");
  button.textContent = "clear";
  button.className = "button";

  const toggle = false;

  function openModal() {
    ChildAdd(button, [
      Modal({
        toggle,
        wrapper: {},
        head: { text: "Head", tag: "header" },
        body: { text: "Body", tag: "div" },
        footer: { text: "Footer", tag: "footer" },
      }),
    ]);
  }

  openModal();

  button.addEventListener("click", deleteHandler);
  return button;
};

function deleteHandler() {
  const filename = SessionData.get("file_name");
  LocalData.remove(`"${filename}"`);
  sessionStorage.clear();
  SessionData.set("file_name", "File Name");
  SessionData.set("fields", []);
  SessionData.set("current_object", {});
  window.dispatchEvent(new Event("newsession"));
}

export default DeleteFile;
