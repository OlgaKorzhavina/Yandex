const {src, dest, series, watch} = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify-es').default;
const del = require('del');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const htmlmin = require('gulp-htmlmin');
const notify = require('gulp-notify');
const image = require('gulp-image');
const concat = require('gulp-concat');

const clean = () => {
	return del(['app/*'])
}



const styles = () => {
  return src('./src/css/**/*.css')
    .pipe(sourcemaps.init())
    .pipe(autoprefixer({
      cascade: false,
    }))
    .pipe(cleanCSS({ level: 2 }))
		.pipe(concat('main.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./app/css/'))
    .pipe(browserSync.stream());
};



const resources = () => {
  return src('./src/resources/**')
    .pipe(dest('./app'))
}

const images = () => {
  return src([
		'./src/img/**.jpg',
		'./src/img/**.png',
		'./src/img/**.jpeg',
		'./src/img/**.svg',
		'./src/img/**.webp',
		])
    .pipe(image())
    .pipe(dest('./app/img'))
};

const scripts = () => {
  return src(
    ['./src/js/**/*.js'])
    .pipe(sourcemaps.init())
		.pipe(babel({
			presets: ['@babel/env']
		}))
    .pipe(concat('scripts.js'))
    .pipe(uglify().on("error", notify.onError()))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./app/js'))
    .pipe(browserSync.stream());
}


const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: "./app"
    },
  });

  watch('./src/css/**/*.css', styles);
	watch('./src/*.html', htmlMinify);
  watch('./src/js/**/*.js', scripts);
  watch('./src/resources/**', resources);
  watch('./src/img/*.{jpg,jpeg,png,svg}', images);
	watch('./src/img/**/*.{jpg,jpeg,png}', images);
}

const htmlMinify = () => {
	return src('src/**/*.html')
		.pipe(htmlmin({
			collapseWhitespace: true
		}))
		.pipe(dest('app'))
		.pipe(browserSync.stream());
}

exports.styles = styles;
exports.htmlMinify = htmlMinify;
exports.default = series(clean, styles, resources, scripts, images, htmlMinify, watchFiles);




const htmlMinifyBuild =() =>{
  return src ('src/**/*.html')
  .pipe(htmlmin({
      collapseWhitespace: true,
  }))

  .pipe(dest('app'))

};


const stylesBuild =() =>{return src('./src/css/**/*.css')
.pipe(sourcemaps.init())
.pipe(autoprefixer({
  cascade: false,
}))
.pipe(cleanCSS({ level: 2 }))
.pipe(concat('main.css'))
.pipe(sourcemaps.write('.'))
.pipe(dest('./app/css/'))
.pipe(browserSync.stream());

};


const fontsBuild =() =>{

  return src ([
      'src/fonts/**/*.woff',
  'src/fonts/**/*woff2',
'src/fonts/**/*ttf'])

  .pipe(dest('app/fonts'))

}


const scriptsBuild = () =>{
  return src(
    ['./src/js/**/*.js'])
    .pipe(sourcemaps.init())
		.pipe(babel({
			presets: ['@babel/env']
		}))
    .pipe(concat('scripts.js'))
    .pipe(uglify().on("error", notify.onError()))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./app/js'))
    .pipe(browserSync.stream());
};





const watchFilesBuild = () => {
  browserSync.init({
    server: {
      baseDir: "./app"
    },
  });
  watch('./src/css/**/*.css', stylesBuild);
	watch('./src/*.html', htmlMinifyBuild);
  watch('./src/js/**/*.js', scriptsBuild);
  watch('./src/resources/**', resources);
  watch('./src/img/*.{jpg,jpeg,png,svg}', images);
	watch('./src/img/**/*.{jpg,jpeg,png}', images);
}


exports.build = series(clean, resources, htmlMinifyBuild, scriptsBuild, stylesBuild, images, fontsBuild, watchFilesBuild);
