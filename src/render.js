// Turns JS objects into DOM elements
//
function render(vNode) {
  if (typeof vNode === "string") {
    return document.createTextNode(vNode);
  } else {
    return renderElement(vNode);
  }
}

function renderElement(vNode) {
  const $element = document.createElement(vNode.tagName);

  // set attributes
  for (const [key, value] of Object.entries(vNode.attributes)) {
    $element.setAttribute(key, value);
  }

  // set children
  for (const child of vNode.children) {
    const $child = render(child);
    $element.appendChild($child);
  }

  return $element;
}

export default render;
