const gulp = require('gulp');
const swPrecache = require('sw-precache');

gulp.task('generate-service-worker', function(callback) {
  swPrecache.write('serviceWorker.js', {
    staticFileGlobs: [
      '*.html',
      'js/*.js',
      'images/*.{png,svg}',
      'css/*.css',
      'fonts/*.otf',
      'manifest.json'
    ],
    skipWaiting: false
  });
});

gulp.task('default', ['generate-service-worker']);