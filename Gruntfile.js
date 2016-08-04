"use strict";

module.exports = function (grunt) {

    var cfg = {
        src: "app/",
        dist: "dist/",
        tmp: "tmp/"
    };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        cfg: cfg,
        watch: {
            files: ['app/scss/*.scss'],
            tasks: ['sass']
        },
        sass: {
            options: {
                sourceMap: false,
            },
            dist: {
                files: {
                    'app/css/style.css': "app/scss/style.scss"
                }
            }
        },
        imagemin: {
            dynamic: {
                options: {
                    optimizationLevel: 3 // png图片优化水平，3是默认值，取值区间0-7
                },
                files: [
                    {
                        expand: true, // 开启动态扩展
                        cwd: "app/img/", // 当前工作路径
                        src: ["**/*.{png,jpg,gif}"], // 要出处理的文件格式(images下的所有png,jpg,gif)
                        dest: "app/img/" // 输出目录(直接覆盖原图)
                    }
                ]
            }
        },
        requirejs: {
            compile: {
                "options": {
                    paths: {
                        "ionic": "lib/ionic/js/ionic.bundle",
                        "ocLazyLoad": "lib/dist/ocLazyLoad.require",
                        'remlib': "lib/remlib/ScreenAdaptation",
                        'jquery': "lib/jquery/jquery-2.1.4.min",
                        "mobiscrolldatetime": "lib/mobiscrolldatetime/js/mobiscroll.custom-2.17.0.min",
                        "directiveApp": "components/app",
                        "commonServices": "services/common",
                        "routeState": "routeState"
                    },
                    optimize: "uglify",
                    uglify: {
                        // 是否混淆变量名
                        mangle: false,
                        compress: {
                            //删除console.log
                            drop_console: true,
                            dead_code: true
                        },
                        //删除注释
                        preserveComments: false,
                    },
                    baseUrl: "./app",
                    dir: 'built2',
                    modules: [{
                        name: 'modules/common',
                        include: ["ionic", "ocLazyLoad", 'jquery', "mobiscrolldatetime", "routeState"]
                    }, {
                            name: 'modules/indexapp/app',
                            exclude: ['modules/common']
                        }, {
                            name: 'modules/mobiapp/app',
                            exclude: ['modules/common']
                        }],
                }
            }
        },
        browserSync: {
            bsFiles: {
                src: [
                    '*/*/*.css',
                    '*/*.js',
                    '*/*/*.js',
                    '*/*/*/*.js',
                    '*/*/*/*.html',
                    '*/*/*.html',
                    '*.html']
            },
            options: {
                watchTask: true,
                server: {
                    baseDir: "./"
                }
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                files: {
                    "app/modules/indexapp/app1.js": ["app/modules/indexapp/app.js",
                        "app/modules/indexapp/controller.js",
                    ]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-requirejs');

    grunt.registerTask('default', ['browserSync', 'watch']);
    // grunt.registerTask('default', ['requirejs']);
};