
#include <LiquidCrystal.h>

float tempC;       //Declaración de Variables para Temperatura
int tempPin = 0;   // Definimos la entrada en pin A0 Arduino

// Inicializa la Pantalla activando los pines para 4bits, ver la librería en Arduino.cc
LiquidCrystal lcd(12, 11, 5, 4, 3, 2);

void setup() {
  Serial.begin(9600); // Abre puerto serial y lo configura a 9600 bps
  lcd.begin(16, 2);     // Setea el LCD a 16 columnas y 7 Filas:
  lcd.clear();
}

void loop() {
  
  tempC = analogRead(tempPin);         // Lee el valor desde el sensor LM35
  tempC = ( tempC * 500.0) / 1024.0;   // Convierte el valor a temperatura
 
  lcd.display();               // Limpia la pantalla
  lcd.setCursor(0, 0);
  lcd.print("Temp.: ");   //Escribe el mensaje fila 1, pos 0
  lcd.setCursor(6, 0);  //las posiciones parte en 0 y la primera fila también es 0
  lcd.print(tempC);       //Despliega la temperatura
  lcd.setCursor(12, 0); //Pone el cursor al final en celda 6 de la segunda fila
  lcd.print("C ");
  
  //Para control también envía la temperatura a la consola para monitorizar
  Serial.print(tempC);
  Serial.print("\n");
  delay(5000);  //espera 5seg para próxima lectura
  
}
