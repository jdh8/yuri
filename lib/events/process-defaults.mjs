import defaultEvents from './defaults'

const defaultNames = new Set(
  Object.values(defaultEvents).map(event => event.name)
)

export function processDefaultEvents (disabled) {
  const exclude = new Set(disabled)
  for (const event of exclude) {
    if (!defaultNames.has(event)) {
      throw new RangeError(`Default event "${event}" cannot be found!`)
    }
  }
  return Object.values(defaultEvents).filter(event => !exclude.has(event.name))
}
