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

  // Case: Old or New has duplicate attrs
  let oldAttrsByKey = new Map(
    Object.entries(JSON.parse(JSON.stringify(oldAttributes)))
  );
  let newAttrsByKey = new Map(
    Object.entries(JSON.parse(JSON.stringify(newAttributes)))
  );

  // Case: New has different attr value
  let matchingAttrKeys = [];
  for (let oldAttr of oldAttrsByKey) {
    // Does this attr exist in new and old?...
    var matchingNewAttrValue = newAttrsByKey.get(oldAttr[0]);

    if (matchingNewAttrValue !== undefined) {
      // ...Yes, keep track of that for later.
      matchingAttrKeys.push(oldAttr[0]);

      // If old attr and matching new attr differ in value then patch in new value
      if (oldAttr[1] !== matchingNewAttrValue) {
        patches.push(($node) => {
          $node.setAttribute(oldAttr[0], matchingNewAttrValue);
          return $node;
        });
      }

      // Remove old attr even if value didn't change in new, more on that later.
      oldAttrsByKey.delete(oldAttr[0]);
    }
  }

  // Case: Old has attrs left after checking new for matches, remove them
  if (oldAttrsByKey.length > 0) {
    for (let oldAttr of oldAttrsByKey) {
      patches.push(($node) => {
        $node.removeAttribute(oldAttr[0]);
        return $node;
      });
    }
  }

  // Case: New has attrs that were not covered in matching logic, so they are brand new, patch them in
  for (var newAttr of newAttrsByKey) {
    let matchingMatchAttr = matchingAttrKeys.find((x) => x == newAttr[0]);
    if (matchingMatchAttr === undefined) {
      patches.push(($node) => {
        $node.setAttribute(newAttr[0], newAttr[1]);
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

const diffChildren = (oldChildren, newChildren) => {
  const childPatches = [];
  const additivePatches = [];

  for (let i = 0; i < Math.min(oldChildren.length, newChildren.length); i++) {
    childPatches.push(diff(oldChildren[i], newChildren[i]));
  }

  if (oldChildren.length > newChildren.length) {
    for (let i = newChildren.length - 1; i < oldChildren.length; i++) {
      additivePatches.push(($node) => {
        $node.children.push(render(oldChildren[i]));
      });
    }
  }

  if (newChildren.length > oldChildren.length) {
    for (let i = oldChildren.length - 1; i < newChildren.length; i++) {
      additivePatches.push(($node) => {
        $node.children.push(render(newChildren[i]));
      });
    }
  }

  return ($parent) => {
    for (let i = 0; i < childPatches.length; i++) {
      childPatches[i]($parent.childNodes[i]);
    }

    for (additivePatch in additivePatches) {
      additivePatch($parent);
    }

    return $parent;
  };
};

export default diff;
