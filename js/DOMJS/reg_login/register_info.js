/**
 * Created by slashhuang on 15/8/4.
 */

require.config({
    baseUrl:"/js/lib",
    paths:{
        "zepto":"./zepto.min",
        "util":"./common_util",
        "model":"../sales",
        "jquery":"./jquery",
        "swiper":"./swiper",
        "reg_login":"../reg_login",
    },
    shim:{
        "zepto":{
            "exports":"$"
        },
        "swiper":{
            "deps":["zepto"],
            "exports":"swiper"
        },
        "cookie":{
            deps: ['jquery'],
            exports: 'cookie'
        }
    }
});

require(["util/url_config","util/ajax_check","util/data_check","../../../bower_components/zepto/zepto"], function (config,check,dataCheck,$) {
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
        province :false,
        userCity : false,
        userUniversity : false,
        userCampus : false,
        userLevel : false,
    };
    //搜集用户数据
    var userInfoData = {
        userName :"",
        idNo :"",
        province :"",
        city : "",
        school : "",
        campus : "",
        level : ""
    };
    $userName.change(function(){
       userInfoData.userName = $userName.val();
    });
    $userIdNum.change(function(){
        userInfoData.idNo = $userIdNum.val();
    });
    $userProvince.blur(function() {
        userInfoData.province = $userProvince.val();
    });
    $userCity.blur(function() {
        userInfoData.city = $userCity.val();
    });
    $userUniversity.blur(function(){
        userInfoData.school = $userUniversity.val();
    });
    $userCampus.change(function(){
        userInfoData.campus = $userCampus.val();
    });
    $userLevel.change(function(){
        userInfoData.level = $userLevel.val();
    });
    $userInfoData.on({
        "tap":function(){
            console.log(userInfoData);
            if(dataCheck.checkIsAllOk(userInfoStatus)) {
                check.regFormSubmit(userInfoData,function(){
                    window.location.hash="/user/center"
                })
            }
        }
    })
});