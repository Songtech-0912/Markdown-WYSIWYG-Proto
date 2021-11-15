"use strict";

const bold_regex = /\*\*(.+?)\*\*/gmi;
const bold_html = "**<strong>$1</strong>**";

function $get(el) {
    return document.getElementById(el);
}

// This function rose from black magic
// from the dark arts of the wizard Zserge,
// consulted by the ancient ocultic texts
// from https://zserge.com/posts/js-editor/
function getCursorPosition(el) {
  const range = window.getSelection().getRangeAt(0);
  const prefix = range.cloneRange();
  prefix.selectNodeContents(el);
  prefix.setEnd(range.endContainer, range.endOffset);
  return prefix.toString().length;
}

// This function rose from black magic
// from the dark arts of the wizard Zserge,
// consulted by the ancient ocultic texts
// from https://zserge.com/posts/js-editor/
function setCursorPosition(pos, parent) {
  for (const node of parent.childNodes) {
    if (node.nodeType == Node.TEXT_NODE) {
      if (node.length >= pos) {
        const range = document.createRange();
        const sel = window.getSelection();
        range.setStart(node, pos);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
        return -1;
      } else {
        pos = pos - node.length;
      }
    } else {
      pos = setCursorPosition(pos, node);
      if (pos < 0) {
        return pos;
      }
    }
  }
  return pos;
}

/*
  The current issue is that for some reason, the regex replace likes to
  add a new line every time the regex is run.

  This messes up the highlighting.
*/

function debug() {
  console.log($get("app").innerText);
}

function render(el) {
  let newstr = el.innerText.replace(bold_regex, bold_html);
  el.innerHTML = newstr;
}

$get("app").addEventListener("keyup", function(event) {
    if (app.innerText.match(bold_regex)) {
        // let caret = new VanillaCaret($get("app"));
        // const caretPosition = caret.getPos();
        let caretPosition = getCursorPosition($get("app"))
        console.log(caretPosition)
        render(el)
        setCursorPosition(caretPosition, $get("app"))
    } else {
        console.log("Not invoked.")
    }
})