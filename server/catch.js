module.exports = function (app) {
    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handler
    app.use(function (err, req, res, next) {
        // render the error page
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
};