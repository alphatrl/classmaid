const withPWA = require('next-pwa');

module.exports = withPWA({
  target: 'serverless',
  pwa: {
    dest: 'public',
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack', 'url-loader'],
    });

    config.node.fs = 'empty';

    return config;
  },

  env: {
    SERVER_URL: process.env.SERVER_URL,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
  },
});
