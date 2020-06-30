const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')

module.exports = {
  name: "page",
  target: 'web',
  mode: "development",
  entry:'./src/page/index.tsx',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['babel-loader', 'ts-loader'],
        include: `${__dirname}/src/page`,
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    modules: ["src", "node_modules"],
  },
  output:{
    path: `${__dirname}/dist/page`,
    filename: 'page.js',
    publicPath: '/static',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/page/index.html',
      alwaysWriteToDisk: true, // added by HtmlWebpackHarddiskPlugin
    }),
    new HtmlWebpackHarddiskPlugin(),
  ]
}