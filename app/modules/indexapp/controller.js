"use strict";

define([
"ionic",
], function () {
    return angular.module("Index.Controller", [
        "ionic", 
    ]).controller('indexController',["$scope", "$state",function($scope ,$state){
        $scope.stateGo = function () {
            $state.go('mobi');
        }
    }])
});
