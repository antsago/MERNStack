const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')
const { GenerateSW } = require('workbox-webpack-plugin')

module.exports = {
  name: "page",
  target: 'web',
  entry: {
    page: './src/page/index.tsx',
  },
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
  output: {
    path: `${__dirname}/dist/page`,
    filename: '[name].[hash].js',
    publicPath: '/assets',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/page/index.html',
      favicon: './src/page/favicon.ico',
      alwaysWriteToDisk: true, // added by HtmlWebpackHarddiskPlugin
    }),
    new HtmlWebpackHarddiskPlugin(),
    new GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      swDest: "serviceWorker.js",
    }),
  ],
}
