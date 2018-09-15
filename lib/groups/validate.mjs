export function validateGroup (client, group) {
  if (group.toLowerCase() !== group) {
    throw new RangeError(`Group "${group}" should have a lowercased name!`)
  }
  if (client.groups.map.has(group)) {
    throw new RangeError(`Group "${group}" has already been defined!`)
  }
}
