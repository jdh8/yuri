const {Module} = require('./module')
const defaultEvents = require('../events')
const {defaultNames} = require('../util/default-names')

/**
 * Module for adding events
 * @extends {Module}
 */
class EventModule extends Module {
  /**
   * @param {Object} options - Options for the module
   * @param {KwClient} options.client - Client this module is apart of
   */
  constructor ({client, options = {
    disableDefault: [],
    debugOverride: false
  }}) {
    super(client)
    this.options = options
    this.addDefaults(this.options.disableDefault)
  }
  addDefaults (exclude) {
    const excludeSet = new Set(exclude)
    if (process.env.NODE_ENV === 'PRODUCTION' || this.debugOverride) {
      excludeSet.add('debug')
    }
    // Check for errors
    for (const event of excludeSet) {
      if (!defaultNames.events.has(event)) {
        throw new RangeError(
          `Default event "${event}" cannot be found! Skipping...`
        )
        excludeSet.delete(event)
      }
    }
    // Add events
    this.add(
      Object.values(defaultEvents).filter(event => !excludeSet.has(event.name))
    )
  }

  /**
   * Add events to the client
   * @param {Array<Event>|Object<string, KwEvent>} events - Array or object of
   * events to be added to the client
   * @return {void}
   */
  add (events) {
    // Convert object to array
    if (!Array.isArray(events)) events = Object.values(events)
    // Iterate through events to register each
    for (const {name, event} of events) {
      // Check for errors
      // No checks

      // Add events
      this.client.on(name, event)
    }
  }
}

module.exports = {
  EventModule
}
