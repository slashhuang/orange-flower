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
        "distpicker":{
            deps: ['jquery',"distpicker.data"],
            //Once loaded, use the global 'distpicker' as the
            //module value.
            exports: 'distpicker'
        },
        "cookie":{
            deps: ['jquery'],
            exports: 'cookie'
        }

    }
})

require(["url_config","ajax_check","distpicker","zepto"], function (config,check,distpicker,$) {
    $('#regForm').distpicker({
        province: '---- 所在省 ----',
        city: '---- 所在市 ----'
    });
    var $userName = $("#userNumber");
    var $userIdNum = $("#IDNumber");
    var $userProvince = $("#userProvince");
    var $userCity = $("#userCity");
    var $userUniversity = $("#userUniversity");
    var $userCampus = $("#userCampus");
    var $userLevel = $("#userLevel");
    var $userInfoSubmit = $("#regInfoSubmit");
    //检测输入是否正确
    var userInputStatus = {
        userName :false,
        userIdNum :false,
        userProvince :false,
        userCity : false,
        userUniversity : false,
        userCampus : false,
    };
    //搜集用户数据
    var userInputSubmit = {
        userName :"",
        userIdNum :"",
        userProvince :"",
        userCity : "",
        userUniversity : "",
        userCampus : ""
    };
    $userName.change(function(){
       userInputSubmit.userName = $userName.val();
    });
    $userIdNum.change(function(){
        userInputSubmit.userIdNum = $userIdNum.val();
    });
    $userProvince.change(function() {
        userInputSubmit.userProvince = $userProvince.val();
        alert(userInputSubmit.userProvince )
    })
});