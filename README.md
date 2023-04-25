<h1>Create React App (Javascript)</h1>

<p>
  This is project generated to serve as a reproduction starter for Storybook.
</p>

Issue: [preview > decorators causes: "Rendered more hooks than during the previous render."
#15223](https://github.com/storybookjs/storybook/issues/15223)

The problem happens when a set of timers exist with components with hooks as decorators, so I created a simpler situation that my team 
has run into.  All of the code to reproduce is in `.storybook/preview.js`. 

<a  href="https://stackblitz.com/github/storybookjs/sandboxes/tree/next/cra/default-js/after-storybook?preset=node=">
  View it in Stackblitz
</a>

<h3>Testing instructions</h3>

<p>Install dependencies:</p>
<pre>
  yarn
</pre>

<p>Run Storybook:</p>
<pre>
  yarn storybook
</pre>
