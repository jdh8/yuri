import {processDefaultTypes} from './process-defaults'

export function generateTypes (options = {disableDefaults: []}) {
  return {
    map: new Map(),
    defaults: processDefaultTypes(options.disableDefaults)
  }
}
