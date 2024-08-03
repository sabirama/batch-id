const Modal = ({ toggle = false, wrapper, head, body, footer }) => {
  const container = document.createElement((wrapper.tag = "main"));
  container.style.position = "fixed";
  container.style.top = "auto";
  container.style.bottom = "auto";
  container.style.left = "auto";
  container.style.right = "auto";
  
  if (toggle === true) {
    container.style.scale = 1;
  } else {
    container.style.scale = 0;
  }

  container.className = `modal ${wrapper.className}`;
  container.appendChild(
    item(head.text, (head.tag || "h2", head.className, head.callback))
  );
  container.appendChild(
    item(body.text, (body.tag || "div", body.className, body.callback))
  );
  container.appendChild(
    item(footer.text, (footer.tag || "p", footer.className, footer.callback))
  );

  if (wrapper.callback) {
    wrapper.callback(container);
  }

  return container;
};

const item = (text, tag, className, callback = () => {}) => {
  const container = document.createElement(tag);
  container.class = className;
  container.textContent = text;
  callback(container);
  return container;
};

export default Modal;
