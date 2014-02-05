/*
 Objeto tamagotchi, sus propiedades y métodos
 *
 */
var tamagotchi = {
    estadoanimo: 10, // menor a 5 triste a partir de 5 contento
    sueno: 0, //sueño menor que 5 no es necesario dormir descansa en sofa a partir de 5 cama
    hambre: 0, //a partir de 5 aparece la necesidad de comer
    peso: 30, //controlado a traves de comer,jugar y educar
    pesomax: 100, //peso maximo alcanzado por el muñeco
    pesomin: 20, //peso mínimo alcanzado por el muñeco
    higiene: 10, //empezamos con el muñeco muy higienico
    //valores inferiores o iguales a 5 mala higiene superior a 5 buena higiene
    salud: 10, //sano menor a 5 enfermo
    max: 10, //valor máximo para los parámetros 
    min: 1, //valor mínimo para los parámetros
    medio: 5, //valor medio de los parámetros
    monster: {monster1: 1, monster2: 2, monster3: 3},
    afectividad: {acariciar: 1, besar: 2}, //afecta a triste y contento
    dormir: {sofa: 1, cama: 2}, //menor que 5 sofa a partir de 5 cama
    educar: {leyendo: 1, escribiendo: 2, escuchando: 3}, //afecta a salud y estadodeanimo
    jugar: {peluche: 1, coches: 2, pelota: 3}, //afecta a peso y hambre
    escucharmusica: {clasica: 2, reggae: 1}, //afecta a sueno
    vertv: {telediario: 2, animaciones: 1}, //afecta a sueno
    comer: {caramelo: 1, manzana: 2, pizza: 3}, //afecta a hambre, triste, contento
    limpiar: {toallitas: 1, ducha: 2},
    medicar: {jarabe: 1, inyeccion: 2},
    medicina: false,
    //controla el estado de animo del evento
    fntAfectividad: function(afectividad) {
        //debugger;
        //var valor=eval(afectividad);
        var animomax = this.max;
        var valor = afectividad;
        //for(i in valor){
        switch (valor) {
            case this.afectividad.besar://besar
                //controlamos el estado de animo con besar
                if (this.estadoanimo <= (animomax - this.afectividad.besar)) {
                    this.estadoanimo += this.afectividad.besar;
                } else if (this.estadoanimo < animomax) {
                    this.estadoanimo += this.afectividad.acariciar;
                }
                break;
                //controlamos el estado de animo con acariciar
            case this.afectividad.acariciar: //acariciar
                if (this.estadoanimo < animomax) {
                    this.estadoanimo += this.afectividad.acariciar;
                }
                break;
        }
        if (this.estadoanimo < this.medio && this.salud > this.min) {
            this.salud -= this.afectividad.acariciar;
        }
        this.fntActualizaEstado('estado');
        //console.log('Estado de animo:'+ this.estadoanimo);
        //document.getElementById('salida').img.src="elegidfondo/tama-bg.jpg" ;
        //}
        return this.estadoanimo;
    },
    //controla el peso y el hambre del muñeco
    fntComer: function(comer) {
//     debugger;
        var valor = comer;
        // var valor=eval(comer);
        switch (valor) {
            case this.comer.manzana://manzana
                //controlamos el hambre con manzana
                if (this.hambre >= this.comer.manzana) {
                    this.hambre -= this.comer.manzana;
                } else if (this.hambre >= this.comer.caramelo) {
                    this.hambre -= this.comer.caramelo;
                }
                //controlamos el peso manzana
                if (this.peso < this.pesomax) {
                    this.peso += this.comer.manzana;
                }

                break;
            case this.comer.pizza://pizza
                //controlamos el hambre con pizza
                if (this.hambre >= this.comer.pizza) {
                    this.hambre -= this.comer.pizza;
                } else if (this.hambre >= this.comer.manzana) {
                    this.hambre -= this.comer.manzana;
                } else if (this.hambre >= this.comer.caramelo) {
                    this.hambre -= this.comer.caramelo;
                }
                //controlamos el peso con pizza
                if (this.peso < this.pesomax) {
                    this.peso += this.comer.pizza;
                }
                break;
            case this.comer.caramelo: //caramelo
                //controlamos el hambre con caramelo
                if (this.hambre >= this.comer.caramelo) {
                    this.hambre -= this.comer.caramelo;
                }
                //controlamos el peso con caramelo
                if (this.peso < this.pesomax) {
                    this.peso += this.comer.caramelo;
                }
                break;
        }
        this.fntActualizaEstado('estado');
        //document.getElementById('valorafecto').value='Control peso:' +this.peso+' Control hambre:'+this.hambre;
        return this.hambre;
    },
    //controlamos la medicación
    fntMedicar: function(medicina) {
        //debugger;
        //var valor=eval(medicina);
        var valor = medicina;
        var saludmax = this.max;
        var afecmin = this.min;
        switch (valor) {
            case this.medicar.jarabe://jarabe
                if (this.medicina) {
                    //controlamos el nivel de salud
                    if (this.salud < saludmax) {
                        this.salud += this.medicar.jarabe;
                    }
                    //controlamos el nivel de afectividad
                    if (this.estadoanimo > afecmin) {
                        this.estadoanimo -= this.afectividad.acariciar;
                    }
                }
                break;
            case this.medicar.inyeccion://inyección
                if (this.medicina) {
                    //controlamos el nivel salud
                    if (this.salud <= saludmax - this.medicar.inyeccion) {
                        this.salud += this.medicar.inyeccion;
                    } else if (this.salud < saludmax) {
                        this.salud += this.medicar.jarabe;
                    }
                    //controlamos el nivel de afectividad
                    if (this.estadoanimo >= afecmin + this.afectividad.acariciar) {
                        this.estadoanimo -= this.afectividad.besar;
                    } else if (this.estadoanimo > afecmin) {
                        this.estadoanimo -= this.afectividad.acariciar;
                    }

                }
                break;
        }
        //control medicar
        if (!this.medicina) {
            document.getElementById('jarabe').style.visibility = "hidden";
            document.getElementById('inyeccion').style.visibility = "hidden";
            //document.getElementById('jarabe').disabled=false;
            //document.getElementById('inyeccion').disabled=false;
        } else if (this.salud >= this.medio) {
            document.getElementById('jarabe').style.visibility = "visible";
            document.getElementById('inyeccion').style.visibility = "visible";
            //document.getElementById('jarabe').disabled=true;
            //document.getElementById('inyeccion').disabled=true;
        }
        this.fntActualizaEstado('estado');
//document.getElementById('valorafecto').value='Control salud:' +this.salud+' Control estado de animo:' +this.estadoanimo ;
        return false;
    },
    fntDormir: function(sueno) {
//    debugger;
        var valor = sueno;
        //var valor=eval(juguete);
        //var suenomax=10;
        var suenomin = this.min;
        switch (valor) {
            case this.dormir.sofa://sofa
                //controlamos el descenso del sueño
                if (this.sueno >= suenomin) {
                    this.sueno -= this.dormir.sofa;
                }
                break;
            case this.dormir.cama://escuchando
                if (this.sueno >= suenomin + this.dormir.sofa) {
                    this.sueno -= this.dormir.cama;
                } else if (this.sueno > suenomin) {
                    this.sueno -= this.dormir.sofa;
                }
                break;
        }
        this.fntActualizaEstado('estado');
        //document.getElementById('valorafecto').value='Control sueño:' +this.sueno;
    },
    //controla la educacion del muñeco
    fntEducar: function(educar) {
        //debugger;
        var valor = educar;
        //var valor=eval(juguete);
        var hambremax = this.max;
        switch (valor) {
            case this.educar.leyendo://leyendo
                //controlamos el aumento del hambre
                if (this.hambre <= hambremax - this.educar.leyendo) {
                    this.hambre += this.educar.leyendo;
                }
                //controlamos el descenso de peso
                if (this.peso > this.pesomin) {
                    this.peso -= this.educar.leyendo;
                }
                break;
            case this.educar.escuchando://escuchando
                //controlamos el aumento del hambre
                if (this.hambre <= hambremax - this.educar.escuchando) {
                    this.hambre += this.educar.escuchando;
                } else if (this.hambre <= hambremax - this.educar.escribiendo) {
                    this.hambre += this.educar.escribiendo;
                } else if (this.hambre < hambremax - this.educar.leyendo) {
                    this.hambre += this.educar.leyendo;
                }
                //controlamos el descenso de peso
                if (this.peso > (this.pesomin + this.educar.escuchando)) {
                    this.peso -= this.educar.escuchando;
                } else if (this.peso > (this.pesomin + this.educar.escribiendo)) {
                    this.peso -= this.educar.escribiendo;
                } else if (this.peso > this.pesomin + this.educar.leyendo) {
                    this.peso -= this.educar.leyendo;
                }

                break;
            case this.educar.escribiendo://escribiendo
                //controlamos el aumento del hambre
                if (this.hambre < hambremax - this.educar.escribiendo) {
                    this.hambre += this.educar.escribiendo;
                } else if (this.hambre < hambremax - this.educar.leyendo) {
                    this.hambre += this.educar.leyendo;
                }
                //controlamos el descenso de peso
                if (this.peso > (this.pesomin + this.educar.escribiendo)) {
                    this.peso -= this.educar.escribiendo;
                } else if (this.peso > this.pesomin + this.educar.leyendo) {
                    this.peso -= this.educar.leyendo;
                }
                break;
        }
        this.fntActualizaEstado('estado');
//document.getElementById('valorafecto').value='Control peso:' +this.peso+' Control hambre:'+this.hambre;
        return false;

    },
    fntGuardar: function() {

    },
    fntJugar: function(juguete) {
        debugger;
        var hambremax = this.max;
        var valor = juguete;
        //var valor=eval(juguete);
        switch (valor) {
            case this.jugar.coches://coches
                //controlamos el aumento del hambre
                if (this.hambre < (hambremax - this.jugar.coches)) {
                    this.hambre += this.jugar.coches;
                } else if (this.hambre < hambremax) {
                    this.hambre += this.jugar.peluche;
                }
                //controlamos el descenso de peso
                if (this.peso > (this.pesomin + this.jugar.coches)) {
                    this.peso -= this.jugar.coches;
                } else if (this.peso > this.pesomin) {
                    this.peso -= this.jugar.pelota;
                }
                //controlamos la higiene
                if (this.higiene >= this.jugar.coches) {
                    this.higiene -= this.jugar.coches;
                } else if (this.higiene >= this.jugar.peluche) {
                    this.higiene -= this.jugar.peluche;
                }
                break;
            case this.jugar.pelota: //pelota
                //controlamos el hambre
                if (this.hambre < (hambremax - this.jugar.pelota)) {
                    this.hambre += this.jugar.pelota;
                } else if (this.hambre < ( hambremax - this.jugar.coches)) {
                    this.hambre += this.jugar.coches;
                } else if (this.hambre < hambremax) {
                    this.hambre += this.jugar.peluche;
                }
                //controlamos el peso
                if (this.peso > (this.pesomin + this.jugar.pelota)) {
                    this.peso -= this.jugar.pelota;
                } else if (this.peso > (this.pesomin + this.jugar.coches)) {
                    this.peso -= this.jugar.coches;
                } else if (this.peso > this.pesomin) {
                    this.peso -= this.jugar.peluche;
                }
                //controlamos la higiene
                if (this.higiene >= this.jugar.pelota) {
                    this.higiene -= this.jugar.pelota;
                } else if (this.higiene >= this.jugar.coches) {
                    this.higiene -= this.jugar.coches;
                } else if (this.higiene >= this.jugar.peluche) {
                    this.higiene -= this.jugar.peluche;
                }
                break;
            case this.jugar.peluche: //peluche
                //controlamos el aumento del hambre
                if (this.hambre < hambremax) {
                    this.hambre += this.jugar.peluche;
                }
                //controlamos el descenso de peso
                if (this.peso > this.pesomin) {
                    this.peso -= this.jugar.peluche;
                }
                //controlamos la higiene
                if (this.higiene > this.jugar.peluche) {
                    this.higiene -= this.jugar.peluche;
                }
                break;
        }
        //control higiene y salud
        if (this.higiene <= this.medio && this.salud >= 1) {
            this.salud -= 1;
        }
        //control medicina y salud
        if (this.salud <= this.medio) {
            this.medicina = true;
            //document.getElementById('jarabe').disabled=false;
            //document.getElementById('inyeccion').disabled=false;
            document.getElementById('jarabe').style.visibility = "visible";
            document.getElementById('inyeccion').style.visibility = "visible";
        }
        this.fntActualizaEstado('estado');
//document.getElementById('valorafecto').value='Control peso:' +this.peso+' Control hambre:'+this.hambre
//+ 'Control higiene: ' + this.higiene+ ' Control salud: '+ this.salud + 'Control medicina:'+ this.medicina;
        return false;

    },
    fntHigiene: function(limpieza) {
        //debugger;
        var higienemax = this.max;
        var higienemin = this.min;
        var valor = limpieza;
        //var valor=eval(limpieza);
        switch (valor) {
            case this.limpiar.toallitas://toallitas
                //controlamos la higiene
                if (this.higiene < (higienemax - this.limpiar.toallitas)) {
                    this.higiene += this.limpiar.toallitas;
                }
                break;
            case this.limpiar.ducha: //ducha
                //controlamos el hambre
                if (this.higiene < (higienemax - this.limpiar.ducha)) {
                    this.higiene += this.limpiar.ducha;
                } else if (this.higiene < (higienemax - this.limpiar.toallitas)) {
                    this.higiene += this.limpiar.toallitas;
                }
                break;
        }
        //control higiene y salud
        if (this.higiene <= this.medio && this.salud >= 1) {
            this.salud -= 1;
        }
        //control medicina y salud
        if (this.salud <= this.medio) {
            this.medicina = true;
            document.getElementById('jarabe').style.visibility = "visible";
            document.getElementById('inyeccion').style.visibility = "visible";
            //document.getElementById('jarabe').disabled=false;
            //document.getElementById('inyeccion').disabled=false;
        }
        this.fntActualizaEstado('estado');
//document.getElementById('valorafecto').value='Control higiene: ' + this.higiene+ ' Control salud: '+ this.salud + 'Control medicina:'+ this.medicina;

        return false;


    },
    fntVerEstado: function() {

    },
    fntVerTv: function(tv) {
        //debugger;
        var valor = tv;
        //var valor=eval(tv);
        var suenomax = this.max;
        switch (valor) {
            case this.vertv.telediario://telediario
                //controlamos el sueño
                if (this.sueno < (suenomax - this.vertv.telediario)) {
                    this.sueno += this.vertv.telediario;
                } else if (this.sueno < suenomax) {
                    this.sueno += this.vertv.animaciones;
                }
                break;
            case this.vertv.animaciones: //animaciones
                //controlamos el sueño
                if (this.sueno < suenomax) {
                    this.sueno += this.vertv.animaciones;
                }
                break;
        }
        this.fntActualizaEstado('estado');
//document.getElementById('valorafecto').value='Control sueño: ' + this.sueno;

        return false;


    },
    fntEscucharMusica: function(musica) {
        var valor = musica;
        //var valor=eval(tv);
        var suenomax = 10;
        switch (valor) {
            case this.escucharmusica.clasica://clasica
                //controlamos el sueño
                if (this.sueno < (suenomax - this.escucharmusica.clasica)) {
                    this.sueno += this.escucharmusica.clasica;
                } else if (this.sueno < suenomax - this.escucharmusica.reggae) {
                    this.sueno += this.escucharmusica.reggae;
                }
                break;
            case this.escucharmusica.reggae: //reggae
                //controlamos el sueño
                if (this.sueno < suenomax - this.escucharmusica.reggae) {
                    this.sueno += this.escucharmusica.reggae;
                }
                break;
        }
        this.fntActualizaEstado('estado');
//document.getElementById('valorafecto').value='Control sueño: ' + this.sueno;

    },
    fntActualizaEstado: function(GetCanvasById) {
        //debugger;
        var milienzo = document.getElementById(GetCanvasById);
        var lienzo = milienzo.getContext('2d');
        lienzo.clearRect(0, 0, 600, 100);
        lienzo.fillStyle = 'rgba(255,255,255,1)';
        lienzo.fillRect(0, 0, 600, 100);

        var cred = 0;
        var cgreen = 0;
        var cblue = 0;
        var rojoverde = 5;
        // 1 Estado de animo control del cuadro
        if (this.estadoanimo > rojoverde) {
            cred = 0;
            cgreen = 200;
            cblue = 0;
        } else {
            cred = 200;
            cgreen = 0;
            cblue = 0;
        }
        lienzo.font = '12px arial';
        lienzo.fillStyle = 'rgba(0,0,0,1)';
        lienzo.fillText('Estado de animo: ', 20, 20);
        lienzo.fillStyle = 'rgba(' + cred + ',' + cgreen + ',' + cblue + ',1)';
        lienzo.fillRect(120, 5, this.estadoanimo * 10, 20);
        // 2 Estado de sueño control del cuadro
        if (this.sueno > rojoverde) {
            cred = 200;
            cgreen = 0;
            cblue = 0;
        } else {
            cred = 0;
            cgreen = 200;
            cblue = 0;
        }
        lienzo.font = '12px arial';
        lienzo.fillStyle = 'rgba(0,0,0,1)';
        lienzo.fillText('Ganas de dormir: ', 230, 20);
        lienzo.fillStyle = 'rgba(' + cred + ',' + cgreen + ',' + cblue + ',1)';
        lienzo.fillRect(330, 5, this.sueno * 10, 20);
        // 3 Estado ganas de comer control del cuadro
        if (this.hambre > rojoverde) {
            cred = 200;
            cgreen = 0;
            cblue = 0;
        } else {
            cred = 0;
            cgreen = 200;
            cblue = 0;
        }
        lienzo.font = '12px arial';
        lienzo.fillStyle = 'rgba(0,0,0,1)';
        lienzo.fillText('Ganas de comer: ', 20, 50);
        lienzo.fillStyle = 'rgba(' + cred + ',' + cgreen + ',' + cblue + ',1)';
        lienzo.fillRect(120, 35, this.hambre * 10, 20);
        // 4 Control de peso
        if (this.peso > (rojoverde * 10)) {
            cred = 200;
            cgreen = 0;
            cblue = 0;
        } else {
            cred = 0;
            cgreen = 200;
            cblue = 0;
        }
        lienzo.font = '12px arial';
        lienzo.fillStyle = 'rgba(0,0,0,1)';
        lienzo.fillText('Aumento de peso: ', 230, 50);
        lienzo.fillStyle = 'rgba(' + cred + ',' + cgreen + ',' + cblue + ',1)';
        lienzo.fillRect(330, 35, this.peso, 20);
        //Estado de salud
        if (this.salud > rojoverde) {
            cred = 0;
            cgreen = 200;
            cblue = 0;
        } else {
            cred = 200;
            cgreen = 0;
            cblue = 0;
        }
        lienzo.font = '12px arial';
        lienzo.fillStyle = 'rgba(0,0,0,1)';
        lienzo.fillText('Estado de salud: ', 20, 80);
        lienzo.fillStyle = 'rgba(' + cred + ',' + cgreen + ',' + cblue + ',1)';
        lienzo.fillRect(120, 65, this.salud * 10, 20);
        //Control de higiene
        if (this.higiene > rojoverde) {
            cred = 0;
            cgreen = 200;
            cblue = 0;
        } else {
            cred = 200;
            cgreen = 0;
            cblue = 0;
        }
        lienzo.font = '12px arial';
        lienzo.fillStyle = 'rgba(0,0,0,1)';
        lienzo.fillText('Higiene: ', 230, 80);
        lienzo.fillStyle = 'rgba(' + cred + ',' + cgreen + ',' + cblue + ',1)';
        lienzo.fillRect(330, 65, this.higiene * 10, 20);


        //setTimeout(fntActualizaEstado(),4000);

        //debugger;
        // var urlm={urlm1:'../imagenes/Bichos/monster1/',urlm2:'../imagenes/Bichos/monster2/',urlm3:'../imagenes/Bichos/monster3/'};
        //alert('pasa');
        //document.getElementById('pantalla').src="imagenes/Bichos/large_cute-monsters.png";
        // alert("comienzo del juego");
    },
    fntCargarCanvas: function(GetCanvasById, ImagenFondo) {
        //debugger;
        var milienzo = document.getElementById(GetCanvasById);
        var lienzo = milienzo.getContext('2d');
        var img = new Image();
        img.src = ImagenFondo;
        img.onload = function() {
            lienzo.drawImage(img, 0, 0, 600, 400);
        };
    },
    fntLanzaFunciones: function(id) {
        var valor = id;
        switch (valor) {
            //comer
            case 'manzana':
                this.fntComer(this.comer.manzana);
                break;
            case 'pizza':
                this.fntComer(this.comer.pizza);
                break;
            case 'caramelo':
                this.fntComer(this.comer.caramelo);
                break;
                //limpiar
            case 'toallita':
                this.fntHigiene(this.limpiar.toallitas);
                break;
            case 'ducha':
                this.fntHigiene(this.limpiar.ducha);
                break;
                //jugar
            case 'coche':
                this.fntJugar(this.jugar.coches);
                break;
            case 'pelota':
                this.fntJugar(this.jugar.pelota);
                break;
            case 'peluche':
                this.fntJugar(this.jugar.peluche);
                break;
                //educar
            case 'libro':
                this.fntEducar(this.educar.leyendo);
                break;
            case 'pizarra':
                this.fntEducar(this.educar.escribiendo);
                break;
            case 'lapiz':
                this.fntEducar(this.educar.escribiendo);
                break;
                //afecto
            case 'besar':
                this.fntAfectividad(this.afectividad.besar);
                break;
            case 'acariciar':
                this.fntAfectividad(this.afectividad.acariciar);
                break;
                //Ocio
            case 'tv':
                this.fntVerTv(this.vertv.animaciones);
                break;
            case 'musica':
                this.fntEscucharMusica(this.escucharmusica.clasica);
                break;
                //Dormir
            case 'sofa':
                this.fntDormir(this.dormir.sofa);
                break;
            case 'cama':
                this.fntDormir(this.dormir.cama);
                break;
                //Salud
            case 'jarabe':
                this.fntMedicar(this.medicar.jarabe);
                break;
            case 'inyeccion':
                this.fntMedicar(this.medicar.inyeccion);
                break;
        }
    }
};
//Fin del objeto tamagotchi
function fntSelecionarMascota() {
    alert("selecionar mascota");
}
function fntAnimar(vida) {
    var valor = eval(vida);

    switch (valor) {
        case 'manzana':
            break;
    }

}

