var webpack = require('webpack');
const path = require('path');

module.exports= {
  entry: {
    path: './src/main.js'
  },
  output: {
    path: './src',
    publicPath: '/',
    filename: 'bundle.js'
  },

  resolve: {
    modulesDirectories: ['node_modules', 'src'],
    extensions: ['', '.js', '.jsx']
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
   new webpack.NoErrorsPlugin(), // Makes sure Webpack will not compile if Errors
 ]
};
