import c from "./modules/insertChildren.js";
import b from "./modules/storageHandler.js";
import a from "./modules/startApp.js";
import d from "./modules/loadCss.js";
import e from "./modules/dragResize.js";
import f from "./modules/dragElement.js";

export const StartApp = a; // load app scripts
export const WorkSession = b.WorkSession; // set, update, delete localStorage with current filename data
export const LocalData = b.LocalData; //  set, update, delete localStorage data
export const SessionData = b.SessionData; //  set, update, delete SessionStorage data
export const ChildAdd = c; // adds elements to a parent  element
export const loadCSS = d; // get css file loaded
export const DragResize = e; // attach resize to a parent element
export const DragElement = f; // change element position by dragging it around the display

export default {
  ChildAdd,
  WorkSession,
  LocalData,
  SessionData,
  loadCSS,
  StartApp,
  DragResize,
  DragElement,
};
