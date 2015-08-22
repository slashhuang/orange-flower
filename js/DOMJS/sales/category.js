/**
 * Created by slashhuang on 15/8/21.
 */
define(['zepto'], function ($) {
        var categoryNav=$("#categoryNav").children();//左侧导航栏
        categoryNav.eq(0).removeClass("disable").addClass("active");
        categoryNav.on({
            "tap":function(e){
                var target = e.targetName|| e.srcElement;
                if(target.tagName=="LI"){
                    //console.log(target.tagName)
                    categoryNav.removeClass("active").addClass("disable");
                    target.classList.remove("disable");
                    target.classList.add("active");
                }
            }
        });
});
