/**
 * Created by slashhuang on 15/8/4.
 */

require.config({
    baseUrl:"/js/lib",
    paths:{
        "zepto":"./zepto.min",
        "reg_login":"../reg_login",
        "jquery":"./jquery"
    },
    shim:{
        "zepto":{
            "exports":"$"
        },
        "cookie":{
            deps: ['jquery'],
            exports: 'cookie'
        }

    }
})

require(["url_config","ajax_check","zepto"], function (config,check,zepto) {
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
            console.log(userInfoStatus);
            if(config.checkIsAllOk(userInfoStatus)) {
                console.log(userInfoData);
                check.regFormSubmit(userInfoData,function(){
                    window.location.href="register_info.ejs"
                })
            }
        }
    })
});