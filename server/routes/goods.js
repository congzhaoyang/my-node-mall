let express = require('express')
let router = express.Router()
let mongoose = require('mongoose')
let Goods = require('../models/goods')

mongoose.connect('mongodb://127.0.0.1:27017/demo1')

mongoose.connection.on('connected', () => {
  console.log('db connected success')
})

mongoose.connection.on('error', () => {
  console.log('db connected fail')
})

mongoose.connection.on('disconnected', () => {
  console.log('db connected disconnected')
})

router.get('/', (req, res, next) => {
  Goods.find({}, (err, doc) => {
    if (err) {
      res.json({
        status: "1",
        msg: err.message
      })
    } else {
      res.json({
        status: "0",
        msg: '',
        result: {
          counter: doc.length,
          list: doc
        }
      })
    }
  })
})

module.exports = router