window.LeftMenu = Backbone.Model.extend({

    urlRoot: "getMenu",

    initialize: function () {

    },

    defaults: {
        id:0,
        itemname: "",
        text: "",
        ref: "",
        color: "#000",
        icon: "",
        source: "",
        toolbar: []        
    }
});

window.WineCollection = Backbone.Collection.extend({

    model: LeftMenu,

    url: "getMenu"

});