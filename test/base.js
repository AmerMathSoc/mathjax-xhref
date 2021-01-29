const fs = require('fs');
const mj = require('./mj');

const theBigString =
  '' +
  '$$ \\xhref[type]{https://example.com}{x=y}$$' +
  '$$ \\text{\\xhref[type]{https://example.com}{x=y}} $$' +
  '';

fs.writeFileSync(__dirname+'/test.html' ,mj(theBigString, true));
