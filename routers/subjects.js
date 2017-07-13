'use strict'
const router = require('express').Router();
const model = require('../models')


router.get('/', (req, res) => {
  model.Subject.findAll()
  .then(data => {
    res.render('subjects', {data : data});
  });
});
  

module.exports = router;