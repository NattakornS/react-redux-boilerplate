var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var Visualizer = require('webpack-visualizer-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    devServer: {
        inline: true,
        contentBase: './src',
        port: 3000,
        historyApiFallback: true,
        // proxy: {
        //     '/*.*': { // Match all URL's with period/dot
        //       target: 'http://localhost:3000/',  // send to webpack dev server
        //       rewrite: function(req){
        //         req.url='index.html';  // Send to react app
        //       }
        //     }
        //   }
    },

    entry: './dev/js/index.js',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader!sass-loader",
                  })
            },
            // {
            //     test: /\.json$/,
            //     use: ExtractTextPlugin.extract({
            //         fallback: "json-loader",
            //         use: "json-loader",
            //       })
            // },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader",
                  })
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: 'file-loader'
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'src'),
        filename: 'js/bundle.min.js'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.DefinePlugin({ // <-- key to reducing React's size
        'process.env': {
            'NODE_ENV': JSON.stringify('production')
        }
        }),
        new ExtractTextPlugin('style/style.css'),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                screw_ie8: true,
                conditionals: true,
                unused: true,
                comparisons: true,
                sequences: true,
                dead_code: true,
                evaluate: true,
                if_return: true,
                join_vars: true,
                drop_console: true
            },
            output: {
                comments: false
            },
            minimize: true
        }),
        // new Visualizer({
        //     filename: './statistics.html'
        // }),
        // new HtmlWebpackPlugin({
        //     title: 'Storage report',
        //     template: 'dev/template-dev.html', // Load a custom template (lodash by default see the FAQ for details)
        //     filename: path.resolve(__dirname, 'src/index.html')
        //   })
    ]
};
