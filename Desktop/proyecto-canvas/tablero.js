function iniciar(){

    var $canvas=document.getElementById("tablero");                                     // Apuntamos al canvas
    lienzo=$canvas.getContext("2d");                                                    // Creamos el lienzo
    
    lienzo.strokeRect(10,10,820,820);                                                   // Dibujamos el borde
    lienzo.strokeRect(20,20,800,800);                                                   // Dibujamos dentro del primer boder
    
    var cuadritos=20;                                                                   // Inicializamos los cuadritos

    for(i=1;i<5;i++){                                                                   // Creamos un blucle for

      lienzo.clearRect(20,cuadritos,100,100);                                           // Creamos cuadrados blancos y le pasamos la posicion
      lienzo.fillRect(120,cuadritos,100,100);                                           // Creamos cuadrados negros y le pasamos la posicion 
      lienzo.clearRect(220,cuadritos,100,100);
      lienzo.fillRect(320,cuadritos,100,100);
      lienzo.clearRect(420,cuadritos,100,100);
      lienzo.fillRect(520,cuadritos,100,100);
      lienzo.clearRect(620,cuadritos,100,100);
      lienzo.fillRect(720,cuadritos,100,100);
      
      cuadritos=cuadritos+100;                                                          // Sumamos los cuadraditos
      
      lienzo.fillRect(20,cuadritos,100,100);
      lienzo.clearRect(120,cuadritos,100,100);
      lienzo.fillRect(220,cuadritos,100,100);  
      lienzo.clearRect(320,cuadritos,100,100);
      lienzo.fillRect(420,cuadritos,100,100);  
      lienzo.clearRect(520,cuadritos,100,100);
      lienzo.fillRect(620,cuadritos,100,100);  
      lienzo.clearRect(720,cuadritos,100,100);
      
      cuadritos=cuadritos+100;
    }
}

window.addEventListener("load",iniciar,false);