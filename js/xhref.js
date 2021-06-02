"use strict";
/*!
 *  Copyright (c) 2020 American Mathematical Society
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.configuration = void 0;
var NodeUtil_js_1 = require("mathjax-full/js/input/tex/NodeUtil.js");
var Configuration_js_1 = require("mathjax-full/js/input/tex/Configuration.js");
var SymbolMap_js_1 = require("mathjax-full/js/input/tex/SymbolMap.js");
var TextMacrosConfiguration_1 = require("mathjax-full/js/input/tex/textmacros/TextMacrosConfiguration");
var GetArgumentMML = function (parser, name) {
    var arg = parser.ParseArg(name);
    if (!NodeUtil_js_1.default.isInferred(arg)) {
        return arg;
    }
    var children = NodeUtil_js_1.default.getChildren(arg);
    if (children.length === 1) {
        return children[0];
    }
    var mrow = parser.create('node', 'mrow');
    NodeUtil_js_1.default.copyChildren(arg, mrow);
    NodeUtil_js_1.default.copyAttributes(arg, mrow);
    return mrow;
};
var xhrefMethods = {};
xhrefMethods.xhref = function (parser, name) {
    var type = parser.GetBrackets(name);
    var url = parser.GetArgument(name);
    var arg = GetArgumentMML(parser, name);
    var mpadded = parser.create('node', 'mpadded', [arg], {
        height: '+4px',
        depth: '+4px',
        width: '+4px',
        lspace: '2px',
        href: url,
        'data-ams-ref': type,
    });
    parser.Push(mpadded);
};
new SymbolMap_js_1.CommandMap('xhref-macros', {
    xhref: 'xhref',
}, xhrefMethods);
TextMacrosConfiguration_1.TextBaseConfiguration.handler.macro.unshift('xhref-macros');
exports.configuration = Configuration_js_1.Configuration.create('xhref', {
    handler: {
        macro: ['xhref-macros'],
    },
});
//# sourceMappingURL=xhref.js.map