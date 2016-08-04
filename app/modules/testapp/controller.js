"use strict";

define([
"ionic",
], function () {

    return angular.module("Test.Controller", [
        "ionic",
    ]).controller('testController',function($scope,commonServices,$compile,$ocLazyLoad){
        $scope.hello = "helo";
        $ocLazyLoad.load('testModule.js');
        var templateDirective = "<test-ele></test-ele>";
        var newScope = $scope.$new();
        var el = $compile(templateDirective)(newScope);
    })

});
