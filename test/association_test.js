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

	it ('Saves a relation between a user and a blogpost', (done) => {

		User.findOne({name:'Joe'})
		.populate('blogPosts')
		.then((user)=> {

		assert(user.blogPosts[0].title==='JS is Great');
			done();
		});

	});

	it ('Saves a full relational graph', (done) => {

		User.findOne({name:'Joe'})
		.populate({
			path:'blogPosts',
			populate:{
				path:'comments',
				model:'comment',
				populate: {
					path:'user',
					model:'user'
				}
			}

	})
		.then((user)=> {

		assert(user.name==='Joe');
		assert(user.blogPosts[0].title==='JS is Great');
		assert(user.blogPosts[0].comments[0].content==='Congrats on your post!');
		assert(user.blogPosts[0].comments[0].user.name==='Joe');

			done();
		});

	});


});