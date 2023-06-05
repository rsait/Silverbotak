# Práctica Final

Para acabar con la formación, pondremos en práctica los conceptos aprendidos durante estos días. El objetivo de la práctica es crear tres comportamientos con sus funcionalidades. 

1. **Principal**: 
la tarea de este comportamiento es encilla. Mostrará la pantalla inicial (*index.html*) y cambiará el foco a los otros comportamientos depende de la selección que haga el usuario en el menú. 

2. **Registro**: 
Gestionará todo lo que esté relacionado con el alta, baja y modificación de nuevos usuarios

3. **Trivial**: 
Gestionará los recursos necesarios para el correcto funcionamiento del juego. 


A continuación se detallará lo que debe realizar cada uno de los comportamientos con mayor detalle. 

## Principal

El compotamiento principal mostrará la pantalla de inicio y activará y desactivará el comportamiento del *Trivial* para que este solo esté en funcionamiento cuando vaya a ser usado. Además, este comportamiento se ejecutará de forma automática cuando encendamos el robot y esté listo para ser utilizado.  

## Registro

Para el comportamiento **Registro** crearemos una aplicación para el robot humanoide Pepper que nos permita registrarnos, iniciar sesión, modificar el usuario y por último eliminarlo. 

La aplicación estará dividida en dos partes. Por un lado, tendremos toda la lógica ejecutandose en los cubos de Choregraphe, donde tendremos que modificar tanto código como entradas y salidas de algunos cubos. Por otro lado, tendremos una aplicación web desarrollada en **HTML**, **CSS** y **JavaScript**. 

### <u>CHOREGRAPHE</u>

En la parte de Choregraphe haremos la aplicación desde cero. No se nos proporcionará ninguna plantilla, pero en esta guía tendremos toda la información necesaria. 

En primer lugar, estas son las señales que nos llegarán a Choregraphe (y que deberemos añadir a nuestro comportamiento) desde la aplicación web y los cubos que necesitaremos para desarrollar la funcionalidad que se nos pide en cada una.

| Nombre de señal  | Tipo de señal | Función | Cubos necesarios |
| ---------------- | ------------- | ------- | ---------------- |
| cambiarHTML      | String        | Navegar entre las distintas páginas HTML| Show Web View |
| sacarFoto        | String        | Sacar una foto para la ficha del usuario | Take Picture, TakePicture |
| registrarUsuario | Dynamic       | Dar de alta a un usuario aprendiendo su cara y la información del formulario | Python, Learn Face, Say, Raise Event |
| iniciarSesion    | Bang          | Iniciar una sesión con el usuario si se reconoce su cara | Only Once, Face Reco, Python, Raise Event, Say Text, Say |
| cerrarSesion     | Bang          | Cerrar la sesión actual | Raise Event |
| modificarUsuario | Dynamic       | Modificar la información del usuario en la base de datos| Python, Say, Raise Event |
| eliminarUsuario  | Dynamic       | Borrar toda la información relacionada con un usuario | Python, Unlearn Face, Say, Raise Event |

A continuación se explicará la función a realizar cuando cada una de las señales se active. 
### <u>Cambiar HTML</u>

Para cambiar la página que muestra Pepper en la tablet, haremos uso del cubo *Show Web View*. La funcionalidad de este cubo se entregará implementada, y para más información podéis leer los comentarios que hay en el código. 

### <u>Sacar foto</u>

Cuando el usuario se registre por primera vez o cuando quiera modificar su perfil, podrá cambiar la foto. Para ello, será necesario ejecutar la acción de sacar la foto. Esta función se entregará implementada y para más información podéis leer los comentarios que hay en el código.

### <u>Registrar Usuario</u>

Desde la aplicación web nos llegará una señal que contiene la siguiente información en orden: *[firstName, lastName, birthday, gender, email, city, postalCode, profileImg]*. En primer lugar, deberemos consultar en nuestra base de datos si ya existe un usuario. Para hacerlo de forma correcta, deberemos asignar un identificador único a cada usuario y ver si ese identificador único esta dado de alta. Para este caso, el identificador será el correo y por lo tanto, no podrá haber dos usuarios con el mismo correo. Si vemos que el robot existe, *Pepper* dirá que ya hay un usuario dado de alta con ese nombre y no seguirá con el registro. De lo contrario, aprenderemos la cara del usuario y la guardaremos en nuestra base de datos. Para guardar los datos se plantea utilizar el formato XML. Existen varias opciones para escribir ficheros con este formato, pero la más extendida en *Python* es utilizar la librería *ElementTree* que podemos importar de la siguiente manera:

