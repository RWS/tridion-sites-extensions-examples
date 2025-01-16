import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { extensionsRequestBasePath } from '@tridion-sites/extensions-cli';
import { getDevServerConfig } from './devServer.js';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

/** @type { import('webpack').Configuration } */
export default env => ({
    mode: 'development',
    entry: './src/index.ts',
    output: {
        library: {
            type: 'system',
        },
        path: resolve(dirname(fileURLToPath(import.meta.url)), '../dist/async-page'),
        publicPath: `${extensionsRequestBasePath}/async-page/dist/async-page`,
        clean: true,
    },
    devServer: getDevServerConfig({
        targetUrl: env.target,
        manifestPath: env.manifest,
        addonConfigPath: env.config,
    }),
    devtool: 'eval-source-map',
    externals: [
        'react',
        'react-dom',
        'tinymce',
        '@tridion-sites/extensions',
        '@tridion-sites/models',
        '@tridion-sites/open-api-client',
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '.css'],
        plugins: [new TsconfigPathsPlugin()],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [{ loader: 'babel-loader' }],
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[name]__[local]__[hash:base64]',
                                exportLocalsConvention: 'camelCaseOnly',
                            },
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    autoprefixer(),
                                    cssnano({
                                        safe: true,
                                        autoprefixer: false,
                                    }),
                                ],
                            },
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: '[name].css' }),

        new ForkTsCheckerWebpackPlugin({
            typescript: {
                diagnosticOptions: {
                    semantic: true,
                    syntactic: true,
                },
            },
        }),
    ],
});
