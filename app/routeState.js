define([

], function (require, factory) {

    return {
        config: {
            "/index": "modules/indexapp/app",
            "/mobi": "mobiapp",
            "/poster": "modules/poster/app"
        },
        relyConfig: {
            "modules/poster/app": ["components/findurl/app"],
        },
        indexModule: {
            moduleName: "modules/indexapp/app",
            state: "/index"
        },
        getModuleByState: function (state) {
            return this.config[state];
        },
        getModuleByStates: function (states) {
            var modules = [];
            if (Object.prototype.toString.call(states) === "[object Array]") {
                states.forEach(function (state) {
                    var module = this.getModuleByState(state);
                    if (module) {
                        modules.push(module);
                    } else {
                        console.log('无法找到state' + state + "对应的模块,请检查配置文件");
                    }
                }, this)
            } else if (typeof (states) == "string") {
                modules.push(this.getModuleByState(states));
            }
            return modules;
        },
        getRelyModuleByModules:function(modules){
            var relyModules=[];
            modules.forEach(function(module){
                var relyModule=this.relyConfig[module];
                if(relyModule && relyModule.length>0){
                 relyModules=  relyModules.concat(relyModule); 
                //    relyModules[module]=relyModule;
                }else{
                    console.log("模块  "+ module+"  没有依赖的模块");
                }
            },this);
            return relyModules;
        }
    }
});