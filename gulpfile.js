/* jshint node: true */
/* jshint esversion: 6 */
"use strict";

const Gulp = require('gulp'),
       TSC = require('gulp-typescript'),
       TSDoc = require('gulp-typedoc'),
       SourceMaps = require('gulp-sourcemaps'),
       Inject = require('gulp-inject'),
       Concat = require('gulp-concat'),
       Uglify = require('gulp-uglify'),
       Browserify = require('browserify'),
       TSify = require('tsify'),
       VSS = require('vinyl-source-stream'),
       VBuffer = require('vinyl-buffer')
       ;

let sources = "./src/*.ts";
let tsProject = TSC.createProject("./tsconfig.json");

Gulp.task('ts:compile', _ => {
    var script = Browserify().add('src/image.ts').plugin('tsify', {
        target: 'es3',
        module: 'commonjs'
    })
    .bundle();

    script.pipe(VSS("assetzen.js"))
    .pipe(Gulp.dest('dist/'));

    script.pipe(VSS("assetzen.min.js"))
        .pipe(VBuffer())
        .pipe(Uglify({mangle: true}))
        .pipe(Gulp.dest('dist/'));
});

Gulp.task('ts:doc', _ => {
    return Gulp.src(sources).pipe(TSDoc({
        module: 'commonjs',

        out: "./doc",
        json: "./dist/docs.json",

        name: "AssetZen.js",
        version: true
    }));
});


// Default Task
Gulp.task('default', ['ts:compile']);

Gulp.task('watch', ['ts:compile'], _ => {
});