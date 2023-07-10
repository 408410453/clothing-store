
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var createError = require('http-errors');
//sass
var sassMiddleware = require('node-sass-middleware');

//shop routed
var shopRouter = require('./routes/shop');

// 在shop router下方引入 mysql 模組
var mysql = require('mysql');
// 建立連線
var con = mysql.createConnection({
  host: 'localhost',
  user: 'shop',
  password: 'password',
  database: 'clothing_store'
});

con.connect(function(err) {
  if (err) {
      console.log('connecting error');
      return;
  }
  console.log('connecting success');
});



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); //抓取頁面資料
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// db state
app.use(function(req, res, next) {
  req.con = con;
  next();
});

app.use('/', shopRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




module.exports = app;
