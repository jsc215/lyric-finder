var webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    path: './src/main.js'
  },
  output: {
    path: __dirname+'/build',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  devtool: 'eval-source-map',
  devServer: {
    contentBase: './build',
    inline: true
  },
  plugins: [
   new webpack.DefinePlugin({
     'process.env': {
       // This tells the Webpack and Babel for optimization for performance
       NODE_ENV: JSON.stringify('production')
     }
   }),
   new webpack.optimize.UglifyJsPlugin(),
 
 ]
};

