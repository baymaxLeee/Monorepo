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
    port: 3000,
    hot: true, // 启用热更新
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*', // 允许跨域
    },
    proxy: [
      {
        context: ['/express'], // 匹配的路径
        target: 'http://localhost:5000', // 目标服务器地址
        changeOrigin: true, // 修改请求头中的 Origin 为目标地址
        // pathRewrite: { '^/express': '' }, // 重写路径，去掉 /api 前缀
      },
      {
        context: ['/ws'], // 匹配的路径
        target: 'ws://localhost:8080', // 目标服务器地址
        changeOrigin: true, // 修改请求头中的 Origin 为目标地址
        pathRewrite: { '^/ws': '' }, // 重写路径，去掉 /api 前缀
      },
    ],
  },
};

module.exports = merge(common, devConfig)