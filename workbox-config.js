module.exports = {
  globDirectory: './build/',
  globPatterns: [
    '\*\*/\*.{html,js}'
  ],
  swDest: './build/sw.js',
  clientsClaim: true,
  skipWaiting: true
};
