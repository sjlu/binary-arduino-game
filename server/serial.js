define(['child_process', 'serialport'], function(child, serialport) {
  var createSerial = function(port) {
    return {
      'connect': function(socket) {
        board = new serialport.SerialPort(port, {
          baudrate: 9600,
          parser: serialport.parsers.readline("\n")
        });
        
        var io = socket;
        board.on('data', function(data) {
          data = data.toString();
          if (data.replace(/^\s*([\S\s]*?)\s*$/, '$1') != "") {
            io.sockets.emit('msg', data); 
          }
        });

        return board;
      }
    };
  };

  return createSerial;
});
