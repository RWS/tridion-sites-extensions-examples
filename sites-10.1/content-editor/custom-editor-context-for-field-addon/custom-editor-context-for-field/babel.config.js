export default {
    presets: [
        '@babel/preset-env',
        ['@babel/preset-react', { runtime: 'automatic' }],
        ['@babel/preset-typescript', { onlyRemoveTypeImports: true, allowDeclareFields: true }],
    ],
    plugins: [['@babel/plugin-transform-runtime'], ['styled-components']],
};
