const add = ({
  text = "+",
  parent = null,
  child = null,
  className = "add btn",
  handler = () => {},
}) => {
  const a = document.createElement("button");

  const appendNewChild = () => {
    const b = child?.cloneNode(true);
    parent?.appendChild(b);
    handler( a, b );
  };

  a.textContent = text;
  a.className = className;
  a?.addEventListener("click", appendNewChild);

  return a;
};

export default add;
