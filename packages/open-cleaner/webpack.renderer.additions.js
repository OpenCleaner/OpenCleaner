const path = require('path');

module.exports = {
  resolve: {
    alias: {
      '@common': path.resolve(__dirname, 'src/common'),
      '@main': path.resolve(__dirname, 'src/main'),
      '@renderer': path.resolve(__dirname, 'src/renderer'),

      '@components': path.resolve(__dirname, 'src/renderer/components'),
      '@views': path.resolve(__dirname, 'src/renderer/views')
    }
  } 
};