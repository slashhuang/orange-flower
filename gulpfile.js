//var gulp = require("gulp"),                     //  gulp主模块
//    minifycss = require("gulp-minify-css"),     //  css压缩模块
//    concat = require("gulp-concat"),            //  css、js合并模块
//    uglify = require("gulp-uglify"),            //  丑化js模块
//    rename = require("gulp-rename"),            //  文件重命名模块
//    imagemin = require("gulp-imagemin"),        //  压缩图片
//    clean = require("gulp-clean"),              //  清除目录模块
//    notify = require("gulp-notify");            //  通知模块,任务完成
//
//gulp.task("scripts", function () {
//    return gulp.src("js/*.js")                          //  需要处理的js源文件
//        .pipe(concat("main.js"))                        //  连接后的js文件名为main.js
//        .pipe(gulp.dest("build/js"))                    //  将合并后的文件写到build/js目录
//        .pipe(rename({suffix: ".min"}))                 //  后缀名 -> main.min.js
//        .pipe(uglify())                                 //  运行js压缩
//        .pipe(gulp.dest("build/js"))                    //  将压缩过的文件写到build/js目录
//        .pipe(notify({"message":"js合并/丑化完成！"}));    //  任务完成,消息通知
//});
////  处理脚本相关事件
//
//gulp.task("minifycss", function () {
//    return gulp.src("css/*.css")
//        .pipe(concat("main.css"))
//        .pipe(gulp.dest("build/css"))
//        .pipe(rename({suffix: ".min"}))
//        .pipe(minifycss("css"))
//        .pipe(gulp.dest("build/css"))
//        .pipe(notify({"message":"css合并/丑化完成！"}));
//});
////  css压缩事件
//
//gulp.task("imagemin", function () {
//    return gulp.src("img/*")
//        .pipe(imagemin({optimizationLevel: 3}))//  3 ~ 7,数字越大效果就越好
//        .pipe(gulp.dest("build/img"))
//        .pipe(notify({"message":"图片压缩完成！"}));
//});
////  图片压缩
//
//gulp.task("clean", function () {
//    return gulp.src(["build/*"], {read: false})         //  清除的目标路径,read false指定对这些文件进行读取,增加效率
//        .pipe(clean({force: true}))                     //  强制清除build目录下的所有文件和目录
//        .pipe(notify({"message":"build目录清理完成！"}));
//});
////  删除文件
//
//gulp.task("default", ["clean"], function () {
//    gulp.start("imagemin", "minifycss", "scripts");
//});

var gulp = require('gulp'),
    rjs = require('gulp-requirejs');

gulp.task('requirejsBuild', function() {
    rjs({
        baseUrl: './js',
        out: 'gulpTest',
        paths:{
            "angular":"lib/angular",
            "zepto":"lib/zepto.min",
            "util":"lib/common_util",
            "jquery":"lib/jquery",
            "formSubmit":"lib/jquery.form.min",
            "swiper":"lib/swiper",
            "cookie":"lib/cookie",
            "pingpp":"lib/pingpp_pay",
            "iscroll":"lib/iscroll"
        },
        shim:{
            "angular":{
                "exports":"angular"
            },
            "lib/angular-route": {
                deps: ["angular"]
            },
            "lib/angular-cookies":{
                deps:['angular']
            },
            "zepto":{
                "exports":"$"
            },
            'iscroll':{
                exports: 'iscroll'
            },
            "swiper":{
                "deps":["zepto"],
                "exports":"swiper"
            },
            "pingpp":{
                "exports": "pingpp"
            }
        }
    }).pipe(gulp.dest('./delpoy/')); // pipe it to the output DIR
});