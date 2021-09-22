#include <Arduino.h>
#include <FS.h>
#include <LittleFS.h>
#include <ESP8266WiFi.h>
#include <ESPAsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include "def.h"
#include <ArduinoJson.h>
#include <Stepper.h>

FS* filesystem = &LittleFS;
#define FileFS LittleFS
// Replace with your network credentials

Stepper stepper(200, M1Step, M1Dir);

// Create AsyncWebServer object on port 80
AsyncWebServer server(80);

// Replaces placeholder with LED state value
String processor(const String& var){
  Serial.println(var);
  if(var == "GPIO_STATE"){
    if(digitalRead(ledPin)){
      ledState = "OFF";
    }
    else{
      ledState = "ON";
    }
    Serial.print(ledState);
    return ledState;
  }
  return String();
}
 
void handleBody(AsyncWebServerRequest *request, uint8_t *data, size_t len, size_t index, size_t total){
  DD = "";
 
  const size_t CAPACITY = JSON_OBJECT_SIZE(2);
  StaticJsonDocument<CAPACITY> doc;

  
  /* if(!index){
    Serial.printf("BodyStart: %u B\n", total);
  } */
  for(size_t i=0; i<len; i++){
    DD += char(data[i]);
  }

  deserializeJson(doc, DD);
  JsonObject object = doc.as<JsonObject>();

  gas = object["gas"];
  speed = map(gas*10,0,10,100,1000);
  Serial.println(speed);
  
  //stepper.step(1000);
  
  

  
  
  
  /* if(index + len == total){
    Serial.println();
    Serial.printf("BodyEnd: %u B\n", total);
  } */
}

void setup(){
  pinMode(M1Step,OUTPUT);
  pinMode(M2Step,OUTPUT);
  pinMode(M1Dir,OUTPUT);
  pinMode(M2Dir,OUTPUT);

  

  Serial.begin(9600);
  pinMode(ledPin, OUTPUT);

  // Initialize FileFS
  filesystem->begin();
  if(!FileFS.begin()){
    Serial.println("An Error has occurred while mounting FileFS");
    return;
  }

  // Connect to Wi-Fi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi..");
  }

  // Print ESP32 Local IP Address
  Serial.println(WiFi.localIP());

  // Route for root / web page
  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request){
    Serial.println("hej");
    request->send(FileFS, "/index.html", String(), false, processor);
  });
  
  // Route to load style.css file
  server.on("/style.css", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send(FileFS, "/style.css", "text/css");
  });

  // Route to set GPIO to HIGH
  server.on("/led2on", HTTP_GET, [](AsyncWebServerRequest *request){
    digitalWrite(ledPin, LOW);    
    request->send(FileFS, "/index.html", String(), false, processor);
  });
  
  // Route to set GPIO to LOW
  server.on("/led2off", HTTP_GET, [](AsyncWebServerRequest *request){
    digitalWrite(ledPin, HIGH);    
    request->send(FileFS, "/index.html", String(), false, processor);
  });

  server.on("/controller", HTTP_POST, [](AsyncWebServerRequest *request){
    request->send(200);
  }, NULL,handleBody);

  

  // Start server
  server.onRequestBody(handleBody);
  //server.onFileUpload(onUpload);
  server.begin();

 
  //stepper.setSpeed(0);
}
 
void drive(int t, int motor){
  
  digitalWrite(motor, HIGH);
  delayMicroseconds(t);
  digitalWrite(motor, LOW);
  delayMicroseconds(t);
  
  
}

void loop(){
  if (gas > 0){
    stepper.step(1);
  }  
  
  if (speed > currentSpeed){
    currentSpeed += 1;
    stepper.setSpeed(currentSpeed); 

  } else if(speed < currentSpeed){
    currentSpeed -= 1;
    stepper.setSpeed(currentSpeed);
    
  }
  
  
}