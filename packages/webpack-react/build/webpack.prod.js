import { merge } from 'webpack-merge';
const common = require('./webpack.common');

module.exports = merge(common, {
    mode: 'production',
})