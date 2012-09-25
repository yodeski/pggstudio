module.exports = function(app) {
  app.get('/dashboard', function(req, res) {
    res.render('dashboard', { });
  });

  app.post('/dashboard', function (req, res) {
      res.send('the dashboard');
  });

};