angular.module("appstart", ['mobiscroll-datetime', 'ionic']).run(function () {
    //window.changeFontSizeNewMicoSite();
    window.changefontSize();
}).controller("start", function ($scope, fileReader, $timeout) {
    $scope.hello = "bb";
    var reg = /\d+/g;



    $scope.ifsubmit = false;

    $scope.clickme = function () {
        $scope.ifsubmit = true;
        console.log("dd"+new Date().getTime());
         //alert("dd"+new Date().getTime());
        $timeout(function () {
            $scope.ifsubmit = false;
        }, 3000);
        console.log("aa"+new Date().getTime());
    }

    $scope.getFile = function () {
        fileReader.readAsDataUrl($scope.file, $scope)
            .then(function (result) {
                $scope.imageSrc = result;
            });
    };

    $timeout(function () {
        //$scope.imgurl = "http://192.168.5.119:3000/app/img/code.jpg"
        $scope.imgurl = "http://greedyint-dev.oss-cn-hangzhou.aliyuncs.com/xbshow/QrCode/20160630151257-d217a.jpg";
    }, 3000);
    $scope.$watch("hello", function (o, n) {
        if (o.match(reg)) {
            $scope.hello2 = o.match(reg).join("");
        } else {
            $scope.hello2 = n;
        }
    })


}).directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs, ngModel) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            element.bind('change', function (event) {
                scope.$apply(function () {
                    modelSetter(scope, element[0].files[0]);
                });
                //附件预览
                scope.file = (event.srcElement || event.target).files[0];
                scope.getFile();
            });
        }
    };
}]).directive('urlreg', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs, ngModel) {
            function returnurl(temp) {
                var urlreg = /([Hh][Tt]{2}[Pp]:\/\/|[Hh][Tt]{2}[Pp][Ss]:\/\/)?([0-9a-zA-Z\-\~\/\.])*([0-9a-zA-Z\-\~\/\?])\.([0-9a-zA-Z\-\~\/\?\&\=])+/;
                return temp.match(urlreg);
            }

            element.bind('blur', function (event) {
                var s = returnurl(element[0].value);

                element.parent().find("span")[0].innerHTML = s[0];
                //console.log(count);
            });
        }
    };
}).directive('countword', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs, ngModel) {
            function isChinese(temp) {
                var re = /[^\u4e00-\u9fa5]/;
                if (re.test(temp)) return false;
                return true;
            }

            element.bind('keyup', function (event) {
                var s = element[0].value;
                var count = 0;
                for (var i = 0; i < s.length; i++) {
                    count++;
                    if (isChinese(s[i])) {
                        count++;
                    }
                }
                element.parent().find("span")[0].innerHTML = count + "/140";
                //console.log(count);
            });
        }
    };
}).factory('fileReader', ["$q", "$log", function ($q, $log) {
    var onLoad = function (reader, deferred, scope) {
        return function () {
            scope.$apply(function () {
                deferred.resolve(reader.result);
            });
        };
    };
    var onError = function (reader, deferred, scope) {
        return function () {
            scope.$apply(function () {
                deferred.reject(reader.result);
            });
        };
    };
    var getReader = function (deferred, scope) {
        var reader = new FileReader();
        reader.onload = onLoad(reader, deferred, scope);
        reader.onerror = onError(reader, deferred, scope);
        return reader;
    };
    var readAsDataURL = function (file, scope) {
        var deferred = $q.defer();
        var reader = getReader(deferred, scope);
        reader.readAsDataURL(file);
        return deferred.promise;
    };
    return {
        readAsDataUrl: readAsDataURL
    };
}])
require('./scss/style.scss');