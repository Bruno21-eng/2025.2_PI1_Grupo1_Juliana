#ifndef ServoMotor_h
#define ServoMotor_h

#include <Arduino.h>
#include <Servo.h>

// Objeto global do servo (declarado aqui para ser usado no sketch principal)
extern Servo servoMotor;

// Funções públicas
void ServoSetup(int pin, int anguloInicial = 0);
void MovimentaServo(int anguloFinal, unsigned long tempo);

#endif
