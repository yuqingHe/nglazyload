"use strict";

define([
"ionic",
"modules/indexapp/controller"
], function () {
    return angular.module("indexApp", [
        "ionic",
        "Index.Controller"
    ])
        .config([
            '$stateProvider',
            function ($stateProvider) {
                $stateProvider.state('index', {
                    cache: false,
                    url: '/index',
                    templateUrl: 'app/modules/indexapp/template.html',
                    controller: 'indexController',
                    title:"首页",
                    resolve: {   
                                            
                    }
                });
            }
        ]);
});
