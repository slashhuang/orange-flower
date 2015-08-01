/**
 * Created by yuji on 15/7/31.
 */

define(["zepto"], function($){
    //option元素池，可以重用
    function optionPool(){
        var optionPool ;
        var now = 0;
        var last = 0;

        function init(size){
            optionPool = new Array(size);
            for(var i= 0; i < size; i++){
                optionPool[i] = createOption();
            }
        }
        function createOption(){
            return document.createElement("option");
        }
        function resetOption(){
            now = 0;
        }
        function setNextOptions(value){
            optionPool[last++].innerHTML =  value;
        }
        function putAllOptions(ele){
            if(now == last){
                return;
            }
            else if(now < last){
                for(var i = now; i < last+1; i++){
                    optionPool[i].innerHTML = "";
                }
            }else{
                for(var i = last ; i < now; i++){
                    ele.appendChild(optionPool[i]);
                }
            }

            last = now-1;
        }

        return{
            init: init,
            reset:resetOption,
            setNext: setNextOptions,
            putAll: putAllOptions
        }
    }

    var level2Name = ["province","city","school","campus" ];
    var levelOptionCount = [34,100,1000,10];
    var name2Level = {
        "province":0,
        "city":1,
        "school":2,
        "campus":3
    }
    var name2Ele = {
        "province": getEleById("province"),
        "city": getEleById("city"),
        "school": getEleById("school"),
        "campus": getEleById("campus")
    }
    function getEleById(name){
        return document.getElementById(name);
    }

    var optionPools = new Array(level2Name.length);
    for(var j = 0; j < level2Name.length; j++){
        optionPools[j] = optionPool();
        optionPools[j].init(levelOptionCount[j]);
    }

    function lowerLevel(name){
        var nameIndex = name2Level[name];
        if(nameIndex < level2Name.length -1 ){
            return  level2Name[nameIndex +1];
        }
        else{
            return null;
        }
    }
    //根据上级的获取信息
    function getOptionsByName(level,parentName){

    }

    function refreshOptions(name, value){
        var lower = lowerLevel(name);
        if(!lower){
            return;
        }
        var level = name2Ele[lower];
        //或许可选选项
        var options = getOptionsByName(lower, value);
        optionPools[level].reset();
        for(var i = 0; i < options.length; i++){
            optionPools[level].setNext(options[i]);
        }
        optionPools[level].putAll(name2Ele[i]);
        refreshOptions(lower, options[0]);
    }

    for(var key in name2Ele){
        if(name2Ele.hasOwnProperty(key)){
            name2Ele[key].onchange = function(){
                refreshOptions(key, name2Ele[key].value);
            }
        }
    }

});