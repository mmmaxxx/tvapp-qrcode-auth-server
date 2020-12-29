const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json()


app.engine('html', require('ejs').renderFile);
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.render(__dirname + "/views/enterCode.html");
});

app.get('/:id', (req, res) => {

    console.log('res param', req.params);

    if (req.params.id) {
        res.render(__dirname + "/views/login.html", {code: req.params.id});
    } else {
        res.render(__dirname + "/views/enterCode.html");
    }
});

app.post('/success', jsonParser, (req, res) => {
    console.log('SUCCESS DATA', req.body.code);
    console.log('SUCCESS DATA', req.body.access_token);
    io.emit(req.body.code, req.body.access_token);
    res.send({status: 'ok'})


});


io.on('connection', (socket) => {

});

http.listen(process.env.PORT || 3000, () => {
    console.log('listening on *:3000');
});
