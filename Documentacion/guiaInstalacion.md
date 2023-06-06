# Preparación del entorno

## Choregraphe


<img src="images/choregraphe.png" height=50px>

Para instalar **Choregraphe** en **Windows** bastará con dirigirnos al siguiente [enlace](https://www.aldebaran.com/en/support/pepper-naoqi-2-9/downloads-softwares) y descargar la versión 2.5.10.7 en el apartado **Old: Choregraphe** y ejecutar en instalador. Cuando lancemos el programa por primera vez, nos pedirá que introduzcamos el código de licencia que podemos encontrar en la misma página. 

Código de licencia: 
> 654e-4564-153c-6518-2f44-7562-206e-4c60-5f47-5f45

---

## Naoqi SDK

<img src="images/naoqi2.png" height=50px>

### Python 2.7




<div style="color:#8a6d3b;background-color:#fcf8e3;border-color:#faebcc;padding:9px;margin-bottom:10px;border:1px solid transparent;border-radius:4px">
    <img src="images/warning.png" width="24px" style="text-align:left;float:left"></img><strong style="margin-left:10px">Atención!</strong> El SDK de NAOqi solo funciona en la versión de 32 bits de Python 2.7 
</div>


Si queremos desarrollar un programa fuera del entorno de *Choregraphe* y queremos que este se comunique bien con *Choregraphe* o directamente con el robot, necesitaremos el **SDK de Naoqi**. Para instalarlo, deberemos descargar del mismo [enlace](https://www.aldebaran.com/en/support/pepper-naoqi-2-9/downloads-softwares) el SDK que se encuentra en el apartado **Old: Pepper SDK 2.5.10**. 

Después de descargarlo, primero de todo lo vamos a descomprimir y mover a la carpeta donde queramos instalarlo. Para poder usar la librería desde **python 2.7** tendremos que añadir una variable de entorno en nuestro sistema. Para hacer eso en **Windows**, iremos a Ajustes > Sistema > Información > Configuración avanzada del sistema > Variables de entorno. Ahí nos encontraremos con dos opciones: 
1. Variables para el usuario
2. Variables del sistema

En cualquiera de los dos (dependiendo de nuestra preferencia) haremos click en *Nueva...*. En el nombre de variable pondremos **PYTHONPATH** y en el valor de la variable introduciremos la ruta hasta la carpeta **lib** de la librería que hemos descargado. 

Ahora, para comprobar que la instalación podemos abrir nuestra terminal de python e importar la librería **qi**. 

> import qi

Si importa la librería correctamente y no obtenemos ningún error, la instalación se habrá hecho de forma exitosa. 


### C++

También existe el SDK para para C++. Nosotros no lo utilizaremos para desarrollar nuestras aplicaciones sino solamente para simular un robot físico, más potente que el que viene por defecto con Choregraphe. La versión 2.5.10.7 no está disponible para Windows y por lo tanto, tendremos que descargar la 2.5.5 que podemos encontrar en el siguiente [enlace](https://www.aldebaran.com/en/support/pepper-naoqi-2-9/downloads-softwares/former-versions?os=45&category=108). 

Para lanzar el simualdor basta con hacer doble click sobre el fichero **naoqi.bat** que encontraremos dentro de la carpeta. Para conectarnos al robot simulado lo haremos igual que con el resto de robots ya sean reales o los de Choregraphe. Para identificarlo, bastará con mirar el puerto, ya que este será el 9559. 

