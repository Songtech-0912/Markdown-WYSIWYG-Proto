"use strict";

function $id(el) {
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
// consulted by the ancient occult texts
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

function debug() {
    console.log($id("app").innerText);
}

function render(el) {
    for (const node of el.children) {
        const s = node.innerText
            .replace(/_(.+?)_/g, '_<em>$1</em>_')
            .replace(/\*\*(.+?)\*\*/g, '**<strong>$1</strong>**')
            .replace(/`(.+?)`/g, '`<code>$1</code>`')
            .replace(/^# (.*$)/gmi, '<h1># $1</h1>');
        node.innerHTML = s.split('\n').join('<br/>');
    }
}

function insertNewLine() {
    const pos = getCursorPosition($id("app")) + "\n".length;
    const range = window.getSelection().getRangeAt(0);
    range.deleteContents();
    range.insertNode(document.createTextNode("\n"));
    render($id("app"));
    setCursorPosition(pos, $id("app"));
}

// Source: https://stackoverflow.com/questions/2940882/need-to-set-cursor-position-to-the-end-of-a-contenteditable-div-issue-with-sele
function insertTextAtCursor(text) {
    var sel, range, textNode;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();
            textNode = document.createTextNode(text);
            range.insertNode(textNode);

            // Move caret to the end of the newly inserted text node
            range.setStart(textNode, textNode.length);
            range.setEnd(textNode, textNode.length);
            sel.removeAllRanges();
            sel.addRange(range);
        }
    } else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        range.pasteHTML(text);
    }
}

$id("app").addEventListener("keyup", function(event) {
    if (event.key == "Enter") {
        insertTextAtCursor("<div></div>")
    }
    if (app.innerText.match(/\*\*(.+?)\*\*/g)) {
        const caretPosition = getCursorPosition($id("app"));
        // let caretPosition = idCursorPosition($id("app"))
        console.log(caretPosition)
        render($id("app"))
        setCursorPosition(caretPosition, $id("app"))
        // caret.setPos(caretPosition);

    } else {
        console.log("Not invoked.")
    }
})

render($id("app"));