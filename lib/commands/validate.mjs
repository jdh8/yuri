import tags from 'common-tags'

export function validateCommand (client, command) {
  if (command.name.toLowerCase() !== command.name) {
    throw new RangeError(tags.oneLine`
      Command "${command.name}" should have a lowercased name!
    `)
  }
  if (command.aliases) {
    for (const alias in command.aliases) {
      if (alias.toLowerCase() !== alias) {
        throw new RangeError(tags.oneLine`
          Alias "${alias}" on command "${command.name}" should be lowercased!
        `)
      }
      if (client.commands.aliases.has(alias)) {
        throw new RangeError(tags.oneLine`
          Alias "${alias}" on command "${command.name}" has already been defined
          on command "${client.commands.aliases.get(alias)}"!
        `)
      }
    }
  }
  if (!client.groups.map.has(command.group)) {
    throw new RangeError(tags.oneLine`
      Group "${command.group}" on command "${command.name}" is not defined!
    `)
  }
  if (client.commands.map.has(command.name)) {
    throw new RangeError(tags.oneLine`
      Command "${command.name}" is already defined!
    `)
  }
}
