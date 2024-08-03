import { ChildAdd, SessionData } from "../../../../../modules/lib/lib.js";

const handleNameChange = (e) => {
  if (e.target.value !== "") {
    SessionData.set("file_name", e.target.value);
  }
  e.target.remove();
};

const editFileName = (e) => {
  const changeFileName = document.createElement("input");
  changeFileName.addEventListener("change", handleNameChange);
  changeFileName.addEventListener("blur", () => changeFileName.remove());

  ChildAdd(e.target, [changeFileName]);
};

const FileName = () => {
  const container = document.createElement("h4");
  const fiteText = document.createElement("span");
  ChildAdd(container, [fiteText]);
  fiteText.textContent = SessionData.get("file_name");

  container.addEventListener("dblclick", editFileName);
  container.onchange = () => {
    container.textContent = SessionData.get("file_name");
  };

  function updateFileName() {
    fiteText.textContent = SessionData.get("file_name");
  }

  window.addEventListener("setlocal", updateFileName);
  window.addEventListener("newsession", updateFileName);
  return container;
};

export default FileName;
