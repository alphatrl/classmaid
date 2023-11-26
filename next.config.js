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

  compiler: {
    styledComponents: true,
  },

  env: {
    SMU_SCRAPER_URL: process.env.SMU_SCRAPER_URL,
    SCHOOL_SEMESTERS_URL: process.env.SCHOOL_SEMESTERS_URL,
    CLASSMAID_URL: process.env.CLASSMAID_URL,
  },
};
