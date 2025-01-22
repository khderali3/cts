const createNextIntlPlugin = require('next-intl/plugin');
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,  // Disable React Strict Mode

};
 
module.exports = withNextIntl(nextConfig);





 