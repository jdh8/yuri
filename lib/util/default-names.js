const defaultCommands = require('../commands')
const defaultEvents = require('../events')
const defaultGroups = require('../groups')

const defaultNames = {
  events: new Set(Object.values(defaultEvents).map(event => event.name)),
  groups: defaultGroups.reduce((acc, group) => acc.add(group[0]), new Set()),
  commands: new Set(Object.values(defaultCommands).map(command => command.name))
}

module.exports = {
  defaultNames
}
