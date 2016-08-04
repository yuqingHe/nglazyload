"use strict";

define([
    "ionic",
    "components/findurl/app",
    "components/textinput/app",

], function () {

    return angular.module("directiveApp", [
        "ionic",
        "findurl",
        "TextInput",
    ]);
});
