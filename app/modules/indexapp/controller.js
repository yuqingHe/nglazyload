"use strict";

define([
"ionic",
], function () {

    return angular.module("Index.Controller", [
        "ionic", 
    ]).controller('indexController',function($scope,commonServices ){
        $scope.hello = "hello";
        $scope.ifinput = false;
        $scope.focus = function () {
            $scope.ifinput = true;
        }
        $scope. userInfo={
            name:"張三",
            phone:"1231546546565465"
        };
        $scope.blur = function () {
            $scope.ifinput = false;
        }
        $scope.$watch("window.innerHeight",function (o,v) {
            //alert("dd");
        })
        $scope.host = commonServices.getHost();
        console.log($scope.host);

        $scope.publish = function () {
              $scope.$state.go("/poster");

        }
    })
});
