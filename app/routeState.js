define([

], function (require, factory) {

    return {
        /**
         * 路由和模块的映射关系,即state和module的映射
         */
        config: {
            "index": "modules/indexapp/app",
            "mobi": "modules/mobiapp/app",
            "poster": "modules/poster/app"
        },
        /**
         * 模块之间的依赖关系,即表明某个模块依赖哪些其他的模块,可以是模板/指令/其他模块等
         */
        relyConfig: {
            //poster 模块依赖components/textinput/app这个directive
            "modules/poster/app": ["components/textinput/app"],
        },
        /**
         * 系统初次加载模块,可以不配置,默认是index
         */
        indexModule: {
            moduleName: "modules/indexapp/app",
            state: "index"
        },
            /**
         * 根据state获取模块
         */
        getModuleByState: function(state) {
            return this.config[state];
        },
        /**
         * 根据state获取模块,
         * states : 路由数组
         * @returns  模块数组
         */
        getModuleByStates: function(states) {
            var modules = [];
            if (Object.prototype.toString.call(states) === "[object Array]") {
                states.forEach(function(state) {
                    var module = this.getModuleByState(state);
                    if (module) {
                        modules.push(module);
                    } else {
                        console.log('无法找到state' + state + "对应的模块,请检查配置文件");
                    }
                }, this)
            } else if (typeof(states) == "string") {
                modules.push(this.getModuleByState(states));
            }
            return modules;
        },
        /**
         * 根据模块数组获取其依赖的模块数组
         */
        getRelyModuleByModules: function(modules) {
            var relyModules = [];
            modules.forEach(function(module) {
                var relyModule = this.relyConfig[module];
                if (relyModule && relyModule.length > 0) {
                    relyModules = relyModules.concat(relyModule);
                    //    relyModules[module]=relyModule;
                } else {
                    console.log("模块  " + module + "  没有依赖的模块");
                }
            }, this);
            return relyModules;
        }
    }
});