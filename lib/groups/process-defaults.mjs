import defaultGroups from './defaults'

const defaultNames = defaultGroups.reduce(
  (acc, group) => acc.add(group[0]),
  new Set()
)

export function processDefaultGroups (disabled) {
  const exclude = new Set(disabled)
  for (const group of exclude) {
    if (!defaultNames.has(group)) {
      throw new RangeError(`Default group "${group}" cannot be found!`)
    }
  }
  return Object.values(defaultGroups).filter(group => !exclude.has(group[0]))
}
