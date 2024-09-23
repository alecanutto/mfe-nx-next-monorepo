const { composePlugins, withNx, withReact } = require('@nx/rspack')

module.exports = composePlugins(withNx(), withReact(), (config) => {
  // Add your custom webpack config here
  return config
})
