#include <Arduino.h>
#include <MonitorEnergia.h>

MonitorEnergia ina219;

// put function declarations here:
int myFunction(int, int);

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  delay(100);

  if (!ina219.iniciar()) {
    Serial.println("ERRO: Sensor INA219 não encontrado!");
    while (1) {
      delay(10);
    }
  }

}

void loop() {
  // put your main code here, to run repeatedly:
  float corrente = ina219.obterCorrente();
  float tensao = ina219.obterTensao();
}

// put function definitions here:
int myFunction(int x, int y) {
  return x + y;
}