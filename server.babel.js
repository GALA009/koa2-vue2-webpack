/*
 * @Author: Zhang Genmao 
 * @Date: 2017-07-19 14:08:57 
 * @Last Modified by: Zhang Genmao
 */
require("babel-core/register")({
  presets: [
    'stage-2', 
    'es2015'
  ]
});

require("babel-polyfill");

require('./bin/www');
