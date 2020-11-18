/* eslint-disable no-undef */
'use strict';

const i18n = require('i18n');
const path = require('path');

i18n.configure({
  locales: ['en', 'es'],
  directory: path.join(__dirname, '..', 'locales'),
  defaultLocale: 'en',
  autoReload: true, // reload language files if change
  syncFiles: true, // create literals in all languages at once
  cookie: 'nodeapi-locale',
});

// for scripting use of i18n
i18n.setLocale('en');

module.exports = i18n;