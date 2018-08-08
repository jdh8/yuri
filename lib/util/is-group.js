/**
 * Regex for a "valid group name," for use in the default help command and
 * {@link isGroup} function
 * @type {RegExp}
 */
const groupRegex = /(.+)\/$/

/**
 * Tests if a given string is a group valid group name syntax according to
 * {@link groupRegex}. Does not check if the group exists on a client. Returns
 * the group name itself if it is a valid group name; `null` if it is not
 * @param {string} group - Possible group name to test
 * @return {string|null}
 */
function isGroup (group) {
  return groupRegex.test(group) ? groupRegex.exec(group)[1] : null
}

// Export
module.exports = {
  groupRegex,
  isGroup
}
