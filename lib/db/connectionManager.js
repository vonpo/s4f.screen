const mongoose = require('mongoose');
const config = require('config');
const logger = require('../logger/logger');
const User = require('./schema/user');
const pollSchema = require('./schema/poll');
const Vote = require('./schema/vote');

function connect(options, callback) {
	var connection = mongoose.createConnection(options.connectionString, {
		server: { poolSize: 20 }
	});

	connection.on('error', err => callback(err));
	connection.once('open', () => callback(null, connection));

	return connection;
}

var connection = connect({
	name: 'default',
	connectionString: config.get('database.connection')

}, err => logger.info('Db connection status: err:' + err));

var UserSchema = new connection.base.Schema(User);
var PollSchema = new connection.base.Schema(pollSchema(connection.base.Schema, UserSchema));
var VoteSchema = new connection.base.Schema(Vote);

PollSchema.statics.generateId = function() {
	return new mongoose.Types.ObjectId();
};

PollSchema.methods.addVote = function(option, callback) {
	if(this.options.indexOf(option) === -1) {
		return;
	}

	this.data.votes = this.data.votes || { };
	this.data.votes[option] = isNaN(this.data.votes[option]) ? 1 : this.data.votes[option] + 1;
	this.update({ data: this.data }, callback);
};

exports.User = connection.model('User', UserSchema);
exports.Poll = connection.model('Poll', PollSchema);
exports.Vote = connection.model('Vote', VoteSchema);
exports.getConnection = () => connection;