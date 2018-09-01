module.exports = {
  plugins: [
    'plugins/markdown'
  ],
  source: {
    include: ['lib'],
    includePattern: '.+\\.m?js(doc|x)?$'
  },
  sourceType: 'module',
  opts: {
    destination: './docs/',
    readme: './README.md',
    recurse: true
  },
  templates: {
    cleverLinks: true
  },
  markdown: {
    idInHeadings: true
  }
}
