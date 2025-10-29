#include <Arduino.h>
#include <mqtt.h>

static uint8_t s_led_pin = 255;
static String  s_cmd_topic;

void my_led_init(uint8_t pin) {
  s_led_pin = pin;
  pinMode(s_led_pin, OUTPUT);
  digitalWrite(s_led_pin, LOW);
}

void my_led_on()  { if (s_led_pin != 255) digitalWrite(s_led_pin, HIGH); }
void my_led_off() { if (s_led_pin != 255) digitalWrite(s_led_pin, LOW);  }

void my_led_pulse(uint16_t ms) {
  if (s_led_pin == 255) return;
  digitalWrite(s_led_pin, HIGH);
  delay(ms);
  digitalWrite(s_led_pin, LOW);
}

bool my_led_send_telemetry(const char* topic, const char* key, const char* value) {
  return mqtt_send_telemetry_kv(topic, key, value);
}
bool my_led_send_telemetry_num(const char* topic, const char* key, long value) {
  return mqtt_send_telemetry_kv_num(topic, key, value);
}
bool my_led_pulse_and_report(const char* topic, long value) {
  my_led_pulse(1);
  return my_led_send_telemetry_num(topic, "led", value);
}

// parsear o json
static void led_cmd_handler(const char* topic, const char* payload, unsigned int len) {
  if (s_cmd_topic.length() == 0) return;
  if (!topic || strcmp(topic, s_cmd_topic.c_str()) != 0) return;
  if (!payload) return;

  if (strcasecmp(payload, "high") == 0 || strcmp(payload, "1") == 0) {
    my_led_on();
  } else if (strcasecmp(payload, "low") == 0 || strcmp(payload, "0") == 0) {
    my_led_off();
  } else if (strcasecmp(payload, "pulse") == 0) {
    my_led_pulse(1);
  } else {
    Serial.println("[LED CMD] comando desconhecido");
  }
}

void my_led_bind_cmd_topic(const char* topic) {
  if (!topic) return;
  s_cmd_topic = topic;
  mqtt_on_message(led_cmd_handler);
  mqtt_subscribe(s_cmd_topic.c_str(), 0);
  Serial.print("[LED] bind cmd topic = "); Serial.println(s_cmd_topic);
}
