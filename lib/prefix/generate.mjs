import * as tags from 'common-tags'

export function generatePrefix (options = {
  base: 'kw',
  mention: true,
  enforceSpace: false,
  i: true
}, id = '') {
  if (options.base == null) options.base = 'kw'
  if (options.mention == null) options.mention = true
  if (options.enforceSpace == null) options.enforceSpace = false
  if (options.i == null) options.i = true
  const prefix = {
    options,
    base: options.base,
    space: options.enforceSpace
      ? options.enforceSpace === 'none'
        ? ''
        : '\\s+'
      : '\\s*',
    ws: `${options.base}${options.enforceSpace === 'none' ? '' : ' '}`,
    regex: new RegExp(tags.oneLineTrim`
      ^
      (
        ${options.base.replace(/[[\].\\()|{}^$?*+]/, '\\$&')}
        ${options.enforceSpace
          ? options.enforceSpace === 'none' ? '' : '\\s+'
          : '\\s*'
        }
        ${options.mention ? `|<@!?${id}>\\s*` : ''}
      )
      (\\S*)
      (?:\\s+([^]*))
      ?
    `, options.i ? 'i' : '')
  }
  return prefix
}
