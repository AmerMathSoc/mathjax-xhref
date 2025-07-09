import { mathjax } from '@mathjax/src/js/mathjax.js';
import { TeX } from '@mathjax/src/js/input/tex.js';
import { SVG } from '@mathjax/src/js/output/svg.js';
import { liteAdaptor } from '@mathjax/src/js/adaptors/liteAdaptor.js';
import { RegisterHTMLHandler } from '@mathjax/src/js/handlers/html.js';

import { BaseConfiguration } from '@mathjax/src/js/input/tex/base/BaseConfiguration.js'; // 

import { configuration as xhref } from '../js/xhref.js';
import { TextMacrosConfiguration as textmacros } from '@mathjax/src/js/input/tex/textmacros/TextMacrosConfiguration.js';

const adaptor = liteAdaptor();
RegisterHTMLHandler(adaptor);

const tex = new TeX({
  packages: [BaseConfiguration.name, textmacros.name, xhref.name],
  textmacros: {
    packages: {'[+]': [xhref.name]}
  }
});

const svg = new SVG({
  fontCache: 'global',
  displayAlign: 'left',
  displayIndent: '0',
});

export const mj = (documentstring) => {
  const mj = mathjax.document(documentstring, {
    InputJax: tex,
    OutputJax: svg,
  });
  mj.render();
  return (
    adaptor.doctype(mj.document) + adaptor.outerHTML(adaptor.root(mj.document))
  );
};
