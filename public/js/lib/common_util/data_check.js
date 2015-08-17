/**
 * Created by slashhuang on 15/8/16.
 */
define([],function(){
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
        }
    }
})