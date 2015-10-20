var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var Clean = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
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
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Kanban app'
    })],  
}

if (TARGET == 'start' || !TARGET){
var start = merge(common, {
    devtool : 'eval-source-map',
    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true
    },
    module:{
      loaders: [
        {test: /\.js[x]?$/, loaders: ['react-hot', 'babel'], include: APP_PATH},
        {test: /\.css$/, loaders: ['style', 'css'], include: APP_PATH}        
      ]
    },
    plugins: [new webpack.HotModuleReplacementPlugin()]  
  }); 
  console.log(start.module.loaders[1]);
  module.exports = start;
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
        {test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css'), include: APP_PATH},        
        {test: /\.js[x]?$/, loader: 'babel', include: APP_PATH}
      ]
    },
    plugins: [
      new Clean(['build']),
      new ExtractTextPlugin('styles.[chunkhash].css'),
      new webpack.optimize.CommonsChunkPlugin('vendor', '[name].[chunkhash].js'),
      new webpack.DefinePlugin({'process.env': {'NODE_ENV': JSON.stringify('production')}}),
      new webpack.optimize.UglifyJsPlugin({ compress: {warnings: false}})
    ]
  });  
}
