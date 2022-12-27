/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack', 'url-loader'],
    });

    config.resolve.fallback = {
      fs: false,
      stream: require.resolve('readable-stream'),
    };

    return config;
  },

  env: {
    SMU_SCRAPER_URL: process.env.SMU_SCRAPER_URL,
    SCHOOL_SEMESTERS_URL: process.env.SCHOOL_SEMESTERS_URL,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
  },
};
