var mongoose = require('mongoose');
var url = require('url');

var db = mongoose.connection;

db.on('error', console.error);
//db.once('open',function() {

	var appSchema = new mongoose.Schema({
		doc: String,
		start: {type: Date},
		duration: {type: Number, deafult: 15},
		appType: {type: String, default: 'Consultation'},
		booked: {type: Boolean, default: false},
		patient: String,
		reason: String
	});
	var Appointment = mongoose.model('Appointment', appSchema);

	var userSchema = new mongoose.Schema({
		email: String,
		first: String,
		last: String,
		gender: String,
		dob: Date
	});
	var User = mongoose.model('User', userSchema);
//});

mongoose.connect('mongodb://admin:12345@ds049219.mongolab.com:49219/senghaoyan');



function start(request, response) {
	console.log("Request handler 'start' was called");
	
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.write("Server started");
	response.end();
}

function upload(request, response) {
	console.log("Request handler 'upload' was called");
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.write("Hello Upload");
	response.end();
}

function foo(request, response) {
	console.log("Request handler 'foo' was called");
	response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("Foo haha");
        response.end();
}


function registerUser(request, response) {
	console.log(request.url);
	db.on('error',console.error);
	var queryAsObject = new User(url.parse(request.url,true).query);
	queryAsObject.save(function(err,User) {
		if (err) return console.error(err);
		response.writeHead(200, {"Content-Type": "text/plain"});
		response.write("callback(" + JSON.stringify(Movie, undefined, 2) + ");");
		response.end();
	});
}

function createApp(request, response) {
	console.log(request.url);
	db.on('error',console.error);
	var queryAsObject = new Appointment(url.parse(request.url,true).query);
	queryAsObject.save(function(err,Appointment) {
		if (err) return console.error(err);
		response.writeHead(200, {"Content-Type": "text/plain"});
		response.write("callback(" + JSON.stringify(Appointment, undefined, 2) + ");");
		response.end();
	});
}

function findApps(request, response) {
	console.log(request.url);
	db.on('error', console.error);
	Appointment.find(url.parse(request.url,true).query, function(err, Appointments) {
		if (err) return console.error(err);
		response.writeHead(200, {"Content-Type": "text/plain"});
		response.write("callback(" + JSON.stringify(Appointments, undefined, 2) + ");");
		response.end();
	});
}

exports.start = start;
exports.upload = upload;
exports.foo = foo;
exports.registerUser = registerUser;
exports.createApp = createApp;
exports.findApps = findApps;
