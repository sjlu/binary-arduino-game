import serial
import json
import random

fs = serial.Serial('/dev/tty.usbmodem1411', 9600)

while True:
  current_number = random.randrange(1, 128) 
  print "Give me: %s" % current_number
  while True:
    states = json.loads(fs.readline())
    #print states
    binary_string = ""
    for i in range(0, len(states)):
      binary_string += "%s" % states[i]
    if int(binary_string, 2) == current_number:
      break;
  print "Awesome!"
  fs.write("r")
