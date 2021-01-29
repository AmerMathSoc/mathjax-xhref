const { mathjax } = require('mathjax-full/js/mathjax.js');
const { TeX } = require('mathjax-full/js/input/tex.js');
const { SVG } = require('mathjax-full/js/output/svg.js');
const { liteAdaptor } = require('mathjax-full/js/adaptors/liteAdaptor.js');
const { RegisterHTMLHandler } = require('mathjax-full/js/handlers/html.js');

const {
  BaseConfiguration,
} = require('mathjax-full/js/input/tex/base/BaseConfiguration.js');
const {
  textBase,
} = require('mathjax-full/js/input/tex/textmacros/TextMacrosConfiguration.js'); // NOTE no name cf. mathjax/MathJax#2623

const xhref = require('../js/xhref.js').configuration;

const adaptor = liteAdaptor();
RegisterHTMLHandler(adaptor);

const tex = new TeX({
  packages: [BaseConfiguration.name, 'textmacros', xhref.name], // NOTE 'textmacros', cf note above on
});

const svg = new SVG({
  fontCache: 'global',
  displayAlign: 'left',
  displayIndent: '0',
});

module.exports = (documentstring) => {
  const mj = mathjax.document(documentstring, {
    InputJax: tex,
    OutputJax: svg,
  });
  mj.render();
  return (
    adaptor.doctype(mj.document) + adaptor.outerHTML(adaptor.root(mj.document))
  );
};
