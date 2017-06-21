const express = require('express');
const path = require('path');
const data = require('./data.js')
const mustacheExpress = require('mustache-express');

const app = express();

app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')
app.use(express.static('public'))

//Listening on root

app.get('/', function (req, res) {
	var collection = [];
  	for(i = 0; i < data.users.length; i++){
	  	var temp = data.users[i]
		if(data.users[i].job === null){
			temp.job = "Available for hire";
	}
  	collection.push({user: temp})
  }
  res.render('index',{collection :collection})
})

app.get('/user/:id', function (req, res) {
	var user = [];
	var currentUser; 
	for(i = 0; i < data.users.length; i++){
		var temp = data.users[i]
  		if(temp.id === parseInt(req.params.id)){
  			currentUser = data.users[i]
  			//user.push({user: temp});
  		}
  	}
  res.render('profile',{user :currentUser})
})


app.listen(3000, function () {
  console.log('Successfully started express application!');
})