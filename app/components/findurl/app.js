"use strict";

define([
    "ionic",
    "components/findurl/directive",
], function () {

    return angular.module("findurl", [
        "ionic",
        "findurl.directive"
    ]);
});
