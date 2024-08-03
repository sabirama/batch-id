import {
  ChildAdd,
  WorkSession,
  DragResize,
} from "../../../../modules/lib/lib.js";
import { Minimize } from "../../../../modules/utils/utils.js";
import Headers from "./modules/Headers.js";
import ItemRow from "./modules/ItemRow.js";

const ItemListing = () => {
  const container = document.createElement("div");
  container.className = "listing";
  const cellSpan = 1;
  const cellWidth = 100;
  const objects = WorkSession.get();

  const element = ChildAdd(container, [
    Minimize(container, "auto", true),
    Headers({ cellSpan: cellSpan, cellWidth }),
    ItemRow({ objects, cellSpan: cellSpan, cellWidth }),
  ]);
  DragResize(container);

  return element;
};

export default ItemListing;
