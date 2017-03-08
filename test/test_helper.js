const mongoose = require('mongoose');


mongoose.connect('mongdob://localhost/user_test');

mongoose.connection
.once('open', ()=> console.log('Good to go!'))
.on('error', (error)=>{

	console.warn('Error',error);


});
