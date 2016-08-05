/**
 * author :陈雪冬
 * time: 2016年7月4日14:50:03
 * description:  requirejs配置文件
 */
//配置requireJS請求路徑
requirejs.config({
    // 压缩版入口  baseUrl: "./built",
     baseUrl: "./app",
    paths: {
        "ionic": "lib/ionic/js/ionic.bundle",
        "ocLazyLoad": "lib/dist/ocLazyLoad.require",
        "app": "app",
        // "mobiapp":"modules/mobiapp/app",
        // "indexapp":"app/modules/indexapp/app",
        // "poster":"modules/poster/app",
        'remlib': "lib/remlib/ScreenAdaptation",
        'jquery': "lib/jquery/jquery-2.1.4.min",
        "mobiscrolldatetime": "lib/mobiscrolldatetime/js/mobiscroll.custom-2.17.0.min",
        "moduleApp": "modules/app",
        "directiveApp": "components/app",
        "commonServices":"services/common",
        "routeState":"routeState"
    },
    shim: {
        "ionic": {
            'deps': ["jquery"]
        },
        "ocLazyLoad":{
             'deps': ["ionic"]
        },
        "routeState":{
             'deps': ["ionic"]
        },
        "mobiscrolldatetime": {
            'deps': ["ionic"]
        },
    }
});
//加载app模块,对应app目录下的app模块
require([
    "app", window.wxlib
], function (app, wxlib) {
    angular.element(document).ready(function () {

        changefontSize();
        var temp = angular.module("BaseApp");
        temp.run([
            "$rootScope", "$state", "$stateParams",
            function () {
                console.log("message");
            }
        ]);
        var mobileReg = /(android|iphone|windows phone|ipad|ipod)/;
        if (window.dev || navigator.userAgent.toLowerCase().match(/MicroMessenger/i) != "micromessenger" || !mobileReg.test(navigator.userAgent.toLowerCase())) {
            angular.bootstrap(document, ["BaseApp"]);
        } else {
            if (window.wx) {
                window.wx.ready(function () {
                    angular.bootstrap(document, ["BaseApp"]);
                });
            } else {
                angular.bootstrap(document, ["BaseApp"]);
            }
        }
    });
});
