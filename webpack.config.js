const path = require('path');
const dotenv = require('dotenv');
const currentPath = path.join(__dirname);
// const configLocation = process.env.CONFIG_LOCATION;
// const basePath = configLocation + '/communicationsApp'
// const fileEnv = dotenv.config({ path: basePath }).parsed;
// const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
//     prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
//     return prev;
//   }, {});
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    mode: process.env.NODE_ENV,
    entry: ['./src/index.js'],
    output: {
        filename: 'bundle.js',
        path: `${__dirname}/docs`,
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use:  {
                    loader: "babel-loader",
                    options: {
                              presets: ["@babel/preset-env"]
                    }
              },
                exclude: /node_modules/
            },
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader'
            },
            {
                test: /\.css$/i,
                loader: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|gif|jpe?g)$/,
                loader: 'file-loader'
            },
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    devServer: {
        historyApiFallback: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            // favicon: 'src/favicon.ico',
        }),
        // new webpack.DefinePlugin(envKeys),
        new webpack.ProvidePlugin({
            $: "jquery",
            jquery: "jquery",
            "window.jQuery": "jquery",
            jQuery: "jquery"
        }),
        // new webpack.EnvironmentPlugin(['NODE_ENV']),
    ],
    node: {
        fs: 'empty'
    },
};


module.exports = config;