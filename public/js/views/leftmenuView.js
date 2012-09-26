define([
    'jQuery',
    'Underscore',
    'Backbone',
    'text!templates/leftMenu.html' // Using the Require.js text! plugin, we are loaded raw text which will be used as our views primary template
], function($, _, Backbone, LeftMenuCollection, leftMenuTemplate){
    var leftMenuView = Backbone.View.extend({
        el: $('#leftMenuContainer'),
        initialize: function(){
            this.collection = new LeftMenuCollection;
            var url = "getMenu";
            $.post(url, function (data) {
                for(var d in data) {
                    this.collection.add({ id: d.id,
                                          itemname: d.itemname,
                                          text: d.text,
                                          ref: d.ref,
                                          color: d.color,
                                          icon: d.icon,
                                          source: d.source,
                                          toolbar: d.toolbar });    
                }
                
            });
            var compiledTemplate = _.template( leftMenuTemplate, { projects: this.collection.models } );
            this.el.html(compiledTemplate);
        },
        render: function(){
            var data = {
                leftMenu: this.collection.models,
                _: _ 
            };
            var compiledTemplate = _.template( leftMenuTemplate, data );
            $("#page").html( compiledTemplate ); 
        }
    });
    // Our module now returns an instantiated view
    // Sometimes you might return an un-instantiated view e.g. return projectListView
    return new leftMenuView;
});