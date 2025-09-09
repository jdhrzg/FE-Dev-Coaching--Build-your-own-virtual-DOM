This is an exercise assigned to me by my front end dev coach, meant to practice and learn about the below...

- Understand React
  - Watch Pete Hunt’s talk: https://www.youtube.com/watch?v=x7cQ3mrcKaY
  - Exercise: Build your own virtual DOM
    - No need to support JSX, use function calls instead of JSX HTML tags
    - Bonus: Compare performance of your virtual DOM vs raw DOM calls
    - Bonus: Compare performance of your virtual DOM vs React
  - Q: Was React originally designed as a library or a framework?
    - Q: In your opinion, is React more of a library or a framework today?
      - Q: How do you think this influences the way people write code?
  - Hooks
    - Q: What are the tradeoffs of functional components + hooks vs class components + lifecycle methods?
    - Q: Why does updating state with useEffect cause problems?
    - The mental model of a functional component

- After meeting 1 on this project (Shown to coach in "Attributes diff and only re-render when needed" state)
  - I need to finish the diff function.  Make sure it does the patch to the DOM in one big step (vs many small patches each doing 1 element).
  - Clean up setInterval (rerender) method, it's convoluted right now.  Use one state variable to keep track of the current state instead of passing variables around.
