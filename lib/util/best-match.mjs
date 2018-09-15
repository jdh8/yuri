// Credit to jdh8
export function bestMatch (collection, search, key = 'name') {
  const regex = new RegExp(search, 'i')
  const filtered = collection.filterArray(x => regex.test(x[key]))
  return filtered.length
    ? filtered.reduce((x, y) => x[key].length < y[key].length ? x : y)
    : null
}
