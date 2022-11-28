const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const devMode = process.env.NODE_ENV !== "production";

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: "all",
        },
    };

    if (devMode) {
        config.minimizer = [new TerserPlugin(), new OptimizeCssAssetsPlugin()];
    }

    return config;
};

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
        new MiniCssExtractPlugin({
            filename: devMode ? "[name].css" : "[name].[contenthash].css",
            chunkFilename: !devMode ? "[name].css" : "[id].[contenthash].css",
        }),
        new HtmlWebpackPlugin({ template: "./index.html" }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src/icon.png"),
                    to: path.resolve(__dirname, "dist"),
                },
            ],
        }),
        new MiniCssExtractPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                test: /\.(sa|sc|c)ss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
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
    optimization: optimization(),
};
