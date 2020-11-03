/* eslint-disable no-undef */
var express = require('express');
var router = express.Router();

/* GET /change-locale/:locale */
// eslint-disable-next-line no-unused-vars
router.get('/:locale', function(req, res, next) {
  // assing the locale sent by parameter
  const locale = req.params.locale;

  // save the origin of the request
  const returnTo = req.get('referer');

  // return the cookie in the response with the new locale
  res.cookie('nodeapi-locale', locale, { maxAge: 1000 * 60 * 60 * 24 * 20 });

  // redirect user to the original page
  res.redirect(returnTo);
});

module.exports = router;
