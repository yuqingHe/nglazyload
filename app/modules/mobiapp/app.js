"use strict";

define([
    "ionic",
    "modules/mobiapp/controller",
    "mobiscrolldatetime",
], function () {
    return  angular.module("mobiApp", [
            "ionic",
            "Mobi.Controller",
            "mobiscroll-datetime"
        ]).config([
                '$stateProvider','$controllerProvider',
                function ($stateProvider) {
                    $stateProvider.state('mobi', {
                        url: '/mobi',
                        templateUrl: 'app/modules/mobiapp/template.html',
                        controller: 'mobiController',
                        title: "首页"
                    });
                }
            ]);
});
