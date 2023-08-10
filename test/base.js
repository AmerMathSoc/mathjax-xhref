import * as fs from 'node:fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

import { mj } from './mj.js';

const theBigString =
  '' +
  '$$ \\xhref[type]{https://example.com}{x=y}$$' +
  '$$ \\text{\\xhref[type]{https://example.com}{x=y}} $$' +
  '';

fs.writeFileSync(__dirname + '/test.html', mj(theBigString, true));
