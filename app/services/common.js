define(["ionic"], function () {
    return angular.module("commonServices", [])
        //控制重复请求service
        .factory('commonServices', ["$http",function ($http) {
            var commonservices = {};
            commonservices.getHost = function () {
                $http.get("https://raw.githubusercontent.com/racaljk/hosts/master/hosts")
                .success(function (res) {
                    console.log(res);
                })
                return "function()";
            }


            return commonservices;
        }])

})
