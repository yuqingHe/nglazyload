"use strict";
/**
 * author :小潘
 * time: 2015年11月7日 16:47:13
 * description: 输入框获取焦点时，弹出新的输入框
 */


define(["ionic"], function () {
    angular.module("TextInput.directive", [])
        .directive("textinput", [
            "$window", "$timeout", "$q", "$ionicScrollDelegate", function ($window, $timeout, $q, $ionicScrollDelegate) {
                return {
                    restrict: "AE",
                    //隔离作用域
                    scope: {},
                    templateUrl: "components/textinput/text_input.html",
                    link: function (scope, iElement, iAttr) {
                       console.log(iElement);
                        var maxLength = iAttr.maxlength;
                        scope.scroll = function () {
                            if(iElement[0].getBoundingClientRect().top>document.documentElement.clientHeight-290){
                                $ionicScrollDelegate.scrollTo(0, document.documentElement.clientHeight-290, false)
                            }
                        }
                    }
                };
            }
        ]
    ).directive("changesize", [
            "$window", "$timeout", "$q", "$ionicScrollDelegate", function ($window, $timeout, $q, $ionicScrollDelegate) {
                return {
                    restrict: "A",
                    scope: {},
                    link: function (scope, iElement, iAttr) {
                            console.log(iElement);
                            iElement.bind("focus",function () {
                                //iElement.scroll(0,320);
                                scope.ifinput = true;
                                $ionicScrollDelegate.scrollBottom();
                            })
                    }
                };
            }
        ]
    );
});