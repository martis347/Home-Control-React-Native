#include <IRrecv.h>
#include <IRremoteESP8266.h>

IRrecv irrecv(14);
decode_results results;

void setup() {
  Serial.begin(9600);
  irrecv.enableIRIn();
}

void loop() {
  if (irrecv.decode(&results)) {
    irrecv.resume();

    if(results.value == 0x8E7807F) {
      Serial.println("Mute");
    }
    
    else if (results.value == 0x8E700FF) {
       Serial.println("Off");
    } 
    
    else if (results.value == 0x8E730CF) {
       Serial.println("Volume +");
    } 
    
    else if (results.value == 0x8E7906F) {
       Serial.println("Volume -");
    } 
    
    else if (results.value == 0x8E750AF) {
       Serial.println("Line1");
    } 
    
    else if (results.value == 0x8E7A857) {
       Serial.println("Line2");
    } 
    
    else if (results.value == 0x8E7B04F) {
       Serial.println("Optical");
    } 
    
    else if (results.value == 0x8E76897) {
       Serial.println("Coaxial");
    } 
    
    else if (results.value == 0x8E7708F) {
       Serial.println("Bluetooth");
    } else {
      uint32_t low = results.value % 0xFFFFFFFF;
      uint32_t high = (results.value>> 32) % 0xFFFFFFFF;
      Serial.println(high, HEX);
      Serial.println(high);
      Serial.println(low, HEX);
      Serial.println(low);
    }
  }
}
