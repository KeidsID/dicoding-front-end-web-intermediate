const {merge} = require('webpack-merge');
const commonWebpack = require('./webpack.common.js');

module.exports = merge(commonWebpack, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
    ],
  },
});