/********************************************************
 FUNCIONES DRAG AND DROP
 ********************************************************/
var contador = 0; // Variable global para tener poder poner un id unico a cada elemento cuando se clona.
function start(e) {
//      debugger;
    e.dataTransfer.effecAllowed = 'move'; // Define el efecto como mover (Es el por defecto)
    e.dataTransfer.setData("Data", e.target.id); // Coje el elemento que se va a mover
    e.dataTransfer.setDragImage(e.target, 0, 0); // Define la imagen que se vera al ser arrastrado el elemento y por donde se coje el elemento que se va a mover (el raton aparece en la esquina sup_izq con 0,0)
    e.target.style.opacity = '0.4';
    tamagotchi.fntLanzaFunciones(e.target.id);//Mandamos el objeto al tamagotchi a través de su id
}

function end(e) {
    //debugger;
    e.target.style.opacity = ''; // Pone la opacidad del elemento a 1
    e.dataTransfer.clearData("Data");
}

function enter(e) {
    //debugger;
    e.target.style.border = '3px dotted #555';
}

function leave(e) {
    //debugger;
    e.target.style.border = '';
}

function over(e) {
    //debugger;
    var elemArrastrable = e.dataTransfer.getData("Data"); // Elemento arrastrado
    var id = e.target.id; // Elemento sobre el que se arrastra

    // return false para que se pueda soltar
    if (id === 'cuadro1') {
        return false; // Cualquier elemento se puede soltar sobre el div destino 1
    }

    if (id === 'papelera') {
        return false; // Cualquier elemento se puede soltar en la papelera
    }
}
/*** Mueve el elemento ***/
/*
 * 
 * @param {type} e evento desde el navegador
 * @returns {undefined}
 */
