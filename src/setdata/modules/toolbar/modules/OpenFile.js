import {
  ChildAdd,
  SessionData,
  WorkSession,
} from "../../../../../modules/lib/lib.js";

const OpenFile = () => {
  const button = document.createElement("button");
  button.className = "button";
  button.textContent = "new";

  const csvInput = document.createElement("input");
  csvInput.type = "file";
  csvInput.accept = ".csv";
  csvInput.style.display = "none";
  csvInput.addEventListener("change", handleFileSelect);

  function handleFileSelect(event) {
    const file = event.target.files[0];
    let fileName;
    fileName = file.name.split(".")[0];

    if (!file) return;

    // Extract filename without extension
    const fileNameWithExtension = file.name;
    const fileNameWithoutExtension = fileNameWithExtension
      .split(".")
      .slice(0, -1)
      .join(".");
    SessionData.set("file_name", fileNameWithoutExtension);

    const reader = new FileReader();
    reader.onload = function (event) {
      const text = event.target.result;
      const jsonData = csvToJSON(text);
      WorkSession.set(jsonData);
      window.dispatchEvent(new Event("newsession"));
    };
    reader.readAsText(file);
    csvInput.value = "";
  }

  function csvToJSON(csv) {
    const lines = csv.split("\n");
    const headers = lines[0].split(",");
    const result = [];

    for (let i = 1; i < lines.length; i++) {
      const obj = {};
      const currentLine = lines[i].split(",");

      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentLine[j];
      }
      if (i === 1) {
        const keys = Object.keys(obj);
        SessionData.set("fields", keys);
      }
      result.push(obj);
    }

    return result;
  }

  const loadHandler = () => {
    csvInput.click();
  };

  button.addEventListener("click", loadHandler);

  return ChildAdd(button, [csvInput]);
};

export default OpenFile;
