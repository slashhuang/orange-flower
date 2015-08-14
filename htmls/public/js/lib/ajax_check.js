/**
 * Created by yuji on 15/7/27.
 */

define(["url_config","zepto"],function(config,$){

    function request(url,param, callback){
        //var t=new Date().getTime();
        $.post(url +"/"+ param, callback);
    }

    return{
        "checkPhoneNumber":function(phone) {
            if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(phone))) {
                alert("请输入正确的手机号");
                return false;
            }
            else {
                return true;
            }
        },
        "checkCertNumber":function(certNum) {
            if (!(/\d{4,8}$/.test(certNum))) {
                alert("请输入正确的手机验证码");
                return false;
            }
            else {
                return true;
            }
        },
        "sendSms": function(phone, callback){
            request(config.sendSms,phone ,callback);
        },
    }
})