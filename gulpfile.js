var gulp   = require('gulp');
var runseq = require('run-sequence');
var del = require('del');
var $ = require('gulp-load-plugins')();

var paths = {
	tscripts : { src : ['src/ts/*'], dest : 'build/js' },
	scripts : { src : ['src/scripts/*'], dest : 'build/js' },
	html: { src: 'src/*.html', dest: 'build' },
	assets: { src: ['src/**/*.png', 'src/**/?(*.mp3|*.ogg)'], dest: 'build' },
	open: 'build/index.html'
};

gulp.task('default', ['buildrun']);

// ** Running ** //
gulp.task('run', function(){
	$.connect.server({
		root: './',
		port: 9999		
	});
	
	gulp.src(paths.open)
	.pipe($.open('', {url: 'http://localhost:9999/build'}));
});

gulp.task('buildrun', function () {
	runseq('build', 'run');
});

// ** Watching ** //
gulp.task('watch', function () {
	gulp.watch(paths.tscripts.src, ['compilets']);
});

gulp.task('watchrun', function () {
	gulp.watch(paths.tscripts.src, runseq('compilets', 'run'));
});

// ** Compilation ** //
gulp.task('build', ['compilets', 'assets', 'scripts']);

gulp.task('compilets', function () {
	var targetSrc = gulp.src(paths.html.src);
	
	var ts = gulp
	.src(paths.tscripts.src)
	.pipe($.tsc({
		module: "commonjs",
		emitError: false
	}))
	.pipe($.uglify())
	.pipe(gulp.dest(paths.tscripts.dest));
	
	return targetSrc.pipe($.inject(ts, {relative: true}))
		.pipe(gulp.dest(paths.html.dest));
});

gulp.task('assets', function () {
	return gulp.src(paths.assets.src)
		.pipe(gulp.dest(paths.assets.dest));
});

gulp.task('scripts', function () {
	return gulp.src(paths.scripts.src)
		.pipe(gulp.dest(paths.scripts.dest));
});

// ** Cleaning ** //
gulp.task('clean', function(){
	del(['build']);
});