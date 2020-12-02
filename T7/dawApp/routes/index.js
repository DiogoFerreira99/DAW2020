var express = require('express');
var router = express.Router();

var Student = require('../controllers/student')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/students', function(req, res) {
  //data retrive ir buscar dados
  Student.list()
    .then( data => {
      res.render('students', { list: data });
    })
    .catch( err => {
      res.render('error', { error: err });
    })
  
});

router.get('/students/registar', function(req, res) {
  res.render('registar',{});
});

router.get('/students/editar/:id', function(req, res) {
  Student.lookUp(req.params.id)
    .then( data => {
      res.render('editar', { student: data });
    })
    .catch( err => {
      res.render('error', { error: err });
    })
});

router.get('/students/:id', function(req, res) {
  //data retrive ir buscar dados
  Student.lookUp(req.params.id)
    .then( data => {
      console.log(data)
      res.render('student', { student: data });
    })
    .catch( err => {
      res.render('error', { error: err });
    })
  
});

router.post('/students', function(req, res) {
  //data retrive ir buscar dados
  let tps= []
  tps.push(parseInt(req.body.tpc1))
  tps.push(parseInt(req.body.tpc2))
  tps.push(parseInt(req.body.tpc3))
  tps.push(parseInt(req.body.tpc4))
  tps.push(parseInt(req.body.tpc4))
  tps.push(parseInt(req.body.tpc5))
  tps.push(parseInt(req.body.tpc6))
  tps.push(parseInt(req.body.tpc7))
  tps.push(parseInt(req.body.tpc8))
  let stu = {}
  stu.numero = req.body.numero
  stu.nome = req.body.nome
  stu.git = req.body.git
  stu.tpc = tps
  console.log(stu)
  Student.insert(stu)
    .then( data => {
      console.log(data)
      res.redirect('/students')
    })
    .catch( err => {
      res.render('error', { error: err });
    })
});

router.put('/students/:id', function(req, res) {
  //data retrive ir buscar dados
  let tps= []
  tps.push(parseInt(req.body.tpc1))
  tps.push(parseInt(req.body.tpc2))
  tps.push(parseInt(req.body.tpc3))
  tps.push(parseInt(req.body.tpc4))
  tps.push(parseInt(req.body.tpc4))
  tps.push(parseInt(req.body.tpc5))
  tps.push(parseInt(req.body.tpc6))
  tps.push(parseInt(req.body.tpc7))
  tps.push(parseInt(req.body.tpc8))
  let stu = {}
  stu.numero = req.params.id
  stu.nome = req.body.nome
  stu.git = req.body.git
  stu.tpc = tps

  Student.update(stu)
    .then( data => {
      console.log(data)
      res.redirect('/students')
    })
    .catch( err => {
      res.render('error', { error: err });
    })
});

router.delete('/students/:id', function(req, res) {
  //apagar  dados
  console.log(req.body)
  Student.delete(req.params.id)
    .then(data => {
      console.log(data)
      res.redirect('/students')
    }).catch( err => {
      res.render('error', { error: err });
    })
  
});


module.exports = router;
