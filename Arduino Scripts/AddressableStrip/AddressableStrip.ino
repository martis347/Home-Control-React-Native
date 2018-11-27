#include <FastLED.h>
#include <ESP8266WiFi.h>
#include <ESP8266mDNS.h>
#include <WiFiUdp.h>
#include <ArduinoOTA.h>
#include <ESP8266WebServer.h>
#include <WiFiClient.h>
#include <WebSocketsServer.h>
#include <ArduinoJson.h>

#define LED_PIN     5
#define NUM_LEDS    100
#define LED_TYPE    WS2811
#define COLOR_ORDER BRG
CRGB leds[NUM_LEDS];

#define UPDATES_PER_SECOND 100
const char* ssid = "2 Guys 1 Router";
const char* password = "admin01ADF";

ESP8266WebServer server(80);
WebSocketsServer webSocket = WebSocketsServer(81);

CRGBPalette256 currentPalette;
TBlendType    currentBlending = LINEARBLEND;
uint8_t brightness = 0;
String mode = "";
String palette = "";
int speed = 30;
void setup() {
  Serial.begin(115200);
  Serial.println("Booting");
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  while (WiFi.waitForConnectResult() != WL_CONNECTED) {
    Serial.println("Connection Failed! Rebooting...");
    delay(5000);
    ESP.restart();
  }

  ArduinoOTA.setHostname("NodeMCU_AddressableStrip");
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
  FastLED.addLeds<LED_TYPE, LED_PIN, COLOR_ORDER>(leds, NUM_LEDS).setCorrection( TypicalLEDStrip );

  server.begin();
  server.on("/update", handleUpdate);
  webSocket.begin();
  webSocket.onEvent(webSocketEvent);
  Serial.println("Web server started!");
}


static uint8_t startIndex = 0;
void loop() {
  ArduinoOTA.handle();
  server.handleClient();
  webSocket.loop();

  if (mode == "Palette") {
    Serial.print("Mode is Palette ");
    Serial.println(mode);
    startIndex = startIndex + 1;
    handlePalette(startIndex);
  }
  else if (mode == "Canvas") {
    Serial.print("Mode is Canvas");
    Serial.println(mode);
    // Do nothing, websockets will handle that
  }
  else {
    Serial.print("Mode is else ");
    Serial.println(mode);
    for (int i = 0; i < NUM_LEDS; i++) {
      leds[i] = CHSV(0, 0, 0);
    }
  }

  FastLED.show();
  FastLED.delay(500 / speed);
}

void webSocketEvent(uint8_t num, WStype_t type, uint8_t * payload, size_t length){
  // Serial.println("WHAAAT");
  if (type == WStype_TEXT){
    // Format: X:Y&X:Y&X:Y&X:Y&X:Y...X:Y
    uint8_t index = 0;
    payload[length] = 0;
    char* pair = strtok((char*)payload, "&"); // Split using & delimitter

    while (pair != 0)
    {
        // Split the command in two values
        char* separator = strchr(pair, ':');
        if (separator != 0)
        {
          *separator = 0;
          int hue = atoi(pair);
          ++separator;
          int brightness = atoi(separator);
          leds[index * 2] = CHSV(hue, 255, brightness);
          leds[(index * 2) + 1] = CHSV(hue, 255, brightness);
          index++;
        }
        pair = strtok(0, "&");
    }
  }
}

void handleUpdate() {
  StaticJsonBuffer<400> jsonBuffer;
  JsonObject& status = jsonBuffer.parseObject(server.arg("plain"));
  mode = status["mode"].as<String>();
  palette = status["palette"].as<String>();
  speed = status["speed"].as<int>();
  if (!status.success()) {
    Serial.println("Failed to parse request!");
    server.send(400);
    return;
  }
 
  if (palette == "Red") {
    Serial.println("Mode is Red");
    SetupRedPalette();
  } else if (palette == "Green") {
    Serial.println("Mode is Green");
    SetupGreenPalette();
  } else if (palette == "Blue") {
    Serial.println("Mode is Blue");
    SetupBluePalette();
  } else if (palette == "Rainbow") {
    Serial.println("Mode is Rainbow");
    SetupRainbowPalette();
  }

  FastLED.setBrightness(status.get<int>("brightness"));
  brightness = status.get<int>("brightness");
  server.send(200);
}

void handlePalette(uint8_t colorIndex) {
  if (palette == "Custom") {
    
  }
    
  for( int i = 0; i < NUM_LEDS; i++) {
      leds[i] = ColorFromPalette( currentPalette, colorIndex, brightness, currentBlending);
      colorIndex += 3;
  }
}

void SetupRedPalette()
{
    CRGB red  = CHSV( HUE_RED, 255, 255);
    CRGB black  = CRGB::Black;
    
    currentPalette = CRGBPalette16(black, red, red, red, black, black, black, black, black, red, red, red, black, black, black, black);
}

void SetupGreenPalette()
{
    CRGB green  = CHSV( HUE_GREEN, 255, 255);
    CRGB black  = CRGB::Black;
    
    currentPalette = CRGBPalette16(black, green, green, green, black, black, black, black, black, green, green, green, black, black, black, black);
}

void SetupBluePalette()
{
    CRGB blue  = CHSV( HUE_BLUE, 255, 255);
    CRGB black  = CRGB::Black;
    
    currentPalette = CRGBPalette16(black, blue, blue, blue, black, black, black, black, black, blue, blue, blue, black, black, black, black);
}

void SetupRainbowPalette()
{
    currentPalette = RainbowStripeColors_p;
}
