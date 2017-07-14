'use strict'
const router = require('express').Router();
const model = require('../models')


router.get('/', (req, res) => {
  model.Student.findAll()
  .then(data => {
    res.render('students', {data : data});
  });
});


// edit
router.get('/edit/:id', (req, res) => {
  model.Student.findAll({
    where : {
      id : req.params.id
    }
  })
  .then(data => {
    // console.log(data);
    res.render('editstudent', {data : data});
  });
});

router.post('/edit/:id', (req, res) => {
  model.Student.update({
    first_name : `${req.body.first_name}`,
    last_name : `${req.body.last_name}`,
    email : `${req.body.email}`
  }, {
    where: {
      id : `${req.params.id}`
    }
  })
  .then(() => {
    res.redirect('/students');
  });
});


// add
router.get('/addstudent', (req, res) => {
  res.render('addstudent');
});

router.post('/addstudent', (req, res) => {
  // karena isi req body (key / attribut-nya) sama jumlah dan namanya dengan table.
  // kalo demikian, bisa dipendekin jadi
  // model.Student.create(req.body)
  // .then ...
  model.Student.create({
    first_name : `${req.body.first_name}`,
    last_name : `${req.body.last_name}`,
    email : `${req.body.email}`,
    cratedAt : new Date(),
    updatedAt : new Date()
  })
  .then(() => {
    res.redirect('/students');
  })
  .catch(err => {
    console.log(err);
    res.render('addstudent', {err : err});
  })
});

// delete
router.get('/delete/:id', (req, res) => {
  model.Student.destroy({
    where: {
      id : `${req.params.id}`
    }
  })
  .then(() => {
    res.redirect('/students');
  });
});

module.exports = router;