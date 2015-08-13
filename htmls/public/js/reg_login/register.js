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
        }
    }
})

define(["url_config","ajax_check", "zepto"], function(config,check,  $){
    var phoneNumberInput = document.getElementById("phoneNumber");
    var certNumberInput = document.getElementById("certNumber");
    var certButton = document.getElementById("sendCert");
    var password = document.getElementById("password");
    var passwordRepeat = document.getElementById("passwordRepeat");
    var $certButton = $("#sendCert");
    var $submitButton = $("#submit");
    var formNode = document.forms[0];
    var inputStatus = {
        "phoneNumber": false,
        "certNumber": false,
        "password" : false,
        "passwordRepeat": false,
        "law": true
    };

    $submitButton.tap(function(){
        if(checkIsAllOk()) {
            formNode.submit();
            window.location.href = "register_info.html";
        }
    });

    //将检测时机改为提交的时候

    //检测手机号
    phoneNumberInput.onchange = function(){
        check.checkPhoneNumber(phoneNumberInput.value)
            //@TODO
    };
    //检测手机验证码
    certNumberInput.onchange = function(){
        check.checkCertNumber(certNumberInput.value)
    }
    //注册密码长度必须>=6
    password.onchange = function(){
        if(password.value.length >=6){
            inputStatus.password = true;
            return true;
        }
        //@TODO 提示
    }
    //验证重复密码是否一致
    passwordRepeat.onblur = function(){
        if(!checkPassword()){
            alert("密码未保持一致，请重新输入")
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
            $certButton.tap(tapResponse);
        }

    }
    //发送验证码
    (function(){

        var phoneNumber = phoneNumberInput.value;

        var tapResponse = function(){
            certButton.setAttribute("disabled","disabled");
            $certButton.addClass("disabled");
            $certButton.off("tap",tapResponse);
            check.sendSms(phoneNumber,function(data){
                console.log(data);
                showCountdown(10, tapResponse);
            })
        };
        $certButton.tap(tapResponse);

    })();

    //两次密码是否一致以及密码足够长度
    function checkPassword(){
        if(password.value.length >=4 &&
            (password.value == passwordRepeat.value))
        {
            inputStatus.passwordRepeat = true;
            return true;
        }
        else{
            return false;
        }
    }
    //检测是否密码都已经ok
    function checkIsAllOk(){
        var index = null;
        for(index in inputStatus){
            if(inputStatus.hasOwnProperty(index)){
                if(inputStatus[index]){
                    return false;
                }
            }
        }
        return true;
    }

});