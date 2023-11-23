import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
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
        path: resolve(dirname(fileURLToPath(import.meta.url)), '../dist/guided-field'),
        publicPath: `${extensionsRequestBasePath}/guided-field/dist/guided-field`,
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
        'styled-components',
        'tinymce',
        '@tridion-sites/extensions',
        '@tridion-sites/models',
        '@tridion-sites/open-api-client',
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
        plugins: [new TsconfigPathsPlugin()],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [{ loader: 'babel-loader' }],
            },
        ],
    },
    plugins: [
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
