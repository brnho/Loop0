const path = require('path');;
const webpack = require('webpack');

const config = {
  mode: 'development',
  entry: { app: ['./src/App.jsx'] },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                targets: {
                  ie: '11',
                  edge: '15',
                  safari: '10',
                  firefox: '50',
                  chrome: '49',
                },
              }],
              '@babel/preset-react',
            ],
          },
        },
      },
    ],
  },
  optimization: {
    splitChunks: { //separate node modeuls into vendor.bundle.js
      name: 'vendor',
      chunks: 'all',
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: 'true',
    }),
  ],
  devtool: 'source-map',
};

module.exports = config;