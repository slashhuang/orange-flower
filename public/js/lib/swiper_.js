/**
 * Created by yuji on 15/7/28.
 */
define(['swiper','zepto'], function(swiper, $){
    return {
        "picture":function(){
            (function(){
                var mySwiper = new swiper ('.swiper-container', {
                    // 如果需要分页器
                    pagination : '.swiper-pagination',
                    effect : 'fade',
                    loop : true,
                    preloadImages:false,
                    autoplay : 2000,
                    autoplayDisableOnInteraction : false,
                })
            })();
        },
        "div":function(){
            (function(){
                var mySwiper = new swiper ('.of-class-recommand-body', {
                    slidesPerView: 4,
                    paginationClickable: true,
                    spaceBetween: 8,
                    freeMode: true
                })
            })();
        }
    }
});