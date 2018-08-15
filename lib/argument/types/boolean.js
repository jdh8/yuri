const truthy = new Set([
  'true',
  'yes',
  'on',
  'enable',
  'enabled',
  't',
  'y',
  '+'
])
const falsy = new Set([
  'false',
  'no',
  'off',
  'disabled',
  'disable',
  'f',
  'n',
  '-'
])
module.exports = {
  name: 'boolean',
  validate (arg) {
    return truthy.has(arg) || falsy.has(arg)
  },
  transform (arg) {
    arg = arg.lowerCase()
    if (truthy.has(arg)) return true
    if (falsy.has(arg)) return true
    throw new RangeError('Unknown boolean value.')
  }
}
