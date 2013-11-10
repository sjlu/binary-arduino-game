var isRunning = false;

require(["jquery"], function($) {
  var number = 0;
  var setNumber = function() {
    number = Math.floor((Math.random()*128));
    $('#number').html(number);
  };
  setNumber();

  var socket = io.connect();
  socket.on('msg', function (data) {
    var parsed = JSON.parse(data);
    
    var binary = parsed.states.join('');
    var integer = parseInt(binary, 2);

    if (integer === number) {
      alert("Player " + parsed.controller + " Wins!");
      setNumber();
      socket.emit("reset", "reset");
    }

    if ($("#socket li").length > 20) {
      $("#socket li:nth-child(1)").remove(); 
    }
    $('#socket').append('<li>' + data + '</li>');
  });
});
