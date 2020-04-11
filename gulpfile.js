const gulp = require("gulp");
const concat = require("gulp-concat");

const scripts = [
    "./node_modules/angular/angular.js",
    "./node_modules/angular-material/angular-material.js",
    "./node_modules/angular-aria/angular-aria.min.js",
    "./node_modules/angular-messages/angular-messages.min.js",
    "./node_modules/angular-animate/angular-animate.min.js",
    "./node_modules/@uirouter/angularjs/release/angular-ui-router.js",
    "./Client/index.js",
    "./Client/**/*.js"
];
let styles = [
    "./node_modules/angular-material/angular-material.css"
];

let template = [
    "./Client/**/*.html"
]

gulp.task("css", function () {
    return gulp
        .src(styles)
        .pipe(concat("style.css"))
        .pipe(gulp.dest("./dist/css"))
});

gulp.task("scripts", function () {
    return gulp
        .src(scripts)
        .pipe(concat("script.js"))
        .pipe(gulp.dest("./dist/js"))

});

gulp.task("html", function () {
    return gulp
        .src(template)
        .pipe(gulp.dest("./dist"))
});

gulp.task("watch", function () {
    gulp.watch("./Client/**/*.html", gulp.series("html"));
    gulp.watch("./Client/**/*.js", gulp.series("scripts"));
    gulp.watch("./Client/**/*.css", gulp.series("css"));
});

gulp.task("default", gulp.parallel("css", "scripts", "html", "watch"));