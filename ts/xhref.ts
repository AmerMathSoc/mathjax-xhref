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

import NodeUtil from '@mathjax/src/js/input/tex/NodeUtil.js';
import { Configuration } from '@mathjax/src/js/input/tex/Configuration.js';
import { CommandMap } from '@mathjax/src/js/input/tex/TokenMap.js';
import { ParseMethod } from '@mathjax/src/js/input/tex/Types.js';
import TexParser from '@mathjax/src/js/input/tex/TexParser.js';

const GetArgumentMML = function (parser: TexParser, name: string) {
    const arg = parser.ParseArg(name);
    if (!NodeUtil.isInferred(arg)) {
        return arg;
    }
    const children = NodeUtil.getChildren(arg);
    if (children.length === 1) {
        return children[0];
    }
    const mrow = parser.create('node', 'mrow');
    NodeUtil.copyChildren(arg, mrow);
    NodeUtil.copyAttributes(arg, mrow);
    return mrow;
};


let xhrefMethods: Record<string, ParseMethod> = {};

xhrefMethods.xhref = function (parser: TexParser, name: string) {
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


new CommandMap(
    'xhref-macros', {
    xhref: 'xhref',
},
    xhrefMethods
);

export const configuration = Configuration.create('xhref', {
    handler: {
        macro: ['xhref-macros'],
    },
});
