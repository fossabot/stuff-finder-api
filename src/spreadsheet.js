
const { google } = require('googleapis')

const creds = require('creds.json')
// console.log('using creds', creds)

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
  const rows = await sheets.spreadsheets.values.get({
    spreadsheetId: creds.spreadsheet_id,
    range: creds.spreadsheet_range
  })
  // print results
  // console.log(JSON.stringify(rows.data, null, 2))
  const records = []
  for (let [name, brand, box, drawer, category] of rows.data.values) {
    const record = { name, brand, box, drawer, category }
    records.push(record)
  }
  console.log(records.length, 'records found on spreadsheet')
  return records
}

module.exports = { fetchRecords }
