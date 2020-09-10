/*************************************************************
 *  Copyright (c) 2018 Peter Krautzberger
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

const NodeUtil_js_1 = require('mathjax/js/input/tex/NodeUtil.js');
const Configuration_js_1 = require('mathjax/js/input/tex/Configuration.js');
const SymbolMap_js_1 = require('mathjax/js/input/tex/SymbolMap.js');

const Xhref = function (parser, name) {
  const type = parser.GetBrackets(name);
  const url = parser.GetArgument(name);
  const arg = GetArgumentMML(parser, name);
  let mpadded = parser.create('node', 'mpadded', [arg], {
    height: '+4px',
    depth: '+4px',
    width: '+4px',
    lspace: '2px',
    href: url,
    'data-ams-ref': type,
  });
  parser.Push(mpadded);
};
const GetArgumentMML = function (parser, name) {
  const arg = parser.ParseArg(name);
  if (!NodeUtil_js_1.default.isInferred(arg)) {
    return arg;
  }
  const children = NodeUtil_js_1.default.getChildren(arg);
  if (children.length === 1) {
    return children[0];
  }
  const mrow = parser.create('node', 'mrow');
  NodeUtil_js_1.default.copyChildren(arg, mrow);
  NodeUtil_js_1.default.copyAttributes(arg, mrow);
  return mrow;
};

//  Implements \xhref[type]{url}{math} with extra padding
new SymbolMap_js_1.CommandMap(
  'xhref',
  {
    xhref: 'Xhref',
  },
  { Xhref }
);
exports.HtmlConfiguration = Configuration_js_1.Configuration.create('xhref', {
  handler: { macro: ['xhref'] },
});
