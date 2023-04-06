/** @type {import('next').NextConfig} */
const path = require('path');

module.exports = () => {

  const sassOptions = {
    includePaths: [path.join(__dirname, 'assets/sass')],
  };

  const pageExtensions = ['page.tsx', 'page.jsx'];

  const env = {
    API_URL: (() => process.env.API_URL)(),
  }
  
  return {
    swcMinify: true,
    reactStrictMode: true,
    pageExtensions,
    sassOptions,
    env
  }
}
