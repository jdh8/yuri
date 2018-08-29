import {processDefaultEvents} from './process-defaults'

export function generateEvents (options = {disableDefaults: []}) {
  const events = {
    options,
    defaults: processDefaultEvents(options.disableDefaults)
  }
  return events
}
