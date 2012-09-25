window.LeftMenuView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        var menu = this.model.models;
        var len = menu.length;
        var startPos = (this.options.page - 1) * 8;
        var endPos = Math.min(startPos + 8, len);

        $(this.el).html('<ul id="leftMenu" class="nav nav-list">');

        for (var i = startPos; i < endPos; i++) {
            $('#leftMenu', this.el).append(new LeftMenuListItemView({ model: menu[i] }).render().el);
        }

        //$(this.el).append(new Paginator({model: this.model, page: this.options.page}).render().el);

        return this;
    }
});

window.LeftMenuListItemView = Backbone.View.extend({

    tagName: "li",
    className: "pointer",

    initialize: function () {
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }

});