"use strict";

define([
"ionic",
"app/modules/testapp/controller.js",
"app/modules/testapp/directive.js",
"/app/components/test/directive.js",
], function () {

    return angular.module("testApp", [
        "ionic",
        "Test.Controller",
        "test.directive",
        "appele.directive"
    ])
        .config([
            '$stateProvider','$compileProvider',
            function ($stateProvider,$compileProvider) {
                console.log($compileProvider);
                $stateProvider.state('/test', {
                    //parent: 'activity',
                    cache: false,
                    url: '/test',
                    templateUrl: 'modules/testapp/test.html',
                    controller: 'testController',
                    title:"测试",
                    resolve: {
                       vm:function () {
                           console.log("ddd");
                           
                       }
                    }

                });

            }
        ]);
});
