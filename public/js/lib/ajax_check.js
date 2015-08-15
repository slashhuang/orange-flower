/**
 * Created by yuji on 15/7/27.
 */

define(["url_config","jquery","cookie"],function(config,$,cookie){
    function request(url,param, callback){
        var token = $.cookie("x-auth-token");
        alert("cookie token is "+token);
        if(!token){
            var setToken = {
                type:"POST",
                async:false,
                crossDomain:true,
                url : prefuri+"/session/requestToken",
                data:"",
                success : function(err,status,req){
                    console.log(req);
                        token = req.getResponseHeader("x-auth-token");
                        $.cookie("x-auth-token", token);
                        alert("success token as " + token)
                    },
                error:function(xhr,status,error){
                    alert("requesting token failed")
                }
            };
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
                console.log("success token is" + token)
            },
            error:function(xhr,status,error){
                console.log("it's an error");
            }
        };
        $.ajax(settings);           //common AJAX
    }


    return{
        //检测手机号码
        "checkPhoneNumber":function(phone) {
            if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(phone))) {
                alert("请输入正确的手机号");
                return false;
            }
            else {
                return true;
            }
        },
        //检测手机验证码
        "checkCertNumber":function(certNum) {
            if (!(/\d{4,8}$/.test(certNum))) {
                alert("请输入正确的手机验证码");
                return false;
            }
            else {
                return true;
            }
        },
        //提交时候检测表单数据是否已经完备
        "checkIsAllOk": function(data){
            for(var index in data) {
                if (data.hasOwnProperty(index)) {
                    if (!data[index]) {
                        return false;
                    }
                }
            }
            return true;
        },
        //AJAX发送短信
        "sendSms": function(phone, callback){
            request(config.sendSms+"/"+phone,"" ,callback);
        },
        //AJAX注册时候
        "regFormSubmit":function(formData,callback){
            request(config.submitLocation,formData,callback)
        },
        //AJAX提交用户完善信息
        "userInfoSubmit": function (regInfoData,callback) {
            request(config.userRegInfo,regInfoData,callback)
        }
    }
});