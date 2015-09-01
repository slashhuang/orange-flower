/**
 * Created by slashhuang on 15/8/21.
 */
define(['iscroll','zepto'],function(iscroll,$) {
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
                    "keyword":"",
                    "desc": $scope.desc
                }
            }).success(function(data){
                $scope.saleList = $scope.saleList.concat(data.content);
                if(callback){
                    callback()
                }
            }).error(function(){
                if(callback){
                    callback()
                }
            });
        };
        //初始化数据

        render_data();


        $scope.sortData = function(sortType,bool){
            bool=!bool;
            $scope.sortType=sortType;
            $scope.desc=bool;
            render_data();
        };



        //ng-click="refresh()
        $scope.refresh = function(){
            $scope.pageId+=1;
            render_data()
        };

        (function () {
            var dragButton = document.getElementById("refreshButton");
            var refreshHint = document.getElementById("refreshHint");
            var startPosition, endPosition, deltaY;
            var callback = function () {
                dragButton.style.marginTop=0;
            };
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
                deltaY = endPosition.y - startPosition.y;

                if(deltaY>30&&deltaY<50){
                    refreshHint.innerHTML="释放加载数据";
                    dragButton.style.marginTop=deltaY+'px';
                }
                if(deltaY>10&&deltaY<30){
                    refreshHint.innerHTML="下拉刷新";
                    dragButton.style.marginTop=deltaY+'px';
                }

            });
            dragButton.addEventListener('touchend',function (e) {
                console.log(e);
                var touch = e.touches[0];
                if(deltaY>=30){
                    console.log("proceeding callback");
                    $scope.refresh(callback)
                }
                else{
                    callback()
                }
            });
        })();

        //$scope.x=0;

        //$("#refreshButton").on({
        //    "touchstart":function(e){
        //        console.log(e.touches);
        //        dragButton.style.marginTop=0;
        //    },
        //    "touchmove":function(e){
        //    },
        //    "touchend":function(e){
        //        console.log(e.touches);
        //    }
        //
        //})


    }

    saleListCtrl.$inject = ['$scope', '$routeParams', '$location', '$http','$rootScope','$timeout'];
    return saleListCtrl;
});