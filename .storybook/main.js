const path = require('path');
const paths = [path.resolve(__dirname, '../src'), path.resolve(__dirname, '../node_modules')];

module.exports = {
  "stories": [
    "../src/**/*.stories.@(js|mdx)"
  ],
  "addons": [
    "@storybook/addon-essentials",
    {
      name: "@storybook/preset-scss",
      options: {
        sassLoaderOptions: {
          sassOptions: { includePaths: paths }
        },
      }
    }
  ],
  resolve: {
    modules: paths
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
        include: paths,
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
        include: paths
      }
    ]
  }
}