import * as path from 'path';
import * as webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import WebpackPwaManifest from 'webpack-pwa-manifest';
import Dotenv from 'dotenv-webpack';

const config: webpack.Configuration = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: [/\.s[ac]ss$/i, /\.css$/i],
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: 'file-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new Dotenv({
      safe: true,
      systemvars: true,
    }),
    new HtmlWebpackPlugin({
      title: 'huat',
      template: 'src/index.html',
      favicon: 'src/images/favicon.png',
    }),
    new WebpackPwaManifest({
      name: 'SMU Shortcuts',
      short_name: 'SMU Shortcuts',
      start_url: '/',
      display: 'standalone',
      background_color: '#FFFFFF',
      description: 'Quick access to your most use sites in SMU',
      ios: true,
      icons: [
        {
          ios: 'default',
          src: './src/images/logo192.png',
          sizes: [192],
        },
        {
          src: './src/images/logo512.png',
          sizes: [512],
        },
      ],
    }),
  ],
  devServer: {
    port: 3000,
    contentBase: path.join(__dirname, 'dist'),
    host: 'localhost',
    publicPath: '/',
    hot: true,
    open: true,
    historyApiFallback: true,
  },
};

export default config;
