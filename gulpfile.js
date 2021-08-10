const {src, dest, watch} = require('gulp'),
	browserSync = require('browser-sync'),
	cssmin = require('gulp-minify-css'),
	rename = require('gulp-rename'),
	autoprefixer = require('gulp-autoprefixer'),
	sass = require('gulp-sass');

function style() {
	return src(['css/*.css', '!css/*.min.css'])
		.pipe(cssmin())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(dest('css'));
};

function bs() {
	servSass();
	style();
	browserSync.init({
		server: {
			baseDir: "./"
		}
	});

	watch("./*.html").on('change', browserSync.reload);
	watch("./sass/**/*.sass", servSass);
	watch("./sass/**/*.scss", servSass);
	watch("./js/**/*.js").on('change', browserSync.reload);
};

function servSass() {
	return src("./sass/**/*.sass", "./sass/**/*.scss")
		.pipe(sass())
		.pipe(autoprefixer({
			cascade: false
	}))
		.pipe(dest("./css"))
		.pipe(browserSync.stream());
}

exports.serve = bs;