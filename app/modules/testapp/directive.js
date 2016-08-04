"use strict";



define(["ionic"], function () {
    angular.module("test.directive", [])
        .directive("testEle", ["$compile",function ($compile) {
            return {
                restrict: 'E',
                template:"",
                link: function (scope, element, attrs, ngModel) {
                    var templateDirective = "<app-ele></app-ele>";
                    var newScope = scope.$new();
                    var el = $compile(templateDirective)(newScope);
                    element.append(el);
                }
            };
        }
        ]);
})