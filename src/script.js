// "$" variables represent dom variables

import createElement from "./createElement.js";
import render from "./render.js";
import mount from "./mount.js";

const createVApp = (count) =>
  createElement("div", {
    attributes: {
      id: "app",
      dataCount: count,
    },
    children: [
      createElement("input"),
      String(count),
      createElement("img", {
        attributes: {
          alt: "Jerry",
          src: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHMxazBsYmZ5ZWZqcHh2Ym1tdWp4eWJjNnpmeDlteWNhbnVmbXcwNCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/OhFuOJn2rbLsA/giphy.gif",
        },
      }),
    ],
  });

let count = 0;
const vApp = createVApp(count);
const $app = render(vApp);

let $rootElement = mount($app, document.getElementById("main"));

setInterval(() => {
  count++;
  $rootElement = mount(render(createVApp(count)), $rootElement);
}, 1000);

console.log($app);
