export default {
  name: 'string',
  validate (arg) {
    return true
  },
  transform (arg) {
    return /^['`"](.*)['`"]$/.exec(arg)[1]
  }
}
