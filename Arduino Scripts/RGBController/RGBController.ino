#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>
#include "FastLED.h"

// Replace with your network credentials
const char* ssid = "HomeControl";
const char* password = "HomeControl347";
CRGB leds[1];

#define DATA_PIN 4       // Clock and data pins for LED data
#define CLOCK_PIN 5

ESP8266WebServer server(80);   //instantiate server at port 80 (http port)
 
int pin = 5;
void setup(void){
  pinMode(pin, OUTPUT);
  digitalWrite(pin, LOW);
  delay(1000);
  Serial.begin(115200);
  WiFi.begin(ssid, password); //begin WiFi connection
  LEDS.addLeds<P9813, DATA_PIN, CLOCK_PIN>(leds, 1);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());

  server.on("/", handleRequest);

  server.begin();
  Serial.println("Web server started!");
}
 
void loop(void){
  server.handleClient();
}

void handleRequest() {
  int r = server.arg("r").toInt();
  int g = server.arg("g").toInt();
  int b = server.arg("b").toInt();

  leds[0].setRGB(r, g, b);
  FastLED.show();
  Serial.print(r);
  Serial.print(" ");
  Serial.print(g);
  Serial.print(" ");
  Serial.println(b);
  server.send(200);
}
