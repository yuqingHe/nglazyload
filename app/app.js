
define([
    "ionic",
    "moduleApp",
    "remlib",
    "ocLazyLoad",
    // "directiveApp",
    "commonServices",
    "routeState"
],
    function () {
        return angular.module("BaseApp", [
            "ionic", "moduleApp", "commonServices", "oc.lazyLoad"
        ])
            .config([
                "$urlRouterProvider", "$ionicConfigProvider", "$locationProvider", '$ocLazyLoadProvider', function ($urlRouterProvider, $ionicConfigProvider, $locationProvider, $ocLazyLoadProvider) {
                    $urlRouterProvider.otherwise("/index");
                    $ionicConfigProvider.platform.android.tabs.style("bottom");
                    $ionicConfigProvider.platform.android.tabs.position("bottom");
                    ionic.Platform.isFullScreen = true;
                    $ionicConfigProvider.scrolling.jsScrolling(true);
                    //关闭ionic页面切换动画
                    $ionicConfigProvider.views.transition("none");
                    //是否可直接分享，直接分享
                    if (window.isAllowDirectShare) {
                        $locationProvider.html5Mode(true);
                    }
                    $ocLazyLoadProvider.config({
                        jsLoader: requirejs,
                        debug: true
                    });
                }
            ])
            .run([
                "$rootScope", "$state", "$stateParams", "$ionicPlatform", '$ocLazyLoad',
                function ($rootScope, $state, $stateParams, $ionicPlatform, $ocLazyLoad) {
                    $rootScope.$state = $state;
                    var func_go=$state.go;

                    //加載route-moduley映射
                    requirejs(['routeState'], function (routeState) {
                        var indexModule = "indexapp", indexState = "/index", configIndexObj = routeState.indexModule;
                        $rootScope.routeState = routeState;
                        if (configIndexObj) {
                            indexModule = configIndexObj.moduleName ? configIndexObj.moduleName : indexModule;
                            indexState = configIndexObj.state ? configIndexObj.state : indexState;
                        }
                        //加载主模块,跳转到默认首页
                        $ocLazyLoad.load(indexModule).then(function () {


                            //可以在此处加载模板
                          func_go( indexState);
                        }, function (e) {
                            console.log(e);
                        });
                    });

                    //重写go方法
                    $state.go=function(state,params,option){
                        var module = $rootScope.routeState.getModuleByState(state);
                        if (!module) {
                            console.log("模块跳转出错,出错的路由为" + state);
                            return ;
                        }
                        $ocLazyLoad.load(module).then(function () {                            
                            func_go(state,params,option);
                        }, function (e) {
                            console.log(e);
                        });
                    }


                    // $rootScope.ocLazyLoadModule = function (state) {
                    //     var module = $rootScope.routeState.getModuleByState(state);
                    //     if (!module) {
                    //         console.log("模块跳转出错,出错的路由为" + state);
                    //         return ;
                    //     }
                    //     $ocLazyLoad.load(module).then(function () {
                    //         $state.go(state);
                    //     }, function (e) {
                    //         console.log(e);
                    //     });

                    // }
                    $rootScope.$stateParams = $stateParams;
                    window.changeFontSizeNewMicoSite();

                    $ionicPlatform.ready(function () {
                        ionic.keyboard.disable();
                    });
                }
            ])
            .config([
                "$httpProvider", function ($httpProvider) {
                    $httpProvider.interceptors.push([
                        "$q", "$rootScope", function ($q, $rootScope) {
                            return {
                                request: function (config) {
                                    //监控Angularjs get请求 如果请求地址含有html文件，则给其加版本戳，已防止缓存
                                    var urlArgs = "version=" + (new Date()).getTime();
                                    var baseUrl = "";
                                    if (typeof (requirejs) != "undefined") {
                                        urlArgs = requirejs.s.contexts._.config.urlArgs;
                                        baseUrl = requirejs.s.contexts._.config.baseUrl;

                                    }
                                    if (config.method == "GET") {
                                        if (config.url.indexOf(".html") !== -1 || config.url.indexOf(".htm") !== -1) {
                                            baseUrl = "/app/";
                                            var separator = config.url.indexOf("?") === -1 ? "?" : "&";
                                            //                                    config.url = baseUrl + config.url + separator + urlArgs;
                                            config.url = baseUrl + config.url;
                                            //config.url = config.url + separator + urlArgs;
                                        }
                                    }
                                    return config;
                                },

                            };
                        }
                    ]);
                }
            ]);
    }
);
