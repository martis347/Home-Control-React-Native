#include <ESP8266WiFi.h>
#include <ESP8266mDNS.h>
#include <WiFiUdp.h>
#include <ArduinoOTA.h>
#include <ESP8266WebServer.h>
#include <WiFiClient.h>

const char* ssid = "2 Guys 1 Router";
const char* password = "admin01ADF";

ESP8266WebServer server(80);   //instantiate server at port 80 (http port)
int pin = 5;
bool turnedOn = true;

void setup() {
  Serial.begin(115200);
  pinMode(pin, OUTPUT);
  digitalWrite(pin, HIGH);
  turnedOn = true;
  Serial.println("Booting");
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  while (WiFi.waitForConnectResult() != WL_CONNECTED) {
    Serial.println("Connection Failed! Rebooting...");
    delay(5000);
    ESP.restart();
  }
  ArduinoOTA.setHostname("NodeMCU_LightsRelay"); // 192.168.31.243 - Wall & 192.168.31.244 - Ceiling
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
  Serial.println("Ready");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());

  server.on("/on", [](){
    server.send(200);
    digitalWrite(pin, HIGH);
    turnedOn = true;
    Serial.println("on");
  });
  server.on("/off", [](){
    server.send(200);
    digitalWrite(pin, LOW);
    turnedOn = false;
    Serial.println("off");
  });
  server.on("/status", [](){
    server.send(200, "application/json", (String)"{ \"turnedOn\": " + (turnedOn ? "true" : "false") + " }");
  });
  server.begin();
  Serial.println("Web server started!");
}

void loop() {
  ArduinoOTA.handle();
  server.handleClient();
}
