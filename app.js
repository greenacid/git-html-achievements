
/**
 * Module dependencies.
 */

var express = require('express'), achievements = require('./lib/achievements').achievements;

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.methodOverride());
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});


app.sendJson = function(res, data) {
    var resBody = JSON.stringify(data);
    res.send(
        resBody,
        {
            'Content-Type': 'application/json',
            'Content-Length': resBody.length
         }
    );
};

// Routes
app.get('/user', function(req, res){
	app.sendJson(res, user);
});

app.get('/repos', function(req, res){
    app.sendJson(res, repos);
});

app.get('/achievements', function(req, res){
	// the achievements
	var criteria = {
		'you exist on github': function(data) {
			return (typeof data.user != 'undefined'); 
		},
		'Exebitionist': function(data) {
			return (typeof data.user.gravatar_id);
		},
		'I can haz has gist': function(data) {
			return (typeof data.user.public_repo_count);
		},
		'more than 10': function(data) {
			return (data.user.public_repo_count > 10);		
		},
	    'more than 100': function(data) {
            return (data.user.public_repo_count > 100);
        },
		'u have mail': function(data) {
			return (typeof data.user.email !== null);
		}
	};

	var ach = new achievements(criteria);
	var data = {
		user: user.user,
		repos:	user
	};
	ach.calculate(data, function(data) {
		console.log(data);
	});
    app.sendJson(res, ach.achieved);
});

app.get('/', function(req, res){
  res.render('index', {
    locals: {
      title: 'Express'
    }
  });
});

// Only listen on $ node app.js

if (!module.parent) {
  app.listen(process.env.C9_PORT);
  console.log("Express server listening on port %d", app.address().port);
}

