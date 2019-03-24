
const Fuse = require('fuse.js')

const fuseConf = {
  shouldSort: true,
  includeScore: false,
  threshold: 0.4,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [{
    name: 'name',
    weight: 0.8
  }, {
    name: 'brand',
    weight: 0.2
  }]
}

function search (str, records) {
  const fuse = new Fuse(records, fuseConf)
  return fuse.search(str)
}

module.exports = search
