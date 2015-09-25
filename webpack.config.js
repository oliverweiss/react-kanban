var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);

module.exports = {
  entry: path.resolve(ROOT_PATH, 'app'),
  output: {
    path: path.resolve(ROOT_PATH, 'build'),
    filename: 'bundle.js'
  },
  module:{
    loaders: [{
      test: /\.css$/,
      loaders: ['style', 'css'],
      include: path.resolve(ROOT_PATH, 'app')
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Kanban app'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true
  }
};
