const path = require('path');
const entry = ['./client/index.js'];
const output = {
  path: path.resolve(__dirname, 'build'),
  publicPath: '/build/',
  filename: 'bundle.js',
};

module.exports = {
  mode: 'development',
  entry,
  output,
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: [
            '@babel/plugin-transform-runtime',
            '@babel/transform-async-to-generator',
          ],
        },
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  // devServer: {
  //   compress: true,
  //   host: 'localhost',
  //   publicPath: '/build/',
  //   port: 8080,
  //   proxy: {
  //     '/api': 'http://localhost:3000',
  //   },
  // },
};
