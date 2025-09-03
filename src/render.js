export default (vNode) => {
  const $element = document.createElement(vNode.tagName);

  for (const [key, value] of Object.entries(vNode.attributes)) {
    $element.setAttribute(key, value);
  }
};
