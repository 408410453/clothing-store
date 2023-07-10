var express = require('express');
var router = express.Router();

// get home page
router.get('/', function(req, res, next) {
  var db = req.con;
  var data = "";
  db.query('SELECT * FROM item',function(err,rows){
    if(err){
      console.log(err);
    }
    var data = rows;
    res.render('shop', { 
      title: 'shop',
      data:data
      });
  });
});

//get cart page
router.get('/cart', function(req, res, next) {
  var db = req.con;
  var data = "";
  db.query('SELECT * FROM cart',function(err,rows){
    if(err){
      console.log(err);
    }
    var data = rows;
    res.render('cart', { 
      title: 'cart',
      data:data
      });
  });
});

//insert data
router.post('/cart',function(req, res, next) {
  var db = req.con;
    var sql = {
        name: req.body.name,
        intro: req.body.intro,
        price: req.body.price
    };
    //console.log(sql);
    var qur = db.query('INSERT INTO cart SET ?',sql, function(err, rows) {
      if (err) {
          console.log(err);
      }else{
        console.log("insert success");
      }
      res.setHeader('Content-Type', 'application/json');
      res.redirect('/cart');
  });

});

//delete data
router.get('/cart/:name',function(req, res, next) {
  var name = req.params.name; 
  var db = req.con;

  var qur = db.query('DELETE FROM cart WHERE name = ?', name, function(err, rows) {
      if (err) {
          console.log(err);
      }else{
        console.log("delete success");
      }
      res.redirect('/cart');
  });

});

module.exports = router;
