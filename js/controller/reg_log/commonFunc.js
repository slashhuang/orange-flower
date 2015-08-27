/**
 * Created by slashhuang on 15/8/27.
 */
/**
 * 检测密码输入是否正确
 * @param passwordRepeat
 * @param password
 */

define([],function(){
    return {
        CHECKPWD: function (passwordRepeat, password) {
            if (password.length < 5) {
                $scope.passwordHint = "密码长度至少6位!";
                return false;
            } else if (!passwordRepeat.length) {
                $scope.passwordHint = "确认密码不得为空!";
            } else if (passwordRepeat == password && passwordRepeat) {
                $scope.passwordHint = "密码输入一致";
            } else {
                $scope.passwordHint = "密码输入不一致";
            }
        }


    }
})


