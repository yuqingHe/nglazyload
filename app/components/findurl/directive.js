"use strict";
/**
 * author :zhouhuijuan
 * time: 2016年4月20日
 * description:
 */


define(["ionic"], function () {
    angular.module("findurl.directive", [])
        .directive("findurl", [function () {
            return {
                restrict: 'A',
                link: function (scope, element, attrs, ngModel) {
                    function returnurl(temp) {
                        var tagareg = /<a href=\"(.*?)\".*?>(.*?)<\/a>/;
                        var urlreg = /([Hh][Tt]{2}[Pp]:\/\/|[Hh][Tt]{2}[Pp][Ss]:\/\/)?([0-9a-zA-Z\-\~\/\.])*([0-9a-zA-Z\-\~\/\?])\.([0-9a-zA-Z\-\~\/\?\&\=])+/;
                        if (temp.match(tagareg)) return temp;
                        if (temp.match(urlreg)) {
                            return temp.replace(urlreg, "<a href=\"" + temp.match(urlreg)[0] + "\">" + temp.match(urlreg)[0] + "</a>");
                        } else {
                            return temp;
                        }
                    }
                    element.bind('blur', function (event) {
                        element[0].value = returnurl(element[0].value);
                    });
                }
            };
        }
        ]
        ).filter("tourl", function () {
            return function (temp) {
                var urlreg = /([Hh][Tt]{2}[Pp]:\/\/|[Hh][Tt]{2}[Pp][Ss]:\/\/)?([0-9a-zA-Z\-\~\/\.])*([0-9a-zA-Z\-\~\/\?])\.([0-9a-zA-Z\-\~\/\?\&\=])+/g;
                var httpreg = /([Hh][Tt]{2}[Pp]:\/\/|[Hh][Tt]{2}[Pp][Ss]:\/\/)/;

                if (temp.match(urlreg)) {
                    var urls = temp.match(urlreg);
                    var str = "";
                    for (var i = 0; i < urls.length; i++) {
                        str += temp.substring(0,temp.indexOf(urls[i]))+"<a href=\"http://" + temp.match(urlreg)[0].replace(httpreg, "") + "\">" + temp.match(urlreg)[0] + "</a>"
                        temp = temp.substring(temp.indexOf(urls[i])+urls[i].length,temp.length);
                    }
                    return str+temp;
                } else {
                    return temp;
                }
            };
        });
});