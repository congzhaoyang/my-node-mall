var express = require('express');
var router = express.Router();
let User = require('../models/user')
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/test', function (req, res, next) {
  res.send('test');
});

router.get('/checkLogin', (req, res, next) => {
  if (req.cookies.userId) {
    res.json({
      status: '0',
      msg: '',
      result: req.cookies.userName || ''
    })
  } else {
    res.json({
      status: '1',
      msg: '未登录',
      result: ''
    })
  }
})

router.post('/login', (req, res, next) => {
  let param = {
    userName: req.body.userName,
    userPwd: req.body.userPwd,
  }
  User.findOne(param, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.msg
      })
    } else {
      if (doc) {
        res.cookie('userId', doc.userId, {
          path: '/',
          maxAge: 1000 * 60 * 60,
        })
        res.cookie('userName', doc.userName, {
          path: '/',
          maxAge: 1000 * 60 * 600,
        })
        res.json({
          status: 0,
          msg: '',
          result: {
            userName: doc.userName
          }
        })
      }
    }
  })
})

router.get('/cartList', (req, res, next) => {
  let userId1 = req.cookies.userId
  // let userId = '100000077'
  console.log(req.cookies.userId)
  console.log(userId1)
  console.log(typeof (userId1))
  User.findOne({ userId: '100000077' }, (err, doc) => {
    if (err) {
      res.json({
        status: '0',
        msg: err.message,
        result: '',
      })
    } else {
      if (doc) {
        res.json({
          status: '1',
          msg: '',
          result: doc.cartList,
        })
      }
    }
  })
})



router.get('/getCartCount', (req, res, next) => {
  if (req.cookies && req.cookies.userId) {
    let userId = req.cookies.userId
    User.findOne({ userId: '100000077' }, (err, doc) => {
      if (err) {
        res.json({
          status: '0',
          msg: err.message
        })
      } else {
        let cartList = doc.cartList;
        let cartCount = 0;
        cartList.map(function (item) {
          if (item.productNum) {
            cartCount += parseFloat(item.productNum);
          }
          console.log(cartCount)
        });
        setTimeout(() => {
          res.json({
            status: "0",
            msg: "",
            result: cartCount
          });
        }, 100);
      }
    })
  }
})


module.exports = router;
