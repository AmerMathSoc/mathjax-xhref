# mathjax-xhref

A custom href extension for MathJax's TeX input

## MathJax Extension: `xhref.js`

This extension implements a TeX macro `\xhref`.

```tex
\xhref[type]{url}{content}
```

In the output, this will generate `<a href="url" data-ams-ref="type">content</a>` with `5px` padding.

This macro integrates with [AmerMathSoc/texml-to-html](https://github.com/AmerMathSoc/texml-to-html/); see its documentation for more information on `data-ams-ref`.

## Using NodeJS

For example, install `@mathjax/src` and `@amermathsoc/mathjax-xhref` and use something like

```js
import { TeX } from "@mathjax/src/js/input/tex.js";
import { configuration as xhref } from "mathjax-xhref";
const tex = new TeX({
  packages: [xhref.name],
  textmacros: {
    packages: { "[+]": [xhref.name] },
  },
});
```

Note: the `textmacros` part allows the use of this macro in text-mode.

## Using a browser

For client-side use, you need load `browser/xhref.js`, e.g., from a CDN.

Follow the instructions from the MathJax documentation on [loading a third-party extensions](http://docs.mathjax.org/en/latest/web/webpack.html#loading-the-extension), e.g.,

```js
MathJax = {
  loader: {
    load: ["[xhref]/xhref.js"],
    paths: {
      xhref:
        "https://cdn.jsdelivr.net/npm/@amermathsoc/mathjax-xhref@3/browser",
    },
  },
  tex: {
    packages: { "[+]": ["xhref"] },
    textmacros: {
      packages: { "[+]": ["xhref"] },
    },
  },
};
```
