const express = require('express');
const app = express();
const port = 8080;
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/user');
const Mgr = require('./models/mgr');
const { error } = require('node:console');
const router = require('express').Router();


mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/beadDb");

mongoose.connection.on('connected', () => {
  console.log('connection established');
});

mongoose.connection.on('error', (err) => {
  if (err) {
    console.log('error in connection: ' + err);
  }
});

router.post('/addUser', (req, res) => {
  const user = new User();
  user.username = req.body.username;
  user.password = req.body.password;

  user.save(req.body, (error, data) => {
    if (error) {
      console.log(error)
    }
    else {
      res.json(data)
    }
  });
});

router.get('/getAllUsers', (req, res) => {
  User.find({})
    .exec(function (err, users) {
      if (err) {
        console.log(err);
      }
      else {
        res.json(users);
      }
    });
});

router.get('/getAllMgrs', (res, req, next) => {
  Mgr.find({})
    .exec(function (err, mgrs) {
      if (err) {
        console.log(err);
      }
      else {
        res.json(mgrs);
      }
    });
});

router.post('/addMgr', (req, res) => {

  const mgr = new Mgr();
  mgr.name = req.body.name;
  mgr.owner = req.body.owner;
  mgr.grade = req.body.grade;

  mgr.save(req.body, (err, data) => {
    if (err) {
      console.log(err);
    }
    else {
      res.json(data);
    }
  });
});

router.delete('/delete/:id', function (req, res) {
  console.log(req.params.id);
  Mgr.findOneAndRemove({ _id: req.params.id }, function (err, mgr) {
    if (err) {
      console.log(err);
    }
    else {
      console.log(mgr);
      res.json(mgr);
    }
  });
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use('', router);
app.listen(port, () => {
  console.log("Server listening on " + port);
});
