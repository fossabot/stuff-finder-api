
const { google } = require('googleapis')

const creds = require('../creds.json')
// console.log('using creds', creds)

let records = null

// prepare oauth2 client
const auth = new google.auth.OAuth2(
  creds.client_id,
  creds.client_secret,
  'urn:ietf:wg:oauth:2.0:oob'
)

auth.setCredentials({
  access_token: 'DUMMY',
  expiry_date: 1,
  refresh_token: creds.refresh_token,
  token_type: 'Bearer'
})

async function fetchRecords () {
  // create sheets client
  const sheets = google.sheets({ version: 'v4', auth })
  // get a range of values
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: creds.spreadsheet_id,
    range: creds.spreadsheet_range
  })
  // print results
  // console.log(JSON.stringify(res.data, null, 2))
  console.log('records updated')
  records = res.data.values
}

async function findBoxContaining (object) {
  if (!records.length) {
    console.error('cannot find object without records')
    return {}
  }
  for (let [name, brand, box, drawer, category] of records) {
    // console.table({name, brand, box, drawer, category})
    // TODO : implement better search than this :p
    if (name.toLowerCase().indexOf(object) > -1) {
      return { name, brand, box, drawer, category }
    }
  }
}

module.exports = { findBoxContaining, fetchRecords }
