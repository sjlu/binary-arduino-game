void setup() {
  Serial.begin(9600);
  
  int i = 0;
  for (i = 2; i <= 8; i++) {
    pinMode(i, OUTPUT);
  }   
  for (i = 9; i <= 15; i++) {
    pinMode(i, INPUT);
  }
}

int lastStates[7] = {0};
int buttonState = 0;
int ledState = 0;
char buffer[15];
char c;

void loop() {
  c = Serial.read();
  if (c == 'r') {
    int i = 0;
    for (i = 2; i <= 8; i++) {
      digitalWrite(i, LOW);
    }
  }
  
  int i = 0;
  for (i = 9; i <= 15; i++) {
    buttonState = digitalRead(i);
    
    if (buttonState == HIGH and lastStates[i - 9] == 0) {
      ledState = digitalRead(i - 7);
      if (ledState == HIGH) {
        digitalWrite(i - 7, LOW);
      } else {
        digitalWrite(i - 7, HIGH);
      }

      sprintf(buffer, "[%d,%d,%d,%d,%d,%d,%d]", digitalRead(2), digitalRead(3), digitalRead(4), digitalRead(5), digitalRead(6), digitalRead(7), digitalRead(8));
      Serial.println(buffer);
    }
    
    if (buttonState == HIGH) {
      lastStates[i - 9] = 1;
    } else {
      lastStates[i - 9] = 0;
    }
    
    delay(20);
  }
}
