#cetys-api

Un api para consumir datos de los alumnos de cetys

##Instrucciones de uso
1. 
   Manda un **POST** request a https://pacific-crag-2553.herokuapp.com/login con los
   parametros incuidos en el body:

   **user**=m0xxxxx  
   **password**=xxxxxxxx

   usando las mismas credenciales con las que haces login al portal.

2. 
   El **POST** request a /login regresa un JSON con 3 propiedades:

   *token*: el acces token para la sesión actual  
   *expires*: el tiempo que durará la sesión activa (acutalmente son dos horas)  
   *user*: la matrícula que con la que hiciste login

3. 
   Ahora puedes hacer un **GET** request a  
   https://pacific-crag-2553.herokuapp.com/api/grades o  
   https://pacific-crag-2553.herokuapp.com/api/schedule

   añadiendo un **HEADER**:  
   '*access-token*' = (token-recibida-en-el-paso-anterior)

4. 
   ¡Ahora recibirás un JSON con la información que necesitas!

## Contribuye
Se necesitan : 
- Ejemplos en diferentes lenguajes
- Más scapers con endpoints a más paginas del portal
- Tests
- Alguien de tijuana y de ensenada que ayude a hacer modificacones y testear que funcione en su sitio

### Agradecimientos
Gracias a Jesús López por agregar /schedule y el mensaje de bienvendia.
