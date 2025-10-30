#include <Arduino.h>
#include <MonitorEnergia.h>
#include <mqtt.h>
#include <WiFi.h>
#include <ServoMotor.h>
#include <pin_declaration.h>
#include "Motor_Control.h"

#define WIFI_SSID     "Wokwi-GUEST"
#define WIFI_PASSWORD ""
#define WIFI_CHANNEL  6


hw_timer_t * inaTmr = NULL;
MonitorEnergia ina219;

const float V_nominal = 6.0;
const float Capacidade_Ah = 2.7;
float EnergiaTotal;
float EnergiaConsumida = 0;
unsigned long ultimoTempo;
volatile bool inaUpdateFlag = false;
volatile unsigned long desiredDistance_mm = 4000;

// static void wifi_connect(const char* ssid, const char* pass, int channel) {
//   WiFi.setSleep(false);
//   WiFi.begin(ssid, pass, channel);
//   Serial.print("WiFi conectando");
//   while (WiFi.status() != WL_CONNECTED) { delay(120); Serial.print("."); }
//   Serial.println(" ✓");
//   Serial.print("IP: "); Serial.println(WiFi.localIP());
// }

void IRAM_ATTR InaTmrISR(){
  inaUpdateFlag = true;
}


void setup() {
  Serial.begin(115200);
  delay(100);

  //Encoders Setup
  encoderInit ();

  //Motors & H Bridge Setup
  pinMode(PWMA_R, OUTPUT);
  pinMode(AIN2_R, OUTPUT);
  pinMode(AIN1_R, OUTPUT);
  pinMode(STBY, OUTPUT);
  pinMode(BIN2_L, OUTPUT);
  pinMode(BIN1_L, OUTPUT);
  pinMode(PWMB_L, OUTPUT);

  ledcSetup(MOTOR_PWMA_CHANNEL, MOTOR_PWM_FREQUENCY, MOTOR_PWM_RESOLUTION);
  ledcSetup(MOTOR_PWMB_CHANNEL, MOTOR_PWM_FREQUENCY, MOTOR_PWM_RESOLUTION);

  ledcAttachPin(PWMA_R, MOTOR_PWMA_CHANNEL);
  ledcAttachPin(PWMB_L, MOTOR_PWMB_CHANNEL);

  // wifi_connect(WIFI_SSID, WIFI_PASSWORD, WIFI_CHANNEL);

  //Timer Setup
  inaTmr = timerBegin(0,80,true);
  timerAttachInterrupt(inaTmr, &InaTmrISR, true);
  timerAlarmWrite(inaTmr, 3000000, true);

  if (!ina219.iniciar()) {
    Serial.println("ERRO: Sensor INA219 não encontrado!");
    while (1) delay(10);
  }

  EnergiaTotal = V_nominal * Capacidade_Ah * 3600.0;
  ultimoTempo = millis();  
  


  // mqtt_init();


  ServoSetup(PWM_SERVO, 0);  // Servo no pino 18, começa em 0°
  MovimentaServo(90, 5000); //Aqui estamos fazendo o servo girar 90° por 5 segundos

  Serial.println("Servo inicializado!");

  
  digitalWrite(STBY, HIGH);
  
  timerAlarmEnable(inaTmr);
  Serial.println("Monitor de energia iniciado!");

  // Função que inicia o movimento em linha reta dos motor com uma distância e velocidade definidas
  // startGoDistanceMillimeterWithSpeed(200,desiredDistance_mm,DIRECTION_FORWARD);                                                                              
}

void loop() {
  // mqtt_loop();

  
  bool test = true;
  while(test == true){
    test = updateMotor();
    // Serial.println("Sai do update");
    if(inaUpdateFlag == true){
      inaUpdateFlag = false;
      unsigned long t0 = micros();

      float corrente_mA = ina219.obterCorrente();
      float corrente = corrente_mA / 1000.0;
      float tensao = ina219.obterTensao();

      unsigned long agora = millis();
      float dt = (agora - ultimoTempo) / 1000.0;
      ultimoTempo = agora;

      float P = tensao * corrente;
      EnergiaConsumida += P * dt;

      if (EnergiaConsumida > EnergiaTotal) EnergiaConsumida = EnergiaTotal;

      float EnergiaRestante = EnergiaTotal - EnergiaConsumida;
      float t_restante = (P > 0.001) ? (EnergiaRestante / P) : INFINITY;

      int total_segundos = (int)t_restante;
      int t_h = total_segundos / 3600;
      int t_min = (total_segundos % 3600) / 60;
      float t_seg = t_restante - (t_h *3600) - (t_min * 60);

      Serial.printf("Tensão: %.3f V | Corrente: %.3f mA | Tempo restante: %d h %d min %.3f s (%.2f s)\n",
                    tensao, corrente_mA, t_h, t_min, t_seg, t_restante);

      unsigned long t1 = micros();
      unsigned long tempo_exec_us = t1 - t0;

      Serial.printf("Tempo de leitura: %lu us (%.3f ms)\n",
                    tempo_exec_us, tempo_exec_us / 1000.0);
      
    }
  }
  // delay(2000);
  // startGoDistanceMillimeterWithSpeed(255,desiredDistance_mm,DIRECTION_FORWARD);
  digitalWrite(STBY, LOW);
 

  // delay(5000);


}
