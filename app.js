const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const i18n = require("i18n");

const config = require('./config');

const routes = require('./routes/index');

const app = express();

i18n.configure({
    defaultLocale: "en",
    directory: __dirname + '/locales',
    autoReload: true
});

i18n.setLocale(config.locale);

// default: using 'accept-language' header to guess language settings
app.use(i18n.init);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(config.subpath, routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
// message suppressed if Internal
app.use(function(err, req, res, next) {
    let code = err.status || 500;
    res.status(code);
    res.render('error', {
        message: code === 500 ? 'Internal error' : err.message,
        error: {}
    });
});

module.exports = app;
