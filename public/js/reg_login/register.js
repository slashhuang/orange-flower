/**
 * Created by slashhuang on 15/8/4.
 */

require.config({
    baseUrl:"../public/js/lib",
    paths:{
        "zepto":"./zepto.min",
        "reg_login":"../reg_login",
    },
    shim:{
        "zepto":{
            "exports":"$"
        },
        "cookie":{
            deps: ['jquery'],
            exports: 'cookie'
        }
    }
})

define(["url_config","ajax_check","zepto"], function(config,check,$){
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
        if(check.checkPhoneNumber(phoneNumberInput.value)){
            inputStatus.phoneNumber = true
        }
    };
    //检测手机验证码
    certNumberInput.onchange = function(){
        regFormData.code = certNumberInput.value;
        if(check.checkCertNumber(certNumberInput.value)){
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
    //验证重复密码是否一致
    passwordRepeat.onblur = function(){
        if(!checkPassword()){
            alert("密码未保持一致，请重新输入")
        }
    };
    //验证是否勾选checkbox
    checkbox.onchange = function(){
        if(checkbox.checked){
            inputStatus.checkbox = true;
            return true;
        }
    }
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

        var tapResponse = function(){
            certButton.setAttribute("disabled","disabled");

            $certButton.off("tap",tapResponse);
            check.sendSms(phoneNumberInput.value,function(data){
                alert("发送成功");
                console.log(data)
                $certButton.addClass("disabled");
                showCountdown(10, tapResponse);
            })
        };
        $certButton.on({
            "tap" : tapResponse
        })

    })();

    //两次密码是否一致以及密码足够长度
    function checkPassword(){
        if(password.value == passwordRepeat.value)
        {
            inputStatus.passwordRepeat = true;
            return true;
        }
        else{
            return false;
        }
    }
    //将检测时机改为提交的时候
    $submitButton.on({
        "tap":function(){
            console.log(config.checkIsAllOk(inputStatus));
            if(config.checkIsAllOk(inputStatus)) {
                console.log(regFormData);
                check.regFormSubmit(regFormData,function(){
                    window.location.href="register_info.html"
                })
            }
        }
    });


});