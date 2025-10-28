#include <Arduino.h>
#include <MonitorEnergia.h>

MonitorEnergia ina219;

const float V_nominal = 6.0;
const float Capacidade_Ah = 2.7;
float EnergiaTotal;
float EnergiaConsumida = 0;
unsigned long ultimoTempo;

void setup() {
  Serial.begin(115200);
  delay(100);

  if (!ina219.iniciar()) {
    Serial.println("ERRO: Sensor INA219 não encontrado!");
    while (1) delay(10);
  }

  EnergiaTotal = V_nominal * Capacidade_Ah * 3600.0; // energia total em Joules
  ultimoTempo = millis();

  Serial.println("Monitor de energia iniciado!");
}

void loop() {
  float corrente_mA = ina219.obterCorrente(); // leitura em mA
  float corrente = corrente_mA / 1000.0;      // converte para A
  float tensao = ina219.obterTensao();

  unsigned long agora = millis();
  float dt = (agora - ultimoTempo) / 1000.0; // segundos
  ultimoTempo = agora;

  float P = tensao * corrente; // potência em W
  EnergiaConsumida += P * dt;  // energia em J acumulada

  if (EnergiaConsumida > EnergiaTotal) EnergiaConsumida = EnergiaTotal;

  float EnergiaRestante = EnergiaTotal - EnergiaConsumida;
  float t_restante = (P > 0.001) ? (EnergiaRestante / P) : INFINITY;
  if (t_restante < 0) t_restante = 0;

  Serial.printf("Tensão: %.3f V | Corrente: %.3f mA | Tempo restante: %.2f s\n",
                tensao, corrente_mA, t_restante);

  delay(5000);
}