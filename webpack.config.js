const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const dotenv = require("dotenv");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = (env, argv) => {
  const isDevelopment = argv.mode === "development";

  if (isDevelopment) {
    dotenv.config({ path: ".env.development" });
  } else {
    dotenv.config();
  }

  return {
    mode: argv.mode,
    devtool: isDevelopment ? "source-map" : "hidden-source-map",
    entry: "./src/index.tsx",
    output: {
      publicPath: "/",
      filename: "[name].js",
      path: path.resolve(__dirname, "build")
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".jsx"],
      fallback: {
        buffer: false,
        crypto: false,
        events: false,
        path: false,
        stream: false,
        string_decoder: false
      }
    },

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
        },
        {
          test: /\.(svg|png|jpe?g|gif|woff|woff2|eot|ttf)$/i,
          exclude: /node_modules/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
                outputPath: "assets"
              }
            }
          ]
        }
      ]
    },

    plugins: [
      new CleanWebpackPlugin(),
      new CopyWebpackPlugin({
        patterns: [{ from: "public", to: "public" }]
      }),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        hash: true
      }),
      new webpack.DefinePlugin({
        "process.env": JSON.stringify(process.env)
      }),
      new webpack.ProvidePlugin({
        Buffer: ["buffer", "Buffer"]
      })
    ],

    devServer: {
      static: {
        directory: path.join(__dirname, "public")
      },
      port: 3000,
      hot: true,
      historyApiFallback: true,
      liveReload: true
    }
  };
};
