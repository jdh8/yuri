import Discord from 'discord.js'
import obj from './langs'

export const aliases = new Map(Object.entries(obj).map(([lang, {alias}]) => (alias || []).map(x => [x, lang])).reduce((array, pairs) => array.concat(pairs), []))
export const flags = new Map(Object.entries(obj).map(([lang, {flag}]) => [lang, flag]))
export const flagsInverse = new Map(Object.entries(obj).map(([lang, {flag}]) => [flag, lang]))
