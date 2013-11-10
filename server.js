var io = require('socket.io').listen(8000);

var SerialPort = require('serialport').SerialPort;
var sp = new SerialPort();
sp.open("/dev/tty.usbmodem1411", {
  baudRate: 9600,
  dataBits: 8,
  parity: 'none',
  stopBits: 1,
  flowControl: false
});

io.sockets.on('connection', function(socket) {
  socket.on('message', function(message) {
    console.log('message');
  });
  socket.on('disconnect', function() {
    console.log('disconnected');
  });
});

sp.on('data', function(data) {
  console.log(data);
});