```Python
import xml.etree.ElementTree as ET
```
Para más información, podéis acceder al siguiente [enlace](https://docs.python.org/2.7/library/xml.etree.elementtree.html), donde podréis ver como leer, modificar y escribir ficheros XML. 

<div style="color:#4682B4;background-color:#ADD8E6;border-color:#faebcc;padding:9px;margin-bottom:10px;border:1px solid transparent;border-radius:4px">
    <img src="Documentacion/images/info.png" width="24px" style="text-align:left;float:left"></img><p style="padding-left:10px;vertical-align:middle;display:table-cell"><strong>Nota:</strong> El cubo <i>Learn Face</i> necesita un nombre para relacionarlo con la cara. Deberemos utilizar nuestro identificador (email) para asegurarnos de que solo haya un único usuario asignado a una sola cara. </p> 
</div>

### <u>Iniciar Sesión</u>

Deberemos comprobar si reconocemos la cara del usuario. Si la reconoce, consultaremos la base de datos buscando ese usuario. Si también existe en la base de datos, iniciaremos sesión mandando la información del usuario a la aplicación web usando la señal *user*. 

### <u>Cerrar Sesión</u>

Eliminaremos la información sobre el usuario que ha iniciado sesión de la memoria *localStorage* y de la variable *currentUser* de la aplicación web.   

### <u>Modificar Usuario</u>

Lanzaremos la señal *user* con la información *[None, None]*

### <u>Eliminar Usuario</u>

Eliminaremos toda la información del usuario tanto en la base de datos como en la aplicación web (*localStorage* y *currentUser*) 

---

### <u>WEB</u>

Para la aplicación web se han utilizado HTML, CSS y JavaScript. Además de ser el interfaz de nuestro programa, también gestionara la toma de datos y la gestión del estado de la sesión del usuario. Esta aplicación escuchará una sola señal, que será la señal *user*. Será la encargada de actualizar el estado en el que se encuentra la sesión. Si la información que llega contiene los datos de un usuario, modificaremos nuestro usuario actual (variable *current_user*) y también lo guardaremos en la memoria del navegador `localStorage.setItem('user', current_user)`. 


En este apartado, tendremos que completar los huecos que hay en el código en los ficheros de *JavaScript* `script.js, user-register.js` y `user-info.js`. En esos ficheros encontraremos comentarios como el siguiente: 

```Python
// TODO: seguido de la palabra clave TODO encontrareis una explicación de lo que teneis que hacer debajo de ese comentario. 
```

### <u>script.js</u>

En este primer fichero encontraréis cinco `TODO`s. 

1. En el primero, tendréis que subscribiros a las señales (ya existe una función llamada `startSubscribe()` en el código). 
2. Iniciar el servicio ALTextToSpeech.
3. Subscribirse al serivicio `user` y que cuando llegue la señal actualice la información del usuario. 
4. Contorlar las acciones que se deben realizar cuando se llame a las funciones `añadirUsuario, editarUsuario, loguearse y cerrarSesion`.
5. Llamar a la utildad raiseEvent de la API para que lanze un evento con el nombre contenido en la variable `eventName` y los parametros `eventParam`.

### <u>user-register.js</u>

En este fichero habrá un único `TODO`, que será lanzar la señal `registrarUsuario`. De todas formas, siempre es interesante echar un vistazo al resto del código y ver lo que hace. 

### <u>user-info.js</u>

En este último fichero son dos las funciones a implementar. La primera será lanzar el evento `modificarUsuario` con los nuevos datos del usuario, así como actualizar la información en la memoria del navegador. La segunda, crear e implementar la función `clickEliminar()` que se encargara de lanzar la señal para
eliminar un usuario y de borrar los datos de la sesión.




## Trivial

Del mismo modo que en el anterior comportamiento, esta aplicación también estará dividida en dos módulos, *Choregraphe* y *Web*. La mayoría de las funciones necesarias para el correcto funcionamiento del juego se encuentran en la parte web. 

### <u>CHOREGRAPHE</u>

| Nombre de señal  | Tipo de señal | Función | Cubos necesarios |
| ---------------- | ------------- | ------- | ---------------- |
| empezarJuego        | Bang        | Hara que el robot dicte las reglas del juego | Say o Animated Say
| pararReglas    | Bang          | Pepper dejará de decir las reglas | Say o Animated Say | 
| reacciónRespuesta | Number       | En el caso de que la respuesta haya sido positiva, hará una reacción positiva. Sino negativa.  | Python |



### <u>WEB</u>

Del mismo modo que en el comportamiento *Registro* tendremos que rellenar el código, esta vez del fichero `preguntas.js`, donde veamos un comentario con la palabra `TODO`. 