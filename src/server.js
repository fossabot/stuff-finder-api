const http = require('http')
const dialogflow = require('./dialogflow')
const port = process.env.npm_package_config_port

function onStart () {
  console.log(`server started on port ${port}`)
}

function answer (response, text) {
  console.log(text)
  response.end(text)
}

async function onRequest (request, response) {
  const host = request.headers.host

  if (request.url !== '/df-webhook') {
    return answer(response, `Api called from ${host} with non-handled route : ${request.url}`)
  }

  if (request.method !== 'POST') {
    return answer(response, `DialogFlow webhook called from ${host} with non-handled method : ${request.method}`)
  }

  console.log(`handling DialogFlow POST from ${host}`)
  dialogflow.handleRequest(request, response)
}

function start () {
  http.createServer(onRequest).listen(port, onStart)
}

module.exports = { start }
