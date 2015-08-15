/**
 * Created by yuji on 15/7/27.
 */

define(["url_config","zepto"],function(config,$){

    function request(url,param, callback){
        $.get(url + "?t="+new Date().getTime + "&" + param, callback);
    }

    return{
        "checkPhoneNumber":function(phone, callback){
            request(config.checkPhoneNumber,"phoneNumber=" + phone ,callback);
        },
        "sendSms": function(phone, callback){
            request(config.sendSms,"phoneNumber=" + phone ,callback);
        },
        "checkCertNumber": function(certNumber, callback){
            request(config.checkCertNumber,"certNumber=" + certNumber ,callback);
        }
    }
})