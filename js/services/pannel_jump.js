/**
 * Created by slashhuang on 15/9/15.
 */
angular.module("userService", [])
    .factory('settingsPanel', ["$q", "$http", function($q, $http){
        var comments = function(){
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http.get("https://api.github.com/repos/angular/angular.js/pulls")
                .success(function(data){
                    var result = [];
                    for(var i = 0; i < data.length; i++){
                        result.push(data[i].user);
                        deferred.notify(progress);
                    }
                    deferred.resolve(result);
                })
                .error(function(error){
                    deferred.reject(error);
                });
            return promise;
        };
        return {
            comments: comments
        };
    }]);