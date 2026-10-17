/**
 * @type {import('next').NextConfig}
 */
module.exports = {
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
