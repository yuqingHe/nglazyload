//配置requireJS請求路徑
requirejs.config({
    baseUrl: "./built2",
    paths: {
        "ionic": "lib/ionic/js/ionic.bundle",
        "jquery": "lib/jquery/jquery-1.11.1.min",
        "ocLazyLoad": "lib/dist/ocLazyLoad.require",
        "base": "modules/base/app",
        "commonlib":"commonlibs",
        "mobiscrolldatetime": "lib/mobiscrolldatetime/js/mobiscroll.custom-2.17.0.min",
        "routeState": "routeState"
    },
    shim: {
        "ionic": {
            'deps': ["jquery"]
        },
        "ocLazyLoad": {
            'deps': ["ionic"]
        },
        "mobiscrolldatetime": {
            'deps': ["ionic"]
        },
        "routeState": {
            'deps': ["ionic"]
        }
    }
});
//加载app模块,对应app目录下的app模块
require([
    "base"
], function (app, wxlib) {
    angular.element(document).ready(function () {
        angular.bootstrap(document, ["BaseApp"]);


    });
});