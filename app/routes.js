define([], function()
{
    return {
        defaultRoutePath: '/',
        routes: {
            '/': {
                templateUrl: '/modules/indexapp/index.html',
                dependencies: [
                    '/modules/indexapp/controller'
                ]
            },
            '/mobi': {
                templateUrl: '/modules/mobiapp/index.html',
                dependencies: [
                    '/modules/mobiapp/controller'
                ]
            },
            '/room': {
                templateUrl: '/modules/roomapp/template.html',
                dependencies: [
                    '/modules/roomapp/controller'
                ]
            }
        }
    };
});