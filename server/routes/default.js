var UserSource = require('../models/modelSources');

module.exports = function(app) {
  app.get('/default', function(req, res) {
    res.redirect('/');
  });

  app.get('/', function(req, res) {
    // check if the user's credentials are saved in a cookie //
    if (req.cookies.user == undefined || req.cookies.pass == undefined) {
      res.render('login', { locals: { title: 'Hello - Please Login To Your Account' }});
    } 
    else {
      // attempt automatic login //
      // AM.autoLogin(req.cookies.user, req.cookies.pass, function(o) {
      //   if (o != null) {
      //     req.session.user = o;
      //     res.render('index', {
      //       page: 'index',
      //     });
      //   } 
      //   else {
      //     res.render('login', { locals: { title: 'Hello - Please Login To Your Account' }});
      //   }
      // });
    }   

  });
/*
  app.get('/getTemplate', function (req, res) {
      var myMenu = require('../resources/leftMenu.json');
      res.render('partials/leftNav',{ menuItems: myMenu });
  });

  app.post('/getMenu', function (req, res) {
      var myMenu = require('../resources/leftMenu.json');
      res.send(myMenu);
  });

  app.get('/mytables', function (req, res) {
      UserSource.getUserSources(app.config, 'yodeski@gmail.com', function(data) {
        res.render('partials/mytables',{ sources: data.obj, error: data.error });  
      })  
  });
  */


};
