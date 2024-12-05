// next.config.js
module.exports = {
    reactStrictMode: false,
    
  };



// module.exports = {
//   reactStrictMode: false,

//   async headers() {
//     return [
//       {
//         source: '/(.*)', // Apply CSP to all routes
//         headers: [
//           {
//             key: 'Content-Security-Policy',
//             value: `
//               default-src 'self'; 
//               frame-src 'self' https://www.youtube.com; 
//               script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.youtube.com; 
//               style-src 'self' 'unsafe-inline'; 
//               img-src 'self' https://www.youtube.com data:; 
//               connect-src 'self'; 
//               font-src 'self'; 
//               object-src 'none'; 
//               frame-ancestors 'self'; 
//               base-uri 'self'; 
//               form-action 'self';`.replace(/\s{2,}/g, ' ').trim(), // Clean up whitespace
//           },
//         ],
//       },
//     ];
//   },
// };
