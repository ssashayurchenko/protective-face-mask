const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('autoprefixer');
const gulpAutoprefixer = require('gulp-autoprefixer').default; // Use .default to access the default export
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');

// Paths to files
const paths = {
  styles: {
    src: 'src/scss/*.scss',
    dest: 'dist/css'
  }
};

// Task to compile SCSS
function styles() {
  return src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpAutoprefixer({
      overrideBrowserslist: ['last 2 versions'],
      cascade: false
    }))
    .pipe(cleanCSS())
    .pipe(rename({
      basename: 'main',
      suffix: '.min'
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest(paths.styles.dest));
}

// Watch files for changes
function watchFiles() {
  watch(paths.styles.src, styles);
}

// Define default task
const build = series(styles, watchFiles);

exports.styles = styles;
exports.watch = watchFiles;
exports.default = build;
