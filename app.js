/* 	

		john@ideaslink - app.js 		

		about					Live chat by socket.io / node
		dependency				node.js, socket.io, express, jade
		
*/

var path = require('path');
var jade = require('jade');
var express = require('express');
var app = express();
var http = require('http');
var groups = [];

var port = "3800"; // portnumber;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.engine('jade', jade.__express);

app.route('/')
	.get((req, res) => {
		res.render('home')
	});
app.route('/about')
	.get((req, res) => {
	res.render('about');
});

app.use(express.static(path.join(__dirname, 'public')));

var server = http.createServer(app);
var io = require('socket.io')(server);

io.sockets.on('connection', (socket) => {
	socket.emit('message', { message: 'welcome to chat'});

	socket.on('send', (data) => {
		io.emit('message', data);	// send to all
		
		//// comment the line below to sent to the socket mentioned
		// socket.emit('message', data);
	});

	socket.on('typing', (data) => {
		socket.broadcast.emit('is-typing', data);
	});

	socket.on('send-group', (data) => {
		var gid = data.group;
		if ( !groups.find(s => s == gid)) {
			groups.push(gid);
			socket.join(gid);
		}
		data["groups"]= groups;

		if (gid) {
			socket.join(gid);
			io.sockets.to(gid).emit('message', data);
		}
    });

	socket.on('disconnect', () => {
		io.emit('message', { message: 'user disconnected'});
	});
});

function printrooms(){
	var rooms = io.sockets.adapter.rooms;
	if(!rooms) return 'Room not found';
	const arr = Array.from(rooms).filter(room => !room[1].has(room[0]));
	return arr.map(i=> i[0]);
};

server.listen(port, () => {
	console.log("listening on port " + port);	
});

