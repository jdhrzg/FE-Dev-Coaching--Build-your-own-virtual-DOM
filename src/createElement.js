// In react and vue this is h()
//
export default (tagName, { attributes = {}, children = [] } = {}) => {
  return {
    tagName,
    attributes,
    children,
  };
};
