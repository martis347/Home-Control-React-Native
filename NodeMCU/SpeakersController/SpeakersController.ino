#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>
 
// Replace with your network credentials
const char* ssid = "HomeControl";
const char* password = "HomeControl347";
 
ESP8266WebServer server(80);   //instantiate server at port 80 (http port)
 
int pin = 5;
void setup(void){
  pinMode(pin, OUTPUT);
  digitalWrite(pin, LOW);
  delay(1000);
  Serial.begin(115200);
  WiFi.begin(ssid, password); //begin WiFi connection

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
   
  server.on("/on", [](){
    server.send(200);
    digitalWrite(pin, HIGH);
    Serial.println("on");
  });
  server.on("/off", [](){
    server.send(200);
    digitalWrite(pin, LOW);
    Serial.println("off");
  });
  server.begin();
  Serial.println("Web server started!");
}
 
void loop(void){
  server.handleClient();
}
