const webpack = require('webpack');
const path = require('path');

const release = (process.env.NODE_ENV === 'production');
const plugins = [];
const jsLoaders = ['babel?optional[]=runtime&stage=0&cacheDirectory=true'];

if (release)  {
  plugins.push(new webpack.DefinePlugin({
    'process.env': {
      // This has effect on the react lib size
      'NODE_ENV': JSON.stringify('production'),
    },
  }));

  plugins.push(new webpack.optimize.DedupePlugin());
  plugins.push(new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}));
} else {
  jsLoaders.unshift('react-hot');
}

module.exports = {
  debug: !release,
  devtool: 'source-map',
  entry: {
    'todomvc': './examples/flux-todomvc',
  },
  output: {
    path: './dist',
    filename: '[name].js',
  },
  plugins: plugins,
  resolve: {
    alias: {
      'axolotl': path.join(__dirname, './src')
    },
  },
  module: {
    preLoaders: [{
      test: /\.js$/,
      loader: 'eslint',
      exclude: /node_modules/,
    }],
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loaders: jsLoaders,
    }],
  },
};
