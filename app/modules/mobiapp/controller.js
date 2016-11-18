"use strict";

define([
    "ionic",
], function () {
    return angular.module("Mobi.Controller",[]) 
    .controller('mobiController',["$scope", "$state", function ($scope, $state) {
       $scope. stateGoBack=function(){
             $state.go('index');
       }
    }]);
});
