var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var merge = require('webpack-merge');
var pkg = require('./package.json');

var TARGET = process.env.npm_lifecycle_event;
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

var common = {
  entry: APP_PATH,
  resolve:{
    extensions: ['','.js', '.jsx']
  },
  output: {
    path: BUILD_PATH,
    filename: 'bundle.js'
  },
  module:{
    loaders: [
      {test: /\.css$/, loaders: ['style', 'css'], include: APP_PATH},
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
    module:{
      loaders: [
        {test: /\.js[x]?$/, loaders: ['react-hot', 'babel'], include: APP_PATH}
      ]
    },
    plugins: [new webpack.HotModuleReplacementPlugin()]  
  });  
}

if (TARGET == 'build') {
module.exports = merge(common, {
    entry: {
      app: APP_PATH,
      vendor: Object.keys(pkg.dependencies)
    },
    output: {
      path: BUILD_PATH,
      filename: '[name].[chunkhash].js'
    },
    devtool : 'source-map',
    module:{
      loaders: [
        {test: /\.js[x]?$/, loaders: ['babel'], include: APP_PATH}
      ]
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin('vendor', '[name].[chunkhash].js'),
      new webpack.DefinePlugin({'process.env': {'NODE_ENV': JSON.stringify('production')}}),
      new webpack.optimize.UglifyJsPlugin({ compress: {warnings: false}})
    ]
  });  
}
