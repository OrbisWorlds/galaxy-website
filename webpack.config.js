const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const dotenv = require("dotenv");

module.exports = (env, argv) => {
  if (argv.mode === "development") {
    dotenv.config({ path: ".env.development" });
  } else {
    dotenv.config();
  }

  return {
    mode: argv.mode,
    entry: {
      main: "./src/index.tsx"
    },
    devtool: "inline-source-map",
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: "ts-loader",
              options: {
                compilerOptions: { noEmit: false }
              }
            }
          ],
          exclude: /node_modules/
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"]
        }
      ]
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
      fallback: {
        buffer: false,
        crypto: false,
        events: false,
        path: false,
        stream: false,
        string_decoder: false
      }
    },
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "dist")
    },
    devServer: {
      port: 3000,
      hot: true,
      historyApiFallback: true,
      liveReload: true
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        chunks: ["main"]
      }),
      new webpack.DefinePlugin({
        "process.env": JSON.stringify(process.env)
      }),
      new webpack.ProvidePlugin({
        Buffer: ["buffer", "Buffer"]
      })
    ]
  };
};
