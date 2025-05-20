const { watch, watchFile } = require("fs");
const path = require("path");
const PugPlugin = require('pug-plugin');


module.exports = {
  mode: "development",
  entry: {
    index: './src/views/index.pug',
    styles: './src/css/style.css', // Add your main CSS file here
  },
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    publicPath: '/', // Add this for proper HMR
  },
  devtool: "eval-source-map",
  devServer: {
    static: ['assets', 'css'],
    hot: true,
    watchFiles: ['src/**/*.pug', 'src/**/*.css'],
    proxy: {
      '/api': 'http://localhost:3000', // Proxy Express API requests
    },
  },
  plugins:[
    new PugPlugin({
      pretty: 'auto',
      entry: {
        index: './src/views/index.pug',
      },
      js: {
        filename: 'assets/js/[name].js'
      },
      css: {
        filename: 'assets/css/[name].css'
      }
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['css-loader']
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
};