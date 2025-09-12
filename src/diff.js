import render from "./render.js";

const diff = (vOldNode, vNewNode) => {
  if (vNewNode === undefined) {
    return ($node) => {
      $node.remove();
      return undefined;
    };
  }

  if (typeof vOldNode === "string" || typeof vNewNode === "string") {
    if (vOldNode != vNewNode) {
      return ($node) => {
        const $newNode = render(vNewNode);
        $node.replaceWith($newNode);
        return $newNode;
      };
    } else {
      return ($node) => undefined;
    }
  }

  if (vOldNode.tagName != vNewNode.tagName) {
    return ($node) => {
      const $newNode = render(vNewNode);
      $node.replaceWith($newNode);
      return $newNode;
    };
  }

  const patchAttributes = diffAttributes(
    vOldNode.attributes,
    vNewNode.attributes
  );
  const patchChildren = diffChildren(vOldNode.children, vNewNode.children);

  return ($node) => {
    patchAttributes($node);
    patchChildren($node);
    return $node;
  };
};

const diffAttributes = (oldAttributes, newAttributes) => {
  const patches = [];

  for (const [k, v] of Object.entries(newAttributes)) {
    patches.push(($node) => {
      $node.setAttribute(k, v);
      return $node;
    });
  }

  for (const k in oldAttributes) {
    if (!(k in newAttributes)) {
      patches.push(($node) => {
        $node.removeAttribute(k);
        return $node;
      });
    }
  }

  return ($node) => {
    for (const patch of patches) {
      patch($node);
    }
  };
};

// This is removing everything
const diffChildren = (oldChildren, newChildren) => {
  const patches = [];

  for (let i = 0; i < Math.min(oldChildren.length, newChildren.length); i++) {
    patches.push(diff(oldChildren[i], newChildren[i]));
  }

  if (oldChildren.length > newChildren.length) {
    for (let i = newChildren.length - 1; i < oldChildren.length; i++) {
      patches.push(($node) => {
        $node.children.push(render(oldChildren[i]));
      });
    }
  }

  if (newChildren.length > oldChildren.length) {
    for (let i = oldChildren.length - 1; i < newChildren.length; i++) {
      patches.push(($node) => {
        $node.children.push(render(newChildren[i]));
      });
    }
  }

  return ($node) => {
    for (const patch of patches) {
      patch($node);
    }
  };
};

export default diff;
