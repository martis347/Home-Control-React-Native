#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>
#include <ArduinoOTA.h>
#include "FastLED.h"

// Replace with your network credentials
const char* ssid = "Free WiFi 2.4GHz";
const char* password = "16aukstas16";
CRGB leds[1];

#define DATA_PIN 4       // Clock and data pins for LED data
#define CLOCK_PIN 5

ESP8266WebServer server(80);   //instantiate server at port 80 (http port)
 
int pin = 5;
void setup(void){
  Serial.begin(115200);
  pinMode(pin, OUTPUT);
  digitalWrite(pin, LOW);
  Serial.println("Booting");
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  while (WiFi.waitForConnectResult() != WL_CONNECTED) {
    Serial.println("Connection Failed! Rebooting...");
    delay(5000);
    ESP.restart();
  }
  ArduinoOTA.setHostname("NodeMCU_LightsRelay"); // 192.168.0.110 - Wall & 192.168.0.120 - Ceiling
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
  
  LEDS.addLeds<P9813, DATA_PIN, CLOCK_PIN>(leds, 1);
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
