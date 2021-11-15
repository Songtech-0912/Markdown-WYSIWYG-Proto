"use strict";

const bold_regex = /\*\*(.*)\*\*/gim;
const bold_html = `<strong>$1<strong>`

function $get(el) {
    return document.getElementById(el);
}

// function getPosition() {
//     let sel = window.getSelection();
//     if (sel.getRangeAt) {
//         return sel.getRangeAt(0).startOffset;
//     }
// 
// }

function getPosition(editableDiv) {
    let caretPos = 0;
    let sel = window.getSelection();

    if (sel.rangeCount) {
        let range = sel.getRangeAt(0);
        if (range.commonAncestorContainer.parentNode == editableDiv) {
            caretPos = range.endOffset;
        }
    }
    return caretPos;
}

function createRange(node, chars, range) {
    if (!range) {
        range = document.createRange()
        range.selectNode(node);
        range.setStart(node, 0);
    }

    if (chars.count === 0) {
        range.setEnd(node, chars.count);
    } else if (node && chars.count > 0) {
        if (node.nodeType === Node.TEXT_NODE) {
            if (node.textContent.length < chars.count) {
                chars.count -= node.textContent.length;
            } else {
                range.setEnd(node, chars.count);
                chars.count = 0;
            }
        } else {
            for (var lp = 0; lp < node.childNodes.length; lp++) {
                range = createRange(node.childNodes[lp], chars, range);

                if (chars.count === 0) {
                    break;
                }
            }
        }
    }

    return range;
};

function setCursor(chars, textContainer) {
    if (chars >= 0) {
        let selection = window.getSelection();
        let range = createRange(textContainer.parentNode, {
            count: chars
        });

        if (range) {
            range.collapse(false);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }
};

app = $get("app");

app.addEventListener("keydown", function(event) {
    // Make enter key work - it's broken right now
    // if (event.key === "Enter") {
    //     document.execCommand("insertLineBreak");
    //     event.preventDefault();
    // }
    const caretPosition = getPosition($get("app"));
    console.log(caretPosition)
    // let newstr = app.innerText.replace(bold_regex, bold_html);
    // app.innerHTML = newstr;
    // setCursor(caretPosition, $get("app"))
})