/* Author:

*/
window.App = Ember.Application.create({
    
    // When everything is loaded.
    ready: function () {
        $('.scrollbar').scrollbar();
        App.leftMenu.getItems();
        this.adjustMainContent();
        $("[rel=tooltip]").tooltip();

    },

    adjustMainContent: function() {
        var docH = $(document).height();
        var headH = $("#header").height();
        var footH = $("#footer").height();

        $("#main").height(docH - headH - footH - 130);

        
    }
});

App.LeftMenu = Ember.Object.extend({

});

App.leftMenu = Em.ArrayController.create({
    // Default collection is an empty array.
    content: [],
    // Simple id-to-model mapping for searches and duplicate checks.
    _idCache: {},
    _currMenu: undefined,
    
    getItems: function () {
        var query = this.get("query");
        var self = this;
        var url = "getMenu";
        $.post(url, function (data) {
            // Make a model for each result and add it to the collection.
            for (var i = 0; i < data.results.length; i++) {
                self.addItem(App.LeftMenu.create(data.results[i]));
            }
        });
    },    
    addItem: function (item) {
        var id = item.get("id");
        // If we don't already have an object with this id, add it.
        if (typeof this._idCache[id] === "undefined") {
            this.pushObject(item);
            var relpop = (item.source=='popover') ? '' : 'popover';
            var href = (item.source=='popover') ? '#' : item.ref;
            var $_li = $('<li id="itm_' + item.itemname + '" class="pointer" style="line-height:30px; color:' + item.color + '"><a rel="' + relpop + '" href="' + href + '" class="text-shadow" style="color:' + item.color + '"><i class="' + item.icon + ' icon-large text-shadow"></i>  <small style="font-size:12px;">' + item.text + '</small></a></li>');
            
            this._idCache[id] = item.id;
            if(item.source=='popover')
                this.initPopOver($_li, item);
            else
                $_li.find('a').live('click', function(e) { 
                    this.bindItemClick(item); 
                    e.preventDefault();
                });

            $('ul#leftMenu').append($_li);

        }
    },
    initPopOver: function(elem, item) {
        var self = this;
        $.get(item.ref, function(d) {
            $(d).find('.scrollbar').scrollbar();
            elem.clickover({
                tip_id: item.itemname,
                html: true,
                title: item.text,
                trigger:'click',
                placement:'belowRight',
                allow_multiple:false,
                global_close: false,
                content: d,
                onShown: function() { self.setToolsToPopOver(item, elem) },
                onHide: function() { $('ul#leftMenu li').removeClass('active') }
            });
            $('.scrollbar').scrollbar();
        });
        elem.live('click', function(e) {
            $(this).clickover('show');
            e.preventDefault();
        });
    },
    setToolsToPopOver: function(item, elem){
        $('.scrollbar').scrollbar();
        var self = this;
        $('ul#leftMenu li').removeClass('active');
        elem.addClass('active');
        var popheader = $("#" + item.itemname).find("h3");
        var toolbtn;
        if(item.toolbar.length > 0) {
            toolbtn = $('<div class="pull-right"><a href="#" class="text-shadow nolink" data-toggle="modal" data-target="#loginform" rel="tooltip" role="button" data-placement="right" title="' + item.toolbar[0].tip + '"><i class="' + item.toolbar[0].toolicon + ' "></i></a></div>');
            toolbtn.find('a[rel=tooltip]').tooltip();
        }
        popheader.append(toolbtn);

    },
    bindItemClick: function(item) {
        var url = item.ref;
        alert(url);
    },
    getSources: function () {
        var self = this;
        var url = "getUserSources";
        $.post(url, function (data) {
            alert(data);
        });
    },
  

});

App.Login = Ember.Object.extend({
    UserName: '',
    Email: '',
    FirstName: '',
    LastName: '',
    Active: false,
    TotalTables: 0,
    TotalViews: 0,
    TotalFunctions: 0,
    SharedTables: 0,
    SharedViews: 0,
    SharedFunctions: 0
});

App.Login = Em.ArrayController.create({ 

    content: [],
    
    login: function(){
        var reqdata = {username:$("#inputUsername").val(), password: $("#inputPassword")};
        $.ajax({ type: 'POST',
            url: "login",
            data: reqdata,
            async: true,
            success: function(data) {

            },
            error: function (xhr, textStatus, errorThrown) {
               alert(xhr.responseText);
            }
        });  
    }
});