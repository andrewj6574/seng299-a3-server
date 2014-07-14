var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {}

handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/foo"] = requestHandlers.foo;
handle["/registerUser"] = requestHandlers.registerUser;
handle["/createApp"] = requestHandlers.createApp;
handle["/findApps"] = requestHandlers.findApps;

server.start(router.route, handle);
