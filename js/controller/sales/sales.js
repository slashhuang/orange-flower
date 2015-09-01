//配置路由
define(['angular','./categoryCtrl','./detailCtrl','./discountCtrl','./saleListCtrl','./searchCtrl','iscroll'],
    function(angular,category,detail,discount,saleList,search,iscroll){
    var salesModule = angular.module('salesModule',["ngRoute"]);
        salesModule.controller('categoryCtrl',category);
        salesModule.controller('detailCtrl',detail);
        salesModule.controller('discountCtrl',discount);
        salesModule.controller('saleListCtrl',saleList);
        salesModule.controller('searchCtrl',search);

        salesModule.filter('cut', function () {
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


        function pullDownAction () {
            setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
                var el, li, i;
                el = document.getElementById('thelist');

                for (i=0; i<3; i++) {
                    li = document.createElement('li');
                    li.innerText = 'Generated row ' + (++generatedCount);
                    el.insertBefore(li, el.childNodes[0]);
                }
                myScroll.refresh();		// Remember to refresh when contents are loaded (ie: on ajax completion)
            }, 1000);	// <-- Simulate network congestion, remove setTimeout from production!
        }




        //salesModule.directive('fuckingtest', function() {
        //    return {
        //        replace: false,
        //        restrict: 'A',
        //        link: function(scope, element, attr){
        //            scope.$watch(attr.fuckingtest, function(value){
        //                    new iScroll(document.querySelector('.hot-sale-main'), {
        //                        snap: true,
        //                        momentum: true,
        //                        hScrollbar: true
        //                    });
        //            });
        //        }
        //    };
        //});



        var App = angular.module('App', ['ng-scroller']);

        App.controller('Controller', function($scope){
        });

});