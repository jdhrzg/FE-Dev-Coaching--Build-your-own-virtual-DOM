# Build your own virtual DOM

Click here to see the result of this exercise   
https://jdhrzg.github.io/FE-Dev-Coaching--Build-your-own-virtual-DOM/src/

This is an exercise that was assigned to me by my front end development coach.  
The goal of the exercise is to understand React at a deeper level, specifically understand how the virtual DOM works (one of React's most important features).

I started by watching this video to learn about React's virtual DOM and the benefits it provides.  
https://www.youtube.com/watch?v=x7cQ3mrcKaY

Then I watched a few more videos and read some articles to learn how others have approached creating a DIY virtual DOM.

This is my own virtual DOM who...
- The first time the app runs it:
  - Builds a virtual DOM tree out of JS objects
  - Renders that tree (turns JS elements into DOM elements)
  - Mounts those DOM elements to the "main" div in the physical DOM
- After that first-time-render it begins it's 1 second refresh loop.  In that refresh loop it:
  - Makes changes to the app via the JS Object virtual DOM tree (increments the refresh counter)
  - Runs through a diff function that checks the entire virtual DOM tree for changes.
    - If an element, it's attributes, or it's children have changed then a patch is built and will be applied to the physical DOM.
    - If there were no changes to the element, it's attributes, or it's children then the DOM node is left alone and is not rerendered or anything.

Below is a gif showing off how the VDOM works.  Notice...
- How the gif in the VDOM is not being force-refreshed at 1 second, it runs it's whole cycle because that element does not change from refresh to refresh.
  - That proves the diff function is working propertly and it's only rerendering things that have changed.
- How I can type into the searchbox and my search is not cleared from refresh to refresh, again the proves the diff and rerender logic is working.
- How the refresh count keeps changing every second, and the "is divisible by 5" label changes accordingly.
  - So if elements ARE changing, they are rerendered and refreshed as necessary.
![Demo3](https://github.com/user-attachments/assets/c914dbe1-6d27-4df9-819f-be7cb5d83ece)

