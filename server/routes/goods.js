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
  let page = parseInt(req.param('page'))
  let pageSize = parseInt(req.param('pageSize'))
  let sort = parseInt(req.param('sort'))
  let skip = (page - 1) * pageSize
  let priceLevel = req.param('priceLevel')
  let priceGt = undefined
  let priceLt = undefined
  let params = {}
  if (priceLevel !== 'all') {
    switch (priceLevel) {
      case '0':
        priceGt = 0
        priceLt = 100
        break
      case '1':
        priceGt = 100
        priceLt = 500
        break
      case '2':
        priceGt = 500
        priceLt = 1000
        break
      case '3':
        priceGt = 1000
        priceLt = 5000
        break
      default:
        break;
    }
    params = {
      salePrice: {
        $gt: priceGt,
        $lt: priceLt,
      }
    }
  }
  let goodsModel = Goods.find(params).skip(skip).limit(pageSize)
  goodsModel.sort({ 'salePrice': sort })
  goodsModel.exec((err, doc) => {
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