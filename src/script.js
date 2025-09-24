import createElement from "./createElement.js";
import render from "./render.js";
import mount from "./mount.js";
import diff from "./diff.js";

const App = (drawCount) =>
  createElement("div", {
    attributes: {
      id: "app",
      dataCount: drawCount,
    },
    children: [
      createElement("input"),
      String(drawCount),
      createElement("img", {
        attributes: {
          alt: "Jerry",
          src: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHMxazBsYmZ5ZWZqcHh2Ym1tdWp4eWJjNnpmeDlteWNhbnVmbXcwNCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/OhFuOJn2rbLsA/giphy.gif",
        },
      }),
      createElement("button", {
        attributes: {
          onClick: () => {
            drawCount = 0;
          },
        },
        children: [String("button")],
      }),
    ],
  });

let drawCount = 0;

// Create JS objects that represent our virtual DOM
let vApp = App(drawCount);

// Turn those JS objects into DOM elements
//   "$" variables represent DOM element variables
const $app = render(vApp);

// Find and replace div whose id = "main" with our DOM elements
let $rootDOMElement = mount($app, document.getElementById("main"));

// Make a change, re-build and re-draw (via replacement of elements who have changed) the app every second
//   (React doesn't do this but it shows how our diff works easily)
setInterval(() => {
  drawCount++;

  // Make changes to the App
  const newVApp = App(drawCount);

  // Figure out what changed
  const patch = diff(vApp, newVApp);

  // Make only the necessary changes
  $rootDOMElement = patch($rootDOMElement);

  // Keep a copy of the changed App for next iteration
  vApp = newVApp;
}, 1000);

console.log($app);
