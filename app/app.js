
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
                    // $urlRouterProvider.otherwise("/index");
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
                    var func_go = $state.go;
                    /**
                     * 解析URL路径,判断是否有锚点
                     */
                    var getUrlAnchor = function () {
                        var url = window.location.href, state = "";
                        var splitPosition = url.indexOf("#");
                        if (splitPosition > 0) {
                            state = url.substring(splitPosition + 1);
                        }
                        return state;
                    };
                    /**
                     * 根据state的路径来获取其父state
                     */
                    var getStatesByPath = function (state) {
                        var pointPostion = 0, states = [];
                        do {
                            pointPostion = state.indexOf('.', pointPostion + 1);
                            if (pointPostion > -1) {
                                states.push(state.substring(0, pointPostion));
                            }
                        } while (state.indexOf('.', pointPostion + 1) > 0);
                        //记得把当前的state加进去
                        states.push(state);
                        return states;
                    };
                    /**
                     * 根据state和module,加载模块并跳转
                     */
                    var doLazyLoadAndGO = function (state, module, params, option) {
                        //判断是否有父子模块
                        var states = getStatesByPath(state);
                        //TODO 模块的先后加载是否有问题还需要测试
                        var modules = $rootScope.routeState.getModuleByStates(states);
                        var relyModules= $rootScope.routeState.getRelyModuleByModules(modules);

                        $ocLazyLoad.load(relyModules.concat(modules)).then(function () {
                            func_go(state, params, option);
                        }, function (e) {
                            console.log(e);
                        });
                    };

                   
                    //加載route-moduley映射
                    requirejs(['routeState'], function (routeState) {
                        var indexModule = "indexapp", indexState = "/index", configIndexObj = routeState.indexModule, anchorState = getUrlAnchor();
                        $rootScope.routeState = routeState;
                        if (anchorState) {
                            indexState = anchorState;
                            indexModule = routeState.getModuleByState(indexState);
                        } else if (configIndexObj) {
                            indexModule = configIndexObj.moduleName ? configIndexObj.moduleName : indexModule;
                            indexState = configIndexObj.state ? configIndexObj.state : indexState;
                        }
                        //用oclazyload加载模块并跳转到state
                        doLazyLoadAndGO(indexState, indexModule);
                    });


                    //重写go方法
                    $state.go = function (state, params, option) {
                        var module = $rootScope.routeState.getModuleByState(state);
                        if (!module) {
                            console.log("模块跳转出错,出错的路由为" + state);
                            return;
                        }
                        $ocLazyLoad.load(module).then(function () {
                            func_go(state, params, option);
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
