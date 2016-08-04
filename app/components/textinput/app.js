"use strict";
/**
 * author :小潘
 * time: 2015年11月7日 16:48:04
 * description:输入框获取焦点时，弹出新的输入框
 */

define([
    "ionic",
    "components/textinput/directive"

], function () {

    return angular.module("TextInput", [
        "ionic",
        "TextInput.directive"

    ]);
});
