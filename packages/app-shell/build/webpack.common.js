const { container } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, '../src/index.tsx'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name]-[hash:8]-chunk.js',
    publicPath: '/', // 公共路径
    clean: true, // 启用输出清理
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
    }),
    new container.ModuleFederationPlugin({
      name: 'appShell', // 主应用名称
      filename: 'remoteEntry.js', // 远程入口文件
      shared: {
        'react': { singleton: true, eager: true, requiredVersion: '19.0.0' },
        'react-dom': { singleton: true, eager: true, requiredVersion: '19.0.0' },
        'react-router': { singleton: true, eager: true, requiredVersion: '7.2.0' },
        'react-router-dom': { singleton: true, eager: true, requiredVersion: '7.2.0' },
        'antd': { singleton: true, eager: true, requiredVersion: '5.24.1' },
        'axios': { singleton: true, eager: true, requiredVersion: '1.7.9' },
      },
    }),
  ],
};