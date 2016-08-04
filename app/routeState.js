define([

], function (require, factory) {

    return {
        config:{
            "/index":"modules/indexapp/app",
            "/mobi":"mobiapp",
            "/poster":"modules/poster/app"
        },
        indexModule:{
            moduleName:"modules/indexapp/app",
            state:"/index"
        },
         getModuleByState : function(state){
             return this.config[state]
         }
    }
});