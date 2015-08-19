/**
 * Created by yuji on 15/7/27.
 */

define(["./url_config","jquery","cookie"],function(config,$,cookie){
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
                if(callback) callback.success(err,status,req);
            },
            error:function(xhr,status,error){
                callback.fail(xhr,status,error);
            }
        };
        //处理get请求
        if(callback.requestType){
            settings.type=callback.requestType;
            console.log(settings)
        }
        $.ajax(settings);           //common AJAX
    }
    return{
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
        },
        //AJAX登录
        "userLogin":function(loginData,callback){
            request(config.login,loginData,callback)
        },
        //AJAX忘记密码
        "forgetPWD":function(pwdData,callback){
            request(config.forgetPWD,pwdData,callback)
        },
        //AJAX登出账户
        "logout":function(data,callback){
            request(config.logout,data,callback)
        }
    }
});