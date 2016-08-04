"use strict";

define([
"ionic",
"modules/poster/controller",
// "directiveApp"
], function () {

    return angular.module("posterApp", [
        "ionic",
        "Poster.Controller",
        // "directiveApp"
    ])
        .config([
            '$stateProvider','$compileProvider',
            function ($stateProvider,$compileProvider) {
                console.log($compileProvider);
                $stateProvider.state('/poster', {
                    cache: false,
                    url: '/poster',
                    templateUrl: 'modules/poster/test.html',
                    controller: 'posterController',
                    title:"海报",
                    resolve: {
                       vm:function () {
                           
                       }
                    }

                });

            }
        ]);
});
