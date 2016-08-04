"use strict";
/**
 * author :zhouhuijuan
 * time: 2016年4月20日
 * description:
 */


define(["ionic"], function () {
    angular.module("appele.directive", [])
        .directive("appEle", [function () {
            return {
                restrict: 'E',
                template:'<h2>App ELE </h2>',
                link: function (scope, element, attrs, ngModel) {

                }
            };
        }
        ]);
})