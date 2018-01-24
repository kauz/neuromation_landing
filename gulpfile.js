/* $ gulp :
1. buld:
            rmdir /dist, [sass, useref



    */
// Load in dependencies
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var gulpIf = require('gulp-if');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var merge = require('merge-stream');
var spritesmith = require('gulp.spritesmith');


//Default task: build+watch-sync
gulp.task('default', ['build'], function (callback) {
  runSequence(['browserSync', 'watch'],
    callback
  )
});


//Manually build app
gulp.task('build', function (callback) {
  runSequence('clean:dist',
    ['useref', 'images'], 'autoprefixer',
    callback
  )
});


//Watch for changes
gulp.task('watch', ['browserSync', 'sass'], function (){
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/js/**/*.js', browserSync.reload);
    gulp.watch('app/vendor/**/*.js', browserSync.reload);
    gulp.watch('app/fonts/**/*', browserSync.reload);
    gulp.watch('app/images/**/*', ['build', browserSync.reload]);
});


//Combine images from /icons and /logos to sprites
gulp.task('sprite', function () {
    // Generate spritesheets
    var iconSpriteData = gulp.src('app/images/icons/*.*').pipe(spritesmith({
        imgName: 'icons.png',
        imgPath: '../images/sprites/icons.png',
        cssName: '_icons.scss',
        cssFormat: 'scss',
        padding: 10,
        cssVarMap: function (sprite) {
            sprite.name = 'icon-' + sprite.name;
        }
    }));
    var logoSpriteData = gulp.src('app/images/logos/*.*').pipe(spritesmith({
        imgName: 'logos.png',
        imgPath: '../images/sprites/logos.png',
        cssName: '_logos.scss',
        cssFormat: 'scss',
        padding: 20,
        cssVarMap: function (sprite) {
            sprite.name = 'logo-' + sprite.name;
        }
    }));

    // Output images
    var iconImgStream = iconSpriteData.img.pipe(gulp.dest('app/images/sprites'));
    var logoImgStream = logoSpriteData.img.pipe(gulp.dest('app/images/sprites'));

    // Concatenate CSS streams
    var scssStream = merge(iconSpriteData.css, logoSpriteData.css)
        .pipe(concat('_sprite.scss'))
        .pipe(gulp.dest('app/scss/partials'));

    // Return a merged stream to handle all `end` events
    return merge(iconImgStream, logoImgStream, scssStream);
});


//Create vendor prefixes at dist/css
gulp.task('autoprefixer', function() {
    return gulp.src('dist/css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist/css'))
});


//Convert sass to css, move to dist
gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

//Move html to dist
gulp.task('html', function(){
    return gulp.src('app/*.html')
        .pipe(gulp.dest('dist'))
});

//Move js to dist
gulp.task('js', function(){
    return gulp.src('app/**/*.js')
        .pipe(gulp.dest('dist'))
});


//Minify css & js, then move to dist
gulp.task('useref', ['html', 'sass', 'js', 'fonts'],  function(){
  return gulp.src('dist/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    // Minifies only if it's a CSS file
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});


//Minify images and move to dist
gulp.task('images', ['sprite'], function(){
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
  // Caching images that ran through imagemin
  .pipe(cache(imagemin({
      interlaced: false
    })))
  .pipe(gulp.dest('dist/images'))
});


//Move fonts to dist
gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
});


//Clean dist
gulp.task('clean:dist', function() {
  return del.sync('dist');
});


//Clear cache
gulp.task('cache:clear', function (callback) {
return cache.clearAll(callback)
});


//Sync browser
gulp.task('browserSync', function() {
      browserSync.init({
	  server: {
				baseDir: 'dist'
			},
          open: 'external',
          host: 'neuromation.dev',
          port: 3000
    });
});
