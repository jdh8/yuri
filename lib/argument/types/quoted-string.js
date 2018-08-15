module.exports = {
  name: 'string',
  validate (arg) {
    return true
  },
  transform (arg) {
    return /^['"]([^'"]*)['"]$/.test(arg) ? arg.slice(1, -1) : arg
  }
}
