function loadCSS(href, element) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = href;
  if (element) {
    element.appendChild(link);
  } else {
    document.head.appendChild(link);
  }
}

export default loadCSS;
