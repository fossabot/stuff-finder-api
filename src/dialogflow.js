const fs = require('fs')
const utils = require('./utils')
const data = require('./data')
const debug = process.env.npm_package_config_debug

const answer = (text, source) => {
  return {
    fulfillmentText: text,
    fulfillmentMessages: [
      {
        text: {
          text: [text]
        }
      }
    ],
    payload: {
      google: {
        expectUserResponse: false,
        richResponse: {
          items: [
            {
              simpleResponse: {
                textToSpeech: text
              }
            }
          ]
        }
      }
    },
    source: source || 'default-source'
  }
}

async function answerToQuery (query) {
  if (!query.fulfillmentText) {
    return answer('Impossible de trouver fulfillmentText')
  }
  const object = query.parameters.object.join(' ').replace(/\B\W/gi, ' ').replace(/\s+/gi, ' ')
  if (!object) {
    return answer('Impossible de trouver object')
  }
  console.log(`user is looking for object "${object}"`)
  const record = await data.findBoxContaining(object)
  if (!record) {
    return answer(`Désolé je n'ai pas réussi à trouver l'objet "${object}".`)
  }
  const text = utils.fill(query.fulfillmentText, record)
  return answer(text)
}

async function handleRequest (request, response) {
  let body = []
  request.on('data', chunk => body.push(chunk)).on('end', async () => {
    body = Buffer.concat(body).toString()
    if (debug) {
      fs.writeFileSync('request-body-dump.debug.log', body)
    }
    if (body[0] === '{') {
      body = JSON.parse(body)
    } else {
      let message = 'dialogflow request body is not json'
      console.error(message)
      response.end(message)
    }
    const a = await answerToQuery(body.queryResult)
    response.setHeader('Content-Type', 'application/json')
    response.end(JSON.stringify(a))
  })
}

module.exports = { handleRequest }
