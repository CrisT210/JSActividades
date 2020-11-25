var mundo = [
    [2,2,2,2,2,2,2,2,2,2,2],
    [2,0,1,1,1,2,1,1,1,1,2],
    [2,1,2,1,1,1,1,1,2,1,2],
    [2,1,2,1,2,1,2,1,2,1,2],
    [2,1,1,1,2,0,2,1,1,1,2],
    [2,1,1,1,2,2,2,1,3,1,2],
    [2,1,2,1,1,1,1,1,2,1,2],
    [2,1,2,1,2,2,2,1,2,1,2],
    [2,1,1,1,1,3,1,1,1,1,2],
    [2,2,2,2,2,2,2,2,2,2,2]
], pacman = {
    t: 1,
    l: 1
}, doblePacman = {
    x: 8,
    y: mundo.length-1
}, fantasma = {
    x: 4,
    y: mundo.length/2
}, puntos = 0, vidas = 2;

function mostrarMundo(){
    var salida = "";
    for(var x=0; x<mundo.length; x++){
        salida += "\n<div class='row'>\n"; 
        for(var y=0; y<mundo[x].length; y++){
            if(mundo[x][y] == 3){
                salida += "<div class='cereza'></div>";
            }
            else if(mundo[x][y] == 2){
                salida += "<div class='bloque'></div>";
            }
            else if(mundo[x][y] == 1){
                salida += "<div class='moneda'></div>";
            }
            else if(mundo[x][y] == 0){
                salida += "<div class='vacio'></div>";
            }
        }
        salida += "\n</div>";
    }
    //Impresion estructura HTML del mundo
    //console.groupCollapsed(salida);
    document.getElementById("mundo").innerHTML = salida;
}
function mostrarPacman(){
    document.getElementById("pacman").style.left = pacman.l*20+"px";
    document.getElementById("pacman").style.top = pacman.t*20+"px";

    document.getElementById("doblePacman").style.left = doblePacman.y*20+"px";
    document.getElementById("doblePacman").style.top = doblePacman.x*20+"px";
}
function mostrarFantasma(){
    document.getElementById("fantasma").style.top = fantasma.x*20+"px";
    document.getElementById("fantasma").style.left = fantasma.y*20+"px";
}
function mostrarPuntos(){
    document.getElementById("puntos").innerHTML = puntos;
}
function mostrarVidas(){
    salida = "";
    if(vidas == 2){
        salida = "<span class='up'></span><span class='up'></span>";
    }        
    else if(vidas == 1){
        salida = "<span class='up'></span>";
    }else{
        salida = "--------";
    }  
    document.getElementById("vida").innerHTML = salida;
}
mostrarMundo();
mostrarPacman();
mostrarFantasma();
mostrarPuntos();
mostrarVidas();

//Movimientos por teclado PacMan 
document.onkeydown = function(pm){
    //KeyCode 37 izquierda, 39 derecha, 38 arriba, 40 abajo
    //Pacman
    if(pm.keyCode == 37 && mundo[pacman.t][pacman.l-1] !=2){
        pacman.l--;
        document.getElementById("pacman").style.transform = "rotate(180deg)";
    }
    else if(pm.keyCode == 39 && mundo[pacman.t][pacman.l+1] !=2){
        pacman.l++;
        document.getElementById("pacman").style.transform = "rotate(0deg)";
    }    
    else if(pm.keyCode == 38 && mundo[pacman.t-1][pacman.l] !=2){
        pacman.t--;
        document.getElementById("pacman").style.transform = "rotate(270deg)";  
    }
    else if(pm.keyCode == 40 && mundo[pacman.t+1][pacman.l] !=2){
        pacman.t++;
        document.getElementById("pacman").style.transform = "rotate(90deg)";
    }

    //KeyCode: 87 W, 65 A, 83 S, 68 D
    //doblePacman
    if(pm.keyCode == 65 && mundo[doblePacman.x][doblePacman.y-1] !=2){
        doblePacman.y--;
        document.getElementById("doblePacman").style.transform = "rotate(180deg)";
    }
    else if(pm.keyCode == 68 && mundo[doblePacman.x][doblePacman.y+1] !=2){
        doblePacman.y++;
        document.getElementById("doblePacman").style.transform = "rotate(0deg)";
    }    
    else if(pm.keyCode == 87 && mundo[doblePacman.x-1][doblePacman.y] !=2){
        doblePacman.x--;
        document.getElementById("doblePacman").style.transform = "rotate(270deg)";  
    }
    else if(pm.keyCode == 83 && mundo[doblePacman.x+1][doblePacman.y] !=2){
        doblePacman.x++;
        document.getElementById("doblePacman").style.transform = "rotate(90deg)";
    }
    
    //Coordenadas PacMan
    console.log("Posicion: mundo["+pacman.t+"]["+pacman.l+"]");
    
    //Obtencion de puntos
    if(mundo[pacman.t][pacman.l] == 1){
        mundo[pacman.t][pacman.l] = 0;
        puntos +=10;
        mostrarMundo();
        mostrarPuntos();
    }
    else if(mundo[pacman.t][pacman.l] == 3){
        mundo[pacman.t][pacman.l] = 0;
        puntos +=50;
        mostrarMundo();
        mostrarPuntos();
    }    
    mostrarPacman();
}
//Movimientos Fantasma
// 1 izq, 2 Der, 3 Arr, 4 Aba
function movRandom(){
    var min = 1, max = 5;
    return Math.floor(Math.random() * (max - min)) + min;
}
function moverFantasma(){
    var azar = movRandom();
    if(azar == 1 && mundo[fantasma.x][fantasma.y-1] !=2){
        fantasma.y--; 
    }
    else if(azar == 2 && mundo[fantasma.x][fantasma.y+1] !=2){
        fantasma.y++;  
    }    
    else if(azar == 3 && mundo[fantasma.x-1][fantasma.y] !=2){
        fantasma.x--;
    }
    else if(azar == 4 && mundo[fantasma.x+1][fantasma.y] !=2){
        fantasma.x++;
    }
    //Colision con Fantasma
    if(pacman.t == fantasma.x && pacman.l == fantasma.y){
        pacman.t = 1;
        pacman.l = 1; 
        document.getElementById("pacman").style.transform = "rotate(0deg)";
        //Perdida de vidas
        if(vidas != 0){
            vidas--;
            mostrarVidas();
        }else{
            location.reload();
        }
        
    }
    mostrarFantasma();
}
setInterval(function () {
    moverFantasma();
}, 300);



