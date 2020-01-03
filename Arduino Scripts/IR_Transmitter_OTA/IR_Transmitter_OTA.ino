#include <ESP8266mDNS.h>
#include <WiFiUdp.h>
#include <ArduinoOTA.h>
#include <IRsend.h>
#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>
#include <stdlib.h>

// Replace with your network credentials
const char* ssid = "Free WiFi 2.4GHz";
const char* password = "16aukstas16";
 
ESP8266WebServer server(80);
IRsend irsend(4);  // An IR LED is controlled by GPIO pin 4 (D2)
int IR_PIN = 2;
void setup(void){
  delay(1000);
  Serial.begin(115200);
  WiFi.begin(ssid, password); //begin WiFi connection

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  ArduinoOTA.setHostname("NodeMCU_IRTransmitter");

  ArduinoOTA.onStart([]() {
    Serial.println("Start");
  });
  ArduinoOTA.onEnd([]() {
    Serial.println("\nEnd");
  });
  ArduinoOTA.onProgress([](unsigned int progress, unsigned int total) {
    Serial.printf("Progress: %u%%\r", (progress / (total / 100)));
  });
  ArduinoOTA.onError([](ota_error_t error) {
    Serial.printf("Error[%u]: ", error);
    if (error == OTA_AUTH_ERROR) Serial.println("Auth Failed");
    else if (error == OTA_BEGIN_ERROR) Serial.println("Begin Failed");
    else if (error == OTA_CONNECT_ERROR) Serial.println("Connect Failed");
    else if (error == OTA_RECEIVE_ERROR) Serial.println("Receive Failed");
    else if (error == OTA_END_ERROR) Serial.println("End Failed");
  });
  ArduinoOTA.begin();
  Serial.println("");
  Serial.print("Connected to ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
  irsend.begin();
  server.on("/transmit", [](){
    int count = server.arg("count").toInt();
    Serial.println(server.arg("code"));
    uint64_t code = StringToLongLongInt(server.arg("code"));
    
    for (int i = 0; i < count; i++) 
    {
      irsend.sendSAMSUNG(code, 32);
      irsend.sendNEC(code, 32);
      delay(100);
    }
    server.send(200);
  });
  server.begin();
  Serial.println("Web server started!");
}

uint64_t StringToLongLongInt(String text) {
  int n = text.length(); 
  char charArray[n + 1];
  strcpy(charArray, text.c_str());
  uint64_t value = atoll(charArray);

  return value;
}

void loop() {
  ArduinoOTA.handle();
  server.handleClient();
}
