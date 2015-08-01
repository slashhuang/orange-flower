/**
 * Created by yuji on 15/7/27.
 */
require.config({
    baseUrl:"../public/js/lib",
    paths:{
        "zepto":"./zepto.min"
    },
    shim:{
        "zepto":{
            "exports":"$"
        }
    }
})

require(["url_config","ajax_check", "zepto"], function(config,check,  $){
    var phoneNumberInput = document.getElementById("phoneNumber");
    var certNumberInput = document.getElementById("certNumber")
    var certButton = document.getElementById("sendCert");
    var password = document.getElementById("password");
    var passwordRepeat = document.getElementById("passwrodRepeat");
    var $certButton = $("#sendCert");
    var $submitButton = $("#submit");
    var formNode = document.forms[0];
    var inputStatus = {
        "phoneNumber": false,
        "certNumber": false,
        "password" : false,
        "passwordRepeat": false,
        "law": true
    }

    $submitButton.tap(function(){
        if(checkIsAllOk()){
            formNode.submit();
        }
    });

    //检测手机号
    phoneNumberInput.onchange = function(){
        check.checkPhoneNumber(phoneNumberInput.value, function(){
         //@TODO
        })
    }
    //检测手机验证码
    certNumberInput.onchange = function(){
        check.checkCertNumber(certNumberInput.value, function(){
            //@TODO
        })
    }

    password.onchange = function(){
        if(document.getElementById("password").value.length >=4){
            inputStatus.password = true;
            return true;
        }
        //@TODO 提示
    }

    passwordRepeat.onchange = function(){
        if(!checkPassword()){
            //@TODO 提示
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
            //alert("hi");
            certButton.setAttribute("disabled","disabled");
            $certButton.addClass("disabled");
            $certButton.off("tap",tapResponse);
            check.sendSms(phoneNumber,function(data){
                showCountdown(10, tapResponse);
            })
        };
        $certButton.tap(tapResponse);

    })();


    //两次密码是否一致以及密码足够长度
    function checkPassword(){
        if(document.getElementById("password").value.length >=4 &&
            (document.getElementById("password").value == document.getElementById("passwordRepeat").value))
        {
            inputStatus.passwordRepeat = true;
            return true;
        }
        else{
            return false;
        }
    }

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