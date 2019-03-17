const data = require('./data')
const server = require('./server')

data.fetchRecords()
server.start()
