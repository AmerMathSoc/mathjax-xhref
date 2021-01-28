const mj = require('./mj');

const theBigString =
  '' +
  '$$ \\xhref[type]{https://example.com}{x=y}$$' +
  '';

console.log(mj(theBigString, true));
