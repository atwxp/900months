import path from 'path'
import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const SRC_PARH = path.join(__dirname, 'src')
const DIST_PATH = path.join(__dirname, 'dist')

export default {
    context: SRC_PARH,

    entry: './app.js',

    output: {
        path: DIST_PATH,

        filename: 'app.js'
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },

            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader']
                })
            },

            {
                test: /\.vue$/,
                // use: ['vue']
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: ExtractTextPlugin.extract({
                            fallback: 'vue-style-loader',
                            use: 'css-loader'
                        })
                    }
                }
            }
        ]
    },

    devtool: 'source-map',

    plugins: [
        new ExtractTextPlugin('index.css'),

        new HtmlWebpackPlugin({
            template: 'index.html'
        })

        // new CopyWebpackPlugin([
        //     {from: '../manifest.json'},
        //     {from: '../background.js'}
        // ])
    ],

    resolve: {
        modules: [SRC_PARH, 'node_modules'],
        // alias: {
        //     'vue$': 'vue/dist/vue.common.js'
        // },
        extensions: ['.js', '.json', '.vue']
    },

    devServer: {
        contentBase: __dirname + '/dist',
        compress: true,
        port: 9000
    }
}
