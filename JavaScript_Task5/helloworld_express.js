var http = require('http');
var fs = require('fs');
var express = require('express');
var app = express();
var cnt = 0;

const port = 3000;
var engine = require('consolidate');

app.set('views', __dirname + '/views');
app.engine('html', engine.mustache);
app.set('view engine', 'html');

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/', (req, res) => res.render('demo'));
app.get('/counter', (req, res) => {
    cnt++;
    res.set('Content-Type', 'text/plain');
    res.end('Hello World\n' + 'asked:' + cnt + ' times.');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));