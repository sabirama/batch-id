import { ChildAdd, SessionData } from "../../../../../modules/lib/lib.js";

const ButtonModules = ({ video, image, canvas }) => {
  const container = document.createElement("span");
  container.className = "button-modules";
  const start = document.createElement("button");
  start.className = "button";
  start.textContent = "Open";
  const capture = document.createElement("button");
  capture.className = "button";
  capture.textContent = "Snap";
  const close = document.createElement("button");
  close.className = "button";
  close.textContent = "Close";
  const download = document.createElement("a");
  
  start.addEventListener("click", () => {
    startVideo(video);
  });
  capture.addEventListener("click", () => {
    capturePhoto(video, image, canvas);
  });
  close.addEventListener("click", () => {
    stopVideo(video);
  });

  const sessionItem = () => {
    try {
      const item = SessionData.get("current_object");
      const keys = Object.keys(item);
      const name = item.name || item[keys[0]];
      return name || "capture-image";
    } catch (e) {
      return "capture-image";
    }
  };

  async function startVideo(video) {
    try {
      // Request user media (webcam)
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      // Set the video source to the stream
      video.srcObject = stream;
    } catch (error) {
      console.error("Error accessing webcam:", error);
    }
  }

  function stopVideo(video) {
    if (video.srcObject) {
      const stream = video.srcObject;
      stream.getTracks().forEach((track) => track.stop());
      video.srcObject = null;
    }
  }

  function capturePhoto(video, image, canvas) {
    // Get the desired width and height for the cropped image
    const width = Number(image.style.width.replace("px", ""));
    const height = Number(image.style.height.replace("px", ""));
    
    // Set canvas size to video size
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
  
    // Get canvas context and draw video frame to canvas
    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
  
    // Define cropping area centered on the canvas
    const cropX = (canvas.width - width) / 2;
    const cropY = (canvas.height - height) / 2;
  
    // Create a new canvas to hold the cropped image
    const cropCanvas = document.createElement("canvas");
    cropCanvas.width = width;
    cropCanvas.height = height;
    const cropContext = cropCanvas.getContext("2d");
  
    // Draw the cropped portion of the image onto the new canvas
    cropContext.drawImage(
      canvas,
      cropX,
      cropY,
      width,
      height,
      0,
      0,
      width,
      height
    );
  
    // Convert cropped canvas to data URL
    const dataURL = cropCanvas.toDataURL("image/png");
  
    // Set the cropped image source and download link
    image.src = dataURL;
    download.href = dataURL;
    download.download = `${sessionItem()}.png`;
    download.click();
  }

  return ChildAdd(container, [start, capture, close]);
};

export default ButtonModules;
