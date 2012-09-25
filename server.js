/** Setting up dependencies. */
var util = require('util');
var express = require('express');
var engine = require('ejs-locals');
var expressValidator = require('express-validator');

var pg = require('pg');

/** .*/
var app = module.exports = express();
var config = app.config = require('./config');
app.use(pg);

process.addListener('uncaughtException', function (err, stack) {
    console.log('Caught exception: ' + err + '\n' + err.stack);
    console.log('\u0007');
});

/** Where to look for templates. */
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/server/templates');
app.set('view options', {
    layout: true
});

/** Set up server, session management. */
app.use(express.favicon(__dirname + '/public/favicon.ico', {
    maxAge: config.FAVICON_LIFETIME
}));

app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({
    secret: config.secret,
    //store: mongoStore(db)
}));

app.use(express.logger({
    format: ':req[x-real-ip] :date (:response-time ms): :method :url'
}));

app.use(express.static(__dirname + '/public', {
    maxAge: config.COOKIE_LIFETIME
}));

app.use(expressValidator);

/** Load all the lib. */
require('./server/lib')(app);


app.use(app.router);

/** Show all errors and keep search engines out using robots.txt .*/
app.configure('development', function () {
    app.use(express.errorHandler({
        showStack: true,
        dumpExceptions: true
    }));

    app.all('/robots.txt', function (req, res) {
        res.send('User-agent: *\nDisallow: /', {
            'Content-Type': 'text/plain'
        });
    });
});

/** Suppress errors, allow all search engines .*/
app.configure('production', function () {
    app.use(express.errorHandler({
        dumpExceptions: true
    }));

    app.all('/robots.txt', function (req, res) {
        res.send('User-agent: *', {
            'Content-Type': 'text/plain'
        });
    });
});

/** Load all the routes. */
require('./server/routes')(app);

/** Start listenning. */
app.listen(config.port, config.host);
util.log(util.format('ENV: %s, listening on http://%s:%s', config.env, 'localhost', config.port));