#include <FastLED.h>
#include <ESP8266WiFi.h>
#include <ESP8266mDNS.h>
#include <WiFiUdp.h>
#include <ArduinoOTA.h>
#include <ESP8266WebServer.h>
#include <WiFiClient.h>
#include <WebSocketsServer.h>
#include <ArduinoJson.h>
#include <QueueArray.h>

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
int customPaletteSize = 4;
int customPaletteColors[16];
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
    if (palette == "Christmas") {
      handleChristmas();
    } else if (palette == "Christmas2") {
      handleChristmas2();
    } else if (palette == "Strobe") {
      handleStrobe();
    } else if (palette == "Rain") {
      handleRain();
    } else {
      startIndex = startIndex + 1;
      handlePalette(startIndex);
    }
  }
  else if (mode == "Canvas") {
    // Do nothing, websockets will handle that
  }
  else {
    for (int i = 0; i < NUM_LEDS; i++) {
      leds[i] = CHSV(0, 0, 0);
    }
  }

  FastLED.show();
  FastLED.delay(500 / speed);
}

void webSocketEvent(uint8_t num, WStype_t type, uint8_t * payload, size_t length) {
  // Serial.println("WHAAAT");
  if (type == WStype_TEXT) {
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
  customPaletteSize = status["customPaletteSize"].as<int>();
  JsonArray& colors = status["customPaletteColors"];
  for (int i = 0; i < customPaletteSize; i++) {
    customPaletteColors[i] = colors.get<int>(i);
  }
  if (!status.success()) {
    Serial.println("Failed to parse request!");
    server.send(400);
    return;
  }

  if (palette == "Christmas" || palette == "Christmas2") {
    Serial.println("Mode is Christmas");
  } else if (palette == "Red") {
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
  } else if (palette == "Custom") {
    switch (customPaletteSize) {
      case 4:
        currentPalette = CRGBPalette16(customPaletteColors[0], customPaletteColors[1], customPaletteColors[2], customPaletteColors[3]);
        break;
      case 8:
        currentPalette = CRGBPalette16(customPaletteColors[0], customPaletteColors[0], customPaletteColors[1], customPaletteColors[1], customPaletteColors[2], customPaletteColors[2], customPaletteColors[3], customPaletteColors[3], customPaletteColors[4], customPaletteColors[4], customPaletteColors[5], customPaletteColors[5], customPaletteColors[6], customPaletteColors[6], customPaletteColors[7], customPaletteColors[7]);
        break;
      case 16:
        currentPalette = CRGBPalette16(customPaletteColors[0], customPaletteColors[1], customPaletteColors[2], customPaletteColors[3], customPaletteColors[4], customPaletteColors[5], customPaletteColors[6], customPaletteColors[7], customPaletteColors[8], customPaletteColors[9], customPaletteColors[10], customPaletteColors[11], customPaletteColors[12], customPaletteColors[13], customPaletteColors[14], customPaletteColors[15]);
        break;
    }
  }


  FastLED.setBrightness(status.get<int>("brightness"));
  brightness = status.get<int>("brightness");
  server.send(200);
}

void handlePalette(uint8_t colorIndex) {
  for ( int i = 0; i < NUM_LEDS; i++) {
    leds[i] = ColorFromPalette( currentPalette, colorIndex, brightness, LINEARBLEND);
    colorIndex+=3;
  }
}

void handleChristmas() {
  CRGB lights[10];
  lights[0] = CRGB::Blue;
  lights[1] = CRGB::Green;
  lights[2] = CRGB::Red;
  lights[3] = CHSV(128, 255, 255);
  lights[4] = CHSV(32, 255, 255);
  lights[5] = CHSV(224, 255, 255);
  lights[6] = CHSV(192, 255, 255);

  for (int i = 0; i < 100; i += 5) {
    int randomNum = random(6);
    int randomNum2 = random(3);
    if (randomNum2 == 0) {
      leds[i] = CRGB::Black;
      leds[i + 1] = CRGB::Black;
      leds[i + 2] = lights[randomNum];
      leds[i + 3] = CRGB::Black;
      leds[i + 4] = CRGB::Black;
    } else if (randomNum2 == 1) {
      leds[i] = lights[randomNum];
      leds[i + 1] = CRGB::Black;
      leds[i + 2] = CRGB::Black;
      leds[i + 3] = CRGB::Black;
      leds[i + 4] = CRGB::Black;
    } else if (randomNum2 == 2) {
      leds[i] = CRGB::Black;
      leds[i + 1] = lights[randomNum];
      leds[i + 2] = CRGB::Black;
      leds[i + 3] = CRGB::Black;
      leds[i + 4] = CRGB::Black;
    }
    
  }

  FastLED.delay(30000 / speed);
}

int christmas2Brightness = 255;
bool christmas2GoingUp = false;
int christmas2Color = random(256);

void handleChristmas2() {
  if (christmas2GoingUp) {
    christmas2Brightness += 2;
  } else {
    christmas2Brightness -= 2;
  }

  if (christmas2Brightness > 255) {
    christmas2GoingUp = false;
    christmas2Brightness = 255;
  } else if (christmas2Brightness < 0) {
    christmas2GoingUp = true;
    christmas2Brightness = 0;
    christmas2Color = random(256);
  }
  
  fill_solid(leds, NUM_LEDS, CHSV(christmas2Color, 255, christmas2Brightness));

  if (christmas2Brightness == 0) {
    FastLED.delay(1500);
  }
  FastLED.delay(80 / speed);
}

bool strobeOn = false;
void handleStrobe() {
  for (int i = 0; i < NUM_LEDS; i++) {
    leds[i] = strobeOn ? CRGB::White : CRGB::Black;
  }
  
  strobeOn = !strobeOn;
  if (strobeOn) {
    FastLED.delay(1500 / speed);
  }
  FastLED.delay(600 / speed);
}

struct CHSV_drop {
  CHSV color;
  int index;
};

QueueArray <CHSV_drop> rainValues;
void handleRain() {
  CHSV_drop drop;
  drop.color = CHSV(random(256), 255, 255);
  drop.index = random(0, 100);

  rainValues.enqueue(drop);
  if (rainValues.count() > 15) {
    rainValues.dequeue();
  }

  for (int i = 0; i < NUM_LEDS; i++) {
    leds[i] = CRGB::Black;
  }
  for (int i = 0; i < rainValues.count(); i++) {
    leds[rainValues[i].index] = rainValues[i].color;
  }

  FastLED.delay(5000 / speed);
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
  currentPalette = RainbowColors_p;
}
