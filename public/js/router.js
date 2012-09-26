// Filename: router.js
define([
    'jQuery',
    'Underscore',
    'Backbone',
    'views/leftMenuView',
    'views/dashboardView',
    'views/usersView'
], function($, _, Backbone, Session, leftMenuView, dashboardView, usersView){
    var AppRouter = Backbone.Router.extend({
        routes: {
            // Define some URL routes
            ''         : 'showDashboard',
            '/dashboard': 'showDashboard',
            '/users': 'showUsers',

            // Default
            '*actions': 'defaultAction'
        },
        showDashboard: function(){
            // Call render on the module we loaded in via the dependency array
            // 'views/dashboardView'
            dashboardView.render();
        },
        // As above, call render on our loaded module
        // 'views/usersView'
        showUsers: function(){
            usersView.render();
        },
        defaultAction: function(actions){
            // We have no matching route, lets just log what the URL was
            console.log('No route:', actions);
        }
    });

    var initialize = function(){
        var app_router = new AppRouter;
        Backbone.history.start();
    };
    return {
        initialize: initialize
    };
});