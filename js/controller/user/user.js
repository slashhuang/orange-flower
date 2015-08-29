define(['angular', './center', "./settings", "./setAccount", "./modifyPwd", "./credit", "/js/lib/jquery.js", "/js/lib/ajaxfileupload.js"],
    function (angular, center, settings, setAccount, modifyPwd, credit, $, ajaxFileUpload) {
        var userModule = angular.module('userModule', ["ngRoute"]);
        userModule.controller('centerCtrl', center);
        userModule.controller('userSettingsCtrl', settings);
        userModule.controller('setAccountCtrl', setAccount);
        userModule.controller('modifyPwdCtrl', modifyPwd);
        userModule.controller('userCreditCtrl', credit);

        //  自定义事件指令value-change
        userModule.directive("valueChange", function () {
            return {
                "restrict": "ECAM",
                "link": function (scope, iElements, iAttrs) {
                    iElements.on("change", function () {
                        var curEle = $(iElements);
                        $.ajaxFileUpload({
                            "url": prefuri + "/file/upload?space=product",
                            "fileElementId": curEle.attr("id"),
                            "success": function (data,status) {
                            },
                            error: function (data,status,e) {
                            }
                        });
                    });
                }
            };
        });
    });