/**
 * Created by slashhuang on 15/8/21.
 */
require.config({
    baseUrl:"js",
    paths:{
       "angular":"./lib/angular"
    },
    shim:{
        "angular":{
            "exports":"angular"
        },
        "lib/angular-route": {
            deps: ["angular"]
        },
        "cookie":{
            deps: ['jquery'],
            exports: 'cookie'
        }
    }
});