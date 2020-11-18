'use strict';

/* eslint-disable no-undef */
var express = require('express');
var router = express.Router();
const Advertisement = require('../models/Advertisement');

//Folders paths
const imgFolder = 'images/';

router.get('/', async function(req, res, next) {
  try {
  
    const advertisements = await Advertisement.list();
    res.render('index', { title: 'Nodepop', ads: advertisements, imgFolder: imgFolder });
  
  } catch(err) {
    next(err);  
  }
});

module.exports = router;
