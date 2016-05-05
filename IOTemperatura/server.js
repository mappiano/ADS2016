var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

var serialport = require('serialport');
var SerialPort = serialport.SerialPort;

io.on('connection',function(socket){
	console.log("Nuevo Usuario Conectado");
});

var myPort = new SerialPort("COM4", {
	baudrate: 9600,
	parser: serialport.parsers.readline("\n")
});

myPort.on('open',onOpen);
myPort.on('data',onData);

/*
* Funcion que recibe desde el 
* arduino el dato.
*/
function onData(dato) {
	var time = new Date().getTime();
	var datos = parseFloat(dato);
	io.sockets.emit('lectura',datos,time);
}

function onOpen() {
	console.log("Arduino Conectado");
}

app.get('/',function(req,res){
	res.sendfile(__dirname+'/index.html');
});

server.listen(8080,function(){
	console.log("Servidor Inicializado");
});