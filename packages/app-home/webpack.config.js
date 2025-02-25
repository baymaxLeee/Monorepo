const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');


module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: 'http://localhost:3001/', // 确保与主应用 entry 地址一致
    // library: { type: 'umd', name: 'appHome' }, // 暴露为 UMD 格式
    library: 'appHome', // 子应用的全局变量名
    libraryTarget: 'umd', // 模块化格式
    clean: true,
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
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new ModuleFederationPlugin({
      name: 'appHome',
      filename: 'remoteEntry.js',
      exposes: {
        './AppEntry': './src/main.js',
      },
      shared: {
        'react': { singleton: true, eager: true, requiredVersion: '19.0.0' }, // 指定 React 19
        'react-dom': { singleton: true, eager: true, requiredVersion: '19.0.0' }, // 指定 React-DOM 19
      },
    }),
  ],
  devServer: {
    port: 3001,
    hot: true,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*', // 允许跨域
    },
  },
  optimization: {
    runtimeChunk: false, // 关闭运行时 chunk 分离
    splitChunks: false,  // 关闭代码分割（确保入口文件完整）
  },
};