/**
 * Created by slashhuang on 15/8/4.
 */

require.config({
    baseUrl:"../public/js/lib",
    paths:{
        "zepto":"./zepto.min",
        "reg_login":"../reg_login",
        "jquery":"./jquery"
    },
    shim:{
        "zepto":{
            "exports":"$"
        },
        //"distpicker":{
        //    deps: ['jquery',"distpicker.data"],
        //    //Once loaded, use the global 'distpicker' as the
        //    //module value.
        //    exports: 'distpicker'
        //},暂时先不用此插件
        "cookie":{
            deps: ['jquery'],
            exports: 'cookie'
        }

    }
})

require(["url_config","ajax_check","distpicker","jquery","zepto"], function (config,check,distpicker,$,zepto) {
    //$('#regForm').distpicker({
    //    province: '---- 所在省 ----',
    //    city: '---- 所在市 ----'
    //});
    var $userName = $("#userNumber");
    var $userIdNum = $("#IDNumber");
    var $userProvince = $("#userProvince");
    var $userCity = $("#userCity");
    var $userUniversity = $("#userUniversity");
    var $userCampus = $("#userCampus");
    var $userLevel = $("#userLevel");
    var $userInfoData = $("#regInfoSubmit");
    //检测输入是否正确
    var userInfoStatus = {
        userName :false,
        userIdNum :false,
        userProvince :false,
        userCity : false,
        userUniversity : false,
        userCampus : false,
        userLevel : false,
    };
    //搜集用户数据
    var userInfoData = {
        userName :"",
        userIdNum :"",
        userProvince :"",
        userCity : "",
        userUniversity : "",
        userCampus : "",
        userLevel : ""
    };
    $userName.change(function(){
       userInfoData.userName = $userName.val();
    });
    $userIdNum.change(function(){
        userInfoData.userIdNum = $userIdNum.val();
    });
    $userProvince.blur(function() {
        userInfoData.userProvince = $userProvince.val();
    });
    $userCity.blur(function() {
        userInfoData.userCity = $userCity.val();
    });
    $userUniversity.blur(function(){
        userInfoData.userUniversity = $userUniversity.val();
    });
    $userCampus.change(function(){
        userInfoData.userCampus = $userCampus.val();
    });
    $userLevel.change(function(){
        userInfoData.userLevel = $userLevel.val();
    });
    $userInfoData.on({
        "tap":function(){
            console.log(userInfoStatus);
            if(config.checkIsAllOk(userInfoStatus)) {
                console.log(userInfoData);
                check.regFormSubmit(userInfoData,function(){
                    window.location.href="register_info.html"
                })
            }
        }
    })
});