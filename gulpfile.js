(function() {

  var gulp = require('gulp');
  var browserSync = require('browser-sync').create();
  var browserSyncSpa = require('browser-sync-middleware-spa');
  var bump = require('gulp-bump');
  var gulpif = require('gulp-if');
  var uglify = require("gulp-uglify");
  var minify = require('gulp-minify');
  var minifyCss = require('gulp-minify-css');
  var concat = require('gulp-concat');
  var sonar = require('gulp-sonar');
  var war = require('gulp-war');
  var zip = require('gulp-zip');
  var useref = require('gulp-useref');
  var packageJson = require('./package.json');
  var baseDir = __dirname + '/app/index.html';

  /* Task registry */
  gulp.task('browser-sync', function() {
    browserSync.init({
      server: {
        baseDir: '../',
        middleware: [
          //browserSyncSpa(/^[^\.]+$/, baseDir),

          function(req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Headers', '*');
            next();
          }
        ]
      },
      startPath: 'otus-studio'
    });

    gulp.watch([
      'app/**/*.html',
      'app/**/*.js',
      'app/**/*.css'
    ]).on('change', browserSync.reload);
  });

  gulp.task('upgrade-version', function(value) {
    gulp.src('./package.json')
      .pipe(bump({
        version: process.env.npm_config_value
      }))
      .pipe(gulp.dest('./'));
  });

  gulp.task('compress', function() {
    gulp.src('app/**/*.js')
      .pipe(concat('otus-studio.js'))
      .pipe(minify({
        'mangle': false
      }))
      .pipe(gulp.dest('dist'));
  });

  gulp.task('sonar', function() {
    var options = {
      sonar: {
        host: {
          url: process.env.npm_config_sonarUrl,
        },
        jdbc: {
          url: process.env.npm_config_sonarDatabaseUrl,
          username: process.env.npm_config_sonarDatabaseUsername,
          password: process.env.npm_config_sonarDatabasePassword
        },
        projectKey: 'sonar:' + packageJson.name,
        projectName: packageJson.name,
        projectVersion: packageJson.version,
        sources: 'app',
        language: 'js',
        sourceEncoding: 'UTF-8',
        exec: {
          maxBuffer: 1024 * 1024
        },
        javascript: {
          lcov: {
            reportPath: 'target/test-coverage/report-lcov/lcov.info'
          }
        }
      }
    };

    return gulp.src('thisFileDoesNotExist.js', {
        read: false
      })
      .pipe(sonar(options));
  });

  gulp.task('war', function() {
    gulp.src(['app/**/*', 'node_modules/**/*', 'WEB-INF/*', 'index.html'], {
        base: '.'
      })
      .pipe(war({
        welcome: 'index.html',
        displayName: 'Otus Studio',
      }))
      .pipe(zip('otus-studio.war'))
      .pipe(gulp.dest("./dist"));
  });

  gulp.task('useref', function() {
    return gulp.src('app/index.html')
      .pipe(useref({
        transformPath: function(filePath) {
          return filePath.replace('app', '');
        }
      }))
      .pipe(gulpif('*.css', minifyCss()))
      .pipe(gulpif('*.js', uglify()))
      .pipe(gulp.dest('dist/otus-studio'));
  });

  gulp.task('deploy', ['useref'], function() {
    browserSync.init({
      server: {
        baseDir: '../',
        middleware: [
          //browserSyncSpa(/^[^\.]+$/, baseDir),

          function(req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Headers', '*');
            next();
          }
        ]
      },
      startPath: 'otus-studio/dist/otus-studio/'
    });
  });

}());