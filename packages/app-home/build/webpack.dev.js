const { merge } = require('webpack-merge');
const common = require('./webpack.common');

const devConfig = {
  mode: 'development',
  devtool: 'inline-source-map',
  optimization: {
    runtimeChunk: false, // 关闭运行时 chunk 分离
    splitChunks: false,  // 关闭代码分割（确保入口文件完整）
  },
  devServer: {
    port: 3001,
    hot: true,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*', // 允许跨域
    },
  },
};

module.exports = merge(common, devConfig)