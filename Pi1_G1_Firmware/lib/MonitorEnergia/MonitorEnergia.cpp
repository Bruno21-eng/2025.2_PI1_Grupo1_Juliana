#include <MonitorEnergia.h> //Header da classe
#include <Wire.h> //Biblioteca do I2C

bool MonitorEnergia::iniciar() {

    //Tenta se comunicar com o sensor
    if (!ina219.begin()) {
        return false;
    }
    //Aplica a calibração padrão
    ina219.setCalibration_32V_2A();

    return true;
}

float MonitorEnergia::obterCorrente() {
    return ina219.getCurrent_mA();
}

float MonitorEnergia::obterTensao() {
    return ina219.getBusVoltage_V();
}

float MonitorEnergia::obterPotencia() {
    return ina219.getPower_mW();
}