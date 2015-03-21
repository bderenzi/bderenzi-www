// Libraries
var express     = require('express'),
    sqlite3     = require('sqlite3').verbose(),
    cors        = require('cors'), // TOOD, what's this?
    bodyParser  = require('body-parser'),
    jwt         = require('jsonwebtoken'),
    expressJwt  = require('express-jwt'),
    settings    = require('./bdr-settings');
    

var jwtSecret = settings.jwtSecret;
var db = new sqlite3.Database('myServer.db');

var app = express();

// Connect middleware separately 
app.use(cors());
app.use(bodyParser.json());
// url encoding
// app.use(express.urlencoded());
// gzip
// app.use(express.compress());

// Setup static serve 
app.use(express.static(__dirname + '/app'));
app.use(express.static(__dirname + '/app/assets'));
app.use(express.static(__dirname + '/.tmp'));



// PROTECTED
app.get('/admin', expressJwt({secret:jwtSecret}), function(err,req,res,next) {
  console.log('hello');
  if (err.name === 'UnauthorizedError') {
    // not logged in
    console.log('login required');
  }
  res.sendFile(__dirname + '/app/admin.html');
});


// API
// PROTECTED
app.get('/api/v1/me', expressJwt({secret:jwtSecret}), function(req, res){
  res.send(req.user);
});

app.post('/api/v1/login', authenticate, function (req, res) {
  var token = jwt.sign({
    username: req.body.username,
  }, jwtSecret);
  res.send({user: {username: req.body.username}, token: token});
});

app.get('/api/v1/calendar', function(req, res){
  res.sendFile(__dirname + '/events.json');
});


app.get('/api/v1/publication', function(req, res){
  db.all('select * from "publications"', function(err, row) {
    if(err !== null) {
      next(err);
    } else {
      res.json(row)
    }
  });
});


// Send the rest to angular
app.get('*', function (req, res) {
  res.sendFile(__dirname + '/app/index.html');
});

app.listen(2300);



// UTIL FNs
function authenticate (req, res, next) {
  var body = req.body;

  if(!body.username || !body.password) {
    res.status(400).end('Must provide both a username and password');
  }

  db.all('select * from "users" where username="' + body.username +'"', function(err,row) {
    if(err !== null || row.length != 1) {
      res.status(401).end('Username or password incorrect');
    } else {
      next();
    }
  });
}