import {validateGroup} from './validate'

export function addGroups (client, groups) {
  for (const [group, title, desc] of groups) {
    validateGroup(client, group)
    client.groups.map.set(group, {
      name: group,
      title,
      desc,
      commands: new Set()
    })
    client.emit('debug', `Successfully added group "${group}"`)
  }
}
