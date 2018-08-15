const {trimQuotes} = require('../../util/trim-quotes')

module.exports = {
  name: 'string',
  validate (arg) {
    return true
  },
  transform (arg) {
    return trimQuotes(arg)
  }
}
