import {types} from './types'

export function addTypes (typesToAdd) {
  if (!Array.isArray(typesToAdd)) typesToAdd = Object.values(typesToAdd)
  for (const type of typesToAdd) {
    types.set(type.name, type)
  }
}
