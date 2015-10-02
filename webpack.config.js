var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var merge = require('webpack-merge');

var TARGET = process.env.npm_lifecycle_event;
var ROOT_PATH = path.resolve(__dirname);

var common = {
  entry: path.resolve(ROOT_PATH, 'app'),
  resolve:{
    extensions: ['','.js', '.jsx']
  },
  output: {
    path: path.resolve(ROOT_PATH, 'build'),
    filename: 'bundle.js'
  },
  module:{
    loaders: [
      {test: /\.css$/, loaders: ['style', 'css'], include: path.resolve(ROOT_PATH, 'app')},
      {test: /\.js[x]?$/, loaders: ['babel'], include: path.resolve(ROOT_PATH, 'app')}
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Kanban app'
    })],  
}

if (TARGET == 'start' || !TARGET){
module.exports = merge(common, {
    devtool : 'eval-source-map',
    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true
    },
    plugins: [new webpack.HotModuleReplacementPlugin()]  
  });  
}