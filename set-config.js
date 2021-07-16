'use strict';

/* This script updates env.js with deployment environment variables. */

const replace = require('replace');

doReplace('GOOGLE_MAPS_API_KEY', process.env.GOOGLE_MAPS_API_KEY);

function doReplace(key, value) {
  const regex = key + ' = \'.*\'';
  const replacement = key + ' = \''+ value +'\'';

  replace({
    regex: regex,
    replacement: replacement,
    paths: [`${__dirname}/dist/client/build/js/env.js`]
  });
}