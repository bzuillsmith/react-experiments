const spawn = require('./util').safeSpawn;
const path = require('path');
const mkdirp = require('mkdirp');

const mainSourcePath = path.join('src','react-components','main.jsx');
const mainBuildPath = path.join('build','public','bundle.js');

mkdirp(path.dirname(mainBuildPath), function(err) {
    if(err) return console.error(err);
    spawn('.\\node_modules\\.bin\\browserify.cmd',
        ['-t', '[', 'babelify', '--presets', '[', 'react', ']', ']', mainSourcePath, '-o', mainBuildPath],
        {
            cwd: path.join(__dirname, '..')
        },
        function(err) {
            if(err) return console.error(err);
        }
    );
});
