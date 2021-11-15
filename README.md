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

* Only run `render()` when the current line matches the bold markdown regex to improve performance, instead of every `keydown` event