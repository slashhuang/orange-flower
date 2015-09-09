/**
 * Created by slashhuang on 15/8/22.
 */
define(['angular'], function (angular) {
    (function (ng) {
        'use strict';
        var app = ng.module('ngLoadScript', []);

        app.directive('script', function() {
            return {
                restrict: 'E',
                scope: false,
                link: function(scope, elem, attr) {
                    if (attr.type === 'text/javascript-lazy') {
                        var code = elem.text();
                        var f = new Function(code);
                        f();
                        console.log(attr.type)
                    }
                }
            };
        });

    }(angular));
});
