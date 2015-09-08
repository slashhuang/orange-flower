/**
 * Created by slashhuang on 15/8/21.
 */
define(['zepto'],function($) {
    //定义商品分类controller
    function saleListCtrl($scope, $routeParams, $location, $http,$rootScope,$timeout) {

        //设定路由参数
        $scope.title = $routeParams.listName;
        $scope.pageId = 0;
        //初始化数据
        $scope.catId = $routeParams.listId;
        $scope.sortType = "DEFAULT";
        $scope.keyword = "";
        $scope.desc =true;
        $scope.saleList=[];
        $scope.showRefresh = true;
        //  判断是否显示上滑加载更多

        //设定url
        var saleListUrl = $rootScope.prefuri + "/product/query";

        //通用函数

        //初始化http请求@TODO需要加入参数

        var render_data = function(callback){

            $http({
                "method":"post",
                "url":saleListUrl+"/"+$scope.pageId,
                "data":{
                    "sortType": $scope.sortType,
                    "catId":$scope.catId,
                    "keyword":$scope.keyword ,
                    "desc": $scope.desc
                }
            }).success(function(data){
                if(callback){
                    $scope.saleList = $scope.saleList.concat(data.content);
                    callback(data)
                }
                else{
                    $scope.saleList=data.content;
                    refreshHint.innerHTML="上拉刷新";
                }
            }).error($scope.httpError);
        };

        /**
         * 取消搜索
         */
        $scope.cancelSearch = function(){
            $scope.keyword = "";
        };

        $scope.sortData = function(sortType,bool){
            bool=!bool;
            $scope.sortType=sortType;
            $scope.desc=bool;
            $scope.pageId = 0;
            render_data();
        };

        $scope.refresh = function(callback){
            $scope.pageId+=1;
            render_data(callback)
        };
        /**
         * 配置刷新加载
         * @type {Element}
         */
        var dragButton = document.getElementById("refreshButton");
        var refreshHint = document.getElementById("refreshHint");
        var refreshImg = document.getElementById("refreshImg");
        var callback = function (dd) {
            dragButton.style.marginTop=0;
            refreshImg.style.top=0;
            refreshHint.innerHTML="努力加载中";
            $timeout(function(){
                switch(dd.last){
                    case true:
                        refreshHint.innerHTML="已是最后一页";
                        $timeout(function(){
                            $scope.showRefresh = false;
                        },1000);
                        break;
                    case false:
                        refreshHint.innerHTML="上拉刷新";
                        $scope.showRefresh = true;
                        break;
                }
            },500);
        };
        /**
         * 初始化数据
         */
        render_data(callback);
        /**
         * 避免全局变量污染
         */
        (function () {
            var startPosition, endPosition, deltaY;
            dragButton.addEventListener('touchstart', function (e) {
                var touch = e.touches[0];
                startPosition = {
                    x: touch.pageX,
                    y: touch.pageY
                }
            });
            dragButton.addEventListener('touchmove', function (e) {
                var touch = e.touches[0];
                endPosition = {
                    x: touch.pageX,
                    y: touch.pageY
                };
                deltaY = startPosition.y-endPosition.y;

                if(deltaY>60&&deltaY<80){
                    refreshHint.innerHTML="释放加载数据";
                    dragButton.style.marginTop=deltaY+'px';
                    refreshImg.style.top=-deltaY+'px'
                }
                if(deltaY>10&&deltaY<60){
                    refreshHint.innerHTML="上拉刷新";
                    dragButton.style.marginTop=deltaY+'px';
                    refreshImg.style.top=-deltaY+'px'
                }

            });
            dragButton.addEventListener('touchend',function (e) {
                console.log(e);
                var touch = e.touches[0];
                if(deltaY>=60){
                    console.log("proceeding callback");
                    $scope.refresh(callback)
                }
                else{
                    callback()
                }
            });
        })();
    }

    saleListCtrl.$inject = ['$scope', '$routeParams', '$location', '$http','$rootScope','$timeout'];
    return saleListCtrl;
});