function inexactSearch (search) {
  return obj => obj.name.toLowerCase().includes(search)
}
function exactSearch (search) {
  return obj => obj.name.toLowerCase() === search
}

module.exports = {
  inexactSearch,
  exactSearch
}
