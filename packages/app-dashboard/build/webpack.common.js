const { container } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, '../src/main.jsx'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name]-[hash:8]-bundle.js',
    library: { name: 'app_dashboard', type: 'umd'  }, // 暴露为 UMD 格式
    clean: true, // 启用输出清理
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
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
      name: 'app_dashboard',
      filename: 'remoteEntry.js',
      remotes: {
        host: 'host@http://localhost:3000/remoteEntry.js', // 从主应用加载共享库
      },
      shared: {
        'react': { singleton: true, import: 'host/React', requiredVersion: '19.0.0' },
        'react-dom': { singleton: true, import: 'host/ReactDOM', requiredVersion: '19.0.0' },
        'react-router': { singleton: true, import: 'host/ReactRouter', requiredVersion: '7.2.0' },
        'react-router-dom': { singleton: true, import: 'host/ReactRouterDOM', requiredVersion: '7.2.0' },
        'antd': { singleton: true, import: 'host/Antd', requiredVersion: '5.24.1' },
        'axios': { singleton: true, import: 'host/Axios', requiredVersion: '1.7.9' },
      },
    }),
  ],
};