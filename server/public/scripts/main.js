var isRunning = false;

// var client = new twilio.RestClient('AC831f5189f378fe2ec46eb761e911abe8', '289993376273c3ef4fae1e0ad51cc3f2');

// function text(){
//   client.sms.messages.create({
//   to:'+15135184527',
//   from:'+12709443699',
//   body:"The chlorine in fresh tap water irritates sensitive parts of the cat's nose. Let tap water sit for 24 hours before giving it to a cat."
//   }, function(error, message) {
//   // The HTTP request to Twilio will run asynchronously. This callback
//   // function will be called when a response is received from Twilio
//   // The "error" variable will contain error information, if any.
//   // If the request was successful, this value will be "falsy"
//   if (!error) {
//   // The second argument to the callback will contain the information
//   // sent back by Twilio for the request. In this case, it is the
//   // information about the text messsage you just sent:
//   console.log('Success! The SID for this SMS message is:');
//   console.log(message.sid);
   
//   console.log('Message sent on:');
//   console.log(message.dateCreated);
//   }
//   else {
//   console.log('Oops! There was an error.');
//   }
//   });
// }
require(["jquery"], function($) {
  var number = 0;
  
  var scoreone = 0;
  var scoretwo= 0;
  var setNumber = function() {
    number = Math.floor((Math.random()*128));
    $('#number').html(number);
    $('#scoreone').html(Number(scoreone).toString(2));
    $('#scoretwo').html(Number(scoretwo).toString(2));
  };
  setNumber();

  var socket = io.connect();
  socket.on('msg', function (data) {
    var parsed = JSON.parse(data);
    
    var binary = parsed.states.join('');
    var integer = parseInt(binary, 2);
    // text();
    if (integer === number) {

      if (parseInt(parsed.controller) == 1){
        scoreone = scoreone + 1;
        alert("Player 01 Wins!");
      }else{
        scoretwo = scoretwo + 1;
        alert("Player 10 Wins!");
      }
      setNumber();
      socket.emit("reset", "reset");
    }

    if ($("#socket li").length > 20) {
      $("#socket li:nth-child(1)").remove(); 
    }
    $('#socket').append('<li>' + data + '</li>');
  });
});
