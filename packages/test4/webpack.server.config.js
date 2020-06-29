const nodeExternals = require("webpack-node-externals");

module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['ts-loader'],
        include: `${__dirname}/src`,
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    modules: ["src", "node_modules"]
  },
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