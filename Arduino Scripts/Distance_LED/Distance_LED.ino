
#include <QueueArray.h>
#include "FastLED.h"

struct RGB_set {         // structs to store the RGB and HSV values:
  unsigned char r;
  unsigned char g;
  unsigned char b;
} RGB_set;

struct HSV_set {
  signed int h;
  unsigned char s;
  unsigned char v;
} HSV_set;

#define NUM_LEDS 1       // Since the LEDs in my RGB LED strip are NOT individually addressable, and 
                         // are being controlled with a P9813 based module, there is only '1' LED
#define DATA_PIN 5       // Clock and data pins for LED data
#define CLOCK_PIN 4
CRGB leds[NUM_LEDS];                // Define LED object

const int trigPin = 9;
const int echoPin = 10;
bool isTurnedOn = false;
int maxValue = 65;
QueueArray <long> values;
long sum = 0;
void setup() {
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  LEDS.addLeds<P9813, DATA_PIN, CLOCK_PIN>(leds, NUM_LEDS);  // initialize LED control object
  Serial.begin(9600);
}
void loop() {
  long distance = MeasureDistance();
  // Prints the distance on the Serial Monitor
  values.enqueue(distance);
  sum += distance;
  if (values.count() > 30 ) {
    long value = values.dequeue();
    sum -= value;
  }

  long average = sum / 30;
  Serial.println(average);

  if (average > 800) {
    FadeIn();
    isTurnedOn = true;
  } else {
    FadeOut();
    isTurnedOn = false;
  }
}

void FadeIn() {
  if (isTurnedOn) {
    return;
  }
  for(int i = 1; i <= maxValue; i++) {
    leds[0].setRGB(i, i, i);
    FastLED.show();
    delay(10);
  }
}


void FadeOut() {
  if (!isTurnedOn) {
    return;
  }
  for(int i = maxValue; i >= 0; i--) {
    leds[0].setRGB(i, i, i);
    FastLED.show();
    delay(4);
  }
}

long MeasureDistance() {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  long duration = pulseIn(echoPin, HIGH);
  

  return duration;
}

