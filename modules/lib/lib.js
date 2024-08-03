import c from "./modules/insertChildren.js";
import b from "./modules/storageHandler.js";
import a from "./modules/startApp.js";
import d from "./modules/loadCss.js";
import e from "./modules/dragResize.js";

export const StartApp = a;
export const WorkSession = b.WorkSession;
export const LocalData = b.LocalData;
export const SessionData = b.SessionData;
export const ChildAdd = c;
export const loadCSS = d;
export const DragResize = e;

export default {
  ChildAdd,
  WorkSession,
  LocalData,
  SessionData,
  loadCSS,
  StartApp,
  DragResize,
};
