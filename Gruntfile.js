"use strict";

module.exports = function (grunt) {


    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
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
          clean: {
            tmp: "built2",
        },
        requirejs: {
            compile: {
                "options": {
                    paths: {
                        "ionic": "lib/ionic/js/ionic.bundle",
                        "jquery": "lib/jquery/jquery-1.11.1.min",
                        "ocLazyLoad": "lib/dist/ocLazyLoad.require",
                        "mobiscrolldatetime": "lib/mobiscrolldatetime/js/mobiscroll.custom-2.17.0.min",
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
                        name: 'commonlibs',
                        include: ["ionic", "ocLazyLoad", 'jquery', "mobiscrolldatetime", "routeState"]
                    }, {
                        name: 'modules/indexapp/app',
                        exclude: ['commonlibs']
                    }, {
                        name: 'modules/mobiapp/app',
                        exclude: ['commonlibs']
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
                    '*.html'
                ]
            },
            options: {
                watchTask: true,
                server: {
                    baseDir: "./"
                }
            }
        },
        
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
     grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    //虚拟服务器,在命令行输入grunt后直接打开浏览器访问该项目
    grunt.registerTask('default', ['browserSync', 'watch']);
    //压缩文件
    // grunt.registerTask('default', ['clean','requirejs']);
};
