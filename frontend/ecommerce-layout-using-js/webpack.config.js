const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
    entry: {
        main: './src/index.js',
    },
    output: {
        filename: isProduction ? '[name].[contenthash].js' : '[name].js', // Use [name] instead of a single name
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [ 'style-loader',{
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false,
            },
          }, 'css-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use : {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }

            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",
            }),
    ],
    devServer: {
        port: 8000,
        open:true,
        compress: true,
        static: {
        directory: path.join(__dirname, 'src'), // Serve content from the src directory
    },
    }
}