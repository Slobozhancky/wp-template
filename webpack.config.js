const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = (env, args) => {
    const devMode = args.mode !== "production";

    const optimization = () => {
        const config = {
            splitChunks: {
                chunks: "all",
            },
        };

        if (!devMode) {
            config.minimizer = [
                new TerserPlugin(),
                new OptimizeCssAssetsPlugin(),
            ];
        }

        return config;
    };

    const filename = (ext) =>
        devMode ? `[name].${ext}` : `[name].[contenthash].${ext}`;

    const bableOptions = (regexp, preset) => {
        return {
            test: regexp,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env", preset],
                },
            },
        };
    };

    return {
        context: path.resolve(__dirname, "src"),
        mode: "development",
        entry: {
            main: "./index.jsx",
        },
        resolve: {
            alias: {
                images: path.resolve(__dirname, "src/assets/images"),
            },
            extensions: [".tsx", ".ts", ".js", ".jsx"],
        },
        output: {
            filename: filename("js"),
            path: path.resolve(__dirname, "dist"),
            clean: true,
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: filename("css"),
                chunkFilename: filename("css"),
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
        ],
        module: {
            rules: [
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        "sass-loader",
                    ],
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: "asset/resource",
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/i,
                    type: "asset/resource",
                },
                bableOptions(/\.m?js$/),
                bableOptions(/\.ts$/, "@babel/preset-typescript"),
                bableOptions(/\.jsx$/, "@babel/preset-react"),
            ],
        },
        devServer: {
            static: {
                directory: path.join(__dirname, "src"),
            },
            compress: true,
            port: 9000,
            open: true,
        },
        optimization: optimization(),
    };
};
