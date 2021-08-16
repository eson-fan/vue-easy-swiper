module.exports = {
  devServer: {
    overlay: {
      warnings: false,
      errors: false,
    },
  },
  configureWebpack: {
    output: {
      libraryExport: 'default'
    }
  },
  css: {
    extract: false,
  }
}
