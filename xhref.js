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

MathJax.Extension['TeX/xhref'] = {
  version: '1.0.1'
};

MathJax.Hub.Register.StartupHook('TeX Jax Ready', function() {
  var TEX = MathJax.InputJax.TeX,
    MML = MathJax.ElementJax.mml;
  var TEXDEF = TEX.Definitions;

  TEXDEF.Add(
    {
      macros: {
        xhref: 'xhref'
      }
    },
    null,
    true
  );

  TEX.Parse.Augment({
    //
    //  Implements \xhref[type]{url}{math} with extra padding
    //
    xhref: function(name) {
      var type = this.GetBrackets(name),
        url = this.GetArgument(name),
        arg = this.GetArgumentMML(name);
      arg = MML
        .mpadded(arg)
        .With({
          href: url,
          attr: { 'data-ams-ref': type },
          attrNames: [
            'data-ams-ref',
            'href',
            'height',
            'depth',
            'width',
            'lspace'
          ],
          height: '+4px',
          depth: '+4px',
          width: '+4px',
          lspace: '2px'
        });
      this.Push(arg);
    },
    //
    //  returns an argument that is a single MathML element
    //  (in an mrow if necessary)
    //
    GetArgumentMML: function(name) {
      var arg = this.ParseArg(name);
      if (arg.inferred && arg.data.length == 1) {
        arg = arg.data[0];
      } else {
        delete arg.inferred;
      }
      return arg;
    }
  });

  MathJax.Hub.Startup.signal.Post('TeX HTML Ready');
});

MathJax.Callback.Queue(['loadComplete', MathJax.Ajax, '[xhref]/xhref.js']);
