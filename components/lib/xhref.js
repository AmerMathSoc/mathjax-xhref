import {combineWithMathJax} from '../../node_modules/mathjax-full/mjs/components/global.js';
import {VERSION} from '../../node_modules/mathjax-full/mjs/components/version.js';

import * as module1 from '../../js/xhref.js';

if (MathJax.loader) {
  MathJax.loader.checkVersion('[ams]/xhref', VERSION, 'tex-extension');
}

combineWithMathJax({_: {
  xhref: module1
}});
