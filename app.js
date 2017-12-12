const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
app.use(express.static('public'));
const users = {};

io.on('connect', (socket) => {
	socket.on('join', (name) => {
		let exists = false;
		for (const u in users) {
			if (users[u] === name) {
				exists = true;
				break;
			}
		}
		if (!exists) {
			users[socket.id] = name;
			let date = new Date();
			if (date.getHours() < 10 && date.getMinutes() < 10) {
				date = '0' + date.getHours() + ':0' + date.getMinutes();
			} else if (date.getHours() < 10) {
				date = '0' + date.getHours() + ':' + date.getMinutes();
			} else if (date.getMinutes() < 10) {
				date = date.getHours() + ':0' + date.getMinutes();
			} else {
				date = date.getHours() + ':' + date.getMinutes();	
			}
			io.emit('join', date, name + ' has joined', users);
		} else {
			io.emit('exists', 'username \"' + name + '\" has been taken, please select a different one');	
		}
	});

	socket.on('message', (data) => {
		let date = new Date();
		if (date.getHours() < 10 && date.getMinutes() < 10) {
			date = '0' + date.getHours() + ':0' + date.getMinutes();
		} else if (date.getHours() < 10) {
			date = '0' + date.getHours() + ':' + date.getMinutes();
		} else if (date.getMinutes() < 10) {
			date = date.getHours() + ':0' + date.getMinutes();
		} else {
			date = date.getHours() + ':' + date.getMinutes();	
		}
		io.emit('message', users[socket.id], date, data);
	});
});

server.listen(3000);
console.log('listening on port 3000');