const { merge } = require('webpack-merge');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const common = require('./webpack.common');

const prodConfig = {
  mode: 'production',
  optimization: {
    splitChunks: {
      chunks: 'all', // 对所有类型的 chunk 进行拆分
      minSize: 20000, // 最小文件大小（20KB）
      minRemainingSize: 0,
      minChunks: 1, // 最小引用次数
      maxAsyncRequests: 30, // 最大异步请求数
      maxInitialRequests: 30, // 最大初始请求数
      enforceSizeThreshold: 50000, // 强制执行拆分的阈值
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/, // 匹配 node_modules 中的模块
          filename: '[name]-[hash:8]-chunk-vendors.js',
          priority: -10, // 优先级
          reuseExistingChunk: true, // 重用已有的 chunk
        },
        common: {
          minChunks: 2, // 最小引用次数
          priority: -20, // 优先级
          filename: '[name]-[hash:8]-chunk-common.js',
          reuseExistingChunk: true, // 重用已有的 chunk
        },
      },
    },
  },
  plugins: [
    new BundleAnalyzerPlugin(),
  ],
};

module.exports = merge(common, prodConfig);