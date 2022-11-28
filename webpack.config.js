const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    context: path.resolve(__dirname, "src"),
    mode: "development",
    resolve: {
        alias: {
            images: path.resolve(__dirname, "src/assets/images"),
        },
    },
    entry: {
        main: "./index.js",
        analytics: "./analytics.js",
    },
    output: {
        filename: "[name].[contenthash].js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({ template: "./index.html" }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src/icon.png"),
                    to: path.resolve(__dirname, "dist"),
                },
            ],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource",
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: "asset/resource",
            },
        ],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, "dist"),
        },
        watchFiles: ["src/index.html"],
        hot: true,
        compress: true,
        port: 9000,
    },
    optimization: {
        splitChunks: {
            chunks: "all",
        },
    },
};
