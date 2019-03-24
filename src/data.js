const search = require('./search')
const spreadsheet = require('./spreadsheet')

async function findBoxContaining (object) {
  console.log('user search :', object)
  const records = await spreadsheet.fetchRecords()
  const results = search(object, records)
  if (results.length) {
    console.log(`search found ${results.length} record(s)`, results)
    return results[0]
  }
  console.log('search found nothing')
}

module.exports = { findBoxContaining }
