const HeadText = ({ text = "header", tag = "h1" }) => {
  const head = document.createElement(tag);
  head.textContent = text;
  
  return head;
};

export default HeadText;
