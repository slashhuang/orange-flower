
define(['lib/swiper','zepto'], function(swiper, $){
    return {
        "picture":function(){
            (function(){
                var mySwiper = new swiper ('.swiper-container', {
                    pagination : '.swiper-pagination',
                    effect : 'fade',
                    loop : true,
                    preloadImages:false,
                    autoplay : 2000
                })
            })();
        },
        "mainItem":function(){
            var mySwiper = new swiper('.fuck-test',{
                slidesPerView: 3,
                paginationClickable: true,
                spaceBetween: 7,
                freeMode: true
            })
        }
    }
});