const gulp = require('gulp');
const exec = require('./scripts/util').safeExec;
const server = require('gulp-express');

gulp.task('copy', function() {
    gulp.src([
        'src/app.js',
        'src/public/index.html',
        'src/data/*'
    ], { base: 'src' })
        .pipe(gulp.dest('build'));
});

gulp.task('react-build', function(done) {
    exec('node scripts\\compile', function(err) {
        if (err) console.error(err);
        done();
    });
});

gulp.task('run', function() {
    gulp.watch(['src/react-components/*.jsx'], function(event) {
        gulp.run('react-build');
        server.notify(event);
    });
    gulp.watch(['src/public/**/*', 'src/app.js', 'src/data/*'], ['copy']);
    
    gulp.watch(['build/app.js'], [server.run]);
    
    server.run(['build/app.js']);
});

gulp.task('default', ['copy', 'react-build', 'run'], function() {
});