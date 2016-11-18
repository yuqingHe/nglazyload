define([
        "ionic",
        "ocLazyLoad"
    ],
    function () {
        return angular.module("BaseApp", [
            "ionic",
            "oc.lazyLoad"
        ]) 
        .config([
                "$urlRouterProvider", "$ionicConfigProvider", "$locationProvider", '$ocLazyLoadProvider',
                function ($urlRouterProvider, $ionicConfigProvider, $locationProvider, $ocLazyLoadProvider) {
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
                        debug: window.dev
                    });
                }
            ])
        .run([
            "$rootScope", "$state", "$stateParams", "$ionicPlatform", '$ocLazyLoad', "$compile", "$browser",
            function ($rootScope, $state, $stateParams, $ionicPlatform, $ocLazyLoad, $compile, $browser) {
                $rootScope.$state = $state;
                //------------开始插入懒加载相关代码 -----------
                //缓存angular的 $state.go方法
                var func_go = $state.go;
                /**
                 * 解析URL路径,判断是否有锚点,以便直接定位到某个页面
                 * TODO 是否有权限问题
                 */
                var getUrlAnchor = function () {
                    var url = window.location.href,
                        state = "",
                        prefixLength = 2;
                    var splitPosition = url.indexOf("#");
                    if (splitPosition < 0 && window.isAllowDirectShare && window.defaultBaseHref) {
                        splitPosition = url.indexOf(window.defaultBaseHref);
                        prefixLength = window.defaultBaseHref.length;
                    }
                    url = url.substring(splitPosition);
                    var paramPositon = url.indexOf("?");
                    if (splitPosition > 0) {
                        if (paramPositon > prefixLength) {
                            state = url.substring(prefixLength, paramPositon);
                        } else {
                            state = url.substring(prefixLength);
                        }
                    }
                    return state.replace(/\//g, ".");
                };

                //获取并返回url中的参数对象
                var getUrlParams = function () {
                    var url = window.location.href;
                    var temp = url.split("#");
                    if (temp.length == 1) {
                        url = temp[0];
                    } else if (temp.length > 1) {
                        url = temp[1];
                    }
                    var i = url.indexOf("?");
                    if (i < 1) {
                        return {}
                    } else {
                        var param = url.substring(i + 1);
                        var paramArray = param.split("&");
                        var urlObject = {}
                        for (var i = 0; i < paramArray.length; i++) {
                            var urlItem = paramArray[i];
                            var item = urlItem.split("=");
                            urlObject[item[0]] = item[1];
                        }
                        return urlObject
                    }
                };
                /**
                 * 解析路由,如果有父路由,则将其父路由也解析出来,返回一个包含当前state所有父级state的数组
                 * 因为可能会出现形如A.B.C这样的state,子路由可能会强依赖父路由,因此需要同时把父路由加载
                 */
                var getStatesByPath = function (state) {
                    var pointPosition = 0,
                        states = [];
                    do {
                        pointPosition = state.indexOf('.', pointPosition + 1);
                        if (pointPosition > -1) {
                            states.push(state.substring(0, pointPosition));
                        }
                    } while (state.indexOf('.', pointPosition + 1) > 0);
                    //记得把当前的state加进去
                    states.push(state);
                    return states;
                };

                /**
                 * 根据state和module,加载模块并跳转
                 */
                var doLazyLoadAndGO = function (state, module, params, option) {
                    //解析路由
                    var states = getStatesByPath(state);
                    //TODO 模块的先后加载是否有问题还需要测试,经测试 没有问题
                    //根据state,去获取state对应的所有模块
                    var modules = $rootScope.routeState.getModuleByStates(states);
                    //根据模块,获取所有的依赖模块
                    var relyModules = $rootScope.routeState.getRelyModuleByModules(modules);

                    //加载所有模块,完成后执行跳转
                    //优先加载依赖模块
                    $ocLazyLoad.load(relyModules).then(function () {
                        //依赖模块加载完成后,加载当前模块
                        $ocLazyLoad.load(modules).then(function () {
                            func_go(state, params, option);
                        }, function (e) {
                            console.log(e);
                        });

                    }, function (e) {
                        console.log(e);
                    });
                };

                var preStateGo = function () {
                    var indexModule = "indexapp",
                        indexState = "/index",
                        routeState = $rootScope.routeState,
                        configIndexObj = routeState.indexModule,
                        anchorState = getUrlAnchor(),
                        params = getUrlParams();

                    //如果地址栏中有锚点,说明是直接跳转到某个页面,修改indexState变量
                    if (anchorState) {
                        indexState = anchorState;
                        indexModule = routeState.getModuleByState(indexState);
                    } else if (configIndexObj) {
                        indexModule = configIndexObj.moduleName ? configIndexObj.moduleName : indexModule;
                        indexState = configIndexObj.state ? configIndexObj.state : indexState;
                    }
                    //用oclazyload加载模块并跳转到state
                    doLazyLoadAndGO(indexState, indexModule, params);
                };
                //加載route-moduley映射
                requirejs(['routeState'], function (routeState) {
                    $rootScope.routeState = routeState;
                    preStateGo(routeState);
                });


                //重写go方法
                $state.go = function (state, params, option) {
                    var module = $rootScope.routeState.getModuleByState(state);
                    if (!module) {
                        console.log("模块跳转出错,出错的路由为" + state);
                        return;
                    }
                    doLazyLoadAndGO(state, module, params, option);
                    return;
                }

                $compile.loadBeforeCompile = function (directiveName, fun) {
                    var module = $rootScope.routeState.getDirectiveModuleByName(directiveName);
                    if (!module) {
                        fun();
                    } else {
                        $ocLazyLoad.load(module).then(function () {
                            fun();
                        }, function (e) {
                            console.log(e);
                        });
                    }
                };
            }
        ]);
    }
);