function drop(e) {
    //debugger;
    var elementoArrastrado = e.dataTransfer.getData("Data"); // Elemento arrastrado
    e.target.appendChild(document.getElementById(elementoArrastrado));
    e.target.style.border = '';  // Quita el borde
    tamContX = $('#' + e.target.id).width();
    tamContY = $('#' + e.target.id).height();

    tamElemX = $('#' + elementoArrastrado).width();
    tamElemY = $('#' + elementoArrastrado).height();

    posXCont = $('#' + e.target.id).position().left;
    posYCont = $('#' + e.target.id).position().top;

    // Posicion absoluta del raton
    x = e.layerX;
    y = e.layerY;

    // Si parte del elemento que se quiere mover se queda fuera se cambia las coordenadas para que no sea asi
    if (posXCont + tamContX <= x + tamElemX) {
        x = posXCont + tamContX - tamElemX;
    }

    if (posYCont + tamContY <= y + tamElemY) {
        y = posYCont + tamContY - tamElemY;
    }

    document.getElementById(elementoArrastrado).style.position = "absolute";
    document.getElementById(elementoArrastrado).style.left = x + "px";
    document.getElementById(elementoArrastrado).style.top = y + "px";
}

/*** Elimina el elemento que se mueve  ***/
function eliminar(e) {
    //debugger;
    var elementoArrastrado = document.getElementById(e.dataTransfer.getData("Data")); // Elemento arrastrado
    //elementoArrastrado.parentNode.removeChild(elementoArrastrado); // Elimina el elemento
    e.target.style.border = '';   // Quita el borde
}

/*** Clona el elemento que se mueve ***/
function clonar(e) {
    //debugger;
    var elementoArrastrado = document.getElementById(e.dataTransfer.getData("Data")); // Elemento arrastrado

    elementoArrastrado.style.opacity = ''; // Dejamos la opacidad a su estado anterior para copiar el elemento igual que era antes

    var elementoClonado = elementoArrastrado.cloneNode(true); // Se clona el elemento
    elementoClonado.id = "ElemClonado" + contador; // Se cambia el id porque tiene que ser unico
    contador += 1;
    elementoClonado.style.position = "static";	// Se posiciona de forma "normal" (Sino habria que cambiar las coordenadas de la posición)
    e.target.appendChild(elementoClonado); // Se añade el elemento clonado
    e.target.style.border = '';   // Quita el borde del "cuadro clonador"
}

function fntfocus() {
    //debugger;
    $("#salida").focus;
}

window.onload = function() {
    //document.getElementById('salida').disabled=true;
    fntfocus();
    //debugger;
    tamagotchi.fntCargarCanvas('pantalla', 'fondo.png');
    tamagotchi.fntActualizaEstado('estado');
    //document.getElementById('inyeccion').disabled=true;
};