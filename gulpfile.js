var gulp = require('gulp');
var tsc  = require('gulp-tsc');

var paths = {
    tscripts : {
        src : [
            'src/**/*.ts'
        ],
        dest : 'dist'
    }
};

gulp.task('compile:typescript', function () {
    return gulp
        .src(paths.tscripts.src)
        .pipe(tsc({
            emitError: false,
            target: 'ES5',
            modules: 'commonjs',
            outDir: paths.tscripts.dest,
            declaration: true
        }))
        .pipe(gulp.dest(paths.tscripts.dest));
});
