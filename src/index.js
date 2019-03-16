const http = require('http')
const port = 1664

http.createServer(function (req, res) {
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({ hello: 'world' }))
}).listen(port, function () {
  console.log(`server start at port ${port}`)
})
