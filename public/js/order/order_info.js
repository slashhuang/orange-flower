define([], function () {

    var tInterval = null,                           //  定时器句柄
        tTimeOut = null,                            //  延时器句柄
        count = 3,                                  //  定时多少秒
        ele = document.querySelector("#count");     //  显示的元素

    tInterval = setInterval(function(){
        ele.innerHTML = count-- + "秒后自动跳转";
    },1000);

    tTimeOut = setTimeout(function(){
        clearInterval(tInterval);
        clearTimeout(tTimeOut);
        location.href = '/';
    },4000);

});