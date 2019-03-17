const http = require('http')
const data = require('./data')
const port = process.env.npm_package_config_port

function onStart () {
  console.log(`server started on port ${port}`)
}

async function onRequest (request, response) {
  response.setHeader('Content-Type', 'application/json')
  const box = await data.findBoxContaining('pile')
  response.end(JSON.stringify(box))
}

function start () {
  http.createServer(onRequest).listen(port, onStart)
}

module.exports = { start }
