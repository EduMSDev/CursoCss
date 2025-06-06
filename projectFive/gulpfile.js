const { src, dest, watch } = require('gulp')
const sass = require('gulp-sass')(require('sass'));
const postcsss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

//imagenes
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css(done) {
    //paso:1 identificar archivo,2- compilarla. 3guardar el css

    src('src/scss/app.scss')
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(postcsss([autoprefixer()]))
        .pipe(dest('build/css'));
    done();

};

function dev() {
    watch('src/scss/**/*.scss', css);
    watch('src/img/**/*', img);
}

function img(done) {
    src('src/img/**/*')
        //comprime imagenes
        .pipe(imagemin({ optimizationLevel: 3 }))
        .pipe(dest('build/img'));
    done();
}

function imagenwebp(done) {
    src('src/img/**/*.{jpg,png}')
        .pipe(webp())
        .pipe(dest('build/img'));
    done();
}

function imagenavif(done) {
    src('src/img/**/*.{jpg,png}')
        .pipe(avif())
        .pipe(dest('build/img'));
    done();
}

exports.css = css;
exports.dev = dev;
exports.img = img;
exports.imagenwebp = imagenwebp;
exports.imagenavif = imagenavif;