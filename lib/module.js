/**
 * Empty module for use in a {@link KwClient}
 */
class Module {
  /**
   * @param {KwClient} client - Client this module is apart of
   */
  constructor (client) {
    Object.defineProperty(this, 'client', {value: client})
  }
}

// Export
module.exports = {
  Module
}
