const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var Twit = require('twit');
app.use(session({  secret: 'keyboard cat'}));
var OAuth= require('oauth').OAuth;


//  Variables 
var cons_Key = 'g3j1eg3FsiavHQ9L2p5TNGUdg';
var cons_Secret = 'uzaJHJjKLTcv4DvQlMESE6em67EH0XKBnMRwm83kVWx8uEblpe';
var access_token = '';
var access_secret = '';
var Twitter ;
var Posts;
var userId;



// OAuth config
var oa = new OAuth(
	"https://api.twitter.com/oauth/request_token",
	"https://api.twitter.com/oauth/access_token",
	cons_Key,
	cons_Secret,
	"1.0",
	"http://127.0.0.1:5000/twitter/return",
	"HMAC-SHA1"
);

app.get('/',function(req,res){
	res.render("index");
});

// Redirect user to Auth Screen
app.get('/auth/twitter', function(req, res){
	oa.getOAuthRequestToken(function(error, oauth_token, oauth_token_secret, results){
		if (error) {
			res.setHeader('Content-Type', 'application/json');
			res.send({'error':error})
		}
		else {
		
			req.session.oauth = {};
			req.session.oauth.token = oauth_token;
			req.session.oauth.token_secret = oauth_token_secret;
			res.redirect('https://twitter.com/oauth/authenticate?oauth_token='+oauth_token);
	}
	});
});


// Get Access token after Auth
app.get('/twitter/return', function(req, res, next){

	if (req.session.oauth) {
		req.session.oauth.verifier = req.query.oauth_verifier;
		var oauth = req.session.oauth;

		oa.getOAuthAccessToken(oauth.token,oauth.token_secret,oauth.verifier, 
		function(error, oauth_access_token, oauth_access_token_secret, results){
			if (error){
				console.log(error);
				res.send("yeah something broke.");
			} else {
				req.session.oauth.access_token = oauth_access_token;
				req.session.oauth,access_token_secret = oauth_access_token_secret;
				console.log(results);
				userId = results.screen_name;
				access_secret = oauth_access_token_secret;
				access_token = oauth_access_token;
				Twitter = new Twit({
					  consumer_key:         cons_Key,
					  consumer_secret:      cons_Secret,
					  access_token:         access_token,
					  access_token_secret:  access_secret,
					  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
					  strictSSL:            true,     // optional - requires SSL certificates to be valid.
					});
				// res.send(JSON.stringify(results));
				res.redirect('http://localhost:3000');
			}
		}
		);
	} else
		next(new Error("Session init error..!"))
});



// Get First 5 tweets from timeline
app.get('/tweets',function(req,res){
	Twitter.get('statuses/home_timeline',{count:6}, function(err, data, response) {
  		 res.setHeader('Content-Type', 'application/json');
    res.send({ 'tweets': data,'err':err });
		})
	
})

// Like Tweet
app.get('/like/:tweetId',function(req,res){	
		Twitter.post('favorites/create',{id:req.params.tweetId},function(err,data,response){
		res.setHeader('Content-Type', 'application/json');
		    res.send(JSON.stringify({ 'data': response,'error':err }));
		});
		 
		});

// Unlike Tweet
app.get('/unlike/:tweetId',function(req,res){

		Twitter.post('favorites/destroy',{id:req.params.tweetId},function(err,data,response){
		res.setHeader('Content-Type', 'application/json');
		    res.send(JSON.stringify({ 'data': response,'error':err }));
		});
		
		});

// Get Single Tweet
app.get('/tweet/:tweetId',function(req,res){

		Twitter.get('statuses/show',{id:req.params.tweetId,tweet_mode:'extended'},function(err,data,response){
		res.setHeader('Content-Type', 'application/json');
		    res.send(JSON.stringify({'error':err,'data':data }));
		});
		
		});

// Get Profile Info
app.get('/profile',function(req,res){
	Twitter.get('users/show',{screen_name:userId},function(err,data,response)
	{
			res.setHeader('Content-Type', 'application/json');
		    res.send(JSON.stringify({ 'data': data,'error':err }));

	});
});





app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.listen(port, () => console.log(`Listening on port ${port}`));