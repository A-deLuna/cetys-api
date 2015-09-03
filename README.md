#cetys-api
An API that scrapes information from Cetys made for and by Cetys students.

##How to use
1.
   Send a **POST** request to https://pacific-crag-2553.herokuapp.com/login with the next patameters in the body:

   **user** = m0xxxxx
   **password** = xxxxxxx

   Using the same credentials you use as your student login in the university's web page

2.
   The **POST** requests returns a JSON with 3 properties:

   *token*: the access token for the session
   *expires*: the expiration time for the current session (it's 2 hours long at the moment)
   *user*: the registration number you logged in with

3.
   Now you can do **GET** requests to 
   https://pacific-crag-2553.herokuapp.com/api/grades or
   https://pacific-crag-2553.herokuapp.com/api/schedule

   Adding a **HEADER**:
   '*access-token*' = (token recieved in the last step)

4.
   You'll now recieve a JSON with the information  you need!

##How to contribute
You need:
   -More scrapers with endpoints to the Cetys web page
   -Testing
   -Someone from another Cetys campus, to help make modifications and tests for it to work on either

### Agradecimientos
Thanks to Jesus Lopez for adding /schedule and the welcome message.

#Spanish

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
