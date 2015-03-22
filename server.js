// Libraries
var express     = require('express'),
    sqlite3     = require('sqlite3').verbose(),
    cors        = require('cors'), // TOOD, what's this?
    bodyParser  = require('body-parser'),
    jwt         = require('jsonwebtoken'),
    expressJwt  = require('express-jwt'),
    https       = require("https"),
    settings    = require('./bdr-settings');
    

var jwtSecret = settings.jwtSecret;
var db = new sqlite3.Database('myServer.db');

var app = express();

// Connect middleware separately 
app.use(cors());
app.use(bodyParser.json());

// Setup static serve 
var prefix = '/app/';
if(app.get('env') === 'development') {
  console.log('started development environment');
  app.use(express.static(__dirname + '/app'));
  app.use(express.static(__dirname + '/app/assets'));
  app.use(express.static(__dirname + '/.tmp'));
} else {
  console.log('started production environment');
  prefix = '/dist/';
  app.use(express.static(__dirname + '/dist'));
}



// PROTECTED
app.get('/admin', expressJwt({secret:jwtSecret}), function(err,req,res,next) {
  console.log('hello');
  if (err.name === 'UnauthorizedError') {
    // not logged in
    console.log('login required');
  }
  res.sendFile(__dirname + prefix + 'admin.html');
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

// console.log(settings.getCalendarOptions());
app.get('/api/v1/calendar', function(req, res){
  var data = '';

  https.get(settings.getCalendarOptions(), function(googRes) {
    googRes.on('data', function (chunk) {
      data = data + chunk;
    })
    .on('end', function() {
      res.send(data);
    });
    
  }).on('error', function(e) {
    res.send({error:e});
  })
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
  res.sendFile(__dirname + prefix +'index.html');
});

app.listen(8080);



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