let http = require('http')
let url = require('url')
let util = require('util')
let fs = require('fs')

let server = http.createServer((req, res) => {
  // res.statusCode = 200
  // res.setHeader('content-type', 'text/plain, charset=utf-8')
  let pathname = url.parse(req.url).pathname
  console.log(pathname.substring(1))
  fs.readFile(pathname.substring(1), (err, data) => {
    if (err) {
      res.writeHead(404, {
        'Content-Type': 'text/html'
      })
    } else {
      res.writeHead(200, {
        'Content-Type': 'text/html'
      })
      res.write(data.toString())
    }
    // res.end(util.inspect(url.parse(req.url)))
    res.end()
  })
})

server.listen(3000, '127.0.0.1', () => {
  console.log('服务已启动')
})