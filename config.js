const path = require('path');

global.pathSep = path.sep;
global.dataPath = __dirname + pathSep + 'datas' + pathSep;
global.datasFiles = require('./datas/mainData.js').mainData;
global.dir2 = '';