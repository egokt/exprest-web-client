const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const TypescriptDeclarationPlugin = require('typescript-declaration-webpack-plugin');

const packageName = 'exprest-web-client';

module.exports = {
    entry: `./src/${packageName}.ts`,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: `${packageName}.js`,
        globalObject: 'this',
        library: {
            name: packageName,
            type: 'umd',
        },
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        extensionAlias: {
            '.js': ['.js', '.ts'],
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                    }
                ],
                exclude: /node_modules/,
            }
        ]
    },
    devtool : 'inline-source-map',
    externals: [
    ],
    plugins: [
        new TypescriptDeclarationPlugin({
            removeMergedDeclarations: true,
            out:`./${packageName}.d.ts`,
        }),
        new CopyPlugin({
            patterns: [
                { from: "package.json", to: "." },
                { from: "README.md", to: "." },
                { from: "LICENSE.md", to: "." },
            ],
        }),
    ],
};