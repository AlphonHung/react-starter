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
            },
            { // for image
                test: /\.(png|jpe?g|gif)$/i,
                loader: 'url-loader', // url-loader可將資源轉為base64格式，提高效能(但增加bundle.js size)
                options: {
                    name: 'assets/img/[name].[chunkhash].[ext]',
                    limit: 8192, // 單位bytes, 限制可轉為base64資源的大小, 超過大小改使用file-loader
                    esModule: false
                }
            },
            { // for media
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    name: 'assets/media/[name].[chunkhash].[ext]',
                    limit: 8192,
                }
            },
            { // for font style
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    name: 'assets/fonts/[name].[chunkhash].[ext]',
                    limit: 8192,
                }
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