export function addTypes (client, types) {
  if (!Array.isArray(types)) types = Object.values(types)
  for (const type of types) {
    client.types.map.set(type.name, type)
    client.emit('debug', `Successfully added tyep "${type.name}"`)
  }
}
