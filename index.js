require('ignore-styles');
require('babel-register');

process.env.BABEL_ENV = 'node';
require('./src/server');