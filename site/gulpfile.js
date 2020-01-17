const { series, src, dest, parallel } = require('gulp');
const ts = require('gulp-typescript');
const nodemon = require('gulp-nodemon');
const del = require('del');


const paths = {
    assets: {
        src: 'src/assets/**/*',
        dest: 'dist/assets'
    },
    styles: {
        src: 'src/**/*.css',
        dest: 'dist'
    },
    pages: {
        src: 'src/**/*.html',
        dest: 'dist'
    },
    sitemap: {
        src: 'src/sitemap.xml',
        dest: 'dist'
    },
    robots: {
        src: 'src/robots.txt',
        dest: 'dist'
    }
}

function robots() {
    return src(paths.robots.src)
        .pipe(dest(paths.robots.dest));
}

function sitemap() {
    return src(paths.sitemap.src)
        .pipe(dest(paths.sitemap.dest));
}

function assets() {
    return src(paths.assets.src)
        .pipe(dest(paths.assets.dest));
}

function styles() {
    return src(paths.styles.src)
        .pipe(dest(paths.styles.dest));
}

function pages() {
    return src(paths.pages.src)
        .pipe(dest(paths.pages.dest));
}

function app() {
    return src(paths.app.src)
        .pipe(dest(paths.app.dest));
}


function clean() {
    return del(['dist']);
}

function build() {
    const tsProject = ts.createProject('./tsconfig.json');
    return tsProject
        .src()
        .pipe(tsProject())
        .js
        .pipe(dest("dist/scripts"));
}


/**
 *Start the node app
 */
async function debug() {
    return nodemon({
        exec: 'firebase serve',
        ext: 'ts',
        watch: 'src/**/*',
        tasks: ['build']
    });
}

exports.build = series(clean, parallel(pages, styles, assets, sitemap, robots, build));
exports.default = series(clean, parallel(pages, styles, assets, sitemap, robots, build), debug);
