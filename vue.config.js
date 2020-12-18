module.exports = {
  runtimeCompiler: true,
  publicPath: '/',
  outputDir: "./build/public",
  configureWebpack: {
    entry: "./source/public/index.ts",
    output: {
      filename: '[name].[hash].js'
    }
  }
}
