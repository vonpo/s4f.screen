const validate = require('../../validation/validation').validateEmail;

var User = {
	email: {
		type: 'string',
		required: true,
		index: {unique: true},
		minlength: 4,
		maxlength: 100,
		validate: {
			validator: validate,
			message: '{VALUE} is not valid email!'
		}
	},
	picture: { type: 'string'},
	firstName: {type: 'string', minlength: 3, maxlength: 100, required: true},
	lastName: {type: 'string', minlength: 3, maxlength: 100, required: true},
	creation: {type: 'date', required: true},
	role: {type: 'string', enum: ['inactive', 'registered', 'admin'], default: 'inactive', required: true},
	polls: ['string']
};

module.exports = User;