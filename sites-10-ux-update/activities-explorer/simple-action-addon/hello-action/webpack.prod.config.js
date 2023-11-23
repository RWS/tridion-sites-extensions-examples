import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

/** @type { import('webpack').Configuration } */
export default {
    mode: 'production',
    entry: './src/index.ts',
    output: {
        library: {
            type: 'system',
        },
        path: resolve(dirname(fileURLToPath(import.meta.url)), '../dist/hello-action'),
        clean: true,
    },
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
};
