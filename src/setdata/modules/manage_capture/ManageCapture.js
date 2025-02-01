import { ChildAdd } from "../../../../modules/lib/lib.js";
import ButtonModules from "./modules/ButtonModules.js";

const ManageCapture = () => {
  const container = document.createElement("div");
  container.className = "capture-manager";
  const video = document.createElement("video");
  video.className = "video";
  video.style.width = "1080px";
  video.style.height = "1920px";
  video.autoplay = true;
  const canvas = document.createElement("canvas");
  canvas.style.display = "none";
  const image = document.createElement("img");
  image.className = "image";
  image.style.height = video.style.height;
  image.style.width = video.style.width;

  window.addEventListener("minimize", () => {
    container.style.height = "20px";
    container.style.display = "none";
  });

  window.addEventListener("maximize", () => {
    container.style.height = "334px";
    container.style.display = "flex";
  });

  return ChildAdd(container, [
    video,
    canvas,
    image,
    ButtonModules({ video, canvas, image }),
  ]);
};

export default ManageCapture;
