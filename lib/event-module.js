const {Module} = require('./module')
const defaultEvents = require('./events')
const {defaultNames} = require('./util/default-names')

/**
 * Module for adding events
 * @extends {Module}
 */
class EventModule extends Module {
  /**
   * @param {Object} options - Options for the module
   * @param {KwClient} options.client - Client this module is apart of
   */
  constructor ({client}) {
    super(client)
  }

  /**
   * Add events to the client
   * @param {Array<Event>|Object<string, KwEvent>} events - Array or object of
   * events to be added to the client
   * @param {Array<Array<string>>} [errs=[]] - Array of any errors that occurred
   * before the "error" event was registered, to be emitted after
   * @return {void}
   */
  add (events, errs = []) {
    // Convert object to array
    if (!Array.isArray(events)) events = Object.values(events)
    // Get most important keys first
    for (const importantEvent of ['warn', 'error', 'debug']) {
      const index = events.findIndex(event => event.name === importantEvent)
      if (index < 0) continue
      events.unshift(events[index])
      events.splice(index + 1, 1)
    }
    // Iterate through events to register each
    for (const {name, event} of events) {
      // Check for errors
      // No checks

      // Add events
      this.client.on(name, event)
    }

    // Display errors from addDefaults
    for (const err of errs) {
      this.client.emit(...err)
    }
  }

  /**
   * Add default events to the client
   * @param {...string} [exclude] - Default events to exclude, i.e. not add
   * @return {void}
   */
  addDefaults (...exclude) {
    const excludeSet = new Set(exclude)
    // Check for errors
    const errs = []
    for (const event of excludeSet) {
      if (!defaultNames.events.has(event)) {
        errs.push(['error',
          `Default event "${event}" cannot be found! Skipping...`
        ])
        excludeSet.delete(event)
      }
    }

    // Add events
    this.add(
      Object.values(defaultEvents).filter(event => !excludeSet.has(event.name)),
      errs
    )
  }
}

module.exports = {
  EventModule
}
