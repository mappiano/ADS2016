/***********************************************************************************
* NOTAS:
*        emit = emite eventos
*        on   = escucha eventos
************************************************************************************/

/* ======================= - Declaracion Variables - ============================ */

var express = require('express');               // Creación una Aplicación express
var app = express();

var server = require('http').Server(app);       // Creación nuevo Server
var io = require('socket.io').listen(server);   

var serialport = require('serialport');         // Creación Puerto Serial
var SerialPort = serialport.SerialPort;


/* ======================= - Apertura e Implementación del Serial - ============ */

var myPort = new SerialPort("COM4", {           // Escucha por el puerto Serie COM4
	baudrate: 9600,                             // Vel. de Datos: 9600 bits por seg.
	parser: serialport.parsers.readline("\n")   // Genera nueva linea Data Event
}).on('error', (err) => {
	console.log("Error - Puerto Serial COM4 no detectado.")
});

myPort.on('open',onOpen);                       // Apertura/Escucha del puerto

/* ======================= - Inicio de la Conexion - ============================ */

io.on('connection',function(socket){            // Escuchando nuevos usuarios
	console.log("Nuevo Usuario Conectado");        

	socket.on('flags', function (flag) {        // Recibe el Flag enviado por Index  
    
/**********************************************************************************/
    myPort.write(flag);                         // Debería escribir el flag al serial
/**********************************************************************************/
	});
});


/* ======================= - Implementación del Serial - ======================== */

function onOpen() {                            
	console.log("Arduino Conectado");
	io.push
}


/* ======================= - Procesos de Datos Serial - ======================== */

myPort.on('data',onData);                       // Listo para recibir data

function onData(dato) {
	var time = new Date().getTime();            // Valor correspondientes a las x
	var datos = parseFloat(dato);               // Temperatura correspon. a las y
	io.sockets.emit('lectura',datos,time);      // Emite un evento para todos los clientes conectado  	
}


/* ======================= - Funciones del Server - ============================ */

app.get('/',function(req,res){
	res.sendfile(__dirname+'/index.html');
});

server.listen(8080,function(){
	console.log("Servidor Inicializado");
});

/* ======================= - Fin Server.js - =================================== */