#include <Arduino.h>

#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>

#include <WebSocketsClient.h>

#include <Hash.h>

ESP8266WiFiMulti WiFiMulti;
WebSocketsClient webSocket;

#define USE_SERIAL Serial
#define r1 5  //1
#define g1 4  //2
#define b1 15  //8

#define r2 14 //5
#define g2 12 //6
#define b2 13 //7

int values[3] = {0, 0, 0};
int oldValues[3] = {0, 0, 0};
void webSocketEvent(WStype_t type, uint8_t * payload, size_t length) {

  switch (type) {
    case WStype_DISCONNECTED:
      USE_SERIAL.printf("[WSc] Disconnected!\n");
      break;
    case WStype_CONNECTED:
      USE_SERIAL.printf("[WSc] Connected to url: %s\n", payload);
      break;
    case WStype_TEXT:
      updateValues(payload);
      break;
  }
}

void updateValues(uint8_t * payload)
{
  char* str = (char*)payload;
  values[0] = atoi(strtok(str, " "));
  values[1] = atoi(strtok(NULL, " "));
  values[2] = atoi(strtok(NULL, " "));
}

void setup() {
  USE_SERIAL.begin(38400);

  USE_SERIAL.setDebugOutput(true);


  pinMode(r1, OUTPUT); pinMode(g1, OUTPUT); pinMode(b1, OUTPUT);
  pinMode(r2, OUTPUT); pinMode(g2, OUTPUT); pinMode(b2, OUTPUT);

  USE_SERIAL.println();
  USE_SERIAL.println();
  USE_SERIAL.println();

  for (uint8_t t = 4; t > 0; t--) {
    USE_SERIAL.printf("[SETUP] BOOT WAIT %d...\n", t);
    USE_SERIAL.flush();
    delay(1000);
  }

  WiFiMulti.addAP("HomeControl", "HomeControl347");
  //WiFiMulti.addAP("2 Guys 1 Router", "admin01ADF");

  while (WiFiMulti.run() != WL_CONNECTED) {
    delay(100);
  }

  webSocket.begin("10.42.0.1", 3001, "/ws/lightningReceiver");
  //webSocket.begin("192.168.31.248", 3001, "/ws/lightningReceiver");

  webSocket.onEvent(webSocketEvent);
  webSocket.setReconnectInterval(5000);

}

void loop() {
  webSocket.loop();

  if (oldValues[0] != values[0] || oldValues[1] != values[1] || oldValues[2] != values[2])
  {
    oldValues[0] = values[0];
    oldValues[1] = values[1];
    oldValues[2] = values[2];
    USE_SERIAL.print(values[0]);
    USE_SERIAL.print(' ');
    USE_SERIAL.print(values[1]);
    USE_SERIAL.print(' ');
    USE_SERIAL.println(values[2]);

    analogWrite(r1, values[0]); analogWrite(r2, values[0]);
    analogWrite(g1, values[1]); analogWrite(g2, values[1]);
    analogWrite(b1, values[2]); analogWrite(b2, values[2]);
  }
}
