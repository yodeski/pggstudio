// Filename: models/leftMenuModel
define([
  'Underscore',
  'Backbone'
], function(_, Backbone){
  var leftMenuModel = Backbone.Model.extend({
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
  // You usually don't return a model instantiated
  return leftMenuModel;
});


/*------------------COLLECTION--------------------------------------*/

define([
  'Underscore',
  'Backbone',
  // Pull in the Model module from above
  'models/leftMenuModel'
], function(_, Backbone, projectModel){
  var LeftMenuCollection = Backbone.Collection.extend({
    model: leftMenuModel
  });
  // You don't usually return a collection instantiated
  return LeftMenuCollection;
});