var user = {"user":{"gravatar_id":"801feec9094b07d4c492d1a8731b1a97","company":"cxo","name":"Sebastian Schürmann","created_at":"2009/02/16 17:09:52 -0800","location":null,"public_repo_count":15,"public_gist_count":4,"blog":null,"following_count":17,"id":55102,"type":"User","permission":null,"followers_count":6,"login":"sebs","email":null}}; var repos = {"repositories":[{"open_issues":0,"url":"https://github.com/sebs/jsfuzz","has_issues":true,"pushed_at":"2009/03/21 03:04:15 -0700","homepage":"","has_downloads":true,"created_at":"2009/03/21 02:57:38 -0700","fork":false,"watchers":1,"size":228,"private":false,"name":"jsfuzz","owner":"sebs","has_wiki":true,"description":"A fuzzy logic library for javascript","forks":0},{"open_issues":0,"url":"https://github.com/sebs/phptestfest","has_issues":true,"pushed_at":"2009/04/17 13:40:23 -0700","homepage":"http://sebs.freeflux.net","has_downloads":true,"created_at":"2009/04/17 08:09:03 -0700","fork":false,"watchers":3,"size":0,"private":false,"name":"phptestfest","owner":"sebs","has_wiki":true,"description":"Tests for phptestfest","forks":0},{"open_issues":0,"url":"https://github.com/sebs/memcachejs","has_issues":false,"pushed_at":"2010/01/15 04:01:03 -0800","homepage":"","has_downloads":true,"created_at":"2010/01/20 07:18:28 -0800","fork":true,"watchers":1,"size":356,"private":false,"name":"memcachejs","owner":"sebs","has_wiki":true,"description":"Implementation of a memcache client written in Javascript","forks":1},{"open_issues":0,"url":"https://github.com/sebs/Desync-Proxy","has_issues":true,"pushed_at":"2010/03/27 09:32:41 -0700","homepage":"","has_downloads":true,"created_at":"2010/03/05 05:53:52 -0800","fork":false,"watchers":1,"size":488,"private":false,"name":"Desync-Proxy","owner":"sebs","has_wiki":true,"description":"A minimal library to make sycronous webservices asyncronous","forks":1},{"open_issues":0,"url":"https://github.com/sebs/nodegamr","has_issues":true,"pushed_at":"2010/04/13 06:15:05 -0700","homepage":"","has_downloads":true,"created_at":"2010/03/29 06:31:28 -0700","fork":false,"watchers":1,"size":236,"private":false,"name":"nodegamr","owner":"sebs","has_wiki":true,"description":"Gaming code for nodejs","forks":1},{"open_issues":0,"url":"https://github.com/sebs/exp-faq","has_issues":true,"homepage":"","has_downloads":true,"created_at":"2010/09/21 13:19:54 -0700","fork":false,"watchers":1,"size":0,"private":false,"name":"exp-faq","owner":"sebs","has_wiki":true,"description":"","forks":1},{"open_issues":0,"language":"JavaScript","url":"https://github.com/sebs/node-fuzzylogic","has_issues":true,"pushed_at":"2011/01/11 10:41:49 -0800","homepage":"","has_downloads":true,"created_at":"2010/10/03 08:39:03 -0700","fork":false,"watchers":1,"size":600,"private":false,"name":"node-fuzzylogic","owner":"sebs","has_wiki":true,"description":"Fuzzylogic Module for node.js","forks":1},{"open_issues":0,"language":"JavaScript","url":"https://github.com/sebs/node-fsm","has_issues":true,"pushed_at":"2011/01/11 10:32:26 -0800","homepage":"","has_downloads":true,"created_at":"2010/10/05 08:32:44 -0700","fork":false,"watchers":1,"size":2804,"private":false,"name":"node-fsm","owner":"sebs","has_wiki":true,"description":"Finite state machine implementations for node.js","forks":1},{"open_issues":0,"url":"https://github.com/sebs/node-appmanifest","has_issues":true,"pushed_at":"2010/10/21 14:17:14 -0700","homepage":"","has_downloads":true,"created_at":"2010/10/21 12:58:12 -0700","fork":false,"watchers":1,"size":88,"private":false,"name":"node-appmanifest","owner":"sebs","has_wiki":true,"description":"Generic Web App manifests for node.js apps","forks":1},{"open_issues":0,"url":"https://github.com/sebs/rapid","has_issues":false,"pushed_at":"2010/09/24 12:27:41 -0700","homepage":"","has_downloads":true,"created_at":"2010/12/17 11:07:57 -0800","fork":true,"watchers":1,"size":304,"private":false,"name":"rapid","owner":"sebs","has_wiki":true,"description":"Redis ORM-ish api for nodejs","forks":0},{"open_issues":0,"url":"https://github.com/sebs/node-maze","has_issues":true,"pushed_at":"2011/01/02 14:26:23 -0800","homepage":"","has_downloads":true,"created_at":"2010/12/30 09:58:21 -0800","fork":false,"watchers":1,"size":840,"private":false,"name":"node-maze","owner":"sebs","has_wiki":true,"description":"maze Generator for node.js","forks":1},{"open_issues":0,"url":"https://github.com/sebs/node-quadtree","has_issues":true,"pushed_at":"2011/01/05 11:42:31 -0800","homepage":"","has_downloads":true,"created_at":"2011/01/03 10:33:40 -0800","fork":false,"watchers":1,"size":284,"private":false,"name":"node-quadtree","owner":"sebs","has_wiki":true,"description":"quadtree implementation for node","forks":1},{"open_issues":0,"url":"https://github.com/sebs/browser-rpg-engine","has_issues":true,"pushed_at":"2011/01/05 14:51:35 -0800","homepage":"","has_downloads":true,"created_at":"2011/01/05 14:50:17 -0800","fork":false,"watchers":1,"size":776,"private":false,"name":"browser-rpg-engine","owner":"sebs","has_wiki":true,"description":"eng","forks":1},{"open_issues":0,"language":"JavaScript","url":"https://github.com/sebs/jsonquery","has_issues":false,"pushed_at":"2011/01/11 11:27:23 -0800","homepage":"","has_downloads":true,"created_at":"2011/01/10 12:04:29 -0800","fork":true,"watchers":1,"size":684,"private":false,"name":"jsonquery","owner":"sebs","has_wiki":true,"description":"JSONQuery provides a comprehensive set of data querying tools including filtering, recursive search, sorting, mapping, range selection, and flexible expressions with wildcard string comparisons and various operators.","forks":0},{"open_issues":0,"url":"https://github.com/sebs/git-html-achievements","has_issues":true,"pushed_at":"2011/01/11 13:09:20 -0800","homepage":"","has_downloads":true,"created_at":"2011/01/11 13:08:52 -0800","fork":false,"watchers":1,"size":108,"private":false,"name":"git-html-achievements","owner":"sebs","has_wiki":true,"description":"","forks":1}]};
