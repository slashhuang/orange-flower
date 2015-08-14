/**
 * Created by yuji on 15/7/27.
 */

define(["url_config","jquery","cookie"],function(config,$,cookie){
    function request(url,param, callback){
        var token = $.cookie("x-auth-token");
        console.log($.cookie("x-auth-token"));
        alert(token);
        var settings = {
            type:"POST",
            async:false,
            crossDomain:true,
            url : url,
            data:param,
            dataType : "json",
            success : function(err,status,req){
                if(callback) callback();
                token = req.getResponseHeader("x-auth-token");
                if(token != null && token != "")
                    $.cookie("x-auth-token", token);
                alert("fuck"+req.getResponseHeader("x-auth-token"))
            },
            error:function(xhr,status,error){
                alert("here is an error");
            },
            beforeSend: function(XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader("x-auth-token", token);
            }
        };
        console.log(settings);
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
        "regFormSubmit":function(formData,callback){
            request(config.submitLocation,formData,callback)
        }
    }
})