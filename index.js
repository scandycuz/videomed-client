const sslRedirect = require('heroku-ssl-redirect');
const express = require('express');
const path = require('path');
const hsts = require('hsts');
const compression = require('compression');

const app = express();

app.use(compression());

app.disable('x-powered-by');
app.use(sslRedirect());
app.use(hsts({ maxAge: 15552000 }));

app.use(express.static(path.join(__dirname, '/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/dist/index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port);

console.log('App is listening on port ' + port);
