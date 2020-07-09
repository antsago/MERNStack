/* eslint-disable import/no-extraneous-dependencies */
import { Configuration } from "webpack"
import nodeExternals from "webpack-node-externals"

const config: Configuration = {
  target: "node",
  mode: "production",
  entry: "./src/server/server.tsx",
  node: {
    __dirname: false,
    __filename: false,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              configFile: "tsconfig.server.json",
            },
          },
        ],
        include: `${__dirname}/src`,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    modules: ["src", "node_modules"],
  },
  externals: [nodeExternals()],
  output: {
    path: `${__dirname}/dist/server`,
    filename: "server.js",
  },
}

export default config
