define([
    'jQuery',
    'Underscore',
    'Backbone',
    // Using the Require.js text! plugin, we are loaded raw text
    // which will be used as our views primary template
    'text!templates/leftMenu.html'
], function($, _, Backbone, leftMenuTemplate){
    var leftMenuView = Backbone.View.extend({
        el: $('#container'),
        render: function(){
            // Using Underscore we can compile our template with data
            var data = {};
            var compiledTemplate = _.template( leftMenuTemplate, data );
            // Append our compiled template to this Views "el"
            this.el.append( compiledTemplate );
        }
    });
    // Our module now returns an instantiated view
    // Sometimes you might return an un-instantiated view e.g. return projectListView
    return new leftMenuView;
});