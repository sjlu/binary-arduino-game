
var requirejs = require('requirejs');


requirejs.config({
    nodeRequire: require
});
//var twilio = require('twilio');
requirejs(['serial', 'web', 'socket'], function(serial, web, socket) {
    //  var player1 = serial('/dev/tty.usbmodem1d1111').connect(socket);
    //  var player2 = serial('/dev/tty.usbmodem1d1121').connect(socket); //Steve
    
    var player1 = serial('/dev/ttyACM0').connect(socket);
    var player2 = serial('/dev/ttyACM1').connect(socket); //Shy

    var resetAll = function() {
        player1.write("r");
        player2.write("r");
    };

    socket.sockets.on('connection', function(socket) {
        socket.on("reset", function(data) {
            resetAll();
        });
    });

    web.listen(8099);
});
