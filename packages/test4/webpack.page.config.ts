import webpack, { Configuration } from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import HtmlWebpackHarddiskPlugin from 'html-webpack-harddisk-plugin'
import { GenerateSW } from 'workbox-webpack-plugin'

const config = ({ isProd }: Record<'isProd', boolean>): Configuration => {
  const base: Configuration = {
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

  const prodConfig: Configuration = {
    ...base,
    mode: "production",
    devtool: 'source-map',
  }

  const devConfig: Configuration = {
    ...base,
    mode: "development",
    devtool: 'inline-source-map',
  }

  return isProd ? prodConfig : devConfig
}

export default config
