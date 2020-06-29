const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeExternals = require("webpack-node-externals");

const common = { 
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['babel-loader', 'ts-loader'],
        include: `${__dirname}/src`,
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    modules: ["src", "node_modules"]
  },
}

const page = {
  ...common,
  name: "page",
  target: 'web',
  entry:'./src/page/index.tsx',
  output:{
    path: `${__dirname}/dist/page`,
    filename: 'page.js',
    publicPath: '/distribution'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/page/index.html'
    })
  ]
}

const server = {
  ...common,
  name: "server",
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  entry:'./src/server/server.tsx',
  externals: [nodeExternals()],
  output:{
    path: `${__dirname}/dist/server`,
    filename: 'server.js',
  },
}

module.exports = [page, server]