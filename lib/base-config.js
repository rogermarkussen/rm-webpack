var autoPrefixer = require('autoprefixer-core');
var HtmlPlugin = require('./html-plugin');
var pick = require('lodash.pick');

module.exports = function getBaseConfig (spec) {
  return {
    entry: [
      spec.entry
    ],
    output: spec.output,
    resolve: {
      extensions: [
        '',
        '.js',
        '.jsx',
        '.json'
      ]
    },
    plugins: [
      new HtmlPlugin(pick(spec, [
        'html',
        'isDev',
        'serveCustomHtmlInDev'
      ]))
    ],
    module: {
      loaders: [
        {
          test: /(\.js$)|(\.jsx$)/,
          exclude: /node_modules/,
          loaders: [
            'babel-loader?stage=0'
          ]
        },
        {
          test: /\.json$/,
          loaders: ['json']
        },
        {
          test: /\.(otf|eot|svg|ttf|woff)/,
          loader: 'url-loader?limit=' + spec.urlLoaderLimit
        },
        {
          test: /\.(jpe?g|png|gif)/,
          loader: 'url-loader?limit=' + spec.urlLoaderLimit
        },
        {
          test: /\.jade$/,
          loaders: ['jade']
        }
      ]
    },
    postcss: [autoPrefixer()]
  }
};
