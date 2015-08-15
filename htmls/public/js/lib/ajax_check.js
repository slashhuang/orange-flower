/**
 * Created by yuji on 15/7/27.
 */

define(["url_config","jquery","cookie"],function(config,$,cookie){
    function request(url,param, callback){
        var token = $.cookie("x-auth-token");
        alert("token is "+token);
        if(!token){
            var setToken = {
                type:"GET",
                async:false,
                crossDomain:true,
                url : prefuri+"/session/requestToken",
                data:param,
                dataType : "json",
                success : function(err,status,req){
                        token = req.getResponseHeader("x-auth-token");
                        $.cookie("x-auth-token", token);
                        alert("set token as " + token)
                    },
                error:function(xhr,status,error){
                    alert("token settings failed");
                }
            }
            $.ajax(setToken);         //set token if not existed
        };
        var settings = {
            type:"POST",
            async:false,
            crossDomain:true,
            url : url,
            data:param,
            dataType : "json",
            beforeSend: function(XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader("x-auth-token", token);
            },
            success : function(err,status,req){
                if(callback) callback();
                alert("success token" + token)
            },
            error:function(xhr,status,error){
                alert("it's an error");
            },
            complete:function(xhr,err) {
                alert("ajax finished")
            }
        };
        $.ajax(settings);           //common AJAX
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
});