const { container } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, '../src/main.jsx'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name]-[hash:8]-bundle.js',
    library: { name: 'host', type: 'umd'  }, // 暴露为 UMD 格式
    clean: true, // 启用输出清理
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@/*': path.resolve(__dirname, '../src/*')
    }
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
      name: 'host', // 主应用名称（必须全局唯一）
      filename: 'remoteEntry.js', // 远程入口文件
      exposes: {
        './React': 'react',
        './ReactDOM': 'react-dom',
        './Client': 'react-dom/client',
        './ReactRouter': 'react-router',
        './ReactRouterDOM': 'react-router-dom',
        './Antd': 'antd',
        './Axios': 'axios',
        './utils': path.resolve(__dirname, '../src/utils/index.js'),
      },
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