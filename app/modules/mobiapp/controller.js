"use strict";

define([
    "ionic",
], function () {
    return angular.module("Mobi.Controller", [
        'ionic'
        ]) 
    .controller('mobiController', function ($scope, $rootScope,commonServices) {
        $scope.hello = "helo";
        $scope.host = commonServices.getHost();
        $scope.settings = {
            theme: 'mobiscroll',
            lang: 'zh',
            display: 'bottom',
            timeWheels:'hhiia'
        };
        $scope.settings2 = {
            theme: 'mobiscroll',
            lang: 'zh',
            display: 'bottom',

            min: new Date(2014, 8, 15),
            max: new Date(2024, 8, 14)
        };
        $scope.mydate2 = new Date();
        $scope.settings3 = {
            theme: 'mobiscroll',
            lang: 'zh',
            anchor: "#target",
            display: 'bottom',
            timeWheels: 'HH',
            amText:'上午',
            min: new Date(2014, 8, 15),
            max: new Date(2024, 8, 14),

            YearText: "A ",
            fixedWidth: [100, 50, 50, 40],

            rtl: "true",

            dateFormat: "yyyy年MMdd日 hh点整",

        };

        $scope.$on("$destroy", function () {

            stateChangeStart();
        });
        var stateChangeStart = $rootScope.$on("$stateChangeStart", function () {
            $scope.myInstance.destroy();
        })
            
    });
});
