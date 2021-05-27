const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const AutoPrefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader').VueLoaderPlugin;
const webpack = require('webpack');
const ResourceHintWebpackPlugin = require('resource-hints-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const fs = require('fs');
const WebpackObfuscator = require('webpack-obfuscator');
const PACKAGE = require(path.resolve(__dirname, 'package.json'));
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

function generateConfig(isProduction) {

    const PostCssLoader = {
        loader: 'postcss-loader',
        options: {
            postcssOptions: {
                plugins: [
                    AutoPrefixer(),
                ],
            },
        },
    };

    const BabelLoader = {
        loader: 'babel-loader',
        options: {
            presets: [
                [
                    '@babel/preset-env', {
                    targets: isProduction ? '> 0.25%, not dead' : {chrome: '89'},
                    shippedProposals: !isProduction,
                    useBuiltIns: isProduction ? 'entry' : isProduction,
                    corejs: isProduction ? '3.13.0' : undefined
                },
                ],
            ],
            plugins: ['@babel/plugin-transform-runtime'],
        },
    };

    const ObfuscatorLoader = {
        loader: WebpackObfuscator.loader,
        options: {
            compact: true,
            controlFlowFlattening: true,
            controlFlowFlatteningThreshold: 1.0,
            deadCodeInjection: true,
            deadCodeInjectionThreshold: 1.0,
            debugProtection: true,
            debugProtectionInterval: false,
            identifierNamesGenerator: 'mangled-shuffled',
            numbersToExpressions: true,
            rotateStringArray: true,
            selfDefending: true,
            shuffleStringArray: true,
            simplify: true,
            splitStrings: true,
            splitStringsChunkLength: 3,
            stringArray: true,
            stringArrayEncoding: ['rc4'],
            stringArrayIndexesType: ['hexadecimal-number'],
            stringArrayIndexShift: true,
            stringArrayWrappersCount: 7,
            stringArrayWrappersChainedCalls: true,
            stringArrayWrappersParametersMaxCount: 5,
            stringArrayWrappersType: 'function',
            stringArrayThreshold: 1.0,
            target: 'browser',
            transformObjectKeys: true,
            unicodeEscapeSequence: true,
        },
    };

    const CssRule = {
        test: /\.css$/,
        use: [
            {loader: MiniCssExtractPlugin.loader}, {loader: 'css-loader'}, PostCssLoader,
        ],
    };

    const SassRule = {
        test: /\.s[ca]ss$/,
        use: [
            {loader: MiniCssExtractPlugin.loader}, {loader: 'css-loader'}, PostCssLoader, {loader: 'sass-loader'},
        ],
    };

    const JsObfuscateRule = {
        test: /\.obfuscate.m?js$/,
        exclude: [
            /node_modules/,
            /\.min.js$/
        ],
        use: isProduction ? [ObfuscatorLoader, BabelLoader] : [BabelLoader],
    };

    const JsRule = {
        test: /\.m?js$/,
        exclude: [
            /node_modules/,
            /\.min.js$/
        ],
        use: [
            BabelLoader,
        ],
    };

    const FontRule = {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        type: 'asset',
        generator: {
            filename: isProduction ? 'fonts/[name]-[contenthash][ext][query]' : 'fonts/[name][ext]',
            publicPath : '../'
        },
    };

    const VueRule = {
        test: /\.vue$/,
        loader: 'vue-loader',
    };

    return {
        mode: isProduction ? 'production' : 'development',
        devtool: isProduction ? false : 'source-map',
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src'),
            },
            extensions: ['.vue', '.js', '...'],
        },
        entry: {
            index: path.resolve(__dirname, 'src/index.js'),
        },
        output: {
            path: path.resolve(__dirname, isProduction ? 'docs': 'dist'),
            filename: isProduction ? 'js/[name]-[contenthash].js' : 'js/[name].js',
            publicPath: '',
        },
        module: {
            rules: [
                JsObfuscateRule, VueRule, CssRule, SassRule, JsRule, FontRule,
            ],
        },
        plugins: [
            {
                apply(compiler) {
                    compiler.hooks.compile.tap('BuildVersionIncrement', () => {
                        const fn = path.resolve(__dirname, 'build');
                        if (!fs.existsSync(fn)) {
                            fs.writeFileSync(fn, '0');
                        }
                        const newBuildNumber = parseInt(fs.readFileSync(fn, 'utf8')) + 1;
                        global.currentBuildNumber = newBuildNumber.toString();
                        fs.writeFileSync(fn, global.currentBuildNumber);
                    });
                },
            },
            new VueLoaderPlugin(),
            new MiniCssExtractPlugin({
                filename: isProduction ? 'css/[name]-[contenthash].css' : 'css/[name].css',
            }),
            new HtmlWebpackPlugin({
                title: 'Exponential Idle - Save Game Editor',
                xhtml: true,
                inject: 'body',
                description: PACKAGE.description,
                template: path.resolve(__dirname, 'src/index.html'),
                hash: false,
            }),
            new FaviconsWebpackPlugin({
                logo: path.resolve(__dirname, 'src/styles/favicon.svg'),
                cache: !isProduction,
                prefix: '',
                favicons: {
                    appName: PACKAGE.name,
                    developerName: PACKAGE.author,
                    display: 'browser',
                    orientation: 'portrait',
                    version: PACKAGE.version,
                    icons: {
                        android: false,
                        appleIcon: false,
                        appleStartup: false,
                        coast: false,
                        favicons: true,
                        firefox: false,
                        windows: false,
                        yandex: false,
                    }
                }
            }),
            new ResourceHintWebpackPlugin(),
            new webpack.DefinePlugin({
                '__VUE_OPTIONS_API__': true,
                '__VUE_PROD_DEVTOOLS__': false,
                '__DEBUG__': !isProduction,
                '__VERSION__': JSON.stringify(PACKAGE.version),
                '__REPO__': JSON.stringify(PACKAGE.repository),
                '__BUILD_NUMBER__': webpack.DefinePlugin.runtimeValue(() => {
                    return JSON.stringify(global.currentBuildNumber);
                }, true),
                '__BUILD_DATE__': webpack.DefinePlugin.runtimeValue(() => {
                    return JSON.stringify(new Date());
                }, true),
            }),
            isProduction ? new CleanWebpackPlugin() : {apply(){}},
        ],
        optimization: {
            moduleIds: 'deterministic',
            runtimeChunk: 'single',
            usedExports: true,
            splitChunks: {
                cacheGroups: {
                    defaultVendors: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all',
                    },
                },
            },
        },
        experiments: {
            topLevelAwait: true,
        },
        watchOptions: {
            aggregateTimeout: 200,
            ignored: /node_modules/,
        },
    };
}

module.exports = (env, argv) => {
    return generateConfig(argv.mode === 'production');
};
