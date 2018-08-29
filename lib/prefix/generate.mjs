import tags from 'common-tags'

export function generatePrefix (options = {
  base: 'kw',
  mention: true,
  enforceSpace: false,
  i: true
}, id = '') {
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
      (?:\\s+(.*))
      ?
    `, options.i ? 'i' : '')
  }
  return prefix
}
