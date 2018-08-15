function stripQuotes (string) {
  return /^['`"](.*)['`"]$/.exec(string)[1]
}

module.exports = {
  stripQuotes
}
