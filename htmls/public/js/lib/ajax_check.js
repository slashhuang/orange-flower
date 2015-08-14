/**
 * Created by yuji on 15/7/27.
 */

define(["url_config","jquery","cookie"],function(config,$,cookie){

    function request(url,param, callback){
        var token = $.cookie("x-auth-token")|'';
        var settings = {
            type:"POST",
            async:false,
            crossDomain:true,
            url : url,
            data:param,
            dataType : "json",
            success : function(err,status,req){
                if(callback) callback();
                $.cookie("x-auth-token",req.getResponseHeader("x-auth-token"));
                alert( $.cookie("x-auth-token"))
            },
            error:function(xhr,status,error){
                alert(status);
            }
        };
        if(token)
            settings.headers({"x-auth-token" : token});

        $.ajax(settings);
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
            request(config.sendSms+"/"+phone,"" ,callback);
        },
        "regFormSubmit":function(formData){
            request(config.submitLocation,formData)
        }
    }
})