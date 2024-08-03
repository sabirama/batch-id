const button = (
  { text = "btn", buttonClass = "button" },
  callBack = () => {}
) => {
  const a = document.createElement("button");
  a.textContent = text;
  a.className = buttonClass;

  callBack(a);

  return a;
};

export default button;
