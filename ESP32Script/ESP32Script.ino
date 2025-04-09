#include <WiFi.h>
#include <HTTPClient.h>
#include <DHT.h>
#include <Wire.h>


const char* ssid = "redmi-12"; // Edit your wifi name for device to connect
const char* password = "redmi_123"; // Edit your wifi password for device to connect
String serverName = "https://26fc-2409-40c4-100c-e80-3440-b93f-7c56-2fd6.ngrok-free.app/hook/v1/data";
// edit the live web url where your webhook is hosted

unsigned long lastTime = 0;
unsigned long timerDelay = 5000; // 5 seconds

#define DHT11PIN 23
DHT dht(DHT11PIN, DHT11);

int gpin = 34;


void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
   dht.begin();
  pinMode(gpin,INPUT);
  
  Serial.print("Connecting to WiFi");
  int attempt = 0;
  while (WiFi.status() != WL_CONNECTED && attempt < 20) { // 10 sec timeout
    delay(500);
    Serial.print(".");
    attempt++;
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\nConnected to WiFi!");
    Serial.print("IP Address: ");
    Serial.println(WiFi.localIP());
  } else {
    Serial.println("\nFailed to connect to WiFi. Check credentials.");
  }
}

void loop() {
  float humi = dht.readHumidity();
  float temp = dht.readTemperature();
  int gas = analogRead(gpin);

  if ((millis() - lastTime) > timerDelay) {
    if (WiFi.status() == WL_CONNECTED) {
      HTTPClient http;
      http.begin(serverName);
      http.addHeader("Content-Type", "application/json");
      http.setTimeout(5000); // Set timeout

      String jsonData = "{"
  "\"deviceName\": \"vikalp-test-3\"," // edit your device Here
  "\"userId\": \"67ea334c3fa3661b421c68a7\","
  "\"microControllerId\": \"device._id\","
  "\"humidity\": " + String(humi) + ","
  "\"temperature\": " + String(temp) + ","
  "\"particlePerMillion\": " + String(gas) +
"}";
      Serial.println("Sending data: " + jsonData);

      int httpResponseCode = http.POST(jsonData);

      if (httpResponseCode > 0) {
        Serial.print("HTTP Response code: ");
        Serial.println(httpResponseCode);
        Serial.println("Response: " + http.getString());
      } else {
        Serial.print("Error in HTTP request: ");
        Serial.println(httpResponseCode);
      }

      http.end(); // Free resources
    } else {
      Serial.println("WiFi Disconnected! Attempting to reconnect...");
      WiFi.reconnect();
    }
    lastTime = millis();
  }
}