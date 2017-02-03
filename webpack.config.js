var webpack = require('webpack');

module.exports = {
    context: __dirname + '/app/js',
    entry: {
        app: './app.js',
        vendor: ['angular']
    },
    output: {
        path: __dirname + '/assets/js',
        filename: 'app.bundle.js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' }),
        new webpack.optimize.UglifyJsPlugin({ minimize: true })
    ]
};
