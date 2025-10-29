#include <Arduino.h>
#include <MonitorEnergia.h>
#include <ServoMotor.h>

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

  servoSetup(18, 0);  // Servo no pino 18, começa em 0°

  Serial.println("Servo inicializado!");
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
  float t_restante = (P > 0.001) ? (EnergiaRestante / P) : INFINITY; // segundos

  // Conversão de tempo
  int total_segundos = (int)t_restante;
  int t_h = total_segundos / 3600;
  int t_min = (total_segundos % 3600) / 60;
  float t_seg = t_restante - (t_h *3600) - (t_min * 60);

  Serial.printf("Tensão: %.3f V | Corrente: %.3f mA | Tempo restante: %d h %d min %.3f s (%.2f s)\n",
                tensao, corrente_mA, t_h, t_min, t_seg, t_restante);

  delay(5000);

    //Exemplo de como chamar a função para movimentar o servo motor
  MovimentaServo(90, 5000); //Aqui estamos fazendo o servo girar 90° por 5 segundos

}