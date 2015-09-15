/**
 * 单独指令部分模块化
 */

define(['angular',"jquery", "formSubmit"], function (angular,$,formSubmit) {
        var directiveModule = angular.module('appDirectives', ["ngRoute"]);

        //路由切换,loading加载
        directiveModule.directive("changeRoute", ['$rootScope','$http',function ($rootScope,$http) {
            return {
                "restrict": "ECAM",
                "link": function (scope, Elements, Attrs) {
                    $rootScope.$on("$routeChangeStart",function(){
                        Elements.addClass("route-loading-style");
                        Elements.removeClass("routeHide");
                    });
                    $rootScope.$on("$routeChangeSuccess",function(){
                        Elements.removeClass("route-loading-style").addClass("routeHide");
                    })

                }
            };
        }]);

        //头像上传指令
        directiveModule.directive("valueChange", ['$rootScope','$http',function ($rootScope,$http) {
        return {
            "restrict": "ECAM",
            "link": function (scope, iElements, iAttrs) {
                iElements.on("change", function () {
                    var curEle = $(iElements);
                    $("#head-form").ajaxSubmit({
                        "type":"post",
                        "dataType":"json",
                        "url": $rootScope.prefuri + "/file/upload?space=user",
                        "success":function(data){
                            $http({
                                "method":"POST",
                                "url":$rootScope.prefuri + "/user/modifyDp/" + data["id"]
                            }).success(function(res){
                                $http({
                                    "url": $rootScope.prefuri + "/user/info",
                                    "method":"POST"
                                }).success(function(uData){
                                    localStorage.centerData = JSON.stringify(uData);
                                }).error($rootScope.httpError);
                            }).error($rootScope.httpError);
                            curEle.next("img.user-head-pic").attr({
                                "src":$rootScope.prefuri + data["smallUrl"]
                            });
                        },
                        "error":function(err){
                            $rootScope.httpError(err);
                        }
                    });
                });
            }
        };
    }]);
        //解析原生js
        directiveModule.directive('script', function() {
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
});