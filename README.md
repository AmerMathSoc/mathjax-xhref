# mathjax-xhref

MathJax TeX extension to provide customized hyperlinks.

## MathJax Extension: `xhref.js`

This extension implements a TeX macro `\xhref`.

## Usage:

    \xhref[type]{url}{content}

In the output, this will generate an `<a href="url" data-jats="type">` and additionally put `5px` padding around the child expression (using MathML's `mpadded`).
