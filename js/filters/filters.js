/**
 * 单独指令部分模块化
 */

define(['angular'], function (angular) {
    var filtersModule = angular.module('appFilters', ["ngRoute"]);
    /**
     *降低angular安全机制
     */
    filtersModule.filter('trustHtml', ['$sce',function ($sce) {

        return function (input) {

            return $sce.trustAsHtml(input);

        }}]);

    /**
     * 截取字符串
     */
    filtersModule.filter('cut', function () {
        return function (value, wordwise, max, tail) {
            if (!value) return '';

            max = parseInt(max, 10);
            if (!max) return value;
            if (value.length <= max) return value;

            value = value.substr(0, max);
            if (wordwise) {
                var lastspace = value.lastIndexOf(' ');
                if (lastspace != -1) {
                    value = value.substr(0, lastspace);
                }
            }

            return value + (tail || ' …');
        };
    });

});