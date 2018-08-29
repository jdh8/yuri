export function getType (client, type) {
  return client.types.map.get(type)
}
