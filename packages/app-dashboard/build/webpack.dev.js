const { merge } = require('webpack-merge');
const common = require('./webpack.common');

const devConfig = {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    publicPath: 'http://localhost:3002/',
    uniqueName: 'app_dashboard', // 防止命名冲突
    chunkLoadingGlobal: 'webpackChunk_app_dashboard' // 防止全局污染
  },
  optimization: {
    runtimeChunk: false, // 关闭运行时 chunk 分离
    splitChunks: false,  // 关闭代码分割（确保入口文件完整）
  },
  devServer: {
    port: 3002,
    hot: true,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*', // 允许跨域
    },
  },
};

module.exports = merge(common, devConfig)