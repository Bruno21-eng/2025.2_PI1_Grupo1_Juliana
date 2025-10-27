#ifndef MONITOR_ENERGIA_H
#define MONITOR_ENERGIA_H

#include <Adafruit_INA219.h>

class MonitorEnergia{

    public:
    //Função a ser chamada no setup()
    //Retorna true se o sensor foi encontrado, senão, retorna false
    bool iniciar();

    //Funções para leitura de dados
    float obterCorrente(); //Em miliAmperes (mA)
    float obterTensao(); //Em Volts (V)
    float obterPotencia();  //Em miliWatts (mW)

    private:
    //Declaração do objeto da biblioteca Adafruit
    Adafruit_INA219 ina219;
};

#endif