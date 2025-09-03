// $ variables represent dom variables

import createElement from "./createElement.js";
import render from "./render.js";

const vApp = createElement("div", {
  attributes: {
    id: "app",
  },
  children: [],
});

const $app = render(vApp);

console.log($app);
