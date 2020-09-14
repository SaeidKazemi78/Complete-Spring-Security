const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const Visualizer = require('webpack-visualizer-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const AngularCompilerPlugin = require('@ngtools/webpack').AngularCompilerPlugin;
const path = require('path');
const SimpleProgressWebpackPlugin = require( 'simple-progress-webpack-plugin' );

const utils = require('./utils.js');
const commonConfig = require('./webpack.common.js');

const ENV = 'production';

module.exports = webpackMerge(commonConfig({env: ENV}), {
    // Enable source maps. Please note that this will slow down the build.
    // You have to enable it in UglifyJSPlugin config below and in tsconfig-aot.json as well
    // devtool: 'source-map',
    entry: {
        polyfills: './src/main/webapp/app/polyfills',
        global: './src/main/webapp/content/css/global.css',
        main: './src/main/webapp/app/app.main'
    },
    output: {
        path: utils.root('target/www'),
        filename: 'app/[name].[hash].bundle.js',
        chunkFilename: 'app/[id].[hash].chunk.js'
    },
    module: {
        rules: [{
            test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
            loader: '@ngtools/webpack'
        }, {
            test: /\.css$/,
            use: ['to-string-loader', 'rtlcss-loader'],
            exclude: /(vendor\.css|global\.css|vendor\.ltr\.css)/
        }, {
            test: /(vendor\.ltr.css)/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /(vendor\.css|global\.css)/,
            use: [
                MiniCssExtractPlugin.loader,
                'rtlcss-loader',
                'postcss-loader'
            ]
        }]
    },
    optimization: {
        runtimeChunk: false,
        minimizer: [
            new TerserPlugin({
                parallel: true,
                cache: true,
                terserOptions: {
                    ie8: false,
                    // sourceMap: true, // Enable source maps. Please note that this will slow down the build
                    compress: {
                        dead_code: true,
                        warnings: false,
                        properties: true,
                        drop_debugger: true,
                        conditionals: true,
                        booleans: true,
                        loops: true,
                        unused: true,
                        toplevel: true,
                        if_return: true,
                        inline: true,
                        join_vars: true
                    },
                    output: {
                        comments: false,
                        beautify: false,
                        indent_level: 2
                    }
                }
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    plugins: [
        new SimpleProgressWebpackPlugin( { // Default options
                format: 'verbose'
            }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].[contenthash].css',
            chunkFilename: '[id].css'
        }),

        new MomentLocalesPlugin({
            localesToKeep: [
                'en','fa'
                // jhipster-needle-i18n-language-moment-webpack - JHipster will add/remove languages in this array
            ]
        }),
        new Visualizer({
            // Webpack statistics in target folder
            filename: '../stats.html'
        }),
        new AngularCompilerPlugin({
            mainPath: utils.root('src/main/webapp/app/app.main.ts'),
            tsConfigPath: utils.root('tsconfig-aot.json'),
            sourceMap: true
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new WorkboxPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true,
        })
    ],
    mode: 'production'
});
