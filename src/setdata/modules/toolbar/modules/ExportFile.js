import { SessionData, WorkSession } from "../../../../../modules/lib/lib.js";

const ExportFile = () => {
  const button = document.createElement("button");
  button.className = "button";
  button.textContent = "export";
  button.addEventListener("click", () => {
    const fileName = SessionData.get("file_name");
    const data = WorkSession.get(fileName);
    console.log(data);
    downloadCSV(fileName, data);
  });
  function convertToCSV(data) {
    if (!data || !data.length) return "";

    const headers = Object.keys(data[0]);
    const rows = data.map((row) =>
      headers.map((header) => JSON.stringify(row[header], replacer)).join(",")
    );

    // Join headers and rows into a single CSV string
    return [headers.join(","), ...rows].join("\n");
  }

  // Optional replacer function to handle special characters
  function replacer(key, value) {
    return value === null ? "" : value;
  }

  // Function to download CSV file
  function downloadCSV(filename, data) {
    const csv = convertToCSV(data);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

    if (navigator.msSaveBlob) {
      // IE 10+
      navigator.msSaveBlob(blob, filename);
    } else {
      const link = document.createElement("a");
      if (link.download !== undefined) {
        // feature detection
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", filename);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }

  return button;
};

export default ExportFile;
