export default {
  name: 'number',
  validate (arg) {
    return !isNaN(arg)
  },
  transform: Number
}
