var AppRouter = Backbone.Router.extend({

    routes: {
        ""                  : "getMenu",
        "menu/:id"         : "PopOver",
        "about"             : "about"
    },

    initialize: function () {

    },

	getMenu: function(page) {
        var p = page ? parseInt(page, 10) : 1;
        var menuList = new LeftMenuCollection();
        menuList.fetch({success: function(){
            $("#divLeftMenu").html(new LeftMenuListView({ model: menuList }).el);
        }});

    },

    PopOver: function (id) {
        var menu = new LeftMenu({id: id});
    },


});

utils.loadTemplate(['getTemplate'], function() {
    app = new AppRouter();
    Backbone.history.start();
});