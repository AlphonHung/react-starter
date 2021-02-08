const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['@babel/polyfill', './src/index.tsx'],
    resolve: { // webpack預設只讀取js，添加extensions使可讀ts
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    output: {
        path: path.resolve(__dirname, './dist/'),
        filename: 'js/[name].[chunkhash].js',
        chunkFilename: 'js/[name].[chunkhash].js'
    },
    module: {
        rules: [
            { // for ES6 up ts
                test: /.ts$/,
                exclude: /node_module/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/typescript', '@babel/preset-env']
                    }
                }
            },
            { // for TSX
                test: /.tsx$/,
                exclude: /node_module/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/typescript', '@babel/preset-react', '@babel/preset-env']
                    }
                }
            },
            { // for CSS
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' }
                ]
            },
            { // for SCSS/SASS
                test: /\.(scss|sass)$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    { loader: 'sass-loader' }
                ]
            }
        ]
    },
    devServer: {
        inline: true,
        port: 9000
    },
    plugins: [
        // 用來產生dist/index.html
        new HtmlWebpackPlugin({
            template: `${__dirname}/src/assets/index.html`,
            filename: 'index.html',
            inject: 'body', // 把output的js引用到產生的html body內
        })
    ]
};