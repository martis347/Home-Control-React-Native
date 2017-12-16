# Home Control

Application to Control stuff around your house

## Tools

These Technologies are covering who Application

### React Native

Application is running in smartphone dedicated as a control panel.
It communicates with NodeJS Server via Websockets.

To Create .apk file, simply run:
```
./ReactNative/CreateApk.sh
```

### NodeJS For running Proxy Websockets Server

Control Panel communicates only with this Server. 
NodeJS Server communicates with NodeMCU(s) that control some specific part. 
On every state change, an update is broadcasted to all listening clients.
Currently implemented parts:
* Lithning Control

### NodeMCU

It communicates only with NodeJS Server.
Connects to Hotspot hosted by Server, that is running NodeJS.


# Interfaces

All Data is passed only as valid JSON.

## Lightning 

### React Native -> NodeJS

```
{
  turnedOn: true, // Mandatory
  sliders: [{id: 1, value: 0-100}], // Used for Brightness slider 
  sliders: [{id: 11, value: 0-100}], [{id: 12, value: 0-100}], [{id: 13, value: 0-100}], // Used for RGB slider 
  sliders: [{id: 21, value: 0-100}], [{id: 22, value: 0-100}], // Used for Rainbow slider 
}
```

*Sliders property is optional, if turnedOn if false.*

### NodeJS -> NodeMCU

```
{
  red: 0-255,
  green: 0-255,
  blue: 0-255
}
```