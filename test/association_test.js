const assert = require('assert');
const User = require('../src/user');
const Comment= require('../src/comment');
const BlogPost= require('../src/blogPost');



describe('Associations', () => {

	let joe, blogPost, comment;

	beforeEach((done) => {
			joe = new User ({name:'Joe'});
			blogPost = new BlogPost({title:'JS is Great', content:'Yes, it really is'});
			comment = new Comment({content:'Congrats on your post!'});
			joe.blogPosts.push(blogPost);
			blogPost.comments.push(comment);
			comment.user=joe;
				joe.save();
				blogPost.save();
				comment.save();
		Promise.all([joe.save(),
				blogPost.save(),
				comment.save()])
		.then(()=> done())
		});

	it.only('Saves a relation between a user and a blogpost', (done) => {

		User.findOne({name:'Joe'})
		.then((user)=> {

		console.log(user);
			done();
		});

	});


});