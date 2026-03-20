/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack', 'url-loader'],
        as: '*.js',
      },
    },
    resolveAlias: {
      stream: 'readable-stream',
    },
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        port: '',
        pathname: '/**',
      },
    ],
  },

  env: {
    SMU_SCRAPER_URL: process.env.SMU_SCRAPER_URL,
    SCHOOL_SEMESTERS_URL: process.env.SCHOOL_SEMESTERS_URL,
  },
};
