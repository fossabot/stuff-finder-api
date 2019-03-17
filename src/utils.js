const fill = (tpl, data) => {
  let str = '' + tpl
  Object.keys(data).forEach(key => {
    const value = data[key]
    const regex = new RegExp('{+\\s?' + key + '\\s?}+', 'ig')
    str = str.replace(regex, value)
  })
  return str
}

module.exports = { fill }
