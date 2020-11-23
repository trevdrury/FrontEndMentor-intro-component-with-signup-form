const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './src/index.js'),
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ template: './src/index.html' }),
  ],
  devtool: 'source-map',
  devServer: {
    contentBase: './dist'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        use: ['html-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        use: ['url-loader'],
      },
    ]
  },
};