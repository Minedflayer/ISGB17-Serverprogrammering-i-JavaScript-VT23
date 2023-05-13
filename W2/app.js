'use strict';
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(cookieParser());
app.use(express.urlencoded( {extended : true}));

let server = http.listen(3001, ()=> {
    console.log('serverigång!');
});

app.get('/',(req,res)=> {
    let kaaaka = req.cookies.inloggad;
    

    if(kaaaka == null) {
        res.sendFile(__dirname + '/loggain.html');
    }
    else {
        res.sendFile(__dirname + '/index.html');
    }

});

app.post('/', function(req, res){
    let namn = req.body.nickname;

    if(namn != null) {
        if(namn.length < 3) {
            res.send('Eeeeep!');
        }
        else {
            res.cookie('inloggad', 'banan', {maxAge: 1000*60*60*5, httpOnly: true});
            res.redirect('/');
        }
    }
});

io.on('connection', (socket)=> {
    console.log('En användare anslöt med socket');

    socket.on('bytbild', function(data){
        io.emit('nybakgrund', {'bildid': data});
    });







});






app.use('/public', express.static(__dirname + '/public'));




/*
'use strict';

const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const http = require('http').createServer(app);
const io = require('socket.io')(http);

//middleware inställningar
app.use(express.urlencoded ({extended : true} ));
app.use('/public', express.static(__dirname + '/public'));
app.use(cookieParser());

// starta igång server på en port
let server = http.listen(3003, () => {
    console.log('servern körs på port 3003');
})

// GET-End-Point
app.get('/', (req, res) => {
    let cookie = req.cookies.inloggad;

    if(cookie == null){
        res.sendFile(__dirname + '/loggain.html');
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});
*/

/*
lyssna på post '/'
kontrollera om innehållet i textrutan med name = "nickname" innehåller minst 3 tecken
om sant -> sätta kakan
*/


/*
app.post('/', (req, res) => {
    let namn = req.body.nickname;

    if(namn != null){
        if(namn.length < 3){
            res.send('Namnet ska innehålla minst 3 tecken!')
        } else {
            res.cookie('inloggad', 'banan', 
            {maxAge: 1000 * 60 * 60 * 5, httpOnly: true });
            res.redirect('/');
        
        }
    }
});


    io.on('connection', (socket) => {
        console.log('En användare anslöt sig med socket');

        socket.on('bytbild', function(data){
            io.emit('nybakgrund', {'bildid': data});
        })


    });

*/
   
   



