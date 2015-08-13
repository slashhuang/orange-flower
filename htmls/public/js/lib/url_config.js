/**
 * Created by billin on 15/7/27.
 */
define(function(){
    window.prefuri = "http://juhua-server.orange.com";
    return {
            "checkPhoneNumber": "",//查询是否已经注册
            "sendSms": window.prefuri+"/user/getCode",//发送短信
            //"checkCertNumber": "",//检查验证码
            //"submitLocation": "",//提交地址
    }
});