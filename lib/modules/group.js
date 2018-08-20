const {Collection} = require('discord.js')
const {Module} = require('./module')
const defaultGroups = require('../groups')
const {defaultNames} = require('../util/default-names')
const {lowercase} = require('../util/lowercase')

/**
 * Module for handling command groups
 * @extends {Module}
 * @see {@link CommandModule}
 */
class GroupModule extends Module {
  /**
   * @param {Object} options - Options for the module
   * @param {KwClient} options.client - Client this module is apart of
   */
  constructor ({client, options = {
    disableDefault: []
  }}) {
    super(client)
    this.options = options
    /**
     * Map of the client's command groups, with their associated commands
     * @type {Collection<string, GroupInfo>}
     */
    this.map = new Collection()
    this.addDefaults(this.options.disableDefault)
  }

  /**
   * Add command groups to the client
   * @param {Array<Group>} group - Array of groups to add to be added to the
   * client
   * @return {void}
   */
  add (groups) {
    // Iterate through groups to register each
    for (const [group, title, desc] of groups) {
      // Check for errors
      // Lowercase name
      if (!lowercase.test(group)) {
        this.client.emit('error',
          `Group "${group}" should have a lowercase name! Skipping...`
        )
        continue
      }
      // Doesn't already exist
      if (this.map.has(group)) {
        this.client.emit('error',
          `Group "${group}" has already been registered! Skipping...`
        )
        continue
      }

      // Add the group
      this.map.set(group, {
        name: group,
        title,
        desc,
        commands: new Set()
      })
    }
  }

  /**
   * Add default groups to the client
   * @param {...string} [exclude] - Default groups to exclude, i.e. not add
   * @return {void}
   */
  addDefaults (exclude) {
    const excludeSet = new Set(exclude)
    // Check for errors
    for (const group of excludeSet) {
      if (!defaultNames.groups.has(group)) {
        throw new RangeError(
          `Default group "${group}" cannot be found! Skipping...`
        )
        excludeSet.delete(group)
      }
    }

    // Add group
    this.add(
      defaultGroups.filter(group => !excludeSet.has(group[0]))
    )
  }

  /**
   * Find a group by name. Returns the group if it is found; `null` if it isn't
   * @param {string} group - Group to find
   * @return {Group|null}
   */
  find (group) {
    if (this.map.has(group)) return this.map.get(group)
    return null
  }
}

// Export
module.exports = {
  GroupModule
}
