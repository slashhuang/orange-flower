/**
 * Created by billin on 15/7/27.
 */
define(function(){
    window.prefuri = "http://api.orangezc.com";
    window.curTab = "main";
    window.localStorage.headerInfo ="";
    return {
            "checkPhoneNumber": "",//查询是否已经注册
            "sendSms": prefuri+"/user/getCode",//发送短信
             "submitLocation": prefuri+"/user/register",//注册信息提交地址
             "userRegInfo":prefuri+"/user/complete",//完善信息提交地址
            "login":prefuri+"/user/login",//登录地址
            "forgetPWD":prefuri + "",//重置密码
            "logout":prefuri+"/user/logout"//登出账户
    }
});