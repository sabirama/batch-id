import a from "./modules/add.js";
import b from "./modules/button.js";
import c from "./modules/headText.js";
import d from "./modules/minimize.js";
import e from "./modules/modal.js";

export const Add = a; //Create a button to add elements or create onclick events to a container
export const Button = b; // Creates  custom button
export const HeadText = c; // update document title
export const Minimize = d; // creates a button to hide or unhide element
export const Modal = e; // create alert/notification message containers

export default { Add, Button, HeadText, Minimize, Modal };
