var http = require('http');
var sys = require('sys');
var fs = require('fs');
//var ws = require('./ws.js'); // while using websockets
var io = require('socket.io'); // Uncomment while using Socket.io
var clients =  [];

var server = http.createServer(function(request, response){
	response.writeHead(200, {
			'Content-Type':'text/html'
	});
	
	
	var readStream = fs.createReadStream(__dirname + "/main.html");
	sys.pump(readStream, response);
	
})

var socket = io.listen(server);
socket.on("connection", function(client){
	console.log("Socket Connected Yes");
	var username;

	console.log(client);
	client.send("Welcome to io socket chat");
	client.send("Please enter a username");

	client.on("message", function(message){
		console.log("message received");
		if(!username){
			username = message;
			client.send('Welcome to socketio chat server ' + username.toString());
			return;
		}
		
		socket.broadcast(username + " says: " + message);
	});
});

server.listen(4000);

// Using WebSockets

/*ws.createServer(function(websocket){
	
	var username;
	
	websocket.on('connect', function(resource){
		console.log('Connected.....');
		clients.push(websocket);		
		websocket.write('Welcome to node chat. Please input your username');
		
	});
	
	websocket.on('close', function(resource){
		var index = clients.indexOf(websocket);
		if(index >= 0)
		clients.splice(index);
	});
	
	websocket.on('data', function(data){
		if(!username){
		 username = data.toString();
		 websocket.write('Welcome ' + username + '!');
		 return;
		}
		 
		clients.forEach(function(client){
			client.write(username + ': ' + data);
		});
	});
		
}).listen(8080); */