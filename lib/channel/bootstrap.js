const socketIo = require('socket.io');
var io = null;

function bootstrap(http) {
	io = socketIo(http);
	io.on('connection', function (socket) {
		socket.on('disconnect', function () {
			console.log('user disconnected');
		});

		socket.on('chat', function (msg) {
			console.log('message: ' + msg);
			io.emit('chat', msg);
		});
	});
}

function getIo() {
	if (io === null) {
		throw 'IO is not set';
	}
	return io;
}

exports.bootstrap = bootstrap;
exports.io = getIo;