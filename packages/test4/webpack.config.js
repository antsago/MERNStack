const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = { 
  target: 'web',
  //This property defines where the application starts
  entry:'./src/index.tsx',
  //Setup loaders 
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
  //This property defines the file path and the file name which will be used for deploying the bundled file 
  output:{
    path: `${__dirname}/dist`,
    filename: 'bundle.js'
  },
  // Setup plugin to use a HTML file for serving bundled js files
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
}