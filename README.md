# Markdown WYSIWYG Prototype

This is a proof of concept demonstrating a principle that is incredibly simple:

* Make a HTML `<div>` contenteditable
* When the user types in a string like `This is **bold** text`
* It automatically converts that string to "This is **bold** text"

## Innovation

The main obstacle is to prevent the cursor from always jumping to the start of the contenteditable (which causes the highlighting to fail). To avoid this, we have to:

* Get the position of the cursor *before* applying the highlighting
* Save the position of the cursor
* Then apply the highlighting via regex replacement
* And finally move the cursor *back* to the saved position

## Future Optimizations

- [x] Only run `render()` when the current line matches the bold markdown regex to improve performance, instead of every `keydown` event
- [x] Handle multiple replacements (the current `setCursorPosition()` function doesn't work so well once there are multiple replacements) - reference CodeJar's highlighting implementation for this and [pocket editor](https://codepen.io/aziis98/pen/vYOMvex)
- [ ] Improve the currently-wonky selection handler so that the cursor behaves at least relatively normally, rather than jumping around and driving me nuts. This is the hardest part, because it really stretches native `contentEditable` of browsers to the limit, but in theory this is possible - in part because it's already been done before. The issue is very similar to how syntax highlighting works in JavaScript-based text editors like [CodeJar](https://medv.io/codejar/), [CodeFlask](https://github.com/kazzkiq/CodeFlask), and [Monaco](https://github.com/microsoft/monaco-editor) (just not CodeMirror because [it's internal controls are handled differently](https://marijnhaverbeke.nl/blog/browser-input-reading.html))