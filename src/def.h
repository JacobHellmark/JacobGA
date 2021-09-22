#include <Arduino.h>

void handleBody(AsyncWebServerRequest *request, uint8_t *data, size_t len, size_t index, size_t total);
const int ConX = A0; 
const int ConY = D6;
void drive(int t, int motor);
int valueX = 0;
int valueY = 0;

const int M1Step = D0;
const int M1Dir = D1;

const int M2Step = D2;
const int M2Dir = D3;
void step(int motor);

const char* ssid = "duck_slow"; //Replace with your own SSID
const char* password = "Ping01vin!"; //Replace with your own password

const int ledPin = LED_BUILTIN;
String ledState;
String DD = "";

float gas = 0;
int currentSpeed = 0;
int speed = 0;