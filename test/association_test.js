const assert = require('assert');
const User = require('../src/user');
const Comment= require('../src/comment');
const BlogPost= require('../src/comment');



describe('Associations', () => {

	it('Saves a user', (done) => {

		const joe = new User ({name:'Joe'});

		joe.save()
		.then(()=> {

			assert(!joe.isNew);
			done();
		});

	});


});