/**
 * Created by billin on 15/7/27.
 */
define(function(){
    window.prefuri = "http://juhua-server.orange.com";
    window.localStorage.headerInfo ="";
    return {
            "checkPhoneNumber": "",//查询是否已经注册
            "sendSms": prefuri+"/user/getCode",//发送短信
             "submitLocation": prefuri+"/user/register",//注册信息提交地址
             "userRegInfo":prefuri+"/user/complete",//完善信息提交地址
    }
});