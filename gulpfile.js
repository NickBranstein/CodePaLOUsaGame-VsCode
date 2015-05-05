var gulp   = require('gulp');
var runseq = require('run-sequence');
var del = require('del');
var $ = require('gulp-load-plugins')();

var paths = {
	tscripts : { src : ['app/src/ts/*'],	dest : 'app/build/js' },
	html: { src: 'app/src/*.html', dest: 'app/build' },
	assets: { src: ['app/src/**/*.png', 'app/src/**/?(*.mp3|*.ogg)'], dest: 'app/build' },
	open: 'app/build/index.html'
};

gulp.task('default', ['buildrun']);

// ** Running ** //
gulp.task('run', function(){
	gulp.src(paths.open)
	.pipe($.open());
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
gulp.task('build', ['compilets', 'assets']);

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

// ** Cleaning ** //
gulp.task('clean', function(){
	del(['app/build']);
});