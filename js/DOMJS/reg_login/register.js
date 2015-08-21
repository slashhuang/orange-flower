/**
 * Created by slashhuang on 15/8/4.
 */
require.config({
    baseUrl:"/js/lib",
    paths:{
        "zepto":"./zepto.min",
        "util":"/js/lib/common_util",
        "model":"../sales",
        "jquery":"./jquery",
        "swiper":"./swiper",
        "reg_login":"../reg_login",
        "sweetalert": "./sweetalert.min"
    },
    shim:{
        "zepto":{
            "exports":"$"
        },
        "swiper":{
            "deps":["zepto"],
            "exports":"swiper"
        },
        "cookie":{
            deps: ['jquery'],
            exports: 'cookie'
        },
        "sweetalert": {
            exports : "sweet"
        }
    }
});


define(["util/url_config","util/ajax_check","util/data_check","../../../bower_components/zepto/zepto","sweetalert"], function(config,check,dataCheck,$,sweet){
    var phoneNumberInput = document.getElementById("phoneNumber");
    var certNumberInput = document.getElementById("certNumber");
    var certButton = document.getElementById("sendCert");
    var password = document.getElementById("password");
    var passwordRepeat = document.getElementById("passwordRepeat");
    var checkbox = document.getElementById("registerCheckbox");
    var $certButton = $("#sendCert");
    var $submitButton = $("#regSubmit");
    var inputStatus = {
        "phoneNumber": false,
        "certNumber": false,
        "password" : false,
        "passwordRepeat": false,
        "checkbox": false
    };
    var regFormData = {
        "telephone": "",
        "password" : "",
        "code":""
    };

    //检测手机号
    phoneNumberInput.onchange = function(){
        regFormData.telephone = phoneNumberInput.value;
        if(dataCheck.checkPhoneNumber(phoneNumberInput.value)){
            inputStatus.phoneNumber = true
        }
    };
    //检测手机验证码
    certNumberInput.onchange = function(){
        regFormData.code = certNumberInput.value;
        if(dataCheck.checkCertNumber(certNumberInput.value)){
            inputStatus.certNumber = true
        };
    };
    //注册密码长度必须>=6
    password.onchange = function(){
        if(password.value.length >=6){
            inputStatus.password = true;
            regFormData.password = password.value;
            return true;
        }
    };
    //两次密码是否一致以及密码足够长度
    passwordRepeat.onblur = function(){
        if(password.value == passwordRepeat.value) {
            inputStatus.passwordRepeat = true;
        }
        else{
            alert("密码未保持一致，请重新输入")
        }
    };
    //验证是否勾选checkbox
    checkbox.onchange = function(){
        if(checkbox.checked){
            inputStatus.checkbox = true;
            return true;
        }
    };
    //显示倒计时
    function showCountdown(timeLeft, tapResponse){
        if(timeLeft > 0){
            certButton.value = timeLeft + "s重试";
            setTimeout(function(){
                showCountdown(timeLeft, tapResponse);
            },1000);
            timeLeft--;
        }
        else{
            certButton.value = "获取验证码";
            $certButton.removeClass("disabled");
            certButton.removeAttribute("disabled");
            $certButton.on({
                "tap" : tapResponse
            })
        }

    }
    //发送验证码
    (function(){

        var callback = {
            success : function(err,status,xhr){
                $certButton.addClass("disabled");
                certButton.setAttribute("disabled","disabled");
                $certButton.off("tap",tapResponse);
                showCountdown(10, tapResponse);
            },
            fail : function(xhr,status,error){
                alert("发送失败，请检查手机号");
            }
        };

        var tapResponse = function(){
            check.sendSms(phoneNumberInput.value,callback)
        };

        $certButton.on({
            "tap" : tapResponse
        })



    //将检测时机改为提交的时候
    $submitButton.on({
        "tap":function(){
            var callback = {
                success : function(err,status,xhr){
                    sweet({
                        title: "注册成功!",
                        text: "点击转向登录页面",
                        timer:1000,
                        showConfirmButton: false
                    },function(status){
                        if(status) window.location.href="/user/login";
                    });
                },
                fail : function(xhr,status,error){
                    sweet({
                        title: "注册失败!",
                        text: "此用户已注册，请直接登录!",
                        type:  "error"
                    },function(status){
                        window.location.href="/user/login"
                    });
                }
            };
            if(dataCheck.checkIsAllOk(inputStatus)) {
                console.log(regFormData);
                check.regFormSubmit(regFormData,callback)
            }
        }
        });
    })();
});