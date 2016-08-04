"use strict";

define([
"ionic",
"app/modules/roomapp/controller.js"
], function () {

    return angular.module("roomApp", [
        "ionic",
        "room.Controller"
    ])
        .config([
            '$stateProvider',
            function ($stateProvider) {

                $stateProvider.state('/room', {
                    //parent: 'activity',
                    cache: false,
                    url: '/room',
                    templateUrl: 'modules/roomapp/template.html',
                    controller: 'roomController',
                    title:"首页",
                    views: {
                        "lazyLoadView": {
                            controller: 'roomController', 
                            templateUrl: 'modules/roomapp/template.html',
                        }
                    },
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('./app/modules/roomapp/controller.js');
                        }]
                    }

                });

            }
        ]);
});
