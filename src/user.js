const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const UserSchema = new Schema ({

	name: {
	type:	String,
	required: [true, 'Name is required.']
	}, 
	postCount: Number

});

const User = mongoose.model('user', UserSchema);

module.exports = User;