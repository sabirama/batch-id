const InsertChildren = (parent, childList) => {
  childList.forEach((child) => {
    parent.appendChild(child);
  });

  return parent;
};

export default InsertChildren;
