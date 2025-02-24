import type { Configuration } from 'webpack';
import { merge } from 'webpack-merge';
import common from './webpack.common';

interface WebpackConfig extends Configuration {
  devServer?: unknown;
}

const devConfig: WebpackConfig = {
  mode: 'development',
  devtool: 'inline-source-map',
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  devServer: {
    compress: true,
    port: 3001,
    hot: true,
  },
};

export default merge(common, devConfig);